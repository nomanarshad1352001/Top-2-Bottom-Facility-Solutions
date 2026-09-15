"use client";
import { useState } from "react";
import {
  BadgeCheck, CircleAlert, FileWarning, Gauge, MapPin, Plus, ShieldCheck,
  Star, TrendingUp, UserPlus, X,
} from "lucide-react";
import { Avatar, Badge, Card } from "@/components/ui";
import { fmt, vendorBills, vendors, type Vendor } from "@/lib/data";

const lifecycle = ["Application", "Review & docs", "Agreement", "Approval", "Invitation", "Quote", "Assignment", "Evidence", "Invoice", "Payment"];

export default function Vendors() {
  const [active, setActive] = useState<Vendor | null>(null);
  const [tab, setTab] = useState<"All" | "Approved" | "Pipeline">("All");
  const rows = vendors.filter((v) => tab === "All" ? true : tab === "Approved" ? v.status === "Approved" : v.status !== "Approved");
  const expiring = vendors.filter((v) => v.coiStatus === "Expiring");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Vendor lifecycle · application → payment</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Vendor network</h2>
        </div>
        <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><UserPlus size={15} /> Invite vendor</button>
      </div>

      {/* lifecycle strip */}
      <Card className="px-6 py-5 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-[860px]">
          {lifecycle.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className={`w-7 h-7 rounded-full text-[10.5px] font-bold flex items-center justify-center ${i < 4 ? "bg-ink text-gold2" : i < 7 ? "bg-[#f4ead2] text-gold" : "bg-ivory text-mist border border-line"}`}>{i + 1}</span>
                <span className={`text-[9.5px] font-semibold tracking-wide whitespace-nowrap ${i < 4 ? "text-ink" : "text-mist"}`}>{s}</span>
              </div>
              {i < lifecycle.length - 1 && <span className={`flex-1 h-px mx-1 ${i < 3 ? "bg-ink/30" : "bg-line"}`} />}
            </div>
          ))}
        </div>
      </Card>

      {expiring.length > 0 && (
        <div className="rounded-2xl border border-[#eecfb0] bg-[#fdf4e6] px-5 py-4 flex flex-wrap items-center gap-4">
          <span className="w-10 h-10 rounded-xl bg-white text-amber flex items-center justify-center shrink-0"><FileWarning size={17} /></span>
          <div className="flex-1 min-w-[220px]">
            <div className="font-semibold text-[13.5px]">Compliance watch — {expiring.length} certificates expiring within 45 days</div>
            <div className="text-[12px] text-mist">{expiring.map((v) => `${v.name} (${v.coiExpiry})`).join(" · ")} — renewal requests auto-sent.</div>
          </div>
          <button className="btn btn-ghost !py-2 !px-4 text-[12px]">Manage documents</button>
        </div>
      )}

      <div className="flex gap-2">
        {(["All", "Approved", "Pipeline"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pill border ${tab === t ? "bg-ink text-ivory border-ink" : "bg-white border-line text-ink2 hover:border-gold/50"}`}>
            {t} ({t === "All" ? vendors.length : t === "Approved" ? vendors.filter((v) => v.status === "Approved").length : vendors.filter((v) => v.status !== "Approved").length})
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rows.map((v) => (
          <button key={v.id} onClick={() => setActive(v)} className="card card-hover p-6 text-left">
            <div className="flex items-start gap-4">
              <Avatar name={v.name} size={46} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[15px] truncate">{v.name}</span>
                  {v.coiStatus === "Expiring" && <span className="w-2 h-2 rounded-full bg-amber shrink-0" title="COI expiring" />}
                  {v.coiStatus === "Expired" && <span className="w-2 h-2 rounded-full bg-rouge shrink-0" title="COI expired" />}
                </div>
                <div className="text-[11.5px] text-mist mt-0.5 flex items-center gap-1"><MapPin size={11} /> {v.city} · {v.radius}-mi radius</div>
              </div>
              <Badge label={v.status} t={v.status === "Approved" ? "mint" : v.status === "Probation" ? "amber" : "sky"} dot={false} />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {v.services.map((s) => <span key={s} className="pill bg-ivory text-ink2 border border-line !text-[10px]">{s}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5 text-center">
              {[
                ["Rating", v.rating > 0 ? `★ ${v.rating}` : "New"],
                ["Jobs", v.jobsDone.toString()],
                ["On-time", v.onTime > 0 ? `${v.onTime}%` : "—"],
              ].map(([l, val]) => (
                <div key={l} className="rounded-xl bg-pearl border border-line py-2.5"><div className="text-[13.5px] font-semibold">{val}</div><div className="text-[9px] text-mist uppercase tracking-widest mt-0.5">{l}</div></div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-[10.5px] text-mist mb-1.5"><span className="flex items-center gap-1"><Gauge size={11} /> Capacity this week</span><span className="font-bold text-ink2">{v.capacity}%</span></div>
              <div className="h-1.5 rounded-full bg-ivory overflow-hidden"><div className={`h-full rounded-full ${v.capacity > 80 ? "bg-rouge" : v.capacity > 60 ? "bg-gold" : "bg-mint"}`} style={{ width: `${v.capacity}%` }} /></div>
            </div>
          </button>
        ))}
      </div>

      {/* drawer */}
      {active && (
        <>
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] z-40" onClick={() => setActive(null)} />
          <aside className="fixed right-0 top-0 bottom-0 w-full max-w-[440px] bg-pearl z-50 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 glass border-b border-line px-6 py-4 flex items-center justify-between">
              <Badge label={active.status} t={active.status === "Approved" ? "mint" : "sky"} />
              <button onClick={() => setActive(null)} className="w-8 h-8 rounded-full hover:bg-ivory flex items-center justify-center"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar name={active.name} size={56} />
                <div>
                  <h3 className="font-display text-[22px] leading-tight">{active.name}</h3>
                  <div className="text-[12px] text-mist">Owner: {active.owner} · crew of {active.crew} · {active.city}</div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-gold">
                    {active.rating > 0 && <>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={i < Math.round(active.rating) ? "fill-gold" : "text-champ"} />)}<span className="text-[11.5px] text-mist ml-1">{active.rating} · {active.jobsDone} jobs</span></>}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-line rounded-2xl p-5">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-3.5">Compliance dossier</div>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-center gap-2.5"><BadgeCheck size={15} className={active.w9 ? "text-mint" : "text-rouge"} /> W-9 on file <span className={`ml-auto pill ${active.w9 ? "bg-[#dff0e9] text-mint" : "bg-[#f8e1de] text-rouge"}`}>{active.w9 ? "Verified" : "Missing"}</span></div>
                  <div className="flex items-center gap-2.5"><ShieldCheck size={15} className={active.coiStatus === "Valid" ? "text-mint" : active.coiStatus === "Expiring" ? "text-amber" : "text-rouge"} /> Certificate of insurance <span className={`ml-auto pill ${active.coiStatus === "Valid" ? "bg-[#dff0e9] text-mint" : active.coiStatus === "Expiring" ? "bg-[#f8e8d8] text-amber" : "bg-[#f8e1de] text-rouge"}`}>{active.coiStatus}{active.coiExpiry !== "—" ? ` · ${active.coiExpiry}` : ""}</span></div>
                  <div className="flex items-center gap-2.5"><BadgeCheck size={15} className="text-mint" /> Background-checked crews <span className="ml-auto pill bg-[#dff0e9] text-mint">Current</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-line rounded-2xl p-4"><div className="text-[10px] uppercase tracking-widest text-mist font-semibold">Pending payout</div><div className="font-display text-[24px] mt-1">{fmt(active.pendingPay)}</div><div className="text-[11px] text-mist">{active.payoutTerms}</div></div>
                <div className="bg-white border border-line rounded-2xl p-4"><div className="text-[10px] uppercase tracking-widest text-mist font-semibold">Performance</div><div className="font-display text-[24px] mt-1 flex items-center gap-1.5"><TrendingUp size={18} className="text-mint" />{active.onTime > 0 ? `${active.onTime}%` : "—"}</div><div className="text-[11px] text-mist">on-time completion</div></div>
              </div>

              {active.status !== "Approved" ? (
                <div className="rounded-2xl border-2 border-dashed border-gold/40 bg-champ/20 p-5 text-center">
                  <CircleAlert className="text-gold mx-auto" size={20} />
                  <div className="font-semibold text-[13.5px] mt-2">Complete onboarding checklist</div>
                  <p className="text-[11.5px] text-mist mt-1">Docs, rates & agreement signing gate the first invitation.</p>
                  <button className="btn btn-gold !py-2 text-[12px] mt-3 w-full">Advance to review</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <button className="btn btn-ink !py-2.5 text-[12px]"><Plus size={13} /> Invite to quote</button>
                  <button className="btn btn-ghost !py-2.5 text-[12px]">Rate card</button>
                </div>
              )}

              <div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-3">Recent bills</div>
                <div className="space-y-2">
                  {vendorBills.filter((b) => b.vendor === active.name).map((b) => (
                    <div key={b.id} className="flex items-center gap-3 bg-white border border-line rounded-xl px-4 py-3 text-[12.5px]">
                      <span className="font-bold text-mist">{b.id}</span>
                      <span className="font-medium">{b.wo}</span>
                      <span className="ml-auto font-display">{fmt(b.amount)}</span>
                      <Badge label={b.status} t={b.status === "Paid" ? "mint" : b.status === "Pending Review" ? "amber" : "sky"} dot={false} />
                    </div>
                  ))}
                  {vendorBills.filter((b) => b.vendor === active.name).length === 0 && <p className="text-[12px] text-mist italic">No bills yet.</p>}
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
