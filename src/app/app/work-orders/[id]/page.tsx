import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowUpRight, BadgeCheck, CalendarClock, Camera, CheckCircle2,
  CircleAlert, FileSignature, MapPin, MessageSquare, Repeat2, ShieldCheck, Timer,
} from "lucide-react";
import PhotoCompare from "@/components/photo-compare";
import { Avatar, Badge, Card } from "@/components/ui";
import { fmt, IMG, inspections, vendors, workOrders, woTone } from "@/lib/data";

export function generateStaticParams() {
  return workOrders.map((w) => ({ id: w.id }));
}

const evImg = [IMG.lobby, IMG.atrium, IMG.corridor, IMG.woodLobby, IMG.cart, IMG.escalator];

export default async function WorkOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wo = workOrders.find((w) => w.id === id);
  if (!wo) notFound();
  const vendor = vendors.find((v) => v.id === wo.vendorId);
  const qa = inspections.find((i) => i.wo === wo.id);
  const done = wo.checklist.filter((c) => c.done).length;
  const margin = wo.cost > 0 ? Math.round(((wo.estimate - wo.cost) / wo.estimate) * 100) : null;

  const timeline: [string, string, string][] = [
    ["Work order generated", wo.source === "Recurring" ? `Auto-generated from ${wo.agreement}` : "Created from client request", "Sep 12 · 11:02 PM"],
    ["Dispatched", vendor ? `Offered to ${vendor.name} — matched by territory, compliance & capacity` : "Awaiting vendor match", "Sep 13 · 8:14 AM"],
    ["Accepted", vendor ? `${vendor.name} confirmed crew of ${Math.min(vendor.crew, 3)}` : "—", vendor ? "Sep 13 · 8:41 AM" : "—"],
    ["Service window", wo.window, wo.date],
    ...(done > 0 ? [["Checklist & evidence", `${done}/${wo.checklist.length} items · ${wo.photos} photos submitted`, "Field · verified GPS"]] as [string, string, string][] : []),
    ...(qa ? [[`QA ${qa.result}`, `${qa.type} · score ${qa.score}/100 · ${qa.inspector}`, qa.date] as [string, string, string]] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/app/work-orders" className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center hover:border-gold/50 hover:text-gold transition-all"><ArrowLeft size={16} /></Link>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] font-bold text-mist">{wo.id}</span>
              <Badge label={wo.status} t={woTone[wo.status]} />
              <Badge label={wo.priority} t={wo.priority === "Emergency" ? "rouge" : wo.priority === "High" ? "amber" : "gray"} dot={false} />
              {wo.source === "Recurring" && <span className="pill bg-[#e8ebf2] text-ink2"><Repeat2 size={11} /> {wo.agreement}</span>}
            </div>
            <h2 className="font-display display-tight text-[28px] mt-1">{wo.title}</h2>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button className="btn btn-ghost !py-2.5 !px-4 text-[13px]"><MessageSquare size={15} /> Message vendor</button>
          <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><BadgeCheck size={15} /> Reassign</button>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* left main */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                [MapPin, "Site", `${wo.site}${wo.building ? ` · ${wo.building}` : ""}`, wo.client],
                [CalendarClock, "Window", wo.date, wo.window],
                [Timer, "Service", wo.service, `Priority: ${wo.priority}`],
              ].map(([Icon, l, v, s]: any) => (
                <div key={l} className="flex gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-[#f4ead2] text-gold flex items-center justify-center shrink-0"><Icon size={16} /></span>
                  <div className="min-w-0"><div className="text-[10.5px] uppercase tracking-[0.16em] text-mist font-semibold">{l}</div><div className="font-semibold text-[13.5px] mt-0.5 truncate">{v}</div><div className="text-[11.5px] text-mist truncate">{s}</div></div>
                </div>
              ))}
            </div>
          </Card>

          {/* checklist */}
          <Card className="p-7">
            <div className="flex items-center justify-between mb-1">
              <div className="font-display text-[22px]">Completion checklist</div>
              <span className="text-[13px] font-semibold text-mist">{done}/{wo.checklist.length} complete</span>
            </div>
            <div className="h-1.5 rounded-full bg-ivory overflow-hidden mb-6">
              <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold2 transition-all" style={{ width: `${(done / wo.checklist.length) * 100}%` }} />
            </div>
            <div className="space-y-1">
              {wo.checklist.map((c, i) => (
                <div key={c.item} className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 border ${c.done ? "border-line bg-pearl/70" : "border-dashed border-line bg-white"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${c.done ? "bg-mint text-white" : "border-2 border-mist/30"}`}>
                    {c.done ? <CheckCircle2 size={14} /> : <span className="text-[9px] font-bold text-mist">{i + 1}</span>}
                  </span>
                  <span className={`text-[13.5px] font-medium ${c.done ? "text-ink2" : "text-mist"}`}>{c.item}</span>
                  {c.done && <span className="ml-auto text-[10px] font-bold text-mint uppercase tracking-wider">Verified</span>}
                </div>
              ))}
            </div>
          </Card>

          {/* evidence */}
          <Card className="p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-display text-[22px]">Service evidence</div>
                <div className="text-[12.5px] text-mist mt-0.5 flex items-center gap-1.5"><Camera size={13} /> {wo.photos > 0 ? `${wo.photos} photos · GPS-stamped · drag the divider to compare` : "Evidence unlocks when the checklist is submitted"}</div>
              </div>
              {wo.photos > 0 && <Badge label="Client-visible" t="mint" />}
            </div>
            {wo.photos > 0 ? (
              <>
                <PhotoCompare src={evImg[0]} label={wo.building ?? wo.site} />
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mt-3">
                  {evImg.map((s, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-line hover:border-gold/60 transition-all cursor-pointer group">
                      <img src={s} alt="" className="h-16 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid sm:grid-cols-3 gap-2.5 opacity-45">
                {evImg.slice(0, 3).map((s, i) => <div key={i} className="rounded-xl overflow-hidden"><img src={s} alt="" className="h-28 w-full object-cover grime" /></div>)}
              </div>
            )}
          </Card>

          {/* QA result */}
          {qa && (
            <Card className={`p-7 border-l-4 ${qa.result === "Fail" ? "!border-l-rouge" : qa.result === "Pass" ? "!border-l-mint" : "!border-l-gold"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className={`w-11 h-11 rounded-2xl flex items-center justify-center ${qa.result === "Fail" ? "bg-[#f8e1de] text-rouge" : qa.result === "Pass" ? "bg-[#dff0e9] text-mint" : "bg-[#f4ead2] text-gold"}`}><ShieldCheck size={18} /></span>
                  <div>
                    <div className="font-semibold text-[15px]">QA {qa.result === "Pending" ? "review in progress" : qa.result.toLowerCase()} · score {qa.score}/100</div>
                    <div className="text-[12px] text-mist">{qa.id} · {qa.type} · {qa.inspector} · {qa.date}</div>
                  </div>
                </div>
                <Link href="/app/qa" className="text-[12.5px] font-semibold text-gold flex items-center gap-1">Open inspection <ArrowUpRight size={14} /></Link>
              </div>
              {qa.issues.length > 0 && (
                <div className="mt-5 space-y-2.5">
                  {qa.issues.map((iss, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-pearl border border-line px-4 py-3">
                      <CircleAlert size={15} className={iss.severity === "High" ? "text-rouge mt-0.5" : "text-amber mt-0.5"} />
                      <div className="text-[12.5px]"><span className="font-semibold">{iss.area}</span> — {iss.note}</div>
                      <Badge label={iss.status} t={iss.status === "Open" ? "rouge" : "mint"} />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* right rail */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-4">Assigned partner</div>
            {vendor ? (
              <div>
                <div className="flex items-center gap-3.5">
                  <Avatar name={vendor.name} size={46} />
                  <div>
                    <div className="font-semibold text-[15px]">{vendor.name}</div>
                    <div className="text-[11.5px] text-mist">{vendor.city} · crew {vendor.crew}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  {[["Rating", `★ ${vendor.rating}`], ["On-time", `${vendor.onTime}%`], ["COI", vendor.coiStatus]].map(([l, v]) => (
                    <div key={l} className="rounded-xl bg-pearl border border-line py-2.5">
                      <div className="text-[13px] font-semibold">{v}</div>
                      <div className="text-[9.5px] text-mist uppercase tracking-wider mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-[#e8c9c4] bg-[#fdf3f2] p-5 text-center">
                <CircleAlert className="text-rouge mx-auto" size={22} />
                <div className="font-semibold text-[13.5px] mt-2 text-rouge">Unassigned — escalation armed</div>
                <p className="text-[11.5px] text-mist mt-1">Vendor manager alerted · 3 matches found by territory & compliance.</p>
                <button className="btn btn-gold !py-2 !px-4 text-[12px] mt-3 w-full">Auto-match vendor</button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-4">Commercials</div>
            <div className="space-y-3">
              <div className="flex justify-between text-[13.5px]"><span className="text-mist">Client price</span><span className="font-display text-[17px]">{fmt(wo.estimate)}</span></div>
              <div className="flex justify-between text-[13.5px]"><span className="text-mist">Vendor cost</span><span className="font-semibold">{wo.cost > 0 ? fmt(wo.cost) : "—"}</span></div>
              <div className="gold-line" />
              <div className="flex justify-between items-center">
                <span className="text-mist text-[13.5px]">Gross margin</span>
                {margin !== null ? <Badge label={`${margin}% · ${fmt(wo.estimate - wo.cost)}`} t={margin >= 30 ? "mint" : "amber"} dot={false} /> : <span className="text-mist text-[13px]">Pending assignment</span>}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-5">Audit timeline</div>
            <div className="relative pl-5 space-y-5">
              <span className="absolute left-[5px] top-1.5 bottom-2 w-px bg-line" />
              {timeline.map(([t, d, w], i) => (
                <div key={i} className="relative">
                  <span className={`absolute -left-5 top-0.5 w-[11px] h-[11px] rounded-full border-2 ${i === timeline.length - 1 ? "border-gold bg-gold/40" : "border-mist/40 bg-white"}`} />
                  <div className="text-[13px] font-semibold">{t}</div>
                  <div className="text-[11.5px] text-mist leading-snug mt-0.5">{d}</div>
                  <div className="text-[10px] text-mist/70 mt-0.5">{w}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-ink !border-ink text-ivory noise relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-2 text-gold2"><FileSignature size={15} /><span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold">Controls</span></div>
              <ul className="mt-3.5 space-y-2.5 text-[12px] text-white/70">
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-mint shrink-0 mt-0.5" /> Closure requires verified QA pass — not just submission</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-mint shrink-0 mt-0.5" /> Recurring lineage retained ({wo.agreement ?? "one-time"})</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-mint shrink-0 mt-0.5" /> Access notes permission-gated until authorized</li>
                <li className="flex gap-2"><CheckCircle2 size={14} className="text-mint shrink-0 mt-0.5" /> Missed-service & conflict alerts armed</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
