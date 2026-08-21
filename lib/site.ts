/**
 * Everything about the site that you might want to change later, in one place.
 *
 * The WhatsApp link especially: it appears on every page and in every call to
 * action, and hunting for it through JSX when the group link changes is exactly
 * how a site ends up with three different broken join buttons.
 */

export const SITE = {
    name: 'NazSats AI',
    tagline: 'AI for people who were never taught it',
    description:
        'Short, practical lessons on using AI at work — written for students, small business owners and freelancers. No jargon, no code.',

    /** Replace with your real WhatsApp community invite. */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '',

    author: 'Mohammad Nazrul Ansari',
} as const;

/**
 * The three groups this is written for.
 *
 * Kept explicit rather than free-text tags because a lesson that is genuinely
 * useful to a shop owner is often useless to a student, and letting a reader
 * filter to their own situation is the difference between an archive and a
 * pile.
 */
export const AUDIENCES = [
    { id: 'students', label: 'Students & job seekers' },
    { id: 'business', label: 'Small business owners' },
    { id: 'freelancers', label: 'Freelancers' },
] as const;
