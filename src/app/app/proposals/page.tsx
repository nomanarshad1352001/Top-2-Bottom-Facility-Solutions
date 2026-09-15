"use client";
import { useState } from "react";
import {
  BadgeCheck, Eye, FileSignature, FileText, GitBranch, Plus, Send, Sparkles, X,
} from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { fmt, proposals, type Proposal } from "@/lib/data";

const sTone: Record<string, string> = { Draft: "gray", Sent: "sky", Viewed: "gold", Accepted: "mint", Declined: "rouge", Revised: "amber" };

export default function Proposals() {
  const [active, setActive] = useState<Proposal | null>(proposals[0]);
  const [filter, setFilter] = useState("All");
  const rows = proposals.filter((p) => filter === "All" || p.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Estimating · versioned · margin-aware</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Estimates & proposals</h2>
        </div>
        <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Plus size={15} /> New estimate</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Open proposals", fmt(proposals.filter((p) => ["Sent", "Viewed", "Revised"].includes(p.status)).reduce((a, p) => a + p.value, 0)), "4 awaiting decision"],
          ["Accepted · Q3", fmt(42000), "Vantage portfolio program"],
          ["Avg. margin", "34.8%", "floor set at 25%"],
          ["Avg. time to close", "6.4 days", "-2.1 vs Q2"],
        ].map(([l, v, s]) => (
          <Card key={l as string} className="px-5 py-4">
            <div className="text-[10.5px] uppercase tracking-widest text-mist font-semibold">{l}</div>
            <div className="font-display text-[24px] mt-1">{v}</div>
            <div className="text-[11px] text-mist">{s}</div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", "Sent", "Viewed", "Revised", "Accepted"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`pill border ${filter === f ? "bg-ink text-ivory border-ink" : "bg-white border-line text-ink2 hover:border-gold/50"}`}>{f}</button>
        ))}
      </div>

      <div className="grid xl:grid-cols-5 gap-6 items-start">
        <Card className="xl:col-span-3 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="lux-table min-w-[560px]">
              <thead><tr><th>Estimate</th><th>Client</th><th>Version</th><th>Status</th><th className="text-right">Value</th><th className="text-right">Margin</th></tr></thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} onClick={() => setActive(p)} className={`cursor-pointer ${active?.id === p.id ? "!bg-champ/20" : ""}`}>
                    <td className="font-bold text-[12px] text-mist">{p.id}</td>
                    <td><div className="font-semibold">{p.client}</div><div className="text-[11px] text-mist truncate max-w-[200px]">{p.title}</div></td>
                    <td><span className="pill bg-[#e8ebf2] text-ink2"><GitBranch size={10} /> v{p.version}</span></td>
                    <td><Badge label={p.status} t={sTone[p.status]} /></td>
                    <td className="text-right font-display text-[15px]">{fmt(p.value)}<span className="text-[10px] text-mist font-sans">/mo</span></td>
                    <td className={`text-right font-semibold text-[13px] ${p.margin >= 32 ? "text-mint" : "text-amber"}`}>{p.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* detail */}
        {active && (
          <Card className="xl:col-span-2 p-6 sticky top-24">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2"><span className="text-[11px] font-bold text-mist">{active.id}</span><Badge label={active.status} t={sTone[active.status]} /></div>
                <h3 className="font-display text-[20px] mt-2 leading-tight">{active.title}</h3>
                <div className="text-[12px] text-mist mt-1">{active.client} · sent {active.sent} · owner {active.owner}</div>
              </div>
              <button onClick={() => setActive(null)} className="w-8 h-8 rounded-full hover:bg-ivory flex items-center justify-center"><X size={15} /></button>
            </div>

            <div className="mt-5 rounded-2xl border border-line overflow-hidden">
              <div className="bg-pearl px-4 py-2.5 text-[10.5px] uppercase tracking-[0.16em] font-semibold text-mist flex justify-between"><span>Line items · v{active.version}</span><span>Monthly</span></div>
              {active.lines.map((l) => (
                <div key={l.label} className="flex items-center justify-between px-4 py-3 border-t border-line/60 text-[13px]">
                  <div><div className="font-medium">{l.label}</div><div className="text-[10.5px] text-mist">{l.qty}</div></div>
                  <span className="font-display text-[14px]">{fmt(l.amount)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3.5 bg-ink text-ivory">
                <span className="text-[10.5px] uppercase tracking-[0.16em] text-gold2 font-semibold">Total monthly</span>
                <span className="font-display text-[19px]">{fmt(active.value)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[["Cost", fmt(active.cost)], ["Margin", `${active.margin}%`], ["Floor", active.margin >= 25 ? "Cleared" : "Blocked"]].map(([l, v], i) => (
                <div key={l as string} className={`rounded-xl border py-2.5 ${i === 2 ? (active.margin >= 25 ? "border-mint/40 bg-[#eef6f2] text-mint" : "border-rouge/40 bg-[#fdf1f0] text-rouge") : "border-line bg-pearl"}`}>
                  <div className="text-[13px] font-semibold">{v}</div><div className="text-[9px] uppercase tracking-widest text-mist mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-gold/30 bg-champ/20 p-4 mt-4 flex items-start gap-3">
              <Sparkles size={16} className="text-gold mt-0.5 shrink-0" />
              <div className="text-[12px] leading-relaxed text-ink2"><span className="font-semibold">Pricing intelligence (future phase):</span> historical win data suggests <span className="font-semibold">{fmt(Math.round(active.value * 1.04))}</span> maximizes close probability for this profile.</div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              <button className="btn btn-ghost !py-2.5 !px-2 text-[12px]"><Eye size={13} /> Preview</button>
              <button className="btn btn-ink !py-2.5 !px-2 text-[12px]"><FileSignature size={13} /> e-Sign</button>
              <button className="btn btn-gold !py-2.5 !px-2 text-[12px]"><Send size={13} /> Send</button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-[11px] text-mist">
              {active.status === "Accepted" ? <><BadgeCheck size={13} className="text-mint" /> Accepted · onboarding workflow launched</> : <><FileText size={13} /> Version history retained · revision tracking on</>}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
