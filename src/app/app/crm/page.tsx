"use client";
import { useMemo, useState } from "react";
import {
  Building2, CalendarClock, CheckCircle2, Clock3, Filter, Mail, MapPin, MessageSquare,
  Phone, Plus, ShieldCheck, TrendingUp, X,
} from "lucide-react";
import { Avatar, Badge, Card } from "@/components/ui";
import { fmt, leads, LEAD_STAGES, leadTone, type Lead } from "@/lib/data";

export default function CRM() {
  const [division, setDivision] = useState<"All" | "Facility Solutions" | "Consulting">("All");
  const [active, setActive] = useState<Lead | null>(null);
  const rows = useMemo(() => leads.filter((l) => division === "All" || l.division === division), [division]);
  const pipelineValue = rows.filter((l) => !["Won", "Lost"].includes(l.stage)).reduce((a, l) => a + l.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">CRM · lead intake to conversion</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Pipeline command</h2>
        </div>
        <div className="flex items-center gap-2.5">
          {(["All", "Facility Solutions", "Consulting"] as const).map((d) => (
            <button key={d} onClick={() => setDivision(d)} className={`pill border transition-all ${division === d ? "bg-ink text-ivory border-ink" : "bg-white text-ink2 border-line hover:border-gold/50"}`}>
              {d === "All" ? "All divisions" : d}
            </button>
          ))}
          <button className="btn btn-gold !py-2 !px-4 text-[13px]"><Plus size={15} /> Add lead</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Open pipeline", fmt(pipelineValue), TrendingUp],
          ["New today", "2 leads", Plus],
          ["Avg. first response", "14 min", Clock3],
          ["Win rate · Q3", "31%", TrendingUp],
        ].map(([l, v, Icon]: any) => (
          <Card key={l} className="p-4.5 px-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-[#f4ead2] text-gold flex items-center justify-center"><Icon size={17} /></span>
            <div><div className="text-[11px] uppercase tracking-widest text-mist font-semibold">{l}</div><div className="font-display text-[22px] mt-0.5">{v}</div></div>
          </Card>
        ))}
      </div>

      {/* kanban */}
      <div className="overflow-x-auto pb-3 -mx-1 px-1">
        <div className="flex gap-4 min-w-[1180px]">
          {LEAD_STAGES.map((stage) => {
            const inStage = rows.filter((l) => l.stage === stage);
            return (
              <div key={stage} className="flex-1 min-w-[196px]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13px]">{stage}</span>
                    <Badge label={String(inStage.length)} t={leadTone[stage]} dot={false} />
                  </div>
                  <span className="text-[11px] text-mist font-semibold">{fmt(inStage.reduce((a, l) => a + l.value, 0))}</span>
                </div>
                <div className="space-y-3 rounded-2xl bg-pearl/70 border border-line p-2.5 min-h-[300px]">
                  {inStage.map((l) => (
                    <button key={l.id} onClick={() => setActive(l)} className="w-full text-left card card-hover p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-mist tracking-wide">{l.id}</span>
                        {l.division === "Consulting" && <Badge label="Consulting" t="sky" dot={false} />}
                      </div>
                      <div className="font-semibold text-[13.5px] mt-1 leading-snug">{l.company}</div>
                      <div className="text-[11.5px] text-mist mt-0.5">{l.contact} · {l.propertyType}</div>
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {l.services.slice(0, 2).map((s) => <span key={s} className="pill bg-ivory text-ink2 border border-line !text-[10px]">{s}</span>)}
                        {l.services.length > 2 && <span className="pill bg-ivory text-mist border border-line !text-[10px]">+{l.services.length - 2}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-line/70">
                        <span className="font-display text-[15px] text-ink">{fmt(l.value)}<span className="text-[10px] text-mist font-sans">/mo</span></span>
                        <span className="text-[10px] text-mist flex items-center gap-1"><Filter size={10} /> {l.source}</span>
                      </div>
                    </button>
                  ))}
                  {inStage.length === 0 && <div className="text-center text-[11.5px] text-mist/70 italic py-8">No leads</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* drawer */}
      {active && (
        <>
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-[2px] z-40" onClick={() => setActive(null)} />
          <aside className="fixed right-0 top-0 bottom-0 w-full max-w-[430px] bg-pearl z-50 shadow-2xl overflow-y-auto">
            <div className="sticky top-0 glass border-b border-line px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-bold text-mist">{active.id}</span>
                <Badge label={active.stage} t={leadTone[active.stage]} />
              </div>
              <button onClick={() => setActive(null)} className="w-8 h-8 rounded-full hover:bg-ivory flex items-center justify-center"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-display text-[24px] leading-tight">{active.company}</h3>
                <div className="text-mist text-[13px] mt-1">{active.contact} · {active.propertyType}{active.sqft ? ` · ${active.sqft.toLocaleString()} sqft` : ""}</div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge label={active.source} t="gold" dot={false} />
                  <Badge label={active.campaign} t="ink" dot={false} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[[Mail, active.email], [Phone, active.phone], [MapPin, "Metro Atlanta"], [CalendarClock, `Created ${active.created}`]].map(([Icon, v]: any) => (
                  <div key={v} className="bg-white border border-line rounded-xl px-3.5 py-3 flex items-center gap-2.5 min-w-0">
                    <Icon size={14} className="text-gold shrink-0" /><span className="text-[12px] font-medium truncate">{v}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-2.5">Requested services · {active.frequency}</div>
                <div className="flex flex-wrap gap-1.5">{active.services.map((s) => <span key={s} className="pill bg-champ/60 text-[#8f6a22]">{s}</span>)}</div>
              </div>

              <div className="bg-white border border-line rounded-2xl p-4.5 p-4">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-3">Consent & attribution</div>
                <div className="space-y-2 text-[12.5px]">
                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-mint" /> Marketing contact consented · Sep 12, 9:41 AM</div>
                  <div className="flex items-center gap-2">{active.smsConsent ? <CheckCircle2 size={14} className="text-mint" /> : <X size={14} className="text-mist" />} SMS marketing {active.smsConsent ? "opted-in (STOP/HELP ready)" : "not consented — excluded from SMS flows"}</div>
                  <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-gold" /> Duplicate check passed · source + click-ID retained</div>
                </div>
              </div>

              <div>
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-3">Timeline</div>
                <div className="space-y-0 relative pl-5">
                  <span className="absolute left-[5px] top-1.5 bottom-2 w-px bg-line" />
                  {[["Lead created via " + active.source, active.created], ["Auto-assigned to " + active.owner, "Same day"], ["Follow-up task opened", "Due tomorrow 9:00 AM"], [active.lastActivity, "Latest"]].map(([t, w], i) => (
                    <div key={i} className="relative pb-4">
                      <span className={`absolute -left-5 top-1 w-[11px] h-[11px] rounded-full border-2 ${i === 3 ? "border-gold bg-gold/30" : "border-mist/40 bg-white"}`} />
                      <div className="text-[12.5px] font-medium">{t}</div>
                      <div className="text-[10.5px] text-mist">{w}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <button className="btn btn-ink !px-3 !py-2.5 text-[12px]"><Phone size={13} /> Log call</button>
                <button className="btn btn-ghost !px-3 !py-2.5 text-[12px]"><MessageSquare size={13} /> SMS</button>
                <button className="btn btn-gold !px-3 !py-2.5 text-[12px]"><Building2 size={13} /> Proposal</button>
              </div>
              <div className="flex items-center gap-2.5 bg-white border border-line rounded-xl px-4 py-3">
                <Avatar name={active.owner} size={30} />
                <div className="text-[12px]"><span className="font-semibold">{active.owner}</span><span className="text-mist"> · owner · {active.division}</span></div>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
