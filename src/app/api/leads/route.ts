import { NextResponse } from "next/server";

/* Demo lead-capture endpoint (in-memory; no database).
   Production: persists to CRM, dedupes by email+company, notifies owner,
   records conversion attribution. */
const seen = new Map<string, number>();

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.company || !body?.email) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  const key = `${String(body.email).toLowerCase()}|${String(body.company).toLowerCase()}`;
  const duplicate = seen.has(key);
  const id = seen.get(key) ?? 1043 + seen.size;
  seen.set(key, id);

  return NextResponse.json({
    ok: true,
    leadId: `LD-${id}`,
    duplicate,
    crm: "created-or-updated",
    attribution: body.utm ?? { source: "direct" },
    consentRecorded: { sms: Boolean(body.smsConsent), at: new Date().toISOString() },
    workflow: ["notify-sales-owner", "schedule-assessment-task", "confirmation-email"],
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, captured: seen.size });
}
