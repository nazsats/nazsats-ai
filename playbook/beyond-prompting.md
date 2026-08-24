# Beyond prompting: tools, connectors, and workflows

The three lessons so far all teach the same shape — here is a prompt, paste it
somewhere, get a better answer. That is worth teaching, and it is also a
ceiling. A prompt improves one task. A workflow improves every instance of that
task, forever.

This is the plan for the next layer, and the reason it is defensible.

---

## The honest competitive position

**Do not teach Canva.** Thousands of people already do, most of them better, and
a Canva tutorial from an AI engineer is a tutorial with no reason to exist.

What almost nobody is teaching non-technical people:

> **How to connect the tools they already use, so the AI can act on their real
> work instead of guessing about it.**

That gap exists because it sits between two groups. Designers and marketers
teach the tools. Engineers teach the protocols. Almost nobody explains
connectors to a shop owner in language they can follow — and that is exactly the
seat we are in.

It is also the honest meaning of "with AI": not *ask AI about your work*, but
*let AI reach your work*.

---

## The three tiers

Ordered by what a reader can do today, not by what is most impressive.

### Tier 1 — AI inside the tool they already use

No setup, no accounts, nothing to connect. The point of this tier is that most
people do not realise the AI is already there.

- Canva's own AI: background removal, resize for six platforms at once, magic
  write for captions
- Google Sheets and Docs with AI formulas
- Uploading a file to ChatGPT or Claude rather than pasting text
- Custom instructions / Projects — teaching the tool your context once instead
  of re-explaining every session

**Audience:** everyone. **Format:** short screen recording, two to four minutes.

### Tier 2 — Making the AI reach real work

The tier where it stops being a chat box.

- Claude Projects or a custom GPT loaded with the business's own documents —
  price list, policies, past replies
- Connecting a Google Drive or Sheet so answers come from live data
- One automation: a form submission that drafts a reply, a new row that produces
  a summary

**Audience:** small business, freelancers. **Format:** screen recording with the
whole setup shown, mistakes included.

### Tier 3 — Agentic: the AI does the steps

Where the edge is, and where nobody is teaching this audience.

- What an MCP connector actually is, explained without the word "protocol"
- Connecting a calendar, a Drive, a database so the AI reads real state rather
  than being told about it
- Why an agent that queries your live data cannot invent a listing, and a chat
  that does not, can
- Where it breaks and what should stay manual

**Audience:** freelancers, technical-curious business owners.
**Format:** longer video with a written walkthrough.

**The credibility here is real.** You built `nazsats-mcp` — 33 tools, a job
tracker, a content pipeline. Teaching connectors from the seat of someone who
wrote one is a different lesson from teaching it from the docs.

---

## Why screen recording changes the content

A prompt can be written down. **A workflow has to be watched**, because the
value is in the clicks between the steps — which menu, which button, what the
error looked like, what to do when the upload fails.

Rules that make these worth watching:

- **Show the result in the first fifteen seconds.** Nobody waits to find out
  whether the video is relevant.
- **Real screen, real typing, real data.** A polished demo is less convincing
  than a correction made out loud.
- **Leave the mistakes in.** The wrong menu, the failed upload, the moment it
  produced nonsense. That is the part people recognise, and the part that
  proves it was not rehearsed.
- **Three to five minutes.** One workflow, start to finish.
- **Caption it.** Most views are silent, on a phone.
- **Always publish the written version too.** People search text, and a video
  cannot be skimmed.

---

## The first six, in order

Deliberately starting at Tier 1. Jumping to MCP first would lose most of the
audience in the first minute.

| # | Title | Tier | For | Why this one |
|---|---|---|---|---|
| 1 | The Canva features you are paying for and not using | 1 | everyone | Widest reach, zero setup, proves the format works |
| 2 | Stop retyping your business into ChatGPT | 1 | business, freelance | Custom instructions. The highest effort-to-payoff ratio here |
| 3 | Turning one photo into a week of posts | 1 | business | Already in the idea bank. Visual, obviously useful |
| 4 | Give the AI your price list | 2 | business | First real connector. Directly fixes the "it invented a price" problem |
| 5 | One automation that answers your form submissions | 2 | business, freelance | First time it acts without being asked |
| 6 | Letting AI read your calendar and your Drive | 3 | freelance | The MCP lesson, in plain language |

Lesson 4 is the bridge, and worth flagging: it is the fix for the problem the
reply prompt could not solve. A prompt cannot know your delivery time. A
connected price list can.

---

## What this does for the brand

Prompt lessons position you as someone who is good at prompting. There are a lot
of those.

Connector and workflow lessons position you as someone who **builds the plumbing
underneath AI products** — which is what you actually do, and what three merged
upstream fixes demonstrate independently: qdrant-client #1293 and #1333, and
LangChain #39668. More are open across Chroma, litellm, Outlines and
LlamaIndex.

Same audience, same free content, materially different signal to anyone
deciding whether to hire you or pay for a workshop.

---

## Before recording anything

Two hours of setup that pays back across every video:

1. **A consistent intro frame** — the NazSats AI wordmark, the same colours as
   the site, three seconds. Recognition matters more than polish.
2. **One recording setup that works** — OBS or the built-in recorder, a fixed
   window size, microphone tested. Re-deciding this every time is what stops
   people publishing.
3. **A clean browser profile.** No personal tabs, no bookmarks bar, no email
   notifications. This is a privacy matter, not an aesthetic one — a
   screen recording leaks whatever is on screen.
4. **Test data, not your real business.** Same reason.

That last pair is not optional. Screen recordings leak more personal
information than any other format, and it is unrecoverable once published.
