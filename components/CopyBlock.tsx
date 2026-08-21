'use client';

import { useState } from 'react';

/**
 * A block of text with a copy button.
 *
 * The button matters more than the block. This prompt is ~600 words of
 * structured instructions; selecting it by hand on a phone is genuinely
 * awkward, and the people this is written for are mostly on phones.
 */
export default function CopyBlock({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard is blocked in some in-app browsers (Instagram, older
            // WhatsApp webviews). The text is right there to select manually,
            // so failing quietly beats an alert telling them off.
        }
    };

    return (
        <div className="relative">
            <button
                onClick={copy}
                className="absolute right-3 top-3 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-white transition hover:bg-accent-deep"
            >
                {copied ? 'Copied' : 'Copy'}
            </button>
            <pre className="max-h-[32rem] overflow-auto rounded-2xl border border-rule bg-paper-card p-5 pr-20 text-[13px] leading-relaxed text-ink-body">
                {text}
            </pre>
        </div>
    );
}
