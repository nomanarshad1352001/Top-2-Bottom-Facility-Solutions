"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, BadgeCheck, CalendarClock, Camera, CheckCircle2, CreditCard,
  FileText, MapPin, PlusCircle, Receipt, Sparkles, Star,
} from "lucide-react";
import PortalShell from "@/components/portal-shell";
import PhotoCompare from "@/components/photo-compare";
import { Badge, Card } from "@/components/ui";
import { fmt, IMG, vendors } from "@/lib/data";

const upcoming = [
  { d: "Tonight", t: "Nightly janitorial — Tower A", w: "6:00 – 10:00 PM", v: "CrystalClean Crew LLC", id: "WO-2381" },
  { d: "Thu 18", t: "Glass canopy detail — atrium", w: "6:00 – 10:00 AM", v: "Matching vendor", id: "WO-2399" },
  { d: "Sat 20", t: "Garage B2 junk removal", w: "7:00 – 10:00 AM", v: "SwiftHaul Removal Co.", id: "WO-2410" },
];
const invoices = [
  { id: "INV-4482", line: "September services — all sites", amt: 38500, due: "Oct 1", status: "Open" },
  { id: "INV-4439", line: "August services — all sites", amt: 38500, due: "Sep 1", status: "Paid" },
  { id: "INV-4401", line: "July services + floor program", amt: 41200, due: "Aug 1", status: "Paid" },
];

export default function ClientPortal() {
  const [rating, setRating] = useState(0);
  const [paid, setPaid] = useState(false);

  return (
    <PortalShell variant="client" orgName="Meridian Property Group" userName="Carla Nguyen" tabs={["Overview", "Schedule", "Services", "Invoices", "Documents", "Reports"]} active="Overview">
      <div className="space-y-6">
        {/* hero */}
        <div className="relative rounded-3xl overflow-hidden">
          <img src={IMG.atrium} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" />
          <div className="relative p-8 md:p-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow text-gold2">Welcome back</div>
              <h1 className="font-display text-white text-[32px] md:text-[40px] leading-tight mt-2">Meridian Property Group</h1>
              <p className="text-white/65 text-[14px] mt-2 max-w-md">3 services this week across Meridian Tower One & West Commons. Everything on schedule.</p>
            </div>
            <Link href="/request-assessment" className="btn btn-gold"><PlusCircle size={16} /> Request a service</Link>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Open requests", "1", "Canopy glass detail"],
            ["Next service", "Tonight", "6:00 PM · Tower A"],
            ["Open invoices", fmt(38500), "Due Oct 1"],
            ["Satisfaction", "4.9 / 5", "27 verified reviews"],
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
            {/* schedule */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-[22px]">Upcoming services</h3>
                <span className="pill bg-[#dff0e9] text-mint"><CalendarClock size={11} /> All confirmed</span>
              </div>
              <div className="space-y-3">
                {upcoming.map((u) => (
                  <div key={u.id} className="flex items-center gap-4 rounded-2xl border border-line px-5 py-4 hover:border-gold/40 transition-colors">
                    <div className="w-14 text-center shrink-0">
                      <div className="font-display text-[15px] leading-tight">{u.d.split(" ")[0]}</div>
                      <div className="text-[10px] text-mist">{u.d.split(" ")[1] ?? ""}</div>
                    </div>
                    <div className="w-px h-9 bg-line" />
                    <div className="min-w-0">
                      <div className="font-semibold text-[13.5px] truncate">{u.t}</div>
                      <div className="text-[11.5px] text-mist mt-0.5">{u.w} · {u.v} · {u.id}</div>
                    </div>
                    <span className="ml-auto w-9 h-9 rounded-xl bg-[#f4ead2] text-gold items-center justify-center hidden sm:flex"><MapPin size={15} /></span>
                  </div>
                ))}
              </div>
            </Card>

            {/* evidence */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-display text-[22px]">Verified results — Tower A lobby</h3>
                <Badge label="QA passed · 96/100" t="mint" />
              </div>
              <p className="text-[12.5px] text-mist mb-4 flex items-center gap-1.5"><Camera size={13} /> 9 photos · drag the divider to compare before & after</p>
              <PhotoCompare src={IMG.lobby} label="Tower A — nightly clean" />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
                <span className="text-[12px] text-mist">How was last night’s service?</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)}><Star size={20} className={s <= rating ? "text-gold2 fill-gold2" : "text-champ"} /></button>
                  ))}
                  {rating > 0 && <span className="text-[12px] font-semibold text-mint ml-2">Thank you!</span>}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* invoices */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-[22px]">Invoices</h3>
                <span className="pill bg-[#e8ebf2] text-ink2"><Receipt size={11} /> Autopay ready</span>
              </div>
              <div className="space-y-3">
                {invoices.map((i) => (
                  <div key={i.id} className="rounded-2xl border border-line p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-mist">{i.id}</span>
                      <Badge label={i.status} t={i.status === "Paid" ? "mint" : "gold"} dot={false} />
                    </div>
                    <div className="text-[13px] font-semibold mt-1.5">{i.line}</div>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="font-display text-[19px]">{fmt(i.amt)}</span>
                      <span className="text-[11px] text-mist">Due {i.due}</span>
                    </div>
                    {i.status === "Open" && (
                      <button onClick={() => setPaid(true)} className={`mt-3 w-full btn ${paid ? "btn-ghost" : "btn-ink"} !py-2.5 text-[12.5px]`}>
                        {paid ? <><CheckCircle2 size={14} className="text-mint" /> Payment scheduled</> : <><CreditCard size={14} /> Pay securely</>}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* approval */}
            <Card className="p-6 border-l-4 !border-l-gold">
              <div className="flex items-center gap-2 text-gold font-semibold text-[12px]"><Sparkles size={14} /> Awaiting your approval</div>
              <h3 className="font-display text-[19px] mt-2">Q4 floor care program</h3>
              <p className="text-[12.5px] text-mist mt-1.5 leading-relaxed">Quarterly refinish — Tower A lobby + Plaza Pavilion. Includes before/after evidence and tenant notices.</p>
              <div className="flex items-baseline gap-2 mt-3"><span className="font-display text-[24px]">{fmt(3400)}</span><span className="text-[11px] text-mist">one-time · EST-0917</span></div>
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <button className="btn btn-ghost !py-2.5 text-[12.5px]"><FileText size={13} /> Review</button>
                <button className="btn btn-gold !py-2.5 text-[12.5px]"><BadgeCheck size={14} /> Approve</button>
              </div>
            </Card>

            {/* docs */}
            <Card className="p-6">
              <h3 className="font-display text-[22px] mb-4">Your documents</h3>
              <div className="space-y-2.5">
                {[["Master Service Agreement", "v3.2 · expires Sep 2027"], ["Q3 Performance Report", "PDF · Sep 5"], ["COI — Top 2 Bottom", "Current · $2M GL"]].map(([n, s]) => (
                  <div key={n} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 hover:border-gold/40 transition-colors cursor-pointer">
                    <span className="w-9 h-9 rounded-lg bg-pearl flex items-center justify-center text-gold"><FileText size={15} /></span>
                    <div className="min-w-0"><div className="text-[12.5px] font-semibold truncate">{n}</div><div className="text-[10.5px] text-mist">{s}</div></div>
                    <ArrowRight size={13} className="ml-auto text-mist" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
