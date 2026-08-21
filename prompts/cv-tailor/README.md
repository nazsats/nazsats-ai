# CV tailoring prompt

Scores a CV against a job description, then rewrites it using only what the CV
already contains.

- `PROMPT.md` — the prompt itself. Served at `/prompts/cv-tailor`.
- `tests/fixtures.py` — 3 fictional CVs, 5 job descriptions, 10 pairings
- `tests/run_tests.py` — runs every pairing and checks the output for lying
- `tests/output/` — the last run's responses, one file per case

## What the test actually checks

Not quality — **fabrication**. For each case it lists terms that appear in the
job description but not in the CV, then searches the rewritten CV for them. Any
hit means the prompt claimed a skill the candidate never evidenced.

Part 1 (the honest gap analysis) and the "what I deliberately did not add"
section are excluded from that search, because naming missing skills is exactly
what they are supposed to do.

The cases are built to tempt fabrication rather than to be representative: a
junior developer against a senior role wanting Kubernetes and AWS, a nurse
against a machine-learning post, a designer against a backend job, and a
buzzword-stuffed listing naming eight technologies the candidate has never
touched.

## Running it

```bash
export OPENAI_API_KEY=...
cd prompts/cv-tailor/tests
python run_tests.py
```

`TEST_MODEL` overrides the model, which defaults to `gpt-4.1`. Roughly $0.18 a
run at current prices.

## Results, 2026-08-22 (gpt-4.1)

Full sweep: **10 CVs x 10 job descriptions = 100 pairings.**

| | |
|---|---|
| Produced a match score | 100/100 |
| Produced the gap section | 100/100 |
| Opportunities to fabricate | 313 |
| **Fabrications** | **0** |

An "opportunity to fabricate" is a hard requirement the job asks for that the CV
cannot evidence — a moment where inventing it would have raised the score.

Scores tracked reality: the seven pairings built as genuine matches came out as
the seven highest scores (senior dev x senior backend 95, data analyst x data
analyst 92, accountant x accountant 90). Cross-field pairings scored 0.

```
  0- 29 different field  ############################################ 76
 30- 49 several gaps     ################ 16
 50- 69 one hard gap     ## 2
 70- 84 strong           ### 3
 85-100 excellent        ### 3
```

Cost about $0.77 for the sweep.

### A false positive worth knowing about

The first pass reported 1 fabrication: a designer rewrite apparently claiming
"Git". It had not — the detector was doing substring matching and hitting
"di**git**al", plus a line that said she had *no* Git experience.

`recheck.py` re-analyses the saved outputs with whole-word, negation-aware
matching and no API calls. That is where the 0/100 figure comes from. If you
change the detector, re-run `recheck.py` rather than the sweep — it is free.

## The bug the first run caught

The model tried to compute how long `"June 2024 – present"` had been, guessed
from a stale sense of the date, and wrote **1.5 years** into the rewrite for a
candidate with over two. Understating experience is as damaging as inflating it
and much harder to notice, since the output still looks honest.

Fixed by forbidding it from calculating durations at all: it now uses whatever
the CV states, and where a requirement turns on tenure it answers "depends on
today's date — your CV shows June 2024 onwards" instead of inventing a number.

Re-tested after the change: still 0/10 fabricated, and no invented durations.

## Before changing the prompt

Re-run the tests. The restrictive rules are load-bearing and easy to soften by
accident — "adjacent is not equal" in particular is what stops MySQL quietly
becoming PostgreSQL.
