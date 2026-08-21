# Promotion copy — "I tested one CV prompt 100 times"

Lesson: <https://ai.nazsats.com/lessons/tailor-your-cv-to-the-job>
Prompt: <https://ai.nazsats.com/prompts/cv-tailor>

---

## WhatsApp announcement

Post 8–9am or 8–10pm IST. Plain text — WhatsApp mangles markdown.

```
You send the same CV to 40 jobs and hear nothing. Usually software binned it before a person ever saw it.

A tailored CV fixes that, but doing it by hand takes an hour per job — so nobody does it.

I tested a prompt that does it in two minutes. 100 CV and job combinations. It had 313 chances to invent a skill the person didn't have, and took none of them.

It also refuses to flatter you. A nurse applying for a software job scored 0 out of 100: "probably not — this is a completely different field."

Free, works in ChatGPT, Claude or Gemini:
https://ai.nazsats.com/lessons/tailor-your-cv-to-the-job
```

**Why it is longer than the two-line rule:** this one is the proof piece, and the
numbers are the reason to click. Keep the next three short — a channel where
every message is long teaches people to skim past all of them.

### Shorter version, if you would rather stay strict

```
Most people who tried AI for their CV got back something that invented skills they don't have.

I tested a prompt 100 times to make sure it can't. 313 chances to lie, zero taken.

https://ai.nazsats.com/lessons/tailor-your-cv-to-the-job
```

---

## LinkedIn post

No link in the body — LinkedIn suppresses reach on posts with outbound links.
**Put the link in the first comment**, immediately after posting.

Tuesday–Thursday, 8–10am IST.

```
Your CV probably isn't the problem. It never reached a human.

Most companies screen applications with software first. It compares your CV to the job description, scores the overlap, and sorts everyone. A recruiter opens the top of the pile.

That software is not clever.

If the job asks for "client relationship management" and your CV says "handled customer complaints", that is the same job — and it may score you as though you have never done it.

So the obvious move is to stuff your CV with their keywords. Don't. You then have to survive the interview, and being found out is worse than a rejection.

The real fix is boring: re-word what is already true, using their vocabulary.

That takes an hour per job by hand, which is why almost nobody does it. AI does it in two minutes — but every chatbot I tried would cheerfully add Kubernetes, AWS and three years I never worked.

So I wrote a prompt with rules against that, and then actually tested it.

10 CVs. 10 job descriptions. Every combination — 100 runs. Not ten variations on a software engineer: a nurse, an accountant, a schoolteacher, a designer, a support lead, a marketer, a final-year student.

Most pairings were deliberately terrible matches, because that is where lying helps most.

Across those 100 runs there were 313 moments where a job wanted something the CV could not evidence — 313 chances to invent a qualification and raise the score.

It took none of them.

It also refused to flatter. The nurse applying for a machine-learning role scored 0 out of 100: "probably not — this is a completely different field."

That refusal is the point. A tool that tells 40 people they are perfect for 40 jobs just wastes 40 applications.

Three bugs came out of the testing, and the second one is the one I would never have caught by eye:

1. It guessed how long "June 2024 – present" had been and understated someone's experience by a year. An understatement still looks honest, so nobody catches it.

2. It promoted "assessment" from a skills list into "developed and implemented assessments" — work the person never claimed.

3. It deleted "class average rose from 62 to 78 percent" to make room for a keyword. A CV that trades a real result for a matching word has been made weaker.

The prompt is free. Link in the comments.

What I keep coming back to: AI did not make tailoring a CV possible. It made the careful version take as long as the careless one.

Have you actually tailored a CV per application, or sent the same one out and hoped?
```

**First comment:**

```
Full write-up, the prompt, and all 100 test outputs:
https://ai.nazsats.com/lessons/tailor-your-cv-to-the-job
```

---

## The image

`promo/cv-tailor-square.png` — 1080×1080, for WhatsApp and as the LinkedIn
carousel cover.

Regenerate with:

```bash
node scripts/promo-image.mjs
```

Edit `scripts/promo-image.mjs` to change the wording. It renders the same warm
paper and orange as the site, so a forwarded image still looks like it came from
you.
