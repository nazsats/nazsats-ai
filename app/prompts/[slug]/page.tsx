import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyBlock from '@/components/CopyBlock';

/**
 * A prompt, presented to be copied rather than read.
 *
 * Deliberately not rendered as markdown. The whole value here is pasting the
 * exact text into a chatbot, and prose formatting would strip the structure the
 * prompt depends on — the headings and rules are load-bearing instructions, not
 * decoration.
 */

const PROMPTS = {
    'cv-tailor': {
        title: 'CV tailoring prompt',
        blurb:
            'Scores your CV against a job description, then rewrites it using only what is already there.',
        lesson: '/lessons/tailor-your-cv-to-the-job',
        tested:
            'Tested on 10 cases built to tempt it into inventing skills. It added nothing false in any of them.',
    },
    'interview-practice': {
        title: 'Interview practice prompt',
        blurb:
            'Ten questions traced to your CV and the job description, answers for the three hardest, and a plain list of what you cannot answer.',
        lesson: '/lessons/the-interview-is-being-run-by-ai',
        tested:
            'Tested on 10 candidates paired with jobs asking for things they do not have. It claimed nothing false in any of them.',
    },
} as const;

type Slug = keyof typeof PROMPTS;

export function generateStaticParams() {
    return Object.keys(PROMPTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!(slug in PROMPTS)) return {};
    const p = PROMPTS[slug as Slug];
    return { title: `${p.title} — NazSats AI`, description: p.blurb };
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!(slug in PROMPTS)) notFound();

    const meta = PROMPTS[slug as Slug];
    let text: string;
    try {
        text = fs.readFileSync(path.join(process.cwd(), 'prompts', slug, 'PROMPT.md'), 'utf8');
    } catch {
        notFound();
    }

    return (
        <div className="mx-auto max-w-3xl px-5 py-16">
            <Link href={meta.lesson} className="text-sm font-semibold text-accent hover:underline">
                ← Read the lesson first
            </Link>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {meta.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-body">{meta.blurb}</p>

            <p className="mt-4 rounded-xl border border-accent/25 bg-paper-band p-4 text-sm text-ink-body">
                {meta.tested}
            </p>

            <h2 className="mt-10 text-lg font-bold text-ink">Copy this</h2>
            <p className="mt-1 text-sm text-ink-body">
                Paste it into ChatGPT, Claude or Gemini, then replace the two placeholders at
                the bottom with your CV and the job description.
            </p>

            <div className="mt-4">
                <CopyBlock text={text} />
            </div>
        </div>
    );
}
