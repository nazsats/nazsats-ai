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
| Produced the gap list | 100/100 |
| Produced ATS advice | 100/100 |
| Dropped a figure from the CV | 0/100 |
| Opportunities to fabricate | 313 |
| **Fabrications** | **0** |

An "opportunity to fabricate" is a hard requirement the job asks for that the CV
cannot evidence — a moment where inventing it would raise the score.

```
  0- 29 different field  ############################################# 61
 30- 49 several gaps     ############################ 28
 50- 69 one hard gap     #### 4
 70- 84 strong           ### 3
 85-100 excellent        #### 4
```

About $0.98 a sweep.

## Three bugs the testing found

Each was invisible from reading a single output, and each produced a rule.

**1. It guessed durations.** It read "June 2024 - present", assumed a stale
date, and wrote *1.5 years* for someone with over two. An understatement still
looks honest, so nobody catches it. Rule: never calculate durations.

**2. It promoted a skill into an achievement.** The teacher's CV listed
"assessment" as a one-word skill. The rewrite turned that into an Experience
bullet reading "Developed and implemented assessments" — work she never claimed.
Rule: a listed skill is not an achievement.

**3. It swapped an activity for a keyword, discarding a metric.** The same
bullet replaced "Teach grades 11 and 12; class average rose from 62 to 78
percent" with the assessments claim, losing her only number. Two rules: never
delete a figure, and never change what a bullet says you did — only the words
describing it. It now produces "Taught physics to grades 11 and 12; improved
class average from 62 to 78 percent".

## False positives in the detector

Substring matching flagged "di**git**al" as a claim of Git, and counted lines
saying the candidate *lacks* React as claims of React. Both were the detector,
not the prompt.

`recheck.py` re-analyses the saved outputs with whole-word, negation-aware
matching and no API calls. That is where the 0/313 figure comes from. If you
change the detector, run `recheck.py` rather than the sweep — it is free.

## Before changing the prompt

Re-run the tests. The restrictive rules are load-bearing and easy to soften by
accident — "adjacent is not equal" in particular is what stops MySQL quietly
becoming PostgreSQL.
