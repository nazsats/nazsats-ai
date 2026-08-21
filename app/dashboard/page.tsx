import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStats, getTracked, getIdeas, CHANNELS, CHANNEL_LABELS } from '@/lib/tracker';

/**
 * The content command centre. Local only — this is never deployed.
 *
 * Answers three questions in order of how often they get asked:
 * what should I write next, what have I written but not promoted, and how am
 * I actually doing.
 */

export const metadata = { title: 'Dashboard — NazSats AI' };

// Read from disk on every request rather than caching at build time. The MCP
// tools write these files while the dev server is running, so a cached page
// would show yesterday's state and quietly stop being trustworthy.
export const dynamic = 'force-dynamic';

export default function Dashboard() {
// Local-only. This is a working tool, and playbook/consulting.md carries
// pricing — neither belongs on a public subdomain. Gating on NODE_ENV means
// there is nothing to remember to remove before deploying: `npm run dev`
// shows it, the deployed build does not have it.
if (process.env.NODE_ENV === 'production') notFound();

    const stats = getStats();
    const tracked = getTracked();
    const ideas = getIdeas();

    return (
        <div className="mx-auto max-w-5xl px-5 py-12">
            <header className="flex flex-wrap items-baseline justify-between gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
                <p className="text-sm text-ink-muted">
                    Local only · updated live from <code className="text-xs">content/</code>
                </p>
            </header>

            {/* The numbers, in the order they matter. Ideas first because the
                most common question is "what do I write today". */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat label="Ideas waiting" value={stats.ideas} tone="neutral" />
                <Stat label="Lessons written" value={stats.written} tone="good" />
                <Stat label="On WhatsApp" value={stats.byChannel.whatsapp} tone="neutral" />
                <Stat label="On LinkedIn" value={stats.byChannel.linkedin} tone="neutral" />
            </div>

            {/* The nag. A lesson written and never promoted is invisible, and
                this is the only screen that will ever tell you. */}
            {stats.needsPromoting.length > 0 ? (
                <section className="mt-10 rounded-2xl border border-amber-500/30 bg-amber-50 p-5">
                    <h2 className="font-bold text-amber-900">
                        {stats.needsPromoting.length} written but not posted everywhere
                    </h2>
                    <ul className="mt-3 space-y-1.5">
                        {stats.needsPromoting.map((p) => (
                            <li key={p.slug} className="text-sm text-amber-900/80">
                                <span className="font-semibold">{p.title}</span>
                                {' — still needs '}
                                {p.pending.map((c) => CHANNEL_LABELS[c]).join(', ')}
                            </li>
                        ))}
                    </ul>
                </section>
            ) : stats.written > 0 ? (
                <p className="mt-10 rounded-2xl border border-accent/30 bg-paper-band p-5 text-sm font-semibold text-accent-deep">
                    Everything written has been posted. Write the next one.
                </p>
            ) : null}

            {/* Written lessons, and where each has been */}
            <section className="mt-12">
                <h2 className="text-lg font-bold">Published lessons</h2>

                {tracked.length === 0 ? (
                    <p className="mt-3 text-sm text-ink-muted">
                        Nothing written yet. Pick something from the ideas below.
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[640px] text-sm">
                            <thead>
                                <tr className="border-b border-rule text-left text-xs uppercase tracking-wide text-ink-muted">
                                    <th className="pb-2 font-semibold">Lesson</th>
                                    {CHANNELS.map((c) => (
                                        <th key={c} className="pb-2 text-center font-semibold">
                                            {CHANNEL_LABELS[c]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tracked.map((p) => (
                                    <tr key={p.slug} className="border-b border-rule">
                                        <td className="py-3 pr-4">
                                            <Link
                                                href={`/lessons/${p.slug}`}
                                                className="font-semibold hover:text-accent"
                                            >
                                                {p.title}
                                            </Link>
                                            <span className="ml-2 text-xs text-ink-faint">{p.topic}</span>
                                        </td>
                                        {CHANNELS.map((c) => (
                                            <td key={c} className="py-3 text-center">
                                                {p.promoted[c] ? (
                                                    <span
                                                        title={p.promoted[c]}
                                                        className="inline-block h-2.5 w-2.5 rounded-full bg-accent"
                                                    />
                                                ) : (
                                                    <span className="inline-block h-2.5 w-2.5 rounded-full border border-rule" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-3 text-xs text-ink-faint">
                            Filled dot = posted. Mark one with{' '}
                            <code className="text-[11px]">ai_mark_posted(slug, channel)</code>.
                        </p>
                    </div>
                )}
            </section>

            {/* The queue */}
            <section className="mt-14">
                <h2 className="text-lg font-bold">
                    Ideas <span className="font-normal text-ink-faint">({ideas.length})</span>
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                    Anything already written disappears from this list automatically.
                </p>

                <ul className="mt-5 space-y-2.5">
                    {ideas.map((i) => (
                        <li
                            key={i.slug}
                            className="rounded-xl border border-rule p-4"
                        >
                            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                                <span className="text-accent">{i.topic}</span>
                                {i.audience ? (
                                    <span className="rounded-full bg-paper-band px-2 py-0.5 text-ink-body">
                                        {i.audience}
                                    </span>
                                ) : null}
                            </div>
                            <p className="mt-1 font-semibold">{i.title}</p>
                            {i.note ? (
                                <p className="mt-0.5 text-sm text-ink-body">{i.note}</p>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'good' | 'neutral' }) {
    return (
        <div className="rounded-2xl border border-rule p-4">
            <p
                className={`text-3xl font-extrabold tracking-tight ${
                    tone === 'good' ? 'text-accent ' : ''
                }`}
            >
                {value}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-ink-muted">{label}</p>
        </div>
    );
}
