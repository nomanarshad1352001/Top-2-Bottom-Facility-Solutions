"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarClock, CircleAlert, Filter, Plus, Repeat2, Search } from "lucide-react";
import { Avatar, Badge, Card } from "@/components/ui";
import { fmt, workOrders, woTone, type WOStatus } from "@/lib/data";

const FILTERS: ("All" | WOStatus)[] = ["All", "Unassigned", "Assigned", "In Progress", "Completed", "QA Review", "Corrective Action", "Verified"];

export default function WorkOrders() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [q, setQ] = useState("");
  const rows = workOrders.filter((w) =>
    (filter === "All" || w.status === filter) &&
    (w.title + w.client + w.id + w.site).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Operations · numbered & auditable</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Work orders</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <label className="flex items-center gap-2 bg-white border border-line rounded-full px-4 py-2.5 w-[240px] focus-within:border-gold/60">
            <Search size={14} className="text-mist" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="bg-transparent outline-none text-[13px] w-full" />
          </label>
          <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Plus size={15} /> Create</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`pill border transition-all ${filter === f ? "bg-ink text-ivory border-ink" : "bg-white text-ink2 border-line hover:border-gold/50"}`}>
            {f === "All" ? `All (${workOrders.length})` : `${f} (${workOrders.filter((w) => w.status === f).length})`}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="lux-table min-w-[980px]">
            <thead>
              <tr><th>Work order</th><th>Client / site</th><th>Window</th><th>Vendor</th><th>Source</th><th>Status</th><th className="text-right">Value</th><th /></tr>
            </thead>
            <tbody>
              {rows.map((w) => (
                <tr key={w.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-9 rounded-full shrink-0 ${w.priority === "Emergency" ? "bg-rouge" : w.priority === "High" ? "bg-amber" : "bg-champ"}`} />
                      <div>
                        <Link href={`/app/work-orders/${w.id}`} className="font-semibold hover:text-gold transition-colors">{w.title}</Link>
                        <div className="text-[11px] text-mist mt-0.5">{w.id} · {w.service}{w.building ? ` · ${w.building}` : ""}</div>
                      </div>
                    </div>
                  </td>
                  <td><div className="font-medium">{w.client}</div><div className="text-[11px] text-mist">{w.site}</div></td>
                  <td><div className="flex items-center gap-1.5 text-[12.5px]"><CalendarClock size={13} className="text-mist" />{w.date}</div><div className="text-[11px] text-mist">{w.window}</div></td>
                  <td>{w.vendor ? <div className="flex items-center gap-2"><Avatar name={w.vendor} size={26} /><span className="text-[12.5px] font-medium max-w-[140px] truncate">{w.vendor}</span></div> : <span className="pill bg-[#f8e1de] text-rouge"><CircleAlert size={11} /> Needs dispatch</span>}</td>
                  <td>{w.source === "Recurring" ? <span className="pill bg-[#e8ebf2] text-ink2"><Repeat2 size={11} /> {w.agreement}</span> : <span className="text-[12px] text-mist">{w.source}</span>}</td>
                  <td><Badge label={w.status} t={woTone[w.status]} /></td>
                  <td className="text-right"><span className="font-display text-[15px]">{fmt(w.estimate)}</span>{w.cost > 0 && <div className="text-[10.5px] text-mist">cost {fmt(w.cost)}</div>}</td>
                  <td><Link href={`/app/work-orders/${w.id}`} className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-mist hover:text-gold hover:border-gold/50 transition-all"><ArrowUpRight size={14} /></Link></td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={8} className="text-center py-14 text-mist"><Filter size={20} className="mx-auto mb-2 opacity-50" />No work orders match.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
