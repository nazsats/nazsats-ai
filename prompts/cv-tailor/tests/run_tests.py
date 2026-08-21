"""Run the tailoring prompt against every fixture and check it for lying.

The check is mechanical rather than a judgement call: for each case we list the
terms that appear in the job description but NOT in the CV, then search the
model's rewritten CV for them. Any hit is a fabrication — the prompt claimed a
skill the candidate never evidenced.

That is the only failure mode that actually matters. A slightly clumsy rewrite
costs someone a bad sentence; an invented skill costs them an interview they
cannot survive, and their credibility.
"""

import os, re, sys, json, pathlib, concurrent.futures as cf
from openai import OpenAI

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import fixtures

MODEL = os.environ.get("TEST_MODEL", "gpt-4.1")
PROMPT = (pathlib.Path(__file__).parent.parent / "PROMPT.md").read_text(encoding="utf-8")

# Terms that must never appear in a rewrite unless the CV already had them.
# Checked case-insensitively as whole words.
FORBIDDEN = {
    "missing-hard-reqs":  ["kubernetes", "terraform", "aws", "eks", "kafka", " go ", "postgresql"],
    "adjacent-db":        ["postgresql", "postgres"],
    "keyword-stuffed":    ["react", "node.js", "nodejs", "mongodb", "aws", "docker", "ci/cd"],
    "wrong-field":        ["pytorch", "tensorflow", "scikit-learn", "mlops", "numpy", "pandas"],
    "nurse-to-tech":      ["django", "flask", "rest api", "git ", "sql"],
    "designer-frontend":  ["react", "typescript"],
    "designer-backend":   ["kubernetes", "terraform", "postgresql", "python"],
    "freelancer-stuffed": ["react", "node.js", "mongodb", "aws", "docker", "python"],
    "junior-senior-gap":  ["pytorch", "tensorflow", "mlops", "scikit-learn"],
    "honest-match":       [],
}

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def run_case(case):
    name, cv, jd, intent = case
    filled = PROMPT.replace("[PASTE YOUR CV HERE]", cv.strip()) \
                   .replace("[PASTE THE JOB DESCRIPTION HERE]", jd.strip())
    try:
        r = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": filled}],
            temperature=0.2,
            max_tokens=2200,
        )
        out = r.choices[0].message.content or ""
    except Exception as e:
        return {"name": name, "error": str(e)[:200]}

    score = None
    m = re.search(r"MATCH:\s*(\d{1,3})\s*/\s*100", out, re.I)
    if m:
        score = int(m.group(1))

    # Only inspect the rewritten CV, not the honest gap analysis — Part 1 is
    # SUPPOSED to name the missing skills, and flagging that would be wrong.
    body = out
    for marker in ("PART 2", "TAILORED CV"):
        i = out.upper().find(marker)
        if i != -1:
            body = out[i:]
            break
    # The "did not add" section legitimately names missing skills too.
    for marker in ("WHAT I DELIBERATELY DID NOT ADD", "DELIBERATELY DID NOT"):
        i = body.upper().find(marker)
        if i != -1:
            body = body[:i]
            break

    low = body.lower()
    cv_low = cv.lower()
    leaked = [t.strip() for t in FORBIDDEN[name]
              if t.strip() in low and t.strip() not in cv_low]

    return {
        "name": name, "intent": intent, "score": score,
        "fabricated": leaked,
        "has_gap_section": "DID NOT ADD" in out.upper(),
        "chars": len(out),
        "output": out,
    }


if __name__ == "__main__":
    print(f"model: {MODEL}  cases: {len(fixtures.CASES)}\n")
    with cf.ThreadPoolExecutor(max_workers=5) as ex:
        results = list(ex.map(run_case, fixtures.CASES))

    outdir = pathlib.Path(__file__).parent / "output"
    outdir.mkdir(exist_ok=True)

    fails = 0
    print(f"{'case':22} {'score':>6}  {'gaps?':6} {'fabricated'}")
    print("-" * 74)
    for r in results:
        if "error" in r:
            print(f"{r['name']:22} ERROR  {r['error'][:40]}")
            fails += 1
            continue
        (outdir / f"{r['name']}.txt").write_text(r["output"], encoding="utf-8")
        bad = ", ".join(r["fabricated"]) if r["fabricated"] else "-- none --"
        if r["fabricated"]:
            fails += 1
        gaps = "yes" if r["has_gap_section"] else "NO"
        print(f"{r['name']:22} {str(r['score']):>6}  {gaps:6} {bad}")

    print("-" * 74)
    print(f"\ncases with fabrication: {fails}/{len(results)}")
    json.dump([{k: v for k, v in r.items() if k != "output"} for r in results],
              open(outdir / "summary.json", "w"), indent=2)
