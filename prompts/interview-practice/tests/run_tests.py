"""Does the interview prompt put words in the candidate's mouth?

That is the only failure worth testing. A clumsy practice question wastes ten
minutes. An answer that claims Kubernetes experience the CV never had gets found
out in the follow-up question — and the follow-up always comes.

Reuses the cv-tailor corpus, so the CV/JD pairs are the same ones the tailoring
prompt was validated against. Each pair has a known list of terms the job asks
for and the CV cannot support. If a drafted STAR answer asserts one of those,
the prompt has coached someone into a lie.

A term only counts as invented when it appears in the drafted ANSWERS. The
questions section is allowed to name a missing skill — asking "you have no
Kubernetes, how would you approach it" is the prompt working correctly. So is
the "what I cannot answer" section, which exists precisely to list them.

    python run_tests.py

The key can be exported, or written into a .env anywhere at or above this
directory. See load_env below.
"""

from __future__ import annotations

import os
import re
import sys
import json
import pathlib
import concurrent.futures as cf

from openai import OpenAI

HERE = pathlib.Path(__file__).parent
# The corpus lives with cv-tailor; same candidates, same jobs, so a finding here
# is comparable with a finding there.
sys.path.insert(0, str(HERE.parent.parent / "cv-tailor" / "tests"))
import fixtures  # noqa: E402


def load_env():
    """Read the nearest .env into the environment, if there is one.

    Walks up rather than hardcoding a path, so this runs the same from the tests
    directory, the prompt directory, or the repo root. Anything already set in
    the real environment wins, so an export still overrides the file.

    Deliberately not depending on python-dotenv: one fewer thing to install
    before a test can be run is worth a dozen lines.
    """
    for parent in [HERE, *HERE.parents]:
        candidate = parent / ".env"
        if not candidate.is_file():
            continue
        for line in candidate.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            os.environ.setdefault(key.strip(), value.strip().strip("'\""))
        return candidate
    return None


ENV_FILE = load_env()

MODEL = os.environ.get("TEST_MODEL", "gpt-4.1")
PROMPT = (HERE.parent / "PROMPT.md").read_text(encoding="utf-8")

if not os.environ.get("OPENAI_API_KEY"):
    env_path = HERE.parents[2] / ".env"
    sys.exit(
        "OPENAI_API_KEY is not set.\n"
        "\n"
        "Either export it for this shell:\n"
        "    export OPENAI_API_KEY=sk-...\n"
        "\n"
        "or write it into a file the harness finds on its own:\n"
        f"    {env_path}\n"
        "containing the single line:\n"
        "    OPENAI_API_KEY=sk-...\n"
        "\n"
        ".env is already gitignored there, so the key stays off GitHub."
    )

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# Terms the job description asks for that the CV cannot support. Identical to
# the cv-tailor FORBIDDEN table — same pairs, same gaps.
FORBIDDEN = {
    "missing-hard-reqs":  ["kubernetes", "terraform", "aws", "eks", "kafka", "postgresql"],
    "adjacent-db":        ["postgresql", "postgres"],
    "keyword-stuffed":    ["react", "node.js", "nodejs", "mongodb", "aws", "docker"],
    "wrong-field":        ["pytorch", "tensorflow", "scikit-learn", "mlops", "numpy", "pandas"],
    "nurse-to-tech":      ["django", "flask", "rest api", "sql"],
    "designer-frontend":  ["react", "typescript"],
    "designer-backend":   ["kubernetes", "terraform", "postgresql", "python"],
    "freelancer-stuffed": ["react", "node.js", "mongodb", "aws", "docker", "python"],
    "junior-senior-gap":  ["pytorch", "tensorflow", "mlops", "scikit-learn"],
    "honest-match":       [],
}

# Where Part 2 starts and Part 3 begins. Only the text between them is a
# drafted answer; everything else is allowed to name a gap.
ANSWERS_START = re.compile(r"PART\s*2\b", re.I)
ANSWERS_END = re.compile(r"PART\s*3\b", re.I)

# An assertion of experience, as opposed to naming the gap. "I have not used
# Kubernetes" must not count as a Kubernetes claim.
NEGATED = re.compile(
    r"(never|not|no\b|without|lack|un(?:familiar|able)|"
    r"have(?:n't| not)|had(?:n't| not)|do(?:n't| not)|did(?:n't| not)|"
    r"was(?:n't| not)|is(?:n't| not)|limited|little|outside)"
    r"\b[^.!?]{0,120}$",
    re.I,
)

# FORWARD: the candidate is talking about acquiring the skill, not having
# it - "I'd need to learn Python", "keen to pick up React", "get up to speed
# with Node.js". These read as claims to a naive matcher and are the opposite.
ASPIRATIONAL = re.compile(
    r"(need to|needs to|would need|i'd need|have to learn|going to learn|"
    r"keen to|happy to|willing to|ready to|pick up|get up to speed|"
    r"ramp up|if i were|were i to|come up to speed|"
    r"learning|learn|train(?:ing)? (?:in|on)|familiaris|familiariz)"
    r"\b[^.!?]{0,120}$",
    re.I,
)


# The model restates each question inside Part 2 before answering it, and lists
# the three it picked. Those lines legitimately name the missing skill — "have
# you worked with Kubernetes?" is the question, not a claim — so they are cut
# before scanning. Only prose the candidate would actually say is checked.
QUESTION_LINE = re.compile(
    r"^\s*(?:#{1,6}\s*)?(?:[-*]\s*)?\**\s*[\(\[]?\s*"
    r"(?:Q\s*\d+|Selected\s*:|The three highest)"
    r"[^\n]*$",
    re.M,
)


def normalise(text: str) -> str:
    """Fold the quote characters models actually emit into ASCII.

    The negation check missed every "haven’t" because the pattern spelled it
    with a straight apostrophe. Same family of bug as matching "git" inside
    "digital": the string looked right and was not.
    """
    return (text.replace("’", "'").replace("‘", "'")
                .replace("“", '"').replace("”", '"'))


def answers_section(text: str) -> str:
    """Just the drafted answers, with the restated questions removed."""
    m = ANSWERS_START.search(text)
    if not m:
        return ""
    body = text[m.end():]
    e = ANSWERS_END.search(body)
    body = body[: e.start()] if e else body
    return normalise(QUESTION_LINE.sub(" ", body))


def asserts_term(body: str, term: str) -> bool:
    """Whole-word hit that is not inside a negation.

    Substring matching produced false positives before — "digital" contains
    "git". Word boundaries plus a negation check is the fix that stuck.
    """
    for m in re.finditer(rf"(?<!\w){re.escape(term)}(?!\w)", body, re.I):
        before = body[max(0, m.start() - 130): m.start()]
        if NEGATED.search(before) or ASPIRATIONAL.search(before):
            continue
        return True
    return False


# The detector has been wrong more often than the prompt has. Every widening
# above makes it less likely to fire, so prove it can still catch a real lie
# before trusting a clean run. A neutered detector reports 0/10 and means
# nothing - which is how the previous prompt was almost published.
SELF_TEST = [
    ("I built the deployment pipeline on Kubernetes at my last job.", "kubernetes", True),
    ("We stored everything in PostgreSQL and I wrote the migrations.", "postgresql", True),
    ("I rebuilt the dashboard in React over two sprints.", "react", True),
    ("I haven't used Kubernetes in production.", "kubernetes", False),
    ("While I didn't write SQL queries, I did run the reports.", "sql", False),
    ("I'd need to learn Python properly before that role.", "python", False),
    ("I'm keen to pick up React given my JavaScript background.", "react", False),
]


def self_test():
    bad = [(t, term, want) for t, term, want in SELF_TEST
           if asserts_term(t, term) is not want]
    for text, term, want in bad:
        verb = "missed a real claim" if want else "false positive"
        print(f"  DETECTOR {verb}: [{term}] {text}")
    return not bad


def run_case(case):
    name, cv, jd, _intent = case

    filled = (
        PROMPT.replace("[PASTE YOUR CV HERE]", cv.strip())
        .replace("[PASTE THE JOB DESCRIPTION HERE]", jd.strip())
    )

    try:
        r = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": filled}],
            temperature=0.3,
            max_tokens=2600,
        )
        out = r.choices[0].message.content or ""
    except Exception as exc:  # noqa: BLE001
        return {"name": name, "error": f"{type(exc).__name__}: {str(exc)[:70]}"}

    answers = answers_section(out)
    invented = [t for t in FORBIDDEN[name] if asserts_term(answers, t)]

    # Structural checks — the prompt is useless if it skips its own sections.
    questions = len(re.findall(r"^\s*\**Q\s*\d+", out, re.M))

    return {
        "name": name,
        "questions": questions,
        "has_answers": bool(answers.strip()),
        "names_gaps": bool(re.search(r"cannot answer|can't answer", out, re.I)),
        "star": bool(re.search(r"\bsituation\b", answers, re.I)
                     and re.search(r"\bresult\b", answers, re.I)),
        "invented": invented,
        "output": out,
    }


if __name__ == "__main__":
    print(f"model: {MODEL} | {len(fixtures.CASES)} cases")
    if ENV_FILE:
        print(f"env:   {ENV_FILE}")
    print()

    if not self_test():
        print()
        sys.exit("Detector self-test failed. Fix it before trusting any run.")
    print("detector self-test: passed")
    print()

    with cf.ThreadPoolExecutor(max_workers=3) as ex:
        results = list(ex.map(run_case, fixtures.CASES))

    outdir = HERE / "output"
    outdir.mkdir(exist_ok=True)

    print(f"{'case':22} {'Qs':>3} {'STAR':6} {'gaps':6} invented in answers")
    print("-" * 78)
    bad = 0
    for r in results:
        if "error" in r:
            print(f"{r['name']:22} ERROR {r['error']}")
            bad += 1
            continue
        (outdir / f"{r['name']}.txt").write_text(r["output"], encoding="utf-8")
        if r["invented"]:
            bad += 1
        inv = ", ".join(r["invented"]) if r["invented"] else "-- none --"
        print(f"{r['name']:22} {r['questions']:>3} "
              f"{('yes' if r['star'] else 'NO'):6} "
              f"{('yes' if r['names_gaps'] else 'NO'):6} {inv}")

    print("-" * 78)
    print(f"\ncases coaching an unsupported claim: {bad}/{len(results)}")
    json.dump([{k: v for k, v in r.items() if k != "output"} for r in results],
              open(outdir / "summary.json", "w"), indent=2)
