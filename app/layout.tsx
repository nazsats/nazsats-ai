import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { SITE } from '@/lib/site';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav className="border-b border-rule">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
            <Link href="/" className="font-extrabold tracking-tight">
              NazSats<span className="text-accent"> AI</span>
            </Link>
            <div className="flex items-center gap-5 text-sm font-semibold text-ink-body">
              {/* Working tools, shown only while running locally. */}
              {process.env.NODE_ENV !== 'production' ? (
                <>
                  <Link href="/dashboard" className="hover:text-accent">
                    Dashboard
                  </Link>
                  <Link href="/playbook/content-plan" className="hover:text-accent">
                    Playbook
                  </Link>
                </>
              ) : null}
              <Link href="/about" className="hover:text-accent">
                About
              </Link>
              {SITE.whatsapp ? (
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-accent px-3.5 py-2 text-white transition hover:bg-accent-deep"
                >
                  Join
                </a>
              ) : null}
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="mt-24 border-t border-rule py-10">
          <div className="mx-auto max-w-3xl px-5 text-sm text-ink-muted">
            <p className="font-semibold text-ink">{SITE.name}</p>
            <p className="mt-1.5">{SITE.description}</p>
            <p className="mt-5 text-xs text-ink-faint">
              © {new Date().getFullYear()} {SITE.name}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
