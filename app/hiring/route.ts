import { readFile } from "node:fs/promises";
import path from "node:path";
import { getServiceClient, HIRING_BUCKET } from "@/lib/supabase/service";

/**
 * Serve the hiring panel.
 *
 * Candidate data lives in the private hiring-cvs bucket as two JSON objects
 * rather than in a Postgres table: index.json (names, assessment, extracted
 * fields) and decisions.json (status, rating, notes). Storage needs no DDL,
 * which keeps the whole thing setup-free, and the bucket is already private.
 *
 * The HTML template in content/hiring/ carries a `/*DATA*\/` placeholder that
 * this handler fills at request time, so the repo — which is public — never
 * contains anyone's phone number or address.
 */

export const dynamic = "force-dynamic";

const ROLE = "marketing-intern";

const STATUSES = [
  "New", "Shortlisted", "Interview scheduled", "Interviewed", "Offered",
  "Hired", "On hold", "Move to BD", "Query first", "Ask to resend",
  "Wrong role", "Not applicable", "Rejected", "Duplicate", "Maybe",
];

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, X: 4 };

type Person = {
  id: string; name: string; location?: string; education?: string;
  tier?: string; rating_seed?: number; verdict?: string;
  strengths?: string[]; concerns?: string[];
  email?: string; phone?: string; signals?: string;
  studying?: boolean; flag?: string;
  cv_object?: string | null; text_object?: string | null; text_label?: string;
  status?: string; rating?: number;
};

type Decision = { status?: string; rating?: number; notes?: string };

function plain(text: string, status: number) {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

async function readJson<T>(object: string): Promise<T | null> {
  const supabase = getServiceClient();
  const { data, error } = await supabase.storage.from(HIRING_BUCKET).download(object);
  if (error || !data) return null;
  try {
    return JSON.parse(await data.text()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const file = path.join(process.cwd(), "content", "hiring", "panel.html");

  let template: string;
  try {
    template = await readFile(file, "utf8");
  } catch {
    return plain(
      "Panel template missing. Run: python hiring/build_panel.py marketing-intern --deploy",
      500,
    );
  }

  const index = await readJson<{ people: Person[] }>(`${ROLE}/index.json`);
  if (!index?.people?.length) {
    return plain(
      "No candidates found in storage.\n\nRun: python hiring/upload_supabase.py " +
        ROLE +
        " --files-only",
      200,
    );
  }

  const decisions = (await readJson<Record<string, Decision>>(`${ROLE}/decisions.json`)) ?? {};

  const people = index.people.map((p) => {
    const d = decisions[p.id] ?? {};
    return {
      id: p.id,
      name: p.name,
      location: p.location ?? "",
      education: p.education ?? "",
      tier: p.tier ?? "D",
      rating: typeof d.rating === "number" ? d.rating : (p.rating ?? p.rating_seed ?? 0),
      status: d.status ?? p.status ?? "New",
      notes: d.notes ?? "",
      verdict: p.verdict ?? "",
      strengths: Array.isArray(p.strengths) ? p.strengths : [],
      concerns: Array.isArray(p.concerns) ? p.concerns : [],
      email: p.email ?? "",
      phone: p.phone ?? "",
      signals: p.signals ?? "",
      studying: Boolean(p.studying),
      flag: p.flag ?? "",
      // Files stream through /hiring/file, behind the same Basic Auth. The
      // bucket is private, so they are never fetchable by direct URL.
      cvPath: p.cv_object ? "/hiring/file/" + p.cv_object : "",
      textPath: p.text_object ? "/hiring/file/" + p.text_object : "",
      textLabel: p.text_label ?? "",
    };
  });

  people.sort(
    (a, b) =>
      (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9) ||
      b.rating - a.rating ||
      a.name.localeCompare(b.name),
  );

  const payload = JSON.stringify({ role: "Marketing Intern", statuses: STATUSES, people });

  // The payload sits inside a <script>. A literal "</script>" in any field
  // would close the block early, so neutralise the sequence before injecting.
  const safe = payload.replace(/<\//g, "<\\/");

  return new Response(template.replace("/*DATA*/", safe), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, private",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}
