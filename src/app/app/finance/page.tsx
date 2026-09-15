import { ArrowUpRight, Banknote, CheckCircle2, CircleDollarSign, Download, RefreshCw, Send, Percent, Wallet } from "lucide-react";
import { Donut, Bars } from "@/components/charts";
import { Avatar, Badge, Card } from "@/components/ui";
import { fmt, invoices, serviceMix, vendorBills } from "@/lib/data";

const invTone: Record<string, string> = { Paid: "mint", Sent: "sky", Overdue: "rouge", Draft: "gray" };
const billTone: Record<string, string> = { Paid: "mint", Approved: "gold", Scheduled: "sky", "Pending Review": "amber" };

export default function Finance() {
  const ar = invoices.filter((i) => i.status !== "Paid" && i.status !== "Draft").reduce((a, i) => a + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((a, i) => a + i.amount, 0);
  const ap = vendorBills.filter((b) => b.status !== "Paid").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow text-gold">Finance · AR · AP · margins</div>
          <h2 className="font-display display-tight text-[30px] mt-1.5">Billing & payments</h2>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="pill bg-[#dff0e9] text-mint border border-mint/20"><RefreshCw size={11} /> QBO synced 11 min ago</span>
          <button className="btn btn-ghost !py-2.5 !px-4 text-[13px]"><Download size={15} /> Export</button>
          <button className="btn btn-gold !py-2.5 !px-4 text-[13px]"><Send size={15} /> New invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["AR outstanding", fmt(ar), `${invoices.filter((i) => i.status === "Sent" || i.status === "Overdue").length} open invoices`, CircleDollarSign],
          ["Overdue", fmt(overdue), "3 accounts · reminders armed", Banknote],
          ["Vendor AP open", fmt(ap), `${vendorBills.filter((b) => b.status !== "Paid").length} bills`, Wallet],
          ["Blended gross margin", "36.2%", "target ≥ 32%", Percent],
        ].map(([l, v, s, Icon]: any) => (
          <Card key={l} className="p-5 flex items-center gap-4">
            <span className="w-11 h-11 rounded-2xl bg-ink text-gold2 flex items-center justify-center shrink-0"><Icon size={18} /></span>
            <div className="min-w-0"><div className="text-[10.5px] uppercase tracking-widest text-mist font-semibold">{l}</div><div className="font-display text-[24px] mt-0.5">{v}</div><div className="text-[10.5px] text-mist truncate">{s}</div></div>
          </Card>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* AR table */}
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <div className="font-display text-[20px]">Client invoices</div>
            <button className="text-[12px] font-semibold text-gold">Aging report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="lux-table min-w-[560px]">
              <thead><tr><th>Invoice</th><th>Client</th><th>Issued → due</th><th>Status</th><th>QBO</th><th className="text-right">Amount</th></tr></thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id}>
                    <td className="font-bold text-[12px] text-mist">{i.id}</td>
                    <td className="font-semibold">{i.client}</td>
                    <td><span className="text-[12.5px]">{i.issued}</span> <span className="text-mist">→</span> <span className="text-[12.5px]">{i.due}</span>{i.aging ? <span className="text-[10.5px] text-rouge font-bold ml-1.5">+{i.aging}d</span> : null}</td>
                    <td><Badge label={i.status} t={invTone[i.status]} /></td>
                    <td>{i.qbo ? <CheckCircle2 size={15} className="text-mint" /> : <span className="text-[11px] text-mist italic">queued</span>}</td>
                    <td className="text-right font-display text-[15px]">{fmt(i.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* aging + margin */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="font-display text-[20px] mb-4">AR aging</div>
            <div className="space-y-3.5">
              {[["Current", 73800, "#17745c"], ["1–30 days", 13450, "#c9a24b"], ["31–60 days", 0, "#b4640a"], ["60+ days", 0, "#b3382e"]].map(([l, v, c]: any) => (
                <div key={l}>
                  <div className="flex justify-between text-[12px] mb-1.5"><span className="font-medium">{l}</span><span className="font-display">{fmt(v)}</span></div>
                  <div className="h-2 rounded-full bg-ivory overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(v / 87250) * 100}%`, background: c }} /></div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div className="font-display text-[20px] mb-5">Margin by service line</div>
            <Donut segments={serviceMix} size={150} thickness={20} centerValue="36.2%" centerLabel="blended" />
          </Card>
        </div>
      </div>

      {/* AP */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <div>
            <div className="font-display text-[20px]">Vendor payments</div>
            <div className="text-[12px] text-mist mt-0.5">Bills linked to work orders · evidence-gated approval · never pay before QA</div>
          </div>
          <button className="btn btn-ghost !py-2 !px-4 text-[12px]">Payment run <ArrowUpRight size={13} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="lux-table min-w-[640px]">
            <thead><tr><th>Bill</th><th>Vendor</th><th>Work order</th><th>QA gate</th><th>Status</th><th>Due</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {vendorBills.map((b) => (
                <tr key={b.id}>
                  <td className="font-bold text-[12px] text-mist">{b.id}</td>
                  <td><div className="flex items-center gap-2.5"><Avatar name={b.vendor} size={26} /><span className="font-semibold">{b.vendor}</span></div></td>
                  <td><a href={`/app/work-orders/${b.wo}`} className="text-gold font-semibold hover:underline">{b.wo}</a></td>
                  <td>{b.status === "Pending Review" ? <span className="pill bg-[#f8e8d8] text-amber">Awaiting QA pass</span> : <span className="pill bg-[#dff0e9] text-mint"><CheckCircle2 size={11} /> Verified</span>}</td>
                  <td><Badge label={b.status} t={billTone[b.status]} /></td>
                  <td className="text-[12.5px]">{b.due}</td>
                  <td className="text-right font-display text-[15px]">{fmt(b.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* monthly bars */}
      <Card className="p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="font-display text-[20px]">Collected vs billed · 12 months</div>
          <div className="flex items-center gap-4 text-[11px] text-mist"><span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink inline-block" /> Billed</span><span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gold inline-block" /> Collected</span></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Bars data={[68,74,71,82,88,84,96,104,99,112,118,126]} labels={["O","N","D","J","F","M","A","M","J","J","A","S"]} height={160} accent="#101a2c" hot="#a6802f" />
          <Bars data={[61,70,66,78,85,80,91,99,93,105,110,88]} labels={["O","N","D","J","F","M","A","M","J","J","A","S"]} height={160} accent="#c9a24b" hot="#17745c" />
        </div>
      </Card>
    </div>
  );
}
