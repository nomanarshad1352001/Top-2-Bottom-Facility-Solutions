import { CalendarRange, Download, FileBarChart2, Presentation, Printer } from "lucide-react";
import { AreaChart, Bars, Donut, Ring, Spark } from "@/components/charts";
import { Avatar, Badge, Card } from "@/components/ui";
import { leadSources, qaSeries, revenueMonths, revenueSeries, serviceMix, vendors, woVolumeSeries, fmt } from "@/lib/data";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Executive intelligence · all divisions</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Reports & KPIs</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="pill bg-white border border-line text-ink2"><CalendarRange size={12} /> Sep 1 – Sep 15, 2026</span>
          <button className="btn btn-ghost !py-2.5 !px-4 text-[13px]"><Printer size={15} /> Board pack</button>
          <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Download size={15} /> Export CSV</button>
        </div>
      </div>

      {/* headline KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          ["Revenue MTD", fmt(126400), [96, 104, 99, 112, 118, 126]],
          ["Gross margin", "36.2%", [32, 33, 34, 35, 36, 36.2]],
          ["On-time rate", "98.1%", [95, 96, 97, 97, 98, 98.1]],
          ["QA pass rate", "97.4%", [94, 95, 96, 96, 97, 97.4]],
          ["Client retention", "96%", [93, 94, 94, 95, 96, 96]],
          ["NPS", "72", [64, 66, 68, 70, 71, 72]],
        ].map(([l, v, s]: any) => (
          <Card key={l} className="p-4.5 px-5">
            <div className="text-[10px] uppercase tracking-widest text-mist font-semibold">{l}</div>
            <div className="font-display text-[23px] mt-1">{v}</div>
            <div className="mt-2"><Spark data={s} w={90} h={26} /></div>
          </Card>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-7">
          <div className="flex items-center justify-between">
            <div className="font-display text-[22px]">Revenue · trailing 12 months</div>
            <Badge label="+42% YoY" t="mint" dot={false} />
          </div>
          <AreaChart data={revenueSeries} labels={revenueMonths} height={240} />
        </Card>
        <Card className="p-7">
          <div className="font-display text-[22px] mb-5">Revenue by service line</div>
          <Donut segments={serviceMix} size={158} thickness={22} centerValue="$532k" centerLabel="Q3 total" />
        </Card>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="p-7">
          <div className="font-display text-[22px]">Work order volume</div>
          <div className="text-[12px] text-mist mb-5">Completed + verified per month</div>
          <Bars data={woVolumeSeries} labels={["O","N","D","J","F","M","A","M","J","J","A","S"]} height={180} />
        </Card>
        <Card className="p-7">
          <div className="font-display text-[22px]">Lead attribution</div>
          <div className="text-[12px] text-mist mb-5">By source · Q3 · UTM-preserved</div>
          <Donut segments={leadSources} size={150} thickness={20} centerValue="128" centerLabel="leads" />
        </Card>
        <Card className="p-7">
          <div className="font-display text-[22px]">QA performance</div>
          <div className="text-[12px] text-mist mb-5">Monthly pass rate against 95% target</div>
          <Bars data={qaSeries.map((v) => Math.round(v))} labels={["O","N","D","J","F","M","A","M","J","J","A","S"]} height={180} accent="#c9a24b" hot="#17745c" />
        </Card>
      </div>

      {/* vendor scorecard + gauges */}
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <div className="font-display text-[20px]">Vendor scorecard</div>
            <span className="text-[11.5px] text-mist">Ranked by weighted score: quality 40% · on-time 30% · compliance 30%</span>
          </div>
          <div className="overflow-x-auto">
            <table className="lux-table min-w-[620px]">
              <thead><tr><th>Vendor</th><th>Jobs</th><th>On-time</th><th>Rating</th><th>Compliance</th><th className="text-right">Score</th></tr></thead>
              <tbody>
                {vendors.filter((v) => v.status === "Approved").map((v, i) => {
                  const score = Math.round((v.rating / 5) * 40 + v.onTime * 0.3 + (v.coiStatus === "Valid" ? 30 : 18));
                  return (
                    <tr key={v.id}>
                      <td><div className="flex items-center gap-2.5"><span className="text-[10px] font-bold text-champ w-4">{i + 1}</span><Avatar name={v.name} size={28} /><span className="font-semibold">{v.name}</span></div></td>
                      <td>{v.jobsDone}</td>
                      <td>{v.onTime}%</td>
                      <td>★ {v.rating}</td>
                      <td><Badge label={v.coiStatus} t={v.coiStatus === "Valid" ? "mint" : "amber"} dot={false} /></td>
                      <td className="text-right"><span className="font-display text-[16px] text-gold">{score}</span><span className="text-[10px] text-mist">/100</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 flex items-center gap-6">
            <Ring value={96} label="Retention" color="#101a2c" size={120} />
            <div className="text-[12px] text-mist leading-relaxed">2 of 41 accounts churned in 12 months. Renewal pipeline automated 60 days before term.</div>
          </Card>
          <Card className="p-6 flex items-center gap-6">
            <Ring value={84} label="Utilization" color="#c9a24b" size={120} />
            <div className="text-[12px] text-mist leading-relaxed">Crew utilization across vendor network. Two Savannah crews available for surge capacity.</div>
          </Card>
          <Card className="p-6 bg-ink !border-ink text-ivory noise relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-2 text-gold2 font-semibold text-[12px]"><Presentation size={14} /> Power BI + board pack</div>
              <p className="text-white/55 text-[12px] mt-2 leading-relaxed">Executive dataset refreshes hourly to the T2B-Exec workspace. Division filters keep Facility Solutions and Consulting reporting cleanly separated.</p>
              <button className="btn btn-light !py-2 text-[12px] mt-4"><FileBarChart2 size={13} /> Open workspace</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
