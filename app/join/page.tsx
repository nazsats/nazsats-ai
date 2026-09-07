import Link from 'next/link';
import { SITE } from '@/lib/site';

/**
 * The public "we're hiring" page.
 *
 * Deliberately NOT under /hiring — that prefix is the private candidate panel,
 * password-gated in proxy.ts. This one is meant to be found.
 *
 * Kept short on purpose. Every internship ad reads the same, and the students
 * we want stopped reading them a long time ago.
 */

const EMAIL = 'nazsats@gmail.com';

export const metadata = {
  title: `We're hiring two people — ${SITE.name}`,
  description:
    'Two internships. Marketing and sales. No experience needed, no degree checklist. ₹2,500 a month, 3–4 hours a day, work from anywhere.',
};

const ROLES = [
  {
    name: 'Marketing',
    line: 'Write things people actually read. Post them. See what worked.',
    doing: ['Content for LinkedIn and Instagram', 'Making it look good in Canva', 'Working out what got attention'],
  },
  {
    name: 'Sales',
    line: 'Find people who need what we build. Talk to them. Close them.',
    doing: ['Finding the right people to contact', 'Emails, calls, LinkedIn', 'Following up until you get an answer'],
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">
        Two openings
      </p>

      <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
        We&rsquo;re hiring two
        <br />
        people. That&rsquo;s it.
      </h1>

      <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-body sm:text-xl">
        No degree checklist. No &ldquo;5+ years required&rdquo; for a first job. No
        list of tools you&rsquo;re supposed to already know.
      </p>

      <p className="mt-4 max-w-xl text-lg font-semibold leading-relaxed text-ink sm:text-xl">
        If you can talk to people and write a clear sentence, you can do this
        job. Send your CV.
      </p>

      {/* The two roles */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {ROLES.map((r) => (
          <div
            key={r.name}
            className="rounded-2xl border border-rule bg-paper-card p-6 transition hover:border-accent"
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              {r.name}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-body">
              {r.line}
            </p>
            <ul className="mt-5 space-y-2 text-[15px] text-ink-body">
              {r.doing.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The deal, in four numbers */}
      <div className="mt-4 rounded-2xl bg-ink p-7 text-paper sm:p-9">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
          {[
            ['₹2,500', 'every month'],
            ['3–4 hrs', 'a day'],
            ['Anywhere', 'fully remote'],
            ['Your call', 'own timings'],
          ].map(([big, small]) => (
            <div key={big}>
              <dt className="text-2xl font-extrabold tracking-tight text-white sm:text-[26px]">
                {big}
              </dt>
              <dd className="mt-1 text-sm text-ink-faint">{small}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
        Plus a letter of recommendation, an internship certificate, and you work
        with me directly rather than three layers down. Being straight with you:
        the money is small. The work is real, and it goes live.
      </p>

      {/* Apply */}
      <div className="mt-14 border-t border-rule pt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          How to apply
        </h2>
        <p className="mt-3 text-lg text-ink-body">
          Email your CV. Say which one, and why. Two lines is plenty.
        </p>
        <a
          href={`mailto:${EMAIL}?subject=Internship%20application`}
          className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white transition hover:bg-accent-deep"
        >
          {EMAIL}
          <span aria-hidden>&rarr;</span>
        </a>
        <p className="mt-5 text-sm text-ink-muted">
          Currently studying is fine. Just finished is fine. Mumbai is a plus,
          not a rule.
        </p>
      </div>

      <p className="mt-16 text-sm text-ink-muted">
        NAZSATS builds AI products &mdash; agents, retrieval systems, things
        people actually use.{' '}
        <Link href="/about" className="text-accent hover:underline">
          More about us
        </Link>
        .
      </p>
    </div>
  );
}
