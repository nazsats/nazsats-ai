import { getServiceClient, HIRING_BUCKET } from "@/lib/supabase/service";

/**
 * Stream one CV out of the private hiring-cvs bucket.
 *
 * The bucket has no public URL, so this handler is the only way in — and it
 * lives under /hiring, which proxy.ts guards with Basic Auth. The service role
 * downloads the object server-side; the browser never sees a Supabase URL or
 * key.
 */

export const dynamic = "force-dynamic";

// Only ever serve what the pipeline actually produces.
const ALLOWED = /^[a-z0-9-]+\/(resumes|extracted|scanned-previews)\/[^/]+$/;

const TYPES: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  txt: "text/plain; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ object: string[] }> },
) {
  const { object } = await params;
  const objectPath = (object ?? []).map(decodeURIComponent).join("/");

  // Reject traversal and anything outside the expected shape before it
  // reaches storage.
  if (
    !objectPath ||
    objectPath.includes("..") ||
    objectPath.startsWith("/") ||
    !ALLOWED.test(objectPath)
  ) {
    return new Response("Not found", { status: 404 });
  }

  const supabase = getServiceClient();
  const { data, error } = await supabase.storage
    .from(HIRING_BUCKET)
    .download(objectPath);

  if (error || !data) {
    return new Response("Not found", { status: 404 });
  }

  const ext = objectPath.split(".").pop()?.toLowerCase() ?? "";
  const filename = objectPath.split("/").pop() ?? "file";

  return new Response(data, {
    headers: {
      "content-type": TYPES[ext] ?? "application/octet-stream",
      // inline so PDFs open in the browser rather than downloading
      "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "cache-control": "no-store, private",
      "x-robots-tag": "noindex, nofollow, noarchive",
      "x-content-type-options": "nosniff",
    },
  });
}
