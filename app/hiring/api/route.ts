import { getServiceClient } from "@/lib/supabase/service";

/**
 * Save one candidate's decision: status, rating, notes.
 *
 * Sits under /hiring, so proxy.ts already requires Basic Auth before this is
 * reachable. Only ever writes the three decision columns — an errant request
 * cannot alter the assessment or the extracted contact details.
 */

export const dynamic = "force-dynamic";

const STATUSES = new Set([
  "New", "Shortlisted", "Interview scheduled", "Interviewed", "Offered",
  "Hired", "On hold", "Move to BD", "Query first", "Ask to resend",
  "Wrong role", "Not applicable", "Rejected", "Duplicate", "Maybe",
]);

export async function POST(request: Request) {
  let body: { id?: unknown; status?: unknown; rating?: unknown; notes?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return Response.json({ error: "id is required" }, { status: 400 });

  const patch: Record<string, string | number> = {};

  if (body.status !== undefined) {
    if (typeof body.status !== "string" || !STATUSES.has(body.status)) {
      return Response.json({ error: "Unknown status" }, { status: 400 });
    }
    patch.status = body.status;
  }

  if (body.rating !== undefined) {
    const n = Number(body.rating);
    if (!Number.isInteger(n) || n < 0 || n > 5) {
      return Response.json({ error: "rating must be 0-5" }, { status: 400 });
    }
    patch.rating = n;
  }

  if (body.notes !== undefined) {
    if (typeof body.notes !== "string") {
      return Response.json({ error: "notes must be a string" }, { status: 400 });
    }
    // Bounded so a runaway client cannot fill the table.
    patch.notes = body.notes.slice(0, 20000);
  }

  if (Object.keys(patch).length === 0) {
    return Response.json({ error: "Nothing to update" }, { status: 400 });
  }

  const supabase = getServiceClient();
  const { error } = await supabase
    .from("hiring_candidates")
    .update(patch)
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
