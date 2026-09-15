export const dynamic = "force-dynamic";

/* Demo build runs on in-memory data (no database). */
export async function GET() {
  return Response.json({ ok: true, mode: "in-memory", ts: new Date().toISOString() });
}
