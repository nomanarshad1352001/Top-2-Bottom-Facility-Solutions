"use client";
import { useState } from "react";
import { Clock3, Download, FileBadge2, FileSignature, FileText, FolderLock, Plus, Search, ShieldCheck } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import { documents } from "@/lib/data";

const typeIcon: Record<string, any> = { Agreement: FileSignature, SOP: FileText, Policy: FolderLock, COI: ShieldCheck, "W-9": FileBadge2, Template: FileText, Report: FileText };
const types = ["All", "Agreement", "SOP", "COI", "Policy", "Template", "Report"];

export default function Documents() {
  const [f, setF] = useState("All");
  const [q, setQ] = useState("");
  const rows = documents.filter((d) => (f === "All" || d.type === f) && d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Knowledge · versioned · access-controlled</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Documents & knowledge base</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <label className="flex items-center gap-2 bg-white border border-line rounded-full px-4 py-2.5 w-[220px]">
            <Search size={14} className="text-mist" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents…" className="bg-transparent outline-none text-[13px] w-full" />
          </label>
          <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Plus size={15} /> Upload</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Total documents", documents.length, FileText],
          ["Expiring in 45 days", documents.filter((d) => d.expires && ["Sep 2026", "Oct 2026"].includes(d.expires)).length, Clock3],
          ["Client-visible", documents.filter((d) => d.access.includes("Client")).length, FolderLock],
          ["Agreements active", documents.filter((d) => d.type === "Agreement").length, FileSignature],
        ].map(([l, v, Icon]: any) => (
          <Card key={l} className="p-4.5 px-5 flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-[#f4ead2] text-gold flex items-center justify-center"><Icon size={16} /></span>
            <div><div className="text-[10.5px] uppercase tracking-widest text-mist font-semibold">{l}</div><div className="font-display text-[22px]">{v}</div></div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button key={t} onClick={() => setF(t)} className={`pill border ${f === t ? "bg-ink text-ivory border-ink" : "bg-white border-line text-ink2 hover:border-gold/50"}`}>{t}</button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="lux-table min-w-[760px]">
            <thead><tr><th>Document</th><th>Type</th><th>Owner</th><th>Version</th><th>Updated</th><th>Expires</th><th>Access</th><th /></tr></thead>
            <tbody>
              {rows.map((d) => {
                const Icon = typeIcon[d.type] ?? FileText;
                const expiring = d.expires && ["Sep 2026", "Oct 2026"].includes(d.expires);
                return (
                  <tr key={d.id}>
                    <td><div className="flex items-center gap-3"><span className="w-9 h-9 rounded-xl bg-pearl border border-line text-gold flex items-center justify-center"><Icon size={15} /></span><div><div className="font-semibold text-[13.5px]">{d.name}</div><div className="text-[10.5px] text-mist">{d.id}</div></div></div></td>
                    <td><Badge label={d.type} t={d.type === "COI" ? "amber" : d.type === "Agreement" ? "gold" : "ink"} dot={false} /></td>
                    <td>{d.owner}</td>
                    <td><span className="pill bg-[#e8ebf2] text-ink2">{d.version}</span></td>
                    <td className="text-[12.5px]">{d.updated}</td>
                    <td>{d.expires ? <span className={`pill ${expiring ? "bg-[#f8e8d8] text-amber" : "bg-[#eceee8] text-mist"}`}><Clock3 size={10} /> {d.expires}</span> : <span className="text-mist text-[12px]">—</span>}</td>
                    <td className="text-[12px] text-mist">{d.access}</td>
                    <td><button className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-mist hover:text-gold hover:border-gold/50"><Download size={13} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
