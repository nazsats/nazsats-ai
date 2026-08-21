import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * The playbook, readable in the browser.
 *
 * These are markdown files you could open in an editor, and mostly will. They
 * are rendered here so the whole workspace is one place — plan, ideas, tracker
 * and lessons — rather than a site plus a folder you have to remember to open.
 *
 * Local only, like the dashboard. None of this is for readers.
 */

const DOCS = {
    'content-plan': { title: 'Content plan', blurb: '30 lessons, grouped, and the format that works' },
    consulting: { title: 'Consulting', blurb: 'What to offer, what to learn, realistic pricing' },
    growth: { title: 'Growth', blurb: 'WhatsApp and LinkedIn need different things' },
} as const;

type Doc = keyof typeof DOCS;

export function generateStaticParams() {
    // Nothing to prerender in production — the pages 404 there anyway, and
    // building them would put the playbook text into the deployed bundle.
    if (process.env.NODE_ENV === 'production') return [];
    return Object.keys(DOCS).map((doc) => ({ doc }));
}

export default async function PlaybookPage({ params }: { params: Promise<{ doc: string }> }) {
    if (process.env.NODE_ENV === 'production') notFound();

    const { doc } = await params;
    if (!(doc in DOCS)) notFound();

    const meta = DOCS[doc as Doc];
    let markdown: string;
    try {
        markdown = fs.readFileSync(path.join(process.cwd(), 'playbook', `${doc}.md`), 'utf8');
    } catch {
        notFound();
    }

    const contentHtml = (await remark().use(html).process(markdown)).toString();

    return (
        <div className="mx-auto max-w-3xl px-5 py-12">
            <div className="flex flex-wrap gap-2">
                {(Object.keys(DOCS) as Doc[]).map((d) => (
                    <Link
                        key={d}
                        href={`/playbook/${d}`}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                            d === doc
                                ? 'border-accent bg-accent text-white'
                                : 'border-rule text-ink-body hover:border-accent'
                        }`}
                    >
                        {DOCS[d].title}
                    </Link>
                ))}
            </div>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight">{meta.title}</h1>
            <p className="mt-1 text-ink-body">{meta.blurb}</p>

            <div
                className="prose prose-slate mt-8 max-w-none prose-headings:font-bold prose-a:text-accent prose-code:text-accent"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    );
}
