import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { SITE, AUDIENCES } from '@/lib/site';
import PostList from '@/components/PostList';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          AI for people who
          <br />
          <span className="text-accent">were never taught it</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-body">
          Short, practical lessons on using AI at work. No jargon, no code, nothing
          you need a technical background to follow. Written for students, small
          business owners and freelancers.
        </p>

        {SITE.whatsapp ? (
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-white transition hover:bg-accent-deep"
          >
            Join the WhatsApp community
          </a>
        ) : null}
      </header>

      <hr className="my-12 border-rule" />

      {posts.length === 0 ? (
        // Not an error state. A new site with no posts should explain itself
        // rather than render an empty page that looks broken.
        <div className="rounded-2xl border border-dashed border-rule p-8 text-center">
          <p className="font-semibold text-ink">No lessons yet</p>
          <p className="mt-1.5 text-sm text-ink-body">
            Add a markdown file to{' '}
            <code className="rounded bg-paper-band px-1.5 py-0.5 text-xs">
              content/posts/
            </code>{' '}
            and it appears here.
          </p>
        </div>
      ) : (
        <PostList posts={posts} audiences={[...AUDIENCES]} />
      )}
    </div>
  );
}
