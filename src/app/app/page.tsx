import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Banknote, CalendarClock, Camera, CircleDollarSign,
  ClipboardList, FileWarning, Plus, Sparkles, Timer, TrendingUp, Users,
} from "lucide-react";
import { AreaChart, Donut, Ring, Spark } from "@/components/charts";
import { Avatar, Badge, Card, Trend } from "@/components/ui";
import { activity, fmt, inspections, invoices, leads, leadSources, revenueMonths, revenueSeries, vendorBills, vendors, workOrders, woTone, woVolumeSeries } from "@/lib/data";

const kpis = [
  { label: "Revenue · September", value: fmt(126400), trend: "6.8%", up: true, icon: CircleDollarSign, spark: revenueSeries.slice(6) },
  { label: "Open work orders", value: "18", trend: "4 urgent", up: false, icon: ClipboardList, spark: woVolumeSeries.slice(6) },
  { label: "On-time dispatch", value: "98.1%", trend: "0.4%", up: true, icon: Timer, spark: [94, 95, 96, 96, 97, 98] },
  { label: "QA pass rate", value: "97.4%", trend: "1.1%", up: true, icon: Camera, spark: [93, 95, 94, 96, 97, 97.4] },
  { label: "Accounts receivable", value: fmt(61250), trend: "$13.4k overdue", up: false, icon: Banknote, spark: [40, 44, 52, 48, 56, 61] },
  { label: "Active pipeline", value: fmt(130800), trend: "9 opps", up: true, icon: TrendingUp, spark: [60, 72, 80, 96, 110, 131] },
];

const statusGroups: [string, string[]][] = [
  ["Needs dispatch", ["Unassigned", "Assigned"]],
  ["In the field", ["Accepted", "En Route", "In Progress"]],
  ["Verification", ["Completed", "QA Review", "Corrective Action"]],
  ["Closed", ["Verified", "Invoiced"]],
];

export default function Dashboard() {
  const today = workOrders.filter((w) => ["Tue", "Mon"].includes(w.day)).slice(0, 6);
  const overdue = invoices.filter((i) => i.status === "Overdue");

  return (
    <div className="space-y-6">
      {/* greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display display-tight text-[30px] leading-tight">Good morning, Danielle.</h2>
          <p className="text-mist text-[13.5px] mt-1">12 services scheduled today · 2 need dispatch · QA cleared 27 verifications this week.</p>
        </div>
        <div className="flex gap-2.5">
          <Link href="/app/crm" className="btn btn-ghost !py-2.5 !px-4 text-[13px]"><Users size={15} /> New lead</Link>
          <Link href="/app/work-orders" className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Plus size={15} /> New work order</Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="card-hover p-5 flex items-center gap-4">
            <span className="w-11 h-11 rounded-2xl bg-ink text-gold2 flex items-center justify-center shrink-0"><k.icon size={19} /></span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.14em] text-mist font-semibold">{k.label}</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-display text-[26px] leading-none">{k.value}</span>
                <Trend value={k.trend} up={k.up} />
              </div>
            </div>
            <div className="ml-auto shrink-0"><Spark data={k.spark} /></div>
          </Card>
        ))}
      </div>

      {/* revenue + status */}
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div>
              <div className="eyebrow text-gold">Executive revenue</div>
              <div className="font-display text-[26px] mt-1.5">Trailing 12 months</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge label="QBO synced" t="mint" />
              <Link href="/app/reports" className="text-[12.5px] font-semibold text-gold flex items-center gap-1 hover:gap-2 transition-all">Full report <ArrowUpRight size={14} /></Link>
            </div>
          </div>
          <AreaChart data={revenueSeries} labels={revenueMonths} height={230} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mt-4">
            {[["Collected MTD", fmt(88200)], ["Billed MTD", fmt(126400)], ["Gross margin", "36.2%"], ["Vendor pay scheduled", fmt(7140)]].map(([l, v]) => (
              <div key={l} className="bg-pearl px-4 py-3">
                <div className="text-[10px] uppercase tracking-widest text-mist font-semibold">{l}</div>
                <div className="font-display text-[19px] mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-7 flex flex-col">
          <div className="eyebrow text-gold">Pipeline attribution</div>
          <div className="font-display text-[26px] mt-1.5 mb-6">Lead sources · Q3</div>
          <Donut segments={leadSources} size={168} thickness={24} centerValue="128" centerLabel="leads" />
          <div className="mt-auto pt-6 border-t border-line flex items-center justify-between">
            <span className="text-[12px] text-mist">Win rate this quarter</span>
            <span className="font-display text-xl text-mint">31%</span>
          </div>
        </Card>
      </div>

      {/* work order board + today */}
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="eyebrow text-gold">Operations</div>
              <div className="font-display text-[26px] mt-1.5">Work order flow</div>
            </div>
            <Link href="/app/work-orders" className="text-[12.5px] font-semibold text-gold flex items-center gap-1">Open board <ArrowRight size={14} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusGroups.map(([label, statuses]) => {
              const items = workOrders.filter((w) => statuses.includes(w.status));
              return (
                <div key={label} className="rounded-2xl border border-line bg-pearl/60 p-3.5">
                  <div className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-mist mb-3 flex items-center justify-between">{label} <span className="text-ink">{items.length}</span></div>
                  <div className="space-y-2.5">
                    {items.slice(0, 3).map((w) => (
                      <Link href={`/app/work-orders/${w.id}`} key={w.id} className="block bg-white border border-line rounded-xl p-3 hover:border-gold/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10.5px] font-bold text-mist">{w.id}</span>
                          {w.priority === "Emergency" && <span className="w-2 h-2 rounded-full bg-rouge animate-pulse" />}
                        </div>
                        <div className="text-[12.5px] font-semibold mt-1 leading-snug">{w.title}</div>
                        <div className="mt-2"><Badge label={w.status} t={woTone[w.status]} /></div>
                      </Link>
                    ))}
                    {items.length === 0 && <div className="text-[11.5px] text-mist/70 italic py-3 text-center">Clear</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="eyebrow text-gold">Dispatcher</div>
              <div className="font-display text-[26px] mt-1.5">Today’s run</div>
            </div>
            <Link href="/app/schedule" className="text-[12.5px] font-semibold text-gold flex items-center gap-1">Calendar <CalendarClock size={14} /></Link>
          </div>
          <div className="space-y-1 relative">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
            {today.map((w) => (
              <Link href={`/app/work-orders/${w.id}`} key={w.id} className="flex gap-4 py-2.5 group relative">
                <span className={`w-[15px] h-[15px] rounded-full border-[3px] shrink-0 z-10 mt-1 ${w.status === "Verified" ? "border-mint bg-mint/20" : w.status === "Unassigned" ? "border-rouge bg-rouge/20" : "border-gold bg-champ"}`} />
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold group-hover:text-gold transition-colors leading-snug">{w.title}</div>
                  <div className="text-[11.5px] text-mist mt-0.5">{w.window} · {w.vendor ?? "⚠ unassigned"}</div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* bottom row */}
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="p-7">
          <div className="eyebrow text-gold">Assurance</div>
          <div className="font-display text-[26px] mt-1.5 mb-5">Quality this week</div>
          <div className="flex items-center justify-center gap-8">
            <Ring value={97} label="Pass rate" color="#17745c" />
            <div className="space-y-3 text-[12.5px]">
              <div className="flex items-center gap-2"><span className="dot bg-mint" /> 27 verified</div>
              <div className="flex items-center gap-2"><span className="dot bg-gold" /> {inspections.filter((i) => i.result === "Pending").length} pending review</div>
              <div className="flex items-center gap-2"><span className="dot bg-rouge" /> 1 corrective action</div>
              <Link href="/app/qa" className="inline-flex items-center gap-1 text-gold font-semibold pt-1">Open QA queue <ArrowRight size={13} /></Link>
            </div>
          </div>
        </Card>

        <Card className="p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="eyebrow text-gold">Ledger</div>
              <div className="font-display text-[26px] mt-1.5">Collections watch</div>
            </div>
            <Link href="/app/finance" className="text-[12.5px] font-semibold text-gold">Finance</Link>
          </div>
          <div className="space-y-3">
            {overdue.map((i) => (
              <div key={i.id} className="flex items-center gap-3 rounded-xl border border-[#e8c9c4] bg-[#fdf3f2] px-4 py-3">
                <FileWarning size={16} className="text-rouge shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold truncate">{i.client}</div>
                  <div className="text-[11px] text-mist">{i.id} · {i.aging}d overdue</div>
                </div>
                <span className="ml-auto font-display text-[16px] text-rouge">{fmt(i.amount)}</span>
              </div>
            ))}
            <div className="text-[11.5px] text-mist pt-1">{vendorBills.filter((b) => b.status === "Pending Review").length} vendor bills awaiting review · {vendors.filter((v) => v.coiStatus === "Expiring").length} COIs expiring.</div>
          </div>
        </Card>

        <Card className="p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="eyebrow text-gold">Live feed</div>
              <div className="font-display text-[26px] mt-1.5">Activity</div>
            </div>
            <Badge label="Real-time" t="mint" />
          </div>
          <div className="space-y-4">
            {activity.slice(0, 5).map((a, i) => (
              <div key={i} className="flex gap-3">
                <Avatar name={a.who} size={30} />
                <div className="text-[12.5px] leading-snug">
                  <span className="font-semibold">{a.who}</span> <span className="text-ink2/80">{a.what}</span>{" "}
                  <span className="text-gold font-medium">{a.on}</span>
                  <div className="text-[10.5px] text-mist mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI teaser */}
      <Card className="relative overflow-hidden p-7 bg-ink text-ivory !border-ink noise">
        <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-gold/15 blur-[90px]" />
        <div className="relative flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-start gap-4 max-w-2xl">
            <span className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 text-gold2 flex items-center justify-center shrink-0"><Sparkles size={20} /></span>
            <div>
              <div className="font-display text-[22px] text-white">Nova — AI dispatch copilot <span className="pill bg-gold/15 text-gold2 border border-gold/25 ml-2 align-middle">Future phase</span></div>
              <p className="text-white/55 text-[13px] mt-2 leading-relaxed">Voice intake, predictive scheduling, auto-matching by territory & compliance, and anomaly alerts are scoped in the approved roadmap — ready to activate under change control.</p>
            </div>
          </div>
          <Link href="/app/settings" className="btn btn-light !py-2.5 text-[13px]">View roadmap <ArrowUpRight size={14} /></Link>
        </div>
      </Card>
    </div>
  );
}
