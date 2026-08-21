---
title: "I tested one CV prompt 100 times so you don't have to"
summary: "Ten CVs, ten job descriptions, every combination. It had 313 chances to invent a skill and took none. Upload your CV, keep your design, and see what you are actually missing."
date: "2026-08-22"
topic: "Career"
audience: ["students", "freelancers"]
---

You send the same CV to forty jobs and hear nothing back. It is easy to decide
the market is brutal, or that you are not good enough.

Usually neither is true. Usually software threw it away before a person saw it.

This is a long one, because I want to show you the testing rather than ask you
to trust me. If you only want the prompt, it is
[here](/prompts/cv-tailor). If you want to know why you should use it, read on.

---

## Part 1 — What is actually happening to your CV

Most companies now run applications through an ATS: applicant tracking software.
It reads your CV, compares it to the job description, scores the overlap, and
sorts everyone. A recruiter opens the top of the pile and rarely reaches the
bottom.

<svg viewBox="0 0 640 210" role="img" aria-label="Your CV goes into scanning software, which scores it and sorts it into a pile. Recruiters only read the top." style="max-width:100%;height:auto">
  <rect x="8" y="70" width="104" height="66" rx="8" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="60" y="97" text-anchor="middle" font-size="14" font-weight="700" fill="#1A1815">Your CV</text>
  <text x="60" y="116" text-anchor="middle" font-size="11" fill="#7C7873">one file</text>
  <path d="M118 103 H172" stroke="#ADA8A2" stroke-width="2"/>
  <path d="M166 98 l7 5 -7 5" fill="#ADA8A2"/>
  <rect x="178" y="58" width="128" height="90" rx="8" fill="#F1EFEC" stroke="#C2410C" stroke-width="2"/>
  <text x="242" y="88" text-anchor="middle" font-size="14" font-weight="700" fill="#1A1815">Scanning</text>
  <text x="242" y="106" text-anchor="middle" font-size="14" font-weight="700" fill="#1A1815">software</text>
  <text x="242" y="127" text-anchor="middle" font-size="11" fill="#7C7873">matches words</text>
  <path d="M312 103 H366" stroke="#ADA8A2" stroke-width="2"/>
  <path d="M360 98 l7 5 -7 5" fill="#ADA8A2"/>
  <rect x="372" y="24" width="150" height="30" rx="5" fill="#C2410C"/>
  <text x="447" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">read by a human</text>
  <rect x="372" y="60" width="150" height="26" rx="5" fill="#E6E3DF"/>
  <rect x="372" y="92" width="150" height="26" rx="5" fill="#E6E3DF"/>
  <rect x="372" y="124" width="150" height="26" rx="5" fill="#E6E3DF"/>
  <rect x="372" y="156" width="150" height="26" rx="5" fill="#E6E3DF"/>
  <text x="447" y="199" text-anchor="middle" font-size="11" fill="#7C7873">never opened</text>
  <text x="540" y="44" font-size="11" fill="#C2410C" font-weight="700">← you want</text>
  <text x="540" y="60" font-size="11" fill="#C2410C" font-weight="700">   to be here</text>
</svg>

The software is not clever. If the job asks for *"client relationship
management"* and your CV says *"handled customer complaints"*, that is the same
job — and it may score you as though you have never done it.

So one CV sent everywhere is quietly optimised for nothing in particular.

---

## Part 2 — The two ways people get this wrong

<svg viewBox="0 0 640 220" role="img" aria-label="Three approaches: same CV everywhere gets ignored, keyword stuffing gets you caught, honest tailoring works." style="max-width:100%;height:auto">
  <rect x="8" y="14" width="196" height="188" rx="10" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="106" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">Same CV, 40 jobs</text>
  <text x="106" y="76" text-anchor="middle" font-size="34">😐</text>
  <text x="106" y="110" text-anchor="middle" font-size="11" fill="#57534E">Matches nothing</text>
  <text x="106" y="128" text-anchor="middle" font-size="11" fill="#57534E">in particular.</text>
  <text x="106" y="158" text-anchor="middle" font-size="12" font-weight="700" fill="#7C7873">Result: silence</text>
  <text x="106" y="182" text-anchor="middle" font-size="11" fill="#7C7873">Most people</text>
  <rect x="222" y="14" width="196" height="188" rx="10" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="320" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">Stuff every keyword</text>
  <text x="320" y="76" text-anchor="middle" font-size="34">😬</text>
  <text x="320" y="110" text-anchor="middle" font-size="11" fill="#57534E">Claims skills you</text>
  <text x="320" y="128" text-anchor="middle" font-size="11" fill="#57534E">do not have.</text>
  <text x="320" y="158" text-anchor="middle" font-size="12" font-weight="700" fill="#7C7873">Result: caught</text>
  <text x="320" y="182" text-anchor="middle" font-size="11" fill="#7C7873">in the interview</text>
  <rect x="436" y="14" width="196" height="188" rx="10" fill="#F1EFEC" stroke="#C2410C" stroke-width="2.5"/>
  <text x="534" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">Re-word what is true</text>
  <text x="534" y="76" text-anchor="middle" font-size="34">🙂</text>
  <text x="534" y="110" text-anchor="middle" font-size="11" fill="#57534E">Same experience,</text>
  <text x="534" y="128" text-anchor="middle" font-size="11" fill="#57534E">their vocabulary.</text>
  <text x="534" y="158" text-anchor="middle" font-size="12" font-weight="700" fill="#C2410C">Result: read</text>
  <text x="534" y="182" text-anchor="middle" font-size="11" fill="#7C7873">and survivable</text>
</svg>

The middle one is the trap. Ask any chatbot to "make my CV match this job" and
it will cheerfully add Kubernetes, AWS and three years you never worked.

That feels like winning until you are sitting in the interview being asked about
Kubernetes. **A CV that gets you into a room you cannot survive is worse than no
interview at all** — the rejection at least costs you nothing.

So the prompt has to do something harder than "make it match." It has to make it
match *without adding anything*.

---

## Part 3 — How I tested it

Anyone can write a prompt and call it accurate. I wanted to know what it does
when lying would help.

So I built ten fictional CVs and ten real-shaped job descriptions, and ran
**every combination** — 100 in total.

<svg viewBox="0 0 640 250" role="img" aria-label="Ten CVs across, ten job descriptions down, every combination tested. Six are good matches, the rest are deliberately poor." style="max-width:100%;height:auto">
  <text x="16" y="22" font-size="12" font-weight="700" fill="#1A1815">10 job descriptions →</text>
  <text x="16" y="240" font-size="12" font-weight="700" fill="#1A1815">↓ 10 CVs = 100 tests</text>
  <g>
    <!-- grid: diagonal is the intended match -->
    <g fill="#E6E3DF">
      <rect x="150" y="32" width="17" height="17" rx="2"/><rect x="171" y="32" width="17" height="17" rx="2"/><rect x="192" y="32" width="17" height="17" rx="2"/><rect x="213" y="32" width="17" height="17" rx="2"/><rect x="234" y="32" width="17" height="17" rx="2"/><rect x="255" y="32" width="17" height="17" rx="2"/><rect x="276" y="32" width="17" height="17" rx="2"/><rect x="297" y="32" width="17" height="17" rx="2"/><rect x="318" y="32" width="17" height="17" rx="2"/>
      <rect x="150" y="53" width="17" height="17" rx="2"/><rect x="192" y="53" width="17" height="17" rx="2"/><rect x="213" y="53" width="17" height="17" rx="2"/><rect x="234" y="53" width="17" height="17" rx="2"/><rect x="255" y="53" width="17" height="17" rx="2"/><rect x="276" y="53" width="17" height="17" rx="2"/><rect x="297" y="53" width="17" height="17" rx="2"/><rect x="318" y="53" width="17" height="17" rx="2"/><rect x="339" y="53" width="17" height="17" rx="2"/>
      <rect x="150" y="74" width="17" height="17" rx="2"/><rect x="171" y="74" width="17" height="17" rx="2"/><rect x="213" y="74" width="17" height="17" rx="2"/><rect x="234" y="74" width="17" height="17" rx="2"/><rect x="255" y="74" width="17" height="17" rx="2"/><rect x="276" y="74" width="17" height="17" rx="2"/><rect x="297" y="74" width="17" height="17" rx="2"/><rect x="318" y="74" width="17" height="17" rx="2"/><rect x="339" y="74" width="17" height="17" rx="2"/>
      <rect x="150" y="95" width="17" height="17" rx="2"/><rect x="171" y="95" width="17" height="17" rx="2"/><rect x="192" y="95" width="17" height="17" rx="2"/><rect x="234" y="95" width="17" height="17" rx="2"/><rect x="255" y="95" width="17" height="17" rx="2"/><rect x="276" y="95" width="17" height="17" rx="2"/><rect x="297" y="95" width="17" height="17" rx="2"/><rect x="318" y="95" width="17" height="17" rx="2"/><rect x="339" y="95" width="17" height="17" rx="2"/>
      <rect x="150" y="116" width="17" height="17" rx="2"/><rect x="171" y="116" width="17" height="17" rx="2"/><rect x="192" y="116" width="17" height="17" rx="2"/><rect x="213" y="116" width="17" height="17" rx="2"/><rect x="255" y="116" width="17" height="17" rx="2"/><rect x="276" y="116" width="17" height="17" rx="2"/><rect x="297" y="116" width="17" height="17" rx="2"/><rect x="318" y="116" width="17" height="17" rx="2"/><rect x="339" y="116" width="17" height="17" rx="2"/>
      <rect x="150" y="137" width="17" height="17" rx="2"/><rect x="171" y="137" width="17" height="17" rx="2"/><rect x="192" y="137" width="17" height="17" rx="2"/><rect x="213" y="137" width="17" height="17" rx="2"/><rect x="234" y="137" width="17" height="17" rx="2"/><rect x="276" y="137" width="17" height="17" rx="2"/><rect x="297" y="137" width="17" height="17" rx="2"/><rect x="318" y="137" width="17" height="17" rx="2"/><rect x="339" y="137" width="17" height="17" rx="2"/>
      <rect x="150" y="158" width="17" height="17" rx="2"/><rect x="171" y="158" width="17" height="17" rx="2"/><rect x="192" y="158" width="17" height="17" rx="2"/><rect x="213" y="158" width="17" height="17" rx="2"/><rect x="234" y="158" width="17" height="17" rx="2"/><rect x="255" y="158" width="17" height="17" rx="2"/><rect x="318" y="158" width="17" height="17" rx="2"/><rect x="339" y="158" width="17" height="17" rx="2"/>
      <rect x="150" y="179" width="17" height="17" rx="2"/><rect x="171" y="179" width="17" height="17" rx="2"/><rect x="192" y="179" width="17" height="17" rx="2"/><rect x="213" y="179" width="17" height="17" rx="2"/><rect x="234" y="179" width="17" height="17" rx="2"/><rect x="255" y="179" width="17" height="17" rx="2"/><rect x="276" y="179" width="17" height="17" rx="2"/><rect x="339" y="179" width="17" height="17" rx="2"/>
    </g>
    <g fill="#C2410C">
      <rect x="171" y="53" width="17" height="17" rx="2"/>
      <rect x="192" y="74" width="17" height="17" rx="2"/>
      <rect x="213" y="95" width="17" height="17" rx="2"/>
      <rect x="234" y="116" width="17" height="17" rx="2"/>
      <rect x="255" y="137" width="17" height="17" rx="2"/>
      <rect x="276" y="158" width="17" height="17" rx="2"/>
      <rect x="297" y="179" width="17" height="17" rx="2"/>
    </g>
  </g>
  <rect x="392" y="40" width="15" height="15" rx="2" fill="#C2410C"/>
  <text x="416" y="52" font-size="12" fill="#1A1815">a genuine match</text>
  <rect x="392" y="66" width="15" height="15" rx="2" fill="#E6E3DF"/>
  <text x="416" y="78" font-size="12" fill="#1A1815">a deliberate mismatch —</text>
  <text x="416" y="94" font-size="12" fill="#1A1815">where lying would help</text>
  <text x="392" y="132" font-size="12" fill="#57534E">a nurse against a</text>
  <text x="392" y="148" font-size="12" fill="#57534E">machine-learning job,</text>
  <text x="392" y="164" font-size="12" fill="#57534E">an accountant against</text>
  <text x="392" y="180" font-size="12" fill="#57534E">a frontend role...</text>
</svg>

The CVs were not ten variations on a software engineer. They were a nurse, an
accountant, a schoolteacher, a designer, a support lead, a marketer, a
final-year student, a data analyst and two developers — because this is written
for people in ordinary jobs, not only for tech.

Most of the 100 pairings are terrible matches. That is the point. **A prompt
that behaves on an easy match tells you nothing.**

### What the check looked for

Not "was the CV good." Something you can actually measure: **did it claim
anything the person cannot back up?**

For each pairing I listed the hard requirements of the job, removed any the CV
genuinely evidenced, and searched the rewritten CV for what was left. Anything
found is a lie.

Across 100 pairings there were **313 opportunities to fabricate** — 313 moments
where a requirement was missing and inventing it would have raised the score.

### The results

<svg viewBox="0 0 640 200" role="img" aria-label="Results: 100 of 100 produced a score and a gap list. Zero fabrications out of 313 opportunities." style="max-width:100%;height:auto">
  <rect x="8" y="16" width="196" height="80" rx="10" fill="#F1EFEC" stroke="#DAD6D1" stroke-width="2"/>
  <text x="106" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="#1A1815">100/100</text>
  <text x="106" y="78" text-anchor="middle" font-size="12" fill="#57534E">gave an honest score</text>
  <rect x="222" y="16" width="196" height="80" rx="10" fill="#F1EFEC" stroke="#DAD6D1" stroke-width="2"/>
  <text x="320" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="#1A1815">100/100</text>
  <text x="320" y="78" text-anchor="middle" font-size="12" fill="#57534E">listed what was missing</text>
  <rect x="436" y="16" width="196" height="80" rx="10" fill="#C2410C"/>
  <text x="534" y="56" text-anchor="middle" font-size="30" font-weight="800" fill="#FFFFFF">0</text>
  <text x="534" y="78" text-anchor="middle" font-size="12" fill="#FFFFFF">skills invented</text>
  <text x="16" y="130" font-size="13" font-weight="700" fill="#1A1815">Chances it had to lie, and took:</text>
  <rect x="16" y="142" width="600" height="26" rx="5" fill="#E6E3DF"/>
  <rect x="16" y="142" width="0" height="26" rx="5" fill="#C2410C"/>
  <text x="24" y="160" font-size="12" font-weight="700" fill="#57534E">0 of 313</text>
  <text x="16" y="190" font-size="11" fill="#7C7873">The bar is empty, and that is the whole result. Anything filling it would be a skill you would then have to defend in an interview.</text>
</svg>

**Zero.** Across every one of those 313 chances, it added nothing the CV did not
already support.

And the scores tracked reality. The seven pairings I built to be genuine matches
came out as the seven highest scores — the senior engineer against the senior
engineering job scored 95, the accountant against the accounting job 90. The
nurse applying for a machine-learning role scored **0/100**, with *"probably not
— this is a completely different field."*

That refusal is the feature. A tool that tells forty people they are a great fit
for forty jobs is a tool that wastes forty applications.

---

## Part 4 — The three bugs the testing found

Each of these was invisible from reading one output. Each became a rule.

**It guessed how long I had worked somewhere.** It read *"June 2024 – present"*,
assumed a date, and wrote *1.5 years* for someone with over two. Not
exaggeration — the opposite, which is worse, because an understatement still
looks honest and nobody catches it. It now refuses to calculate durations.

**It turned a skill into an achievement.** A teacher listed "assessment" as a
one-word skill. The rewrite promoted that into an experience bullet reading
*"Developed and implemented assessments"* — work she had never claimed to do.
Listing a skill means you have it. It does not mean you did a specific project
with it.

**It threw away a number to make room for a keyword.** The same bullet replaced
*"Teach grades 11 and 12; class average rose from 62 to 78 percent"* with the
assessments line, losing her only measurable result. A CV that trades a real
outcome for a matching keyword has been made weaker, not more targeted.

After those three rules, the same case now produces *"Taught physics to grades
11 and 12; improved class average from 62 to 78 percent"* — the same work, in
clearer words, with the number intact.

Which is the honest summary of this whole exercise: **the prompt is accurate
because it was tested and corrected three times**, not because it was written
carefully the first time.

---

## Part 5 — Using it

**Upload your CV file. Do not retype it.**

<svg viewBox="0 0 640 132" role="img" aria-label="Four steps: upload your CV file, paste the prompt and the job description, read the score, then copy the marked changes into your own document." style="max-width:100%;height:auto">
  <circle cx="60" cy="42" r="21" fill="#C2410C"/>
  <text x="60" y="49" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">1</text>
  <text x="60" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1815">Upload your CV</text>
  <text x="60" y="103" text-anchor="middle" font-size="11" fill="#7C7873">the actual file</text>
  <path d="M92 42 H140" stroke="#ADA8A2" stroke-width="2"/><path d="M134 37 l7 5 -7 5" fill="#ADA8A2"/>
  <circle cx="172" cy="42" r="21" fill="#C2410C"/>
  <text x="172" y="49" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">2</text>
  <text x="172" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1815">Paste the prompt</text>
  <text x="172" y="103" text-anchor="middle" font-size="11" fill="#7C7873">then the job ad</text>
  <path d="M204 42 H252" stroke="#ADA8A2" stroke-width="2"/><path d="M246 37 l7 5 -7 5" fill="#ADA8A2"/>
  <circle cx="284" cy="42" r="21" fill="#C2410C"/>
  <text x="284" y="49" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">3</text>
  <text x="284" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1815">Read the score</text>
  <text x="284" y="103" text-anchor="middle" font-size="11" fill="#7C7873">worth an hour?</text>
  <path d="M316 42 H364" stroke="#ADA8A2" stroke-width="2"/><path d="M358 37 l7 5 -7 5" fill="#ADA8A2"/>
  <circle cx="396" cy="42" r="21" fill="#C2410C"/>
  <text x="396" y="49" text-anchor="middle" font-size="17" font-weight="800" fill="#FFFFFF">4</text>
  <text x="396" y="86" text-anchor="middle" font-size="12" font-weight="700" fill="#1A1815">Copy the changes</text>
  <text x="396" y="103" text-anchor="middle" font-size="11" fill="#7C7873">into your own file</text>
  <rect x="446" y="20" width="186" height="44" rx="8" fill="#F1EFEC" stroke="#C2410C" stroke-width="2"/>
  <text x="539" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">A few minutes</text>
  <text x="539" y="57" text-anchor="middle" font-size="11" fill="#7C7873">per job, after the first</text>
</svg>

It works in ChatGPT, Claude or Gemini. The free version of any of them is fine.

> **[Get the prompt](/prompts/cv-tailor)**

### Why it does not hand you back a PDF

This is the question everyone asks, so here is the straight answer.

You can ask ChatGPT to generate a PDF, and it will produce one. But it does not
edit your file — it builds a **new** document from scratch, with its own fonts,
its own spacing, and its own idea of a layout. Your design is gone. If your CV
has a photo, the photo is gone too. Claude and Gemini cannot make you a PDF in
chat at all.

So a prompt that promised "same design, keeps your photo, returns a PDF" would
fail at exactly the thing you care about most.

<svg viewBox="0 0 640 190" role="img" aria-label="Letting AI rebuild the PDF loses your design and photo. Copying marked changes into your own file keeps everything." style="max-width:100%;height:auto">
  <rect x="8" y="12" width="300" height="166" rx="10" fill="#FDFCFB" stroke="#DAD6D1" stroke-width="2"/>
  <text x="158" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">Ask AI to make the PDF</text>
  <text x="30" y="72" font-size="12" fill="#57534E">✕  your fonts and spacing</text>
  <text x="30" y="96" font-size="12" fill="#57534E">✕  your photo</text>
  <text x="30" y="120" font-size="12" fill="#57534E">✕  your columns and layout</text>
  <text x="30" y="144" font-size="12" fill="#57534E">✓  the words</text>
  <text x="158" y="168" text-anchor="middle" font-size="11" font-weight="700" fill="#7C7873">a stranger&apos;s CV with your name</text>
  <rect x="332" y="12" width="300" height="166" rx="10" fill="#F1EFEC" stroke="#C2410C" stroke-width="2.5"/>
  <text x="482" y="40" text-anchor="middle" font-size="13" font-weight="700" fill="#1A1815">Paste changes into your file</text>
  <text x="354" y="72" font-size="12" fill="#57534E">✓  your fonts and spacing</text>
  <text x="354" y="96" font-size="12" fill="#57534E">✓  your photo</text>
  <text x="354" y="120" font-size="12" fill="#57534E">✓  your columns and layout</text>
  <text x="354" y="144" font-size="12" fill="#57534E">✓  the words</text>
  <text x="482" y="168" text-anchor="middle" font-size="11" font-weight="700" fill="#C2410C">your CV, aimed at this job</text>
</svg>

So the prompt does the opposite. It reads your uploaded CV, keeps your sections
in your order, and hands back the text **marked line by line**:

```
EXPERIENCE

Physics Teacher, St Thomas HSS — 2018 to present
  [same]    Mentored 4 new teachers
  [changed] Taught physics to grades 11 and 12; improved class
            average from 62 to 78 percent
            (was: "Teach grades 11 and 12; class average rose
             from 62 to 78 percent")
```

You open your own CV, change the handful of lines marked `[changed]`, and save.
Two minutes. **Your design never leaves your computer**, because the AI never
touched it.

### It also tells you how to make your CV easier to read

At the end it looks at how your CV is built and suggests things — single column
instead of two, standard section headings, dates in one format, no text hidden
in headers.

**It suggests. It does not change them.** Those are decisions about your
document, and it should not be quietly restructuring your CV while you think it
is only swapping words.

### What the score means

- **70+** — apply, and tailor properly
- **50–69** — apply if you want it, and be ready to explain the gap
- **Under 50** — usually not worth it. Better spent on three jobs you fit

Most people find their first honest score lower than expected. That is not the
tool being harsh. That is the information you were missing while you sent forty
applications and heard nothing.

## The wider point

Everybody says AI makes you faster. Used carelessly it mostly makes you faster
at producing things nobody wants — forty generic CVs instead of one.

The gain is not speed. It is that **you can now do the careful version of a task
in the time the careless version used to take.** Tailoring a CV properly was
always the right thing to do. It just took an hour per job, so nobody did it.

That is the whole idea, and it has nothing to do with CVs specifically.

---

**Try it on one job today.** Not ten. The one you actually want — and see what
it tells you is missing.
