import { readFile } from "node:fs/promises";
import path from "node:path";
import { getServiceClient } from "@/lib/supabase/service";

/**
 * Serve the hiring panel.
 *
 * The HTML template in content/hiring/ carries no candidate data — it ships a
 * `/*DATA*\/` placeholder that this handler fills at request time from
 * Supabase. So the repo never contains anyone's phone number or address, and
 * the rows are only reachable through the service role, behind the Basic Auth
 * that proxy.ts puts in front of everything under /hiring.
 */

export const dynamic = "force-dynamic";

const ROLE = "marketing-intern";

const STATUSES = [
  "New", "Shortlisted", "Interview scheduled", "Interviewed", "Offered",
  "Hired", "On hold", "Move to BD", "Query first", "Ask to resend",
  "Wrong role", "Not applicable", "Rejected", "Duplicate", "Maybe",
];

const TIER_ORDER: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, X: 4 };

type Row = {
  id: string; name: string; location: string | null; education: string | null;
  tier: string | null; rating: number; status: string; notes: string;
  verdict: string | null; strengths: unknown; concerns: unknown;
  email: string | null; phone: string | null; signals: string | null;
  studying: boolean; flag: string | null;
  cv_object: string | null; text_object: string | null; text_label: string | null;
};

function plain(text: string, status: number) {
  return new Response(text, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
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

  let rows: Row[];
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("hiring_candidates")
      .select("*")
      .eq("role", ROLE);
    if (error) throw error;
    rows = (data ?? []) as Row[];
  } catch (err) {
    // Supabase errors are plain objects, not Error instances, so String()
    // on them yields a useless "[object Object]".
    const detail =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null
          ? [
              (err as { message?: string }).message,
              (err as { hint?: string }).hint,
              (err as { details?: string }).details,
            ]
              .filter(Boolean)
              .join(" — ") || JSON.stringify(err)
          : String(err);

    return plain(
      "Could not read candidates from Supabase.\n\n" +
        detail +
        "\n\nHave you run supabase/hiring.sql, then upload_supabase.py?",
      500,
    );
  }

  if (rows.length === 0) {
    return plain(
      "No candidates yet. Run: python hiring/upload_supabase.py marketing-intern",
      200,
    );
  }

  rows.sort(
    (a, b) =>
      (TIER_ORDER[a.tier ?? "D"] ?? 9) - (TIER_ORDER[b.tier ?? "D"] ?? 9) ||
      b.rating - a.rating ||
      a.name.localeCompare(b.name),
  );

  const people = rows.map((r) => ({
    id: r.id,
    name: r.name,
    location: r.location ?? "",
    education: r.education ?? "",
    tier: r.tier ?? "D",
    rating: r.rating,
    status: r.status,
    notes: r.notes ?? "",
    verdict: r.verdict ?? "",
    strengths: Array.isArray(r.strengths) ? r.strengths : [],
    concerns: Array.isArray(r.concerns) ? r.concerns : [],
    email: r.email ?? "",
    phone: r.phone ?? "",
    signals: r.signals ?? "",
    studying: Boolean(r.studying),
    flag: r.flag ?? "",
    // Files stream through /hiring/file, which is behind the same Basic Auth.
    // The bucket is private, so these are never fetchable by direct URL.
    cvPath: r.cv_object ? "/hiring/file/" + r.cv_object : "",
    textPath: r.text_object ? "/hiring/file/" + r.text_object : "",
    textLabel: r.text_label ?? "",
  }));

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
