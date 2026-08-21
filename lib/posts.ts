import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * Lessons, read from markdown files on disk.
 *
 * No CMS and no database on purpose. The whole point of this site is that
 * writing a lesson should be as easy as writing a WhatsApp message — if
 * publishing means logging into an admin panel, the archive stops getting
 * updated within a month and the site quietly dies.
 *
 * Workflow: drop a .md file in content/posts/, push, done.
 */

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export type Post = {
    slug: string;
    title: string;
    /** One sentence shown in the list. Write it for someone deciding whether to click. */
    summary: string;
    date: string;
    /** e.g. 'ChatGPT', 'Automation', 'Prompts' */
    topic: string;
    /** Who this one is for. Used to filter. */
    audience: string[];
    /** Reading time in minutes, computed rather than guessed. */
    minutes: number;
};

export type FullPost = Post & { contentHtml: string };

function readFile(slug: string) {
    const full = path.join(POSTS_DIR, `${slug}.md`);
    return matter(fs.readFileSync(full, 'utf8'));
}

function toPost(slug: string, data: any, content: string): Post {
    // 200 wpm is the usual reading speed for plain prose. Rounded up, so a
    // 40-second read never displays as "0 min".
    const words = content.trim().split(/\s+/).length;
    return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? '',
        date: data.date ?? '',
        topic: data.topic ?? 'General',
        audience: Array.isArray(data.audience) ? data.audience : [],
        minutes: Math.max(1, Math.round(words / 200)),
    };
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => {
            const slug = f.replace(/\.md$/, '');
            const { data, content } = readFile(slug);
            return toPost(slug, data, content);
        })
        // Newest first. Dates are ISO strings, so a plain string compare is
        // correct here and avoids constructing a Date per post per request.
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<FullPost | null> {
    try {
        const { data, content } = readFile(slug);
        const processed = await remark().use(html).process(content);
        return { ...toPost(slug, data, content), contentHtml: processed.toString() };
    } catch {
        return null;
    }
}

export function getTopics(): string[] {
    return Array.from(new Set(getAllPosts().map((p) => p.topic))).sort();
}
