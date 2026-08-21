import { SITE } from '@/lib/site';

export const metadata = {
  title: `About — ${SITE.name}`,
  description: SITE.description,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About</h1>

      <div className="prose prose-slate mt-8 max-w-none prose-a:text-accent">
        <p>
          Most writing about AI is aimed at people who already work in tech. It
          assumes you know what an API is, that you enjoy trying new tools, and
          that you have time to experiment. Most people have none of those things
          — they have a job, and about ten minutes.
        </p>

        <p>This is for them.</p>

        <h2>What you will find here</h2>
        <p>
          Short lessons, each about one thing you can use the same day. No code,
          no jargon, and no tool recommendations you would have to pay for
          before finding out whether they help.
        </p>

        <h2>Who it is for</h2>
        <ul>
          <li>
            <strong>Students and job seekers</strong> — writing applications,
            preparing for interviews, learning faster.
          </li>
          <li>
            <strong>Small business owners</strong> — customer messages, listings,
            invoices, the admin that eats the day.
          </li>
          <li>
            <strong>Freelancers</strong> — delivering more work without hiring.
          </li>
        </ul>

        <h2>Who writes it</h2>
        <p>
          {SITE.author}, a developer in Mumbai. I build things that use AI, and I
          kept noticing that the people around me who would benefit most from it
          were the ones most put off by how it gets explained.
        </p>
      </div>
    </div>
  );
}
