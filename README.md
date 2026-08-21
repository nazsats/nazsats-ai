# NazSats AI

**AI for people who were never taught it.**

A content hub for short, practical AI lessons aimed at students and job seekers,
small business owners, and freelancers. Everything posted to the WhatsApp
community and LinkedIn lives here permanently, searchable, instead of scrolling
out of a chat.

---

## Publishing a lesson

Add a markdown file to `content/posts/` and push. That is the whole process —
there is no CMS and no database, deliberately. If publishing meant logging into
an admin panel, the archive would stop getting updated within a month.

```markdown
---
title: "Stop asking AI to 'write something'"
summary: "One sentence for someone deciding whether to click."
date: "2026-08-20"
topic: "Prompts"
audience: ["students", "business", "freelancers"]
---

Your lesson here.
```

| Field | Notes |
|---|---|
| `title` | Shown in the list and as the page title |
| `summary` | Also the meta description and the WhatsApp link preview |
| `date` | ISO format. Sorting is newest-first |
| `topic` | Free text — `Prompts`, `Automation`, `Judgement` |
| `audience` | Any of `students`, `business`, `freelancers`. Omit for everyone |

Reading time is calculated from the word count, so it is never wrong.

## Running it

```bash
npm install
npm run dev
```

Set these before deploying — the join buttons hide themselves when the links are
missing, so nothing looks broken while you are still setting up:

```env
NEXT_PUBLIC_WHATSAPP_URL=https://chat.whatsapp.com/...
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/...
```

## Layout

```
nazsats-ai/
├── content/posts/       # the lessons — markdown, one file each
├── app/
│   ├── page.tsx         # home: list, filter by audience, search
│   ├── lessons/[slug]/  # one lesson, statically generated
│   └── about/
├── components/
│   └── PostList.tsx     # filtering and search, client-side
├── lib/
│   ├── posts.ts         # reads and parses the markdown
│   └── site.ts          # name, links, audiences — change them here
└── playbook/            # strategy, not code
    ├── content-plan.md  # 30 lessons, grouped, with the format that works
    ├── consulting.md    # what to offer, what to learn, realistic pricing
    └── growth.md        # WhatsApp and LinkedIn, which need different things
```

The `playbook/` folder is for you, not for readers. It is not published.

## Why filtering is by audience, not topic

Someone arriving here does not think "I want to read about automation". They
think "I run a shop — what helps me?". Topic is still shown on each card, but
the primary cut is by reader, because that is the question people actually
arrive with.

## This runs locally. It is not deployed.

`npm run dev`, open <http://localhost:3000>, leave it running while you work.

That is deliberate. This is a workspace, not a website — the dashboard and
playbook are working tools that would make no sense to a reader, and the
lessons here are the *source* for what goes out on WhatsApp and LinkedIn rather
than a destination people visit.

**If you ever do decide to publish it**, three things have to change first:

1. Remove `/dashboard` and `/playbook` from the nav and the app — they are
   private notes, and `playbook/consulting.md` contains your pricing.
2. Set `NEXT_PUBLIC_WHATSAPP_URL` so the join buttons appear.
3. Point `SITE_URL` in the MCP's `ai_formats.py` at the real domain, since it
   is what gets pasted into every WhatsApp post.

## The MCP tools that drive this

The tracker and idea bank are read and written by `nazsats-mcp`, so asking
Claude and opening the dashboard give the same answer:

| Tool | What it does |
|---|---|
| `ai_status()` | Every lesson and which channels it is missing from |
| `ai_ideas()` | The bank, with anything already written filtered out |
| `ai_add_idea()` | Capture one before you forget it |
| `ai_style()` | The voice for this audience — not the blog's voice |
| `ai_format(channel)` | How to shape it for whatsapp / linkedin / carousel / youtube |
| `ai_read_lesson(slug)` | Full markdown, to draft promotion from |
| `ai_mark_posted(slug, channel)` | Record it went out, timestamped |

Both write to `content/tracker.json` and `content/ideas.json`. Those two files
are the state — everything else is a view of them.
