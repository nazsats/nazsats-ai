import fs from 'fs';
import path from 'path';
import { getAllPosts, type Post } from './posts';

/**
 * The content pipeline: what is an idea, what is written, what has gone out.
 *
 * Reads the same two JSON files the MCP tools write, so asking Claude
 * "what's pending?" and opening the dashboard give the same answer. If this
 * kept its own copy of the state the two would disagree within a week, and the
 * one you happened to check would be the one you believed.
 */

const CONTENT = path.join(process.cwd(), 'content');

export const CHANNELS = ['whatsapp', 'linkedin', 'carousel', 'youtube'] as const;
export type Channel = (typeof CHANNELS)[number];

export const CHANNEL_LABELS: Record<Channel, string> = {
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    carousel: 'Carousel',
    youtube: 'YouTube',
};

export type Idea = {
    slug: string;
    title: string;
    note?: string;
    topic?: string;
    audience?: string;
    added?: string;
};

export type TrackedPost = Post & {
    promoted: Partial<Record<Channel, string>>;
    pending: Channel[];
};

function readJson<T>(file: string, fallback: T): T {
    try {
        return JSON.parse(fs.readFileSync(path.join(CONTENT, file), 'utf8')) as T;
    } catch {
        // Missing or malformed is the normal state before the first post goes
        // out. An empty dashboard is correct; a crash is not.
        return fallback;
    }
}

export function getIdeas(): Idea[] {
    const written = new Set(getAllPosts().map((p) => p.slug));
    return readJson<Idea[]>('ideas.json', []).filter((i) => !written.has(i.slug));
}

export function getTracked(): TrackedPost[] {
    const state = readJson<Record<string, Partial<Record<Channel, string>>>>('tracker.json', {});

    return getAllPosts().map((post) => {
        const promoted = state[post.slug] ?? {};
        return {
            ...post,
            promoted,
            pending: CHANNELS.filter((c) => !promoted[c]),
        };
    });
}

export function getStats() {
    const tracked = getTracked();
    const ideas = getIdeas();

    return {
        ideas: ideas.length,
        written: tracked.length,
        byChannel: Object.fromEntries(
            CHANNELS.map((c) => [c, tracked.filter((t) => t.promoted[c]).length]),
        ) as Record<Channel, number>,
        // Written but not on both of the channels that matter. This is the
        // number worth looking at — a lesson nobody was told about may as well
        // not exist.
        needsPromoting: tracked.filter((t) => !t.promoted.whatsapp || !t.promoted.linkedin),
    };
}
