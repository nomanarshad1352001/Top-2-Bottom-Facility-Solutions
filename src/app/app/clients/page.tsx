"use client";
import { useState } from "react";
import {
  Building2, ChevronDown, FileText, HeartPulse, Mail, MapPin, Phone,
  Plus, Repeat2, Search, Star,
} from "lucide-react";
import { Avatar, Badge, Card } from "@/components/ui";
import { clients, fmt, workOrders, documents } from "@/lib/data";

export default function Clients() {
  const [activeId, setActiveId] = useState(clients[0].id);
  const [openSite, setOpenSite] = useState<string | null>(clients[0].sites[0].id);
  const [q, setQ] = useState("");
  const active = clients.find((c) => c.id === activeId)!;
  const list = clients.filter((c) => (c.name + c.industry).toLowerCase().includes(q.toLowerCase()));
  const clientWOs = workOrders.filter((w) => w.client === active.name);
  const clientDocs = documents.filter((d) => d.name.includes(active.name.split(" ")[0]) || d.type === "Report").slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Client → site → building hierarchy</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Clients & properties</h2>
        </div>
        <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Plus size={15} /> Onboard client</button>
      </div>

      <div className="grid xl:grid-cols-5 gap-6 items-start">
        {/* list */}
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="p-4 border-b border-line">
            <label className="flex items-center gap-2 bg-ivory/70 border border-line rounded-full px-4 py-2.5">
              <Search size={14} className="text-mist" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search accounts…" className="bg-transparent outline-none text-[13px] w-full" />
            </label>
          </div>
          <div className="divide-y divide-line/60 max-h-[720px] overflow-y-auto">
            {list.map((c) => (
              <button key={c.id} onClick={() => { setActiveId(c.id); setOpenSite(c.sites[0].id); }}
                className={`w-full text-left p-4 flex gap-4 items-center transition-colors ${activeId === c.id ? "bg-champ/25 border-l-[3px] border-l-gold" : "hover:bg-pearl"}`}>
                <img src={c.photo} alt="" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[14px] truncate">{c.name}</span>
                    {c.tier === "Signature" && <Star size={12} className="text-gold fill-gold shrink-0" />}
                  </div>
                  <div className="text-[11.5px] text-mist mt-0.5">{c.industry} · {c.sites.length} site{c.sites.length > 1 ? "s" : ""}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-[15px]">{c.mrr > 0 ? `${fmt(c.mrr)}` : "Project"}</div>
                  <div className="text-[10px] text-mist">{c.mrr > 0 ? "MRR" : "based"}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* detail */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-40">
              <img src={active.photo} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge label={`${active.tier} account`} t="gold" dot={false} />
                    <span className="pill bg-white/15 text-white border border-white/20">Since {active.since}</span>
                  </div>
                  <h3 className="font-display text-[26px] text-white mt-2">{active.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-white/60">Health score</div>
                  <div className="font-display text-2xl text-gold2 flex items-center gap-1.5 justify-end"><HeartPulse size={16} /> {active.health}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line">
              {[["Monthly recurring", active.mrr > 0 ? fmt(active.mrr) : "—"], ["Open balance", active.balance > 0 ? fmt(active.balance) : "$0"], ["Active services", String(active.services.length)], ["Account manager", active.pm.split(" ")[0]]].map(([l, v]) => (
                <div key={l} className="bg-pearl px-5 py-3.5">
                  <div className="text-[10px] uppercase tracking-widest text-mist font-semibold">{l}</div>
                  <div className="font-display text-[18px] mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* contacts + services */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-4">Contacts & portal access</div>
              <div className="space-y-3">
                {active.contacts.map((c) => (
                  <div key={c.email} className="flex items-center gap-3">
                    <Avatar name={c.name} size={38} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold">{c.name} <span className="text-mist font-normal">· {c.role}</span></div>
                      <div className="text-[11px] text-mist flex items-center gap-3 mt-0.5"><span className="flex items-center gap-1"><Mail size={10} /> {c.email}</span><span className="flex items-center gap-1"><Phone size={10} /> {c.phone}</span></div>
                    </div>
                    <Badge label="Portal" t="mint" dot={false} />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-4">Service program</div>
              <div className="flex flex-wrap gap-2">{active.services.map((s) => <span key={s} className="pill bg-champ/60 text-[#8f6a22]">{s}</span>)}</div>
              <div className="gold-line my-4" />
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-2.5">Recent documents</div>
              <div className="space-y-2">
                {clientDocs.map((d) => (
                  <div key={d.id} className="flex items-center gap-2.5 text-[12px]"><FileText size={13} className="text-gold shrink-0" /><span className="font-medium truncate">{d.name}</span><span className="text-mist ml-auto shrink-0">{d.version}</span></div>
                ))}
              </div>
            </Card>
          </div>

          {/* sites */}
          <Card className="p-6">
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold mb-4">Sites & buildings</div>
            <div className="space-y-3">
              {active.sites.map((s) => (
                <div key={s.id} className="rounded-2xl border border-line overflow-hidden">
                  <button onClick={() => setOpenSite(openSite === s.id ? null : s.id)} className="w-full flex items-center gap-4 px-5 py-4 bg-pearl/70 hover:bg-pearl transition-colors">
                    <span className="w-10 h-10 rounded-xl bg-ink text-gold2 flex items-center justify-center shrink-0"><MapPin size={16} /></span>
                    <div className="text-left">
                      <div className="font-semibold text-[14px]">{s.name}</div>
                      <div className="text-[11.5px] text-mist">{s.address} · {s.city} · {s.buildings.length} building{s.buildings.length > 1 ? "s" : ""}</div>
                    </div>
                    <ChevronDown size={16} className={`ml-auto text-mist transition-transform ${openSite === s.id ? "rotate-180" : ""}`} />
                  </button>
                  {openSite === s.id && (
                    <div className="p-4 grid sm:grid-cols-2 gap-3 bg-white">
                      {s.buildings.map((b) => (
                        <div key={b.name} className="rounded-xl border border-line p-4 flex gap-3.5 items-center">
                          <span className="w-9 h-9 rounded-lg bg-[#f4ead2] text-gold flex items-center justify-center shrink-0"><Building2 size={15} /></span>
                          <div>
                            <div className="font-semibold text-[13px]">{b.name}</div>
                            <div className="text-[11px] text-mist">{b.type} · {b.floors} floor{b.floors > 1 ? "s" : ""} · {b.sqft.toLocaleString()} sqft</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* recent activity for client */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-mist font-semibold">Recent service history</div>
              <span className="pill bg-[#e8ebf2] text-ink2"><Repeat2 size={11} /> Recurring lineage retained</span>
            </div>
            {clientWOs.length > 0 ? (
              <div className="space-y-2.5">
                {clientWOs.slice(0, 4).map((w) => (
                  <div key={w.id} className="flex items-center gap-4 rounded-xl border border-line px-4 py-3 hover:border-gold/40 transition-colors">
                    <span className="text-[11px] font-bold text-mist w-[70px]">{w.id}</span>
                    <span className="text-[13px] font-semibold truncate">{w.title}</span>
                    <span className="text-[11px] text-mist ml-auto shrink-0">{w.date}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-[13px] text-mist italic">No work orders yet this period.</p>}
          </Card>
        </div>
      </div>
    </div>
  );
}
