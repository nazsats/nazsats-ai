import { getServiceClient, HIRING_BUCKET } from "@/lib/supabase/service";

/**
 * Save one candidate's decision: status, rating, notes.
 *
 * Reads decisions.json out of the private bucket, merges the one candidate's
 * change, writes it back. Only the three decision fields are ever touched — an
 * errant request cannot alter the assessment or the extracted contact details,
 * which live in a separate object this route never writes.
 *
 * Sits under /hiring, so proxy.ts requires Basic Auth before it is reachable.
 *
 * Read-modify-write on a single object is not safe against two people editing
 * at the same instant; the later write wins. That is fine for a panel one
 * person uses, and it is the tradeoff for needing no database table.
 */

export const dynamic = "force-dynamic";

const ROLE = "marketing-intern";
const OBJECT = `${ROLE}/decisions.json`;

const STATUSES = new Set([
  "New", "Shortlisted", "Interview scheduled", "Interviewed", "Offered",
  "Hired", "On hold", "Move to BD", "Query first", "Ask to resend",
  "Wrong role", "Not applicable", "Rejected", "Duplicate", "Maybe",
]);

type Decision = { status?: string; rating?: number; notes?: string };

export async function POST(request: Request) {
  let body: { id?: unknown; status?: unknown; rating?: unknown; notes?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return Response.json({ error: "id is required" }, { status: 400 });

  const patch: Decision = {};

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
    // Bounded so a runaway client cannot inflate the object.
    patch.notes = body.notes.slice(0, 20000);
  }

  if (Object.keys(patch).length === 0) {
    return Response.json({ error: "Nothing to update" }, { status: 400 });
  }

  const supabase = getServiceClient();
  const storage = supabase.storage.from(HIRING_BUCKET);

  let all: Record<string, Decision> = {};
  const { data } = await storage.download(OBJECT);
  if (data) {
    try {
      all = JSON.parse(await data.text()) as Record<string, Decision>;
    } catch {
      // A corrupt object should not silently wipe every other decision.
      return Response.json(
        { error: "decisions.json is unreadable; re-run upload_supabase.py" },
        { status: 500 },
      );
    }
  }

  all[id] = { ...(all[id] ?? {}), ...patch };

  const { error } = await storage.upload(
    OBJECT,
    new Blob([JSON.stringify(all, null, 1)], { type: "application/json" }),
    { upsert: true, contentType: "application/json" },
  );

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
