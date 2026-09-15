import Link from "next/link";
import { ArrowUpRight, Camera, CircleAlert, ClipboardCheck, ShieldCheck, Timer } from "lucide-react";
import { Ring } from "@/components/charts";
import { Avatar, Badge, Card } from "@/components/ui";
import { inspections, qaSeries } from "@/lib/data";
import { Bars } from "@/components/charts";

export default function QA() {
  const pending = inspections.filter((i) => i.result === "Pending");
  const failed = inspections.filter((i) => i.result === "Fail");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Assurance · verify before close</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Quality & compliance</h2>
        </div>
        <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><ClipboardCheck size={15} /> Schedule inspection</button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center">
          <Ring value={97} label="Pass · 30 days" color="#17745c" />
          <p className="text-[11.5px] text-mist mt-4 text-center">Verification required before closure & review requests</p>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display text-[20px]">Pass-rate trend · 12 months</div>
            <Badge label="Target ≥ 95%" t="gold" dot={false} />
          </div>
          <Bars data={qaSeries.map((v) => Math.round(v))} labels={["O","N","D","J","F","M","A","M","J","J","A","S"]} height={150} accent="#c9a24b" hot="#101a2c" />
        </Card>
        <Card className="p-6 space-y-4">
          <div className="font-display text-[20px]">Control gates</div>
          {[
            ["Evidence review SLA", "4 business hours", Timer],
            ["Corrective actions open", `${failed.length} · 1 high severity`, CircleAlert],
            ["Compliance expirations", "2 COIs · 45-day window", ShieldCheck],
            ["Client review requests", "Sent only after verified pass", Camera],
          ].map(([l, v, Icon]: any) => (
            <div key={l} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#f4ead2] text-gold flex items-center justify-center shrink-0"><Icon size={15} /></span>
              <div className="min-w-0"><div className="text-[12.5px] font-semibold truncate">{l}</div><div className="text-[11px] text-mist truncate">{v}</div></div>
            </div>
          ))}
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[22px]">Inspection queue</h3>
          <span className="text-[12px] text-mist">{pending.length} awaiting review · {failed.length} corrective</span>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {inspections.map((qa) => (
            <Card key={qa.id} className={`card-hover overflow-hidden border-t-[3px] ${qa.result === "Fail" ? "!border-t-rouge" : qa.result === "Pass" ? "!border-t-mint" : "!border-t-gold"}`}>
              <div className="relative h-36">
                <img src={qa.photos[0]} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-white/60 font-semibold">{qa.id} · {qa.type}</div>
                    <div className="text-white font-semibold text-[14px]">{qa.site}</div>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md ${qa.result === "Fail" ? "bg-rouge/85" : qa.result === "Pass" ? "bg-mint/85" : "bg-gold/85"} text-white`}>
                    <span className="font-display text-[17px] leading-none">{qa.score}</span>
                    <span className="text-[7.5px] uppercase tracking-widest">score</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <Link href={`/app/work-orders/${qa.wo}`} className="text-[12.5px] font-bold text-gold flex items-center gap-1">{qa.wo} <ArrowUpRight size={12} /></Link>
                  <Badge label={qa.result} t={qa.result === "Fail" ? "rouge" : qa.result === "Pass" ? "mint" : "gold"} />
                </div>
                <div className="flex items-center gap-2.5 mt-3 text-[12px] text-mist">
                  <Avatar name={qa.inspector} size={24} /> {qa.inspector} · {qa.client} · {qa.date}
                </div>
                {qa.issues.length > 0 && (
                  <div className="mt-3.5 space-y-2">
                    {qa.issues.map((iss, i) => (
                      <div key={i} className="flex items-start gap-2.5 rounded-xl bg-pearl border border-line px-3.5 py-2.5">
                        <CircleAlert size={13} className={`mt-0.5 shrink-0 ${iss.severity === "High" ? "text-rouge" : "text-amber"}`} />
                        <div className="text-[11.5px] leading-snug min-w-0"><span className="font-semibold">{iss.area}:</span> {iss.note}</div>
                        <span className={`ml-auto pill shrink-0 ${iss.status === "Open" ? "bg-[#f8e1de] text-rouge" : "bg-[#dff0e9] text-mint"}`}>{iss.status}</span>
                      </div>
                    ))}
                  </div>
                )}
                {qa.photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-1.5 mt-3.5">
                    {qa.photos.map((p, i) => <img key={i} src={p} alt="" className="h-12 w-full object-cover rounded-lg border border-line" />)}
                    <div className="h-12 rounded-lg border border-dashed border-line flex items-center justify-center text-[9.5px] text-mist">+{4 + i2n(qa.id)}</div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
function i2n(id: string) { return (id.charCodeAt(id.length - 1) % 4) + 1; }
