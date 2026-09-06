import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Gate the hiring panel behind HTTP Basic Auth.
 *
 * The panel and the CVs it links to carry candidates' full names, phone
 * numbers, email addresses and home addresses. None of that may be reachable
 * without a password, so this guards BOTH the page and the files under
 * /hiring-files, which are served from public/ and would otherwise be fetchable
 * by direct URL regardless of anything the page itself does.
 *
 * Set HIRING_USER and HIRING_PASSWORD in the Vercel project's environment
 * variables. If either is missing the route returns 503 rather than falling
 * open -- an unset password must never mean "no password".
 *
 * (In Next.js 16 `middleware.ts` was renamed to `proxy.ts`. Same behaviour.)
 */

const REALM = "NazSats hiring";

/** Length-independent compare, so response time leaks nothing about the secret. */
function safeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export function proxy(request: NextRequest) {
  const user = process.env.HIRING_USER;
  const password = process.env.HIRING_PASSWORD;

  // Fail closed. A missing secret is a misconfiguration, not permission.
  if (!user || !password) {
    return new NextResponse(
      "Hiring panel is not configured. Set HIRING_USER and HIRING_PASSWORD.",
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return unauthorized();
  }

  // Only the FIRST colon separates user from password; passwords may contain colons.
  const sep = decoded.indexOf(":");
  if (sep < 0) return unauthorized();

  const okUser = safeEqual(decoded.slice(0, sep), user);
  const okPass = safeEqual(decoded.slice(sep + 1), password);
  // Evaluate both before branching so a wrong username and a wrong password
  // take the same path.
  if (!(okUser && okPass)) return unauthorized();

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "no-store, private");
  return res;
}

export const config = {
  matcher: ["/hiring", "/hiring/:path*", "/hiring-files/:path*"],
};
