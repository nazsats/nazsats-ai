# Interview practice

The sequel to `cv-tailor`. That one gets you the interview; this one is for the
week after.

Paste your CV and the job description, get ten questions traced to specific
lines in both, drafted answers for the three hardest, and a plain list of what
you cannot answer.

## The failure mode this is built against

Not clumsy questions — those cost ten minutes.

**An answer that claims experience the CV does not have.** That gets found out
in the follow-up question, and the follow-up always comes. Worse, the candidate
walks in believing the answer is safe.

So the prompt's central rule is the same as `cv-tailor`'s: every project,
number, tool and outcome in a drafted answer must already appear on the CV. Where
the experience genuinely is not there, the answer says so — what is nearest,
what would need learning, why the candidate is confident — rather than dodging.

## Testing

```bash
export OPENAI_API_KEY=...
cd prompts/interview-practice/tests
python run_tests.py
```

Reuses the `cv-tailor` corpus — same ten CV/job pairings, same known gaps — so a
result here is directly comparable with a result there.

For each pair, the harness lists the terms the job asks for that the CV cannot
support, then searches **only the drafted answers** for them. The questions
section is allowed to name a missing skill: "you have no Kubernetes, how would
you approach it" is the prompt working correctly, and so is the "what I cannot
answer" list. Only an assertion inside an answer counts as a failure.

Matching is whole-word and negation-aware. Substring matching gave false
positives on the last prompt — "digital" contains "git" — and "I have not used
Kubernetes" must not register as a Kubernetes claim.

The harness also checks structure: ten questions present, STAR labelled, gap
list produced.

## Result

**0 of 10 cases claimed anything the CV did not support.** All ten produced the
full question set, used STAR, and listed the candidate's gaps.

Getting to a number worth trusting took seven fixes to the harness, not the
prompt. The first run reported 8/10 failing and every one was a false alarm:
curly apostrophes so `haven't` never matched, `didn't` missing from the negation
list, restated questions being scanned as though they were answers, and a word-boundary escape
written into a non-raw string so it compiled to a literal backspace byte — the
pattern was looking for an invisible control character and could never match.

Hence the self-test that now runs first, and aborts the suite if it fails. Three
sentences that really are claims, four that really are denials. Every widening
of the check makes it less likely to fire, so without that guard the harness
would have been trained to agree with whoever last edited it.

**One genuine failure did survive**, and it was not a claimed skill. The prompt
invented *preparation* — "I've read about Kubernetes and followed tutorials",
"experimented with it in personal projects" — none of which was on the CV. It
sounds modest, which is why it slipped through, but "which tutorials?" is the
next question. Rule 3 was added to close it, prompt changed alone that round so
the comparison stayed honest, and 4 failures became 0.

**Known limit of the checker:** the negation window stops at `.`, `!` and `?` to
stay inside one sentence, so a full stop inside a token — "Node.js" — can hide
a denial that is genuinely there. That produced the single flag on the final
run, verified by hand as a false alarm. Worth fixing if this harness gets reused.

## Re-running it

Results shift slightly between runs — the model is sampled at temperature 0.3,
not deterministic. Read the outputs in `tests/output/` before trusting any
number, including a good one.

## On AI-conducted interviews

The prompt has a section for this, and it deliberately does **not** say that AI
interviewers count keywords.

They score against **rubrics of job competencies**. HireVue scores on language
content tied to competencies and launched a two-way voice interviewer in June
2026; micro1's Zara produces a structured skills report from an LLM-led
interview that branches as it goes.

Keyword stuffing is detected and counts against the candidate. What does help is
narrower and true: say the specific noun when it is honestly yours, keep answers
to 100–200 words, and use STAR out loud because a rubric is looking for the
parts.

The distinction matters. Telling people to stuff keywords would be advice that
actively harms them.

## Sources

- HireVue rubric-based scoring and the June 2026 AI Interviewer —
  https://www.forbes.com/sites/quickerbettertech/2026/02/04/how-hirevue-uses-ai-to-help-employers-evaluate-the-skills-of-a-potential-candidate/
- micro1 "Zara", LLM-based interview feedback —
  https://www.micro1.ai/research/zara-an-llm-based-candidate-interview-feedback-system
- Where AI interview scoring fails —
  https://www.thehirehub.ai/blog/ai-interview-scoring-what-it-measures-how-accurate-it-really-is-and-where-it-fails
- Keyword stuffing penalised; STAR; 100–200 words —
  https://www.wahresume.com/blog/answer-2026-ai-interview-questions-without-sounding-scripted
