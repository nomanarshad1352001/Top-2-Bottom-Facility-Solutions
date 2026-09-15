"use client";
import Link from "next/link";
import { useState } from "react";
import { CalendarPlus, CircleAlert, MapPinned, Navigation, Route, Wand2 } from "lucide-react";
import { Avatar, Badge, Card } from "@/components/ui";
import { vendors, workOrders } from "@/lib/data";

const HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const H = 52; // px per hour
const SLOT: Record<string, [number, number]> = {
  "WO-2381": [18, 22], "WO-2384": [20, 24], "WO-2390": [9, 13], "WO-2392": [19, 21],
  "WO-2395": [5, 8], "WO-2396": [7, 16], "WO-2399": [6, 10], "WO-2402": [10, 14],
  "WO-2405": [8, 11], "WO-2407": [7, 12], "WO-2410": [7, 10], "WO-2412": [6, 11],
};
const DAYS = [
  { d: "Mon", label: "Mon 15", ids: ["WO-2381", "WO-2384"] },
  { d: "Tue", label: "Tue 16", ids: ["WO-2390", "WO-2392"] },
  { d: "Wed", label: "Wed 17", ids: ["WO-2395", "WO-2396"] },
  { d: "Thu", label: "Thu 18", ids: ["WO-2399", "WO-2402"] },
  { d: "Fri", label: "Fri 19", ids: ["WO-2405", "WO-2407"] },
  { d: "Sat", label: "Sat 20", ids: ["WO-2410"] },
];
const chipTone: Record<string, string> = {
  mint: "border-mint/60 bg-[#eef6f2]", gold: "border-gold/50 bg-[#faf3e0]",
  sky: "border-sky2/50 bg-[#edf4fa]", rouge: "border-rouge/50 bg-[#fdf1f0]",
  amber: "border-amber/50 bg-[#fdf4e8]", gray: "border-mist/40 bg-ivory",
  ink: "border-ink/30 bg-[#eef0f4]",
};
import { woTone } from "@/lib/data";

export default function Schedule() {
  const [vendorFilter, setVendorFilter] = useState<string>("All");
  const active = vendors.filter((v) => v.status === "Approved");
  const unassigned = workOrders.filter((w) => w.status === "Unassigned");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Dispatch · week 38</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Schedule & dispatch</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="btn btn-ghost !py-2.5 !px-4 text-[13px]"><Route size={15} /> Optimize routes</button>
          <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><CalendarPlus size={15} /> Add schedule</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Services this week", workOrders.length.toString(), "across 6 days"],
          ["Crew utilization", "84%", "+6% vs last week"],
          ["Conflicts detected", "1", "WO-2407 double-window"],
          ["Missed-service alerts", "0", "all visits confirmed"],
        ].map(([l, v, s]) => (
          <Card key={l} className="px-5 py-4">
            <div className="text-[11px] uppercase tracking-widest text-mist font-semibold">{l}</div>
            <div className="flex items-baseline gap-2 mt-1"><span className="font-display text-[24px]">{v}</span><span className="text-[11px] text-mist">{s}</span></div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...active.map((v) => v.name)].map((v) => (
          <button key={v} onClick={() => setVendorFilter(v)}
            className={`pill border transition-all ${vendorFilter === v ? "bg-ink text-ivory border-ink" : "bg-white text-ink2 border-line hover:border-gold/50"}`}>
            {v === "All" ? "All vendors" : v.replace(" LLC", "").replace(" Co.", "")}
          </button>
        ))}
      </div>

      <div className="grid xl:grid-cols-4 gap-6 items-start">
        {/* calendar */}
        <Card className="xl:col-span-3 p-5 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid" style={{ gridTemplateColumns: `56px repeat(6, 1fr)` }}>
              <div />
              {DAYS.map((d) => (
                <div key={d.label} className="text-center pb-3">
                  <div className="text-[12.5px] font-bold">{d.label}</div>
                  <div className="text-[10px] text-mist">{d.ids.length} service{d.ids.length > 1 ? "s" : ""}</div>
                </div>
              ))}
              <div className="relative border-t border-line" style={{ height: HOURS.length * H }}>
                {HOURS.map((h, i) => (
                  <div key={h} className="absolute -top-2.5 text-[10px] text-mist w-14 text-right pr-2" style={{ top: i * H }}>
                    {h <= 12 ? `${h} AM` : `${h - 12} PM`}
                  </div>
                ))}
              </div>
              {DAYS.map((d) => (
                <div key={d.label} className="relative border-t border-l border-line" style={{ height: HOURS.length * H }}>
                  {HOURS.map((h, i) => <div key={h} className="absolute inset-x-0 border-t border-line/50" style={{ top: i * H }} />)}
                  {d.ids.map((id) => {
                    const w = workOrders.find((x) => x.id === id)!;
                    if (vendorFilter !== "All" && w.vendor !== vendorFilter) return null;
                    const [s, e] = SLOT[id].map((v) => Math.min(Math.max(v, 6), 20)) as [number, number];
                    const toneCls = chipTone[woTone[w.status]] ?? chipTone.gray;
                    return (
                      <Link key={id} href={`/app/work-orders/${id}`}
                        className={`absolute inset-x-1.5 rounded-xl border-l-[3px] border ${toneCls} p-2 overflow-hidden hover:shadow-lg hover:z-10 transition-all group`}
                        style={{ top: (s - 6) * H + 2, height: Math.max((e - s) * H - 6, 44) }}>
                        <div className="text-[10px] font-bold text-mist">{w.id}</div>
                        <div className="text-[11.5px] font-semibold leading-tight truncate group-hover:text-gold transition-colors">{w.title}</div>
                        {(e - s) >= 3 && <div className="text-[10px] text-mist mt-0.5 truncate">{w.vendor ?? "Unassigned"} · {w.site}</div>}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-line text-[11px] text-mist">
              {[["Scheduled / accepted", chipTone.sky], ["In progress", chipTone.amber], ["QA review", chipTone.gold], ["Verified", chipTone.mint], ["Corrective action", chipTone.rouge]].map(([l, c]) => (
                <span key={l as string} className="flex items-center gap-2"><span className={`w-3.5 h-3.5 rounded border ${c as string}`} />{l}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* right rail */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-[20px]">Unassigned queue</div>
              <Badge label={`${unassigned.length} open`} t="rouge" />
            </div>
            <div className="space-y-3">
              {unassigned.map((w) => (
                <div key={w.id} className="rounded-2xl border border-[#e8c9c4] bg-[#fdf6f5] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/app/work-orders/${w.id}`} className="text-[13px] font-semibold hover:text-gold leading-snug">{w.title}</Link>
                      <div className="text-[11px] text-mist mt-1">{w.id} · {w.date} · {w.window}</div>
                      <div className="text-[11px] text-mist">{w.site} · {w.service}</div>
                    </div>
                    <CircleAlert size={16} className="text-rouge shrink-0 mt-0.5" />
                  </div>
                  <button className="mt-3 w-full btn btn-gold !py-2 text-[12px]"><Wand2 size={13} /> Auto-match · 3 eligible</button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="font-display text-[20px] mb-4">Territory coverage</div>
            <div className="map-dots relative rounded-2xl bg-pearl border border-line h-[190px] overflow-hidden">
              <span className="absolute left-[46%] top-[40%] w-3 h-3 rounded-full bg-gold pulse-gold" />
              <span className="absolute left-[46%] top-[40%] w-24 h-24 -ml-[42px] -mt-[42px] rounded-full border border-gold/40" />
              <span className="absolute left-[46%] top-[40%] w-40 h-40 -ml-[74px] -mt-[74px] rounded-full border border-gold/25" />
              {[["62%", "30%"], ["24%", "58%"], ["72%", "66%"], ["38%", "74%"], ["82%", "22%"]].map(([l, t], i) => (
                <span key={i} className="absolute w-2.5 h-2.5 rounded-full bg-ink/70" style={{ left: l, top: t }} />
              ))}
              <span className="absolute bottom-3 left-3 pill bg-white/85 border border-line backdrop-blur-sm"><MapPinned size={11} /> Atlanta metro · 35-mi radius</span>
              <span className="absolute top-3 right-3 pill bg-white/85 border border-line backdrop-blur-sm"><Navigation size={11} /> 34 vendors</span>
            </div>
            <div className="mt-4 space-y-2 text-[12px]">
              {[["CrystalClean Crew LLC", "2.4 mi · capacity 78%", "mint"], ["Metro Facility Pros", "5.1 mi · capacity 84%", "gold"], ["PrimeTime Medical Clean", "8.7 mi · pending review", "gray"]].map(([n, d, t]) => (
                <div key={n as string} className="flex items-center gap-3 rounded-xl border border-line bg-pearl/60 px-3.5 py-2.5">
                  <Avatar name={n as string} size={28} />
                  <div className="min-w-0"><div className="font-semibold text-[12px] truncate">{n}</div><div className="text-[10.5px] text-mist">{d}</div></div>
                  <Badge label={t === "mint" ? "Eligible" : t === "gold" ? "Busy" : "Review"} t={t as string} dot={false} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
