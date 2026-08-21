'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

/**
 * The lesson list, filterable by who you are.
 *
 * The filter is by audience rather than by topic, which is the less obvious
 * choice. Someone arriving here does not think "I want to read about
 * automation" — they think "I run a shop, what helps me?". Topic is shown on
 * each card so it is still visible, but the primary cut is by reader.
 *
 * Filtering happens in the browser over an already-loaded list. At a few
 * hundred lessons that is instant and needs no server round trip; if this ever
 * grows past that, it wants pagination rather than a cleverer filter.
 */

type Audience = { id: string; label: string };

export default function PostList({
    posts,
    audiences,
}: {
    posts: Post[];
    audiences: Audience[];
}) {
    const [active, setActive] = useState<string | null>(null);
    const [query, setQuery] = useState('');

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((p) => {
            // A lesson with no audience listed is for everyone, so it should
            // never be filtered out — otherwise general advice becomes
            // invisible the moment someone picks a filter.
            const matchesAudience =
                !active || p.audience.length === 0 || p.audience.includes(active);
            const matchesQuery =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.summary.toLowerCase().includes(q) ||
                p.topic.toLowerCase().includes(q);
            return matchesAudience && matchesQuery;
        });
    }, [posts, active, query]);

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => setActive(null)}
                    className={chip(active === null)}
                >
                    Everything
                </button>
                {audiences.map((a) => (
                    <button key={a.id} onClick={() => setActive(a.id)} className={chip(active === a.id)}>
                        {a.label}
                    </button>
                ))}
            </div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons…"
                className="mt-4 w-full rounded-xl border border-rule bg-paper-card px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-accent"
            />

            <ul className="mt-8 space-y-3">
                {visible.map((p) => (
                    <li key={p.slug}>
                        <Link
                            href={`/lessons/${p.slug}`}
                            className="block rounded-2xl border border-rule p-5 transition hover:border-accent/50 hover:bg-paper-band"
                        >
                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-accent">
                                <span>{p.topic}</span>
                                <span className="text-ink-faint">·</span>
                                <span className="text-ink-muted">{p.minutes} min read</span>
                            </div>
                            <h2 className="mt-1.5 text-lg font-bold text-ink">
                                {p.title}
                            </h2>
                            {p.summary ? (
                                <p className="mt-1 text-sm leading-relaxed text-ink-body">
                                    {p.summary}
                                </p>
                            ) : null}
                        </Link>
                    </li>
                ))}
            </ul>

            {visible.length === 0 ? (
                <p className="mt-8 text-center text-sm text-ink-muted">
                    Nothing matches that yet.
                </p>
            ) : null}
        </div>
    );
}

function chip(on: boolean) {
    return [
        'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition',
        on
            ? 'border-accent bg-accent text-white'
            : 'border-rule text-ink-body hover:border-accent',
    ].join(' ');
}
