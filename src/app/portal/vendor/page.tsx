"use client";
import { useState } from "react";
import {
  BadgeCheck, CalendarClock, Camera, CheckCircle2, ChevronDown, CircleDollarSign,
  FileText, MapPin, ShieldCheck, Star, Upload, Wallet, XCircle,
} from "lucide-react";
import PortalShell from "@/components/portal-shell";
import { Badge, Card } from "@/components/ui";
import { fmt, IMG } from "@/lib/data";

type Opp = { id: string; title: string; site: string; when: string; pay: number; distance: string; status: "open" | "accepted" | "declined" };
const initialOpps: Opp[] = [
  { id: "OP-331", title: "Nightly janitorial — Foundry Coworking", site: "Midtown · 2.1 mi", when: "Starts Mon · 6–10 PM · 5×/wk", pay: 3960, distance: "2.1 mi", status: "open" },
  { id: "OP-330", title: "Day porter — Plaza Pavilion", site: "Downtown · 4.8 mi", when: "Thu 18 · 10 AM – 2 PM", pay: 170, distance: "4.8 mi", status: "open" },
  { id: "OP-329", title: "Post-construction rough clean — L3", site: "Westside · 6.2 mi", when: "Wed 17 · 7 AM – 4 PM", pay: 2980, distance: "6.2 mi", status: "open" },
];

const jobs = [
  { id: "WO-2381", title: "Nightly janitorial — Tower A", when: "Tonight · 6:00 – 10:00 PM", site: "Meridian Tower One", checklist: [ ["Lobby glass & entry detail", true], ["Restrooms sanitize + restock", true], ["Breakroom degrease", false], ["Trash & recycling pull", false], ["Vacuum common corridors", false] ] as [string, boolean][], photos: 4 },
  { id: "WO-2396", title: "Rough clean — Foundry District L3", when: "Wed 17 · 7:00 AM – 4:00 PM", site: "The Foundry District", checklist: [ ["Debris removal 24 units", false], ["Dust walls + vents", false], ["Window scrape + wash", false] ] as [string, boolean][], photos: 0 },
];
const payouts = [
  { id: "VB-3301", ref: "WO-2381 · nightly janitorial", amt: 760, status: "Approved", eta: "Sep 30" },
  { id: "VB-3288", ref: "WO-2412 · high dusting", amt: 900, status: "Scheduled", eta: "Sep 22" },
  { id: "VB-3255", ref: "WO-2344 · turnover surge", amt: 2620, status: "Paid", eta: "Paid Sep 12" },
];

export default function VendorPortal() {
  const [opps, setOpps] = useState(initialOpps);
  const [openJob, setOpenJob] = useState<string | null>("WO-2381");
  const [checkState, setCheckState] = useState<Record<string, boolean[]>>(() => Object.fromEntries(jobs.map((j) => [j.id, j.checklist.map((c) => c[1])])));
  const [uploaded, setUploaded] = useState(4);

  const respond = (id: string, status: "accepted" | "declined") => setOpps((o) => o.map((x) => x.id === id ? { ...x, status } : x));
  const toggle = (jobId: string, i: number) => setCheckState((s) => ({ ...s, [jobId]: s[jobId].map((v, idx) => idx === i ? !v : v) }));

  return (
    <PortalShell variant="vendor" orgName="CrystalClean Crew LLC" userName="Marisol Vega" tabs={["Overview", "Opportunities", "My Jobs", "Schedule", "Payouts", "Compliance"]} active="Overview">
      <div className="space-y-6">
        {/* hero */}
        <div className="relative rounded-3xl overflow-hidden">
          <img src={IMG.team} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
          <div className="relative p-8 md:p-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow text-gold2">Vendor network · partner since 2023</div>
              <h1 className="font-display text-white text-[32px] md:text-[40px] leading-tight mt-2">CrystalClean Crew LLC</h1>
              <div className="flex flex-wrap items-center gap-2.5 mt-3">
                <span className="pill bg-mint/90 text-white"><BadgeCheck size={11} /> Approved partner</span>
                <span className="pill bg-white/15 text-white border border-white/20"><Star size={11} className="fill-white" /> 4.9 · 842 jobs</span>
                <span className="pill bg-white/15 text-white border border-white/20">COI valid · $2M GL</span>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="text-[10.5px] uppercase tracking-widest text-white/60">Next payout</div>
              <div className="font-display text-[34px]">{fmt(1660)} <span className="text-sm text-white/60">· Sep 22</span></div>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["New opportunities", String(opps.filter((o) => o.status === "open").length), "respond within 4h for priority"],
            ["Active jobs", "2", "1 tonight · 1 Wednesday"],
            ["This month earned", fmt(9310), "11 verified completions"],
            ["Compliance", "Green", "COI · W-9 · background checks"],
          ].map(([l, v, s]) => (
            <Card key={l as string} className="px-5 py-4">
              <div className="text-[10.5px] uppercase tracking-widest text-mist font-semibold">{l}</div>
              <div className="font-display text-[24px] mt-1">{v}</div>
              <div className="text-[11px] text-mist">{s}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          <div className="lg:col-span-3 space-y-6">
            {/* opportunities */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-[22px]">Opportunities for you</h3>
                <span className="pill bg-[#f4ead2] text-gold">Matched by territory & capability</span>
              </div>
              <div className="space-y-3.5">
                {opps.map((o) => (
                  <div key={o.id} className={`rounded-2xl border p-5 transition-all ${o.status === "accepted" ? "border-mint/50 bg-[#eef6f2]" : o.status === "declined" ? "border-line opacity-55" : "border-line hover:border-gold/40"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[10.5px] font-bold text-mist">{o.id} · expires in 3h 42m</div>
                        <div className="font-semibold text-[14.5px] mt-1">{o.title}</div>
                        <div className="text-[12px] text-mist mt-1 flex flex-wrap gap-x-4 gap-y-1">
                          <span className="flex items-center gap-1"><MapPin size={11} /> {o.site}</span>
                          <span className="flex items-center gap-1"><CalendarClock size={11} /> {o.when}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[10px] uppercase tracking-widest text-mist">Your rate</div>
                        <div className="font-display text-[22px]">{fmt(o.pay)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2.5 mt-4">
                      {o.status === "open" ? (
                        <>
                          <button onClick={() => respond(o.id, "accepted")} className="btn btn-gold !py-2.5 !px-5 text-[12.5px] flex-1"><CheckCircle2 size={14} /> Accept</button>
                          <button onClick={() => respond(o.id, "declined")} className="btn btn-ghost !py-2.5 !px-5 text-[12.5px]"><XCircle size={14} /> Decline</button>
                        </>
                      ) : o.status === "accepted" ? (
                        <span className="pill bg-mint text-white !px-4 !py-2"><CheckCircle2 size={13} /> Accepted — work order issued & agreement attached</span>
                      ) : (
                        <span className="pill bg-[#eceee8] text-mist !px-4 !py-2">Declined — shared with next eligible partner</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* jobs */}
            <Card className="p-6">
              <h3 className="font-display text-[22px] mb-5">Active jobs & checklists</h3>
              <div className="space-y-3.5">
                {jobs.map((j) => {
                  const checks = checkState[j.id];
                  const done = checks.filter(Boolean).length;
                  return (
                    <div key={j.id} className="rounded-2xl border border-line overflow-hidden">
                      <button onClick={() => setOpenJob(openJob === j.id ? null : j.id)} className="w-full flex items-center gap-4 px-5 py-4 bg-pearl/70 hover:bg-pearl text-left">
                        <span className="relative w-10 h-10 rounded-full border-[3px] border-line flex items-center justify-center shrink-0 font-bold text-[11px] text-ink2"
                          style={{ borderColor: done === j.checklist.length ? "#17745c" : undefined }}>
                          {done}/{j.checklist.length}
                        </span>
                        <div className="min-w-0">
                          <div className="font-semibold text-[14px] truncate">{j.title}</div>
                          <div className="text-[11.5px] text-mist">{j.id} · {j.when} · {j.site}</div>
                        </div>
                        <ChevronDown size={16} className={`ml-auto text-mist transition-transform ${openJob === j.id ? "rotate-180" : ""}`} />
                      </button>
                      {openJob === j.id && (
                        <div className="p-5 bg-white space-y-2.5">
                          {j.checklist.map(([item], i) => (
                            <button key={item} onClick={() => toggle(j.id, i)} className={`w-full flex items-center gap-3.5 rounded-xl px-4 py-3 border text-left transition-all ${checks[i] ? "border-mint/40 bg-[#eef6f2]" : "border-dashed border-line"}`}>
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${checks[i] ? "bg-mint text-white" : "border-2 border-mist/30"}`}>{checks[i] && <CheckCircle2 size={14} />}</span>
                              <span className={`text-[13.5px] font-medium ${checks[i] ? "" : "text-mist"}`}>{item}</span>
                            </button>
                          ))}
                          <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 text-[12.5px] font-semibold text-gold cursor-pointer">
                              <Upload size={14} /> Upload proof photos ({uploaded} attached)
                              <input type="file" multiple className="hidden" onChange={() => setUploaded((u) => u + 2)} />
                            </label>
                            <span className="text-[11px] text-mist flex items-center gap-1"><Camera size={11} /> QA reviews before closure</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* payouts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-[22px]">Payouts</h3>
                <span className="pill bg-[#dff0e9] text-mint"><Wallet size={11} /> Net 15</span>
              </div>
              <div className="space-y-3">
                {payouts.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-line p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-mist">{p.id}</span>
                      <Badge label={p.status} t={p.status === "Paid" ? "mint" : p.status === "Approved" ? "gold" : "sky"} dot={false} />
                    </div>
                    <div className="text-[12.5px] font-semibold mt-1.5">{p.ref}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display text-[18px]">{fmt(p.amt)}</span>
                      <span className="text-[11px] text-mist">{p.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-pearl border border-line p-4 mt-4 text-[12px] text-mist flex gap-2.5">
                <ShieldCheck size={15} className="text-mint shrink-0" />
                Payments release only after QA verifies your evidence — keeps disputes at zero.
              </div>
            </Card>

            {/* compliance */}
            <Card className="p-6">
              <h3 className="font-display text-[22px] mb-4">Compliance & rates</h3>
              <div className="space-y-2.5 text-[13px]">
                {[["W-9 on file", "Verified", "mint"], ["COI — $2M general liability", "Valid · Mar 2027", "mint"], ["Crew background checks", "14/14 current", "mint"], ["Rate card — janitorial", "$32–38 / labor hr", "ink"]].map(([l, v, t]) => (
                  <div key={l as string} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
                    <span className="font-medium">{l}</span>
                    <span className={`pill ${t === "mint" ? "bg-[#dff0e9] text-mint" : "bg-[#e8ebf2] text-ink2"}`}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-ghost w-full !py-2.5 text-[12.5px] mt-4"><FileText size={13} /> View vendor agreement</button>
            </Card>

            {/* earnings highlight */}
            <Card className="p-6 bg-ink !border-ink text-ivory noise relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center gap-2 text-gold2 text-[12px] font-semibold"><CircleDollarSign size={15} /> September earnings</div>
                <div className="font-display text-[36px] mt-2">{fmt(9310)}</div>
                <div className="text-white/55 text-[12px] mt-1">11 verified completions · on pace for {fmt(18200)} · your best month yet</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
