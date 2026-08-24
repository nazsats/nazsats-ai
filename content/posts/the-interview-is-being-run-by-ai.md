---
title: "The interview is being run by AI now. Here is what it is actually scoring."
summary: "It is not counting keywords, and stuffing them in counts against you. What it does score, why STAR matters more than it used to, and the prompt I use to practise. Plus what to do when their software breaks mid-interview — it happened to me."
date: "2026-08-24"
topic: "Career"
audience: ["students", "freelancers"]
---

A few weeks ago I sat an interview where the interviewer was software.

Partway through, the audio broke. Questions repeated. I could not tell whether
the thing had heard my answers at all, or whether I had just failed an interview
because of a bug in somebody's API.

I will come back to what I did about that, because it is the most useful part of
this post and nobody tells you it is allowed.

First, the thing almost everyone has wrong about how these are scored.

---

## Part 1 — It is not counting keywords

The common belief is that an AI interviewer takes your answer, matches it
against a list of words from the job ad, and ranks you by how many you hit. I
believed a version of this myself.

It is not what happens, and acting as though it is will cost you the job.

What these systems actually do is score your answer against a **rubric** — a
list of the competencies the role needs, with descriptions of what a weak,
adequate and strong answer looks like for each one. A human has signed off on
that rubric before you ever spoke.

[HireVue](https://www.forbes.com/sites/quickerbettertech/2026/02/04/how-hirevue-uses-ai-to-help-employers-evaluate-the-skills-of-a-potential-candidate/)
scores on the content of what you said, tied to job competencies, and launched a
two-way voice interviewer in June 2026. micro1's system,
[Zara](https://www.micro1.ai/research/zara-an-llm-based-candidate-interview-feedback-system),
runs an interview that branches depending on your answers and produces a
structured skills report at the end.

Branching on your answers is the part that gives it away. Something that counted
words could not decide what to ask you next.

<svg viewBox="0 0 640 210" role="img" aria-label="Your spoken answer is scored against a rubric of job competencies signed off by a human, producing a score per competency, rather than being matched against a keyword list." style="max-width:100%;height:auto">
  <rect x="6" y="74" width="132" height="58" rx="8" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="72" y="99" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">What you said</text>
  <text x="72" y="118" text-anchor="middle" font-size="10" fill="#7C7873">out loud, in order</text>

  <path d="M144 103 H186" stroke="#ADA8A2" stroke-width="2" fill="none" marker-end="url(#iv)"/>

  <rect x="192" y="56" width="164" height="94" rx="8" fill="#FFF3EC" stroke="#C2410C" stroke-width="2"/>
  <text x="274" y="82" text-anchor="middle" font-size="13" font-weight="700" fill="#9A3412">A rubric</text>
  <text x="274" y="102" text-anchor="middle" font-size="10" fill="#57534E">the competencies the job</text>
  <text x="274" y="118" text-anchor="middle" font-size="10" fill="#57534E">needs, and what a weak</text>
  <text x="274" y="134" text-anchor="middle" font-size="10" fill="#57534E">or strong answer looks like</text>

  <path d="M362 103 H404" stroke="#ADA8A2" stroke-width="2" fill="none" marker-end="url(#iv)"/>

  <rect x="410" y="56" width="224" height="44" rx="8" fill="#F1EFEC" stroke="#DAD6D1" stroke-width="2"/>
  <text x="430" y="83" font-size="12" fill="#1A1815">A score for each competency</text>

  <rect x="410" y="108" width="224" height="44" rx="8" fill="#F1EFEC" stroke="#DAD6D1" stroke-width="2"/>
  <text x="430" y="128" font-size="12" fill="#1A1815">Not a count of matched words</text>
  <text x="430" y="144" font-size="10" fill="#7C7873">a human signed off the rubric first</text>

  <defs>
    <marker id="iv" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill="#ADA8A2"/>
    </marker>
  </defs>
</svg>

---

## Part 2 — So stuffing keywords makes it worse

If you go in having decided the machine wants words, you will produce an answer
packed with terms from the job ad and thin on anything you actually did.

That is exactly what a rubric marks down. It is looking for evidence — a
situation, what you did, what happened. A sentence full of the right nouns and
no story in it scores badly, and
[the stuffing itself is detected](https://www.wahresume.com/blog/answer-2026-ai-interview-questions-without-sounding-scripted).

The related mistake is reading a prepared answer off a second screen. It is
obvious. Perfect grammar, no pauses, no follow-up — people have been failed for
exactly this.

**The true version is narrower, and it is worth getting right:**

- **Say the specific word when it is honestly yours.** If the job names a
  system, a method or a qualification and you have actually used it, say its
  real name — "I ran the Tally reconciliation every month", not "I handled
  finance software". That is vocabulary, not stuffing. The difference is whether
  it is true.
- **Say it in STAR order** — Situation, Task, Action, Result. Not because it is
  a nice format, but because a rubric is looking for those parts, and if you
  bury the result nobody scores it.
- **Keep each answer to about 100 to 200 words.** Long answers dilute the thing
  you were actually being marked on.
- **Name things instead of gesturing at them.** No "as you can see in my CV". It
  cannot glance at your CV the way a person does. Say what the thing was: "at my
  last job I ran the monthly stock count".

---

## Part 3 — The prompt, and how I tested it

The prompt takes your CV and the job description and gives you back ten
questions, each traced to the exact line that would prompt it, drafted answers
for the three hardest, and a plain list of what you cannot answer.

The rule it is built around is the same one as
[the CV prompt](/prompts/cv-tailor): **it may not put words in your mouth.**
Every project, number and tool in a drafted answer has to already be on your CV.
Where the experience genuinely is not there, the answer says so — what is
nearest, what you would need to learn — instead of writing you a clever dodge.

That matters more here than on a CV. A CV exaggeration gets you into a room. An
interview exaggeration gets found out in the follow-up question, and the
follow-up always comes.

### How I tested it

Ten made-up candidates, each paired with a job that asks for something they do
not have. A nurse against a developer job. A designer against a backend job. A
junior against a senior job. For each pair I know exactly which words the job
wants and the CV cannot support, so I can search the drafted answers for them.

Any hit is the prompt putting words in someone's mouth.

| What I checked | Result |
|---|---|
| Cases where an answer claimed something the CV never said | **0 of 10** |
| Cases that produced the full set of questions | 10 of 10 |
| Cases that used STAR structure | 10 of 10 |
| Cases that listed what the candidate cannot answer | 10 of 10 |

### The part I would rather not write

The first run said 8 out of 10 were lying.

They were not. My checking code was broken — in seven separate ways. It could
not recognise "haven't" when the apostrophe was a curly one. It did not know the
word "didn't". It was reading the interviewer's questions as though they were
the candidate's answers. And in the worst case, a single character in my code
had been written wrongly, so the check was looking for an invisible control
character that never appears in real text and could never match anything.

I only found this because I read the actual answers instead of believing my own
score.

So the harness now tests itself before it tests anything else. It is given three
sentences that really are lies and four that really are honest, and it refuses
to run if it gets any of them wrong. Otherwise every time I loosened the check
to remove a false alarm, I would have been quietly teaching it to agree with me.

### And one real problem it did find

Once the checking worked, there was a genuine failure, and it was not the one I
expected.

The prompt was not claiming skills. It was **inventing preparation**:

> "I've read about Kubernetes and followed tutorials to understand the basics."
>
> "I have read the documentation, followed online courses, and experimented with
> it in personal projects."

Nothing on the CV said any of that. It sounds humble, which is exactly why it
slipped past — it is not boasting, so it does not feel like a lie. But it is
still a claim about something you did, and the next question is "which
tutorials?"

Adding one rule — do not invent courses, tutorials, reading or side projects
either — took it from 4 failures to 0.

### What this means for you

Nothing, except that you can use it without checking every sentence against your
own CV. Which is the entire point of testing it.

One honest limit: this was tested on ten invented candidates, not on yours. It
can still write a clumsy sentence. It should not write a false one.

---

## Part 4 — Using it

Two things go in. Three things come out.

<svg viewBox="0 0 640 300" role="img" aria-label="Your CV and the job advert go into the prompt. Out comes ten likely questions, drafted answers for the three hardest, and a list of what you cannot answer." style="max-width:100%;height:auto">
  <rect x="6" y="46" width="150" height="48" rx="8" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="81" y="68" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">Your CV</text>
  <text x="81" y="85" text-anchor="middle" font-size="10" fill="#7C7873">the real one, unedited</text>

  <rect x="6" y="108" width="150" height="48" rx="8" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="81" y="130" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">The job advert</text>
  <text x="81" y="147" text-anchor="middle" font-size="10" fill="#7C7873">copy it before it is taken down</text>

  <path d="M162 70 H196 V125" stroke="#ADA8A2" stroke-width="2" fill="none"/>
  <path d="M162 132 H196" stroke="#ADA8A2" stroke-width="2" fill="none"/>
  <path d="M196 128 H228" stroke="#ADA8A2" stroke-width="2" fill="none" marker-end="url(#ip)"/>

  <rect x="234" y="100" width="128" height="58" rx="8" fill="#FFF3EC" stroke="#C2410C" stroke-width="2"/>
  <text x="298" y="126" text-anchor="middle" font-size="13" font-weight="700" fill="#9A3412">The prompt</text>
  <text x="298" y="144" text-anchor="middle" font-size="10" fill="#57534E">paste both in, once</text>

  <path d="M368 128 H400 V56 H418" stroke="#ADA8A2" stroke-width="2" fill="none" marker-end="url(#ip)"/>
  <path d="M400 128 H418" stroke="#ADA8A2" stroke-width="2" fill="none" marker-end="url(#ip)"/>
  <path d="M400 128 V202 H418" stroke="#ADA8A2" stroke-width="2" fill="none" marker-end="url(#ip)"/>

  <rect x="424" y="32" width="210" height="48" rx="8" fill="#F1EFEC" stroke="#DAD6D1" stroke-width="2"/>
  <text x="442" y="54" font-size="12" font-weight="700" fill="#1A1815">10 questions</text>
  <text x="442" y="71" font-size="10" fill="#57534E">each quoting the line that caused it</text>

  <rect x="424" y="104" width="210" height="48" rx="8" fill="#F1EFEC" stroke="#DAD6D1" stroke-width="2"/>
  <text x="442" y="126" font-size="12" font-weight="700" fill="#1A1815">3 answers, in STAR order</text>
  <text x="442" y="143" font-size="10" fill="#57534E">for the ones most likely to sink you</text>

  <rect x="424" y="178" width="210" height="48" rx="8" fill="#FFF3EC" stroke="#C2410C" stroke-width="2"/>
  <text x="442" y="200" font-size="12" font-weight="700" fill="#9A3412">What you cannot answer</text>
  <text x="442" y="217" font-size="10" fill="#57534E">the most useful part. read it twice</text>

  <text x="320" y="268" text-anchor="middle" font-size="11" fill="#7C7873">Nothing in the answers is allowed to come from outside your CV</text>

  <defs>
    <marker id="ip" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill="#ADA8A2"/>
    </marker>
  </defs>
</svg>

### Do this

1. **Copy the job advert now**, before you apply. Postings disappear the moment
   the role is filled, and you cannot prepare against something you can no
   longer read.
2. **Open [the prompt](/prompts/interview-practice)**, copy the whole thing into
   ChatGPT or Claude, and paste your CV and the advert into the two marked
   places.
3. **Read the last section first** — the list of things you cannot answer. That
   is where the interview will actually hurt.
4. **Say the three answers out loud.** Not read. Said. If you cannot say it
   without the screen, you do not know it yet.

### What to ignore

If an answer sounds like a document, throw the wording away and keep the shape.
The order matters — what the situation was, what you did, what happened — not
the sentences. An interviewer can hear the difference between someone
remembering and someone reciting, and so, it turns out, can the software.

---

## Part 5 — When their software breaks

Back to my interview.

The audio glitched. Questions repeated. I had no idea whether it had heard me.

So after it ended I emailed the recruiter and told them plainly what had gone
wrong — that their system had an API fault, what I had seen, and when.

They replied and apologised. It was their mistake. I sat the interview again,
and the second time it heard everything I said and responded to it properly.

**Most people would not have sent that email.** They would have assumed the
software was fine and they had failed, and they would have moved on.

If the audio drops, a question repeats, the timer behaves oddly, or the thing
plainly does not respond to what you said — write to the recruiter afterwards.
Factual, no complaint, just what happened and a request to sit it again. It is
their system failing, not you.

And notice what reporting it actually demonstrated: I found a fault in a live
system, described it clearly to a non-technical person, and asked for the right
outcome. That is a decent chunk of what an employer is trying to find out
anyway.

---

## The wider point

You are not being asked to outsmart the machine. You are being asked to be
specific.

Everything above reduces to the same instruction: say what you actually did, in
order, using the real names of the real things, and do not claim work you have
not done. That answer scores well with software, and it scores well with the
person who reads the transcript afterwards.

Which is the honest reason to prepare properly rather than look for a trick. The
trick would stop working the month they change the rubric. Being specific
about your own work does not expire.
