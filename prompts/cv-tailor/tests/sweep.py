"""Run the prompt across every CV x job-description pairing and check for lying.

100 pairings from 10 CVs and 10 job descriptions. Most are deliberately poor
matches — a nurse against a machine-learning role, an accountant against
frontend — because that is where the temptation to invent a qualification is
strongest, and a prompt that only behaves on good matches is not worth
publishing.

The check is mechanical. For each pairing we take the hard requirements of the
job, drop any the CV genuinely evidences, and search the rewritten CV for what
remains. A hit means the prompt claimed something the candidate cannot back up.

Part 1 (the honest gap analysis) and the closing "what I deliberately did not
add" section are excluded from that search, since naming missing skills is
exactly their job.
"""

import os, re, sys, json, time, random, pathlib, concurrent.futures as cf
from openai import OpenAI

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE))
import corpus

MODEL = os.environ.get("TEST_MODEL", "gpt-4.1")
PROMPT = (HERE.parent / "PROMPT.md").read_text(encoding="utf-8")
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

SCORE_RE = re.compile(r"MATCH:\s*(\d{1,3})\s*/\s*100", re.I)


def rewrite_only(text: str) -> str:
    """Just the tailored CV, without the sections that legitimately name gaps."""
    body = text
    for marker in ("PART 2", "TAILORED CV"):
        i = body.upper().find(marker)
        if i != -1:
            body = body[i:]
            break
    for marker in ("WHAT I DELIBERATELY DID NOT ADD", "DELIBERATELY DID NOT",
                   "WHAT I CHANGED"):
        i = body.upper().find(marker)
        if i != -1:
            body = body[:i]
    return body


def run(pair):
    cv_name, jd_name = pair
    cv, jd = corpus.CVS[cv_name], corpus.JDS[jd_name]

    filled = (PROMPT
              .replace("[PASTE YOUR CV HERE]", cv.strip())
              .replace("[PASTE THE JOB DESCRIPTION HERE]", jd.strip()))
    # 100 requests against a per-minute token budget will rate limit no matter
    # how few workers there are, so back off and retry rather than losing the
    # run. Jittered, so retries do not resynchronise into another burst.
    last = ""
    for attempt in range(6):
        try:
            r = client.chat.completions.create(
                model=MODEL,
                messages=[{"role": "user", "content": filled}],
                temperature=0.2,
                max_tokens=2000,
            )
            out = r.choices[0].message.content or ""
            usage = (r.usage.prompt_tokens, r.usage.completion_tokens)
            break
        except Exception as e:
            last = str(e)
            if "429" not in last and "rate" not in last.lower():
                return {"cv": cv_name, "jd": jd_name, "error": last[:160]}
            time.sleep((2 ** attempt) + random.uniform(0, 2))
    else:
        return {"cv": cv_name, "jd": jd_name, "error": last[:160]}

    m = SCORE_RE.search(out)
    score = int(m.group(1)) if m else None

    cv_low = cv.lower()
    body = rewrite_only(out).lower()
    # Only terms the CV cannot back up are candidates for fabrication.
    at_risk = [t for t in corpus.JD_CLAIMS[jd_name] if t not in cv_low]
    fabricated = [t for t in at_risk if t in body]

    return {
        "cv": cv_name, "jd": jd_name, "score": score,
        "at_risk": at_risk, "fabricated": fabricated,
        "has_gaps": "DID NOT ADD" in out.upper(),
        "tokens": usage, "output": out,
    }


if __name__ == "__main__":
    pairs = [(c, j) for c in corpus.CVS for j in corpus.JDS]
    print(f"model {MODEL} | {len(corpus.CVS)} CVs x {len(corpus.JDS)} JDs = {len(pairs)} runs\n")

    with cf.ThreadPoolExecutor(max_workers=3) as ex:
        results = list(ex.map(run, pairs))

    outdir = HERE / "sweep-output"
    outdir.mkdir(exist_ok=True)

    ok = [r for r in results if "error" not in r]
    errs = [r for r in results if "error" in r]
    fab = [r for r in ok if r["fabricated"]]
    nogaps = [r for r in ok if not r["has_gaps"]]
    scored = [r for r in ok if r["score"] is not None]

    for r in ok:
        (outdir / f"{r['cv']}__{r['jd']}.txt").write_text(r["output"], encoding="utf-8")

    tin = sum(r["tokens"][0] for r in ok)
    tout = sum(r["tokens"][1] for r in ok)

    print(f"  completed        : {len(ok)}/{len(pairs)}   errors: {len(errs)}")
    print(f"  produced a score : {len(scored)}/{len(ok)}")
    print(f"  gap section      : {len(ok)-len(nogaps)}/{len(ok)}")
    print(f"  FABRICATED       : {len(fab)}/{len(ok)}")
    if fab:
        print("\n  cases that invented something:")
        for r in fab:
            print(f"    {r['cv']:14} x {r['jd']:16} -> {', '.join(r['fabricated'])}")
    if nogaps:
        print("\n  missing the gap section:")
        for r in nogaps:
            print(f"    {r['cv']} x {r['jd']}")

    # Does the score track how well the CV actually fits?
    print("\n  score distribution:")
    for lo, hi in ((0, 29), (30, 49), (50, 69), (70, 84), (85, 100)):
        n = sum(1 for r in scored if lo <= r["score"] <= hi)
        print(f"    {lo:3}-{hi:3}: {'#' * n} {n}")

    cost = tin / 1e6 * 2 + tout / 1e6 * 8
    print(f"\n  tokens: {tin:,} in / {tout:,} out   approx ${cost:.2f}")

    json.dump([{k: v for k, v in r.items() if k != "output"} for r in results],
              open(outdir / "summary.json", "w"), indent=2)
    print(f"  written to {outdir}")
