"""Re-analyse the saved sweep outputs with stricter matching.

The first pass used substring search, which flagged "digital" as evidence of
"Git" and counted a sentence listing what the candidate LACKS as a claim that
she has it. Both are the detector being wrong, not the prompt.

This pass fixes three things:
  - whole-word matching, so "git" no longer matches "digital"
  - negation-aware: a line saying "no evidence of X" is not a claim of X
  - stricter section slicing, so only the rewritten CV body is searched

Runs against files on disk. No API calls, so it is free to re-run.
"""

import json, pathlib, re, sys

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE))
import corpus

OUT = HERE / "sweep-output"

# A line that says the candidate does NOT have something is the prompt working
# correctly, not fabricating. These phrases mark such lines.
NEGATIONS = re.compile(
    r"\b(no |not |lack|without|missing|absent|does not|doesn't|cannot|"
    r"did not|didn't|never|none|deliberately|gap|unsupported|no evidence)",
    re.I,
)


def claimed(body: str, term: str) -> bool:
    """Does this rewrite actually claim `term`?"""
    pattern = re.compile(r"(?<![a-z0-9])" + re.escape(term) + r"(?![a-z0-9])", re.I)
    for line in body.splitlines():
        if not pattern.search(line):
            continue
        if NEGATIONS.search(line):
            continue          # the line is disclaiming it, not claiming it
        return True
    return False


def rewrite_body(text: str) -> str:
    body = text
    for marker in ("PART 2", "TAILORED CV"):
        i = body.upper().find(marker)
        if i != -1:
            body = body[i:]
            break
    for marker in ("WHAT I DELIBERATELY DID NOT ADD", "DELIBERATELY DID NOT",
                   "WHAT I CHANGED", "WHAT I DID NOT ADD"):
        i = body.upper().find(marker)
        if i != -1:
            body = body[:i]
    return body


rows, fabricated = [], []
for f in sorted(OUT.glob("*__*.txt")):
    cv_name, jd_name = f.stem.split("__")
    text = f.read_text(encoding="utf-8")
    cv = corpus.CVS[cv_name]

    body = rewrite_body(text)
    at_risk = [t for t in corpus.JD_CLAIMS[jd_name]
               if not re.search(r"(?<![a-z0-9])" + re.escape(t) + r"(?![a-z0-9])", cv, re.I)]
    bad = [t for t in at_risk if claimed(body, t)]

    m = re.search(r"MATCH:\s*(\d{1,3})\s*/\s*100", text, re.I)
    rows.append({
        "cv": cv_name, "jd": jd_name,
        "score": int(m.group(1)) if m else None,
        "at_risk": len(at_risk), "fabricated": bad,
        "has_gaps": "DID NOT ADD" in text.upper(),
    })
    if bad:
        fabricated.append((cv_name, jd_name, bad))

n = len(rows)
scored = [r for r in rows if r["score"] is not None]
risk_total = sum(r["at_risk"] for r in rows)

print(f"re-analysed {n} pairings with whole-word, negation-aware matching\n")
print(f"  produced a match score      : {len(scored)}/{n}")
print(f"  produced the gap section    : {sum(1 for r in rows if r['has_gaps'])}/{n}")
print(f"  opportunities to fabricate  : {risk_total}")
print(f"  FABRICATIONS                : {len(fabricated)}")
for cv, jd, terms in fabricated:
    print(f"     {cv} x {jd}: {terms}")

print("\n  score distribution:")
for lo, hi, label in ((0, 29, "different field"), (30, 49, "several gaps"),
                      (50, 69, "one hard gap"), (70, 84, "strong"), (85, 100, "excellent")):
    k = sum(1 for r in scored if lo <= r["score"] <= hi)
    print(f"    {lo:3}-{hi:3} {label:16} {'#' * k} {k}")

json.dump(rows, open(OUT / "recheck.json", "w"), indent=2)
print(f"\n  written to {OUT / 'recheck.json'}")
