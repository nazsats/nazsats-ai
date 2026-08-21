import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPost } from '@/lib/posts';
import { SITE } from '@/lib/site';

/**
 * A single lesson.
 *
 * Statically generated at build time — every lesson is a file on disk that
 * changes only when you deploy, so there is nothing to render per request.
 */

export async function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: SITE.name };

    // The summary doubles as the meta description, which is what shows up in
    // search results and in the WhatsApp link preview — the two places most
    // readers will actually see it.
    return {
        title: `${post.title} — ${SITE.name}`,
        description: post.summary,
        openGraph: { title: post.title, description: post.summary, type: 'article' },
    };
}

export default async function LessonPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) notFound();

    return (
        <article className="mx-auto max-w-2xl px-5 py-16">
            <Link
                href="/"
                className="text-sm font-semibold text-accent hover:underline"
            >
                ← All lessons
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-accent">
                <span>{post.topic}</span>
                <span className="text-ink-faint">·</span>
                <span className="text-ink-muted">{post.minutes} min read</span>
            </div>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                {post.title}
            </h1>

            {post.summary ? (
                <p className="mt-3 text-lg leading-relaxed text-ink-body">
                    {post.summary}
                </p>
            ) : null}

            {/* The markdown is generated from files in this repo, not from user
                input, so rendering it as HTML is safe here. That stops being
                true the moment anything accepts submissions. */}
            <div
                className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {SITE.whatsapp ? (
                <aside className="mt-14 rounded-2xl border border-accent/25 bg-paper-band p-6">
                    <p className="font-bold text-ink">
                        One short lesson like this, a few times a week
                    </p>
                    <p className="mt-1 text-sm text-ink-body">
                        Free, and you can leave whenever you like.
                    </p>
                    <a
                        href={SITE.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-deep"
                    >
                        Join on WhatsApp
                    </a>
                </aside>
            ) : null}
        </article>
    );
}
