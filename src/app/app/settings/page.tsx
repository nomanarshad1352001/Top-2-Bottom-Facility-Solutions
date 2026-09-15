"use client";
import { useState } from "react";
import {
  BadgeCheck, CheckCircle2, KeyRound, Link2, Lock, Milestone, Plug,
  RefreshCw, ShieldCheck, UserCog, Users2, XCircle,
} from "lucide-react";
import { Avatar, Badge, Card } from "@/components/ui";
import { integrations, permissionMatrix, users } from "@/lib/data";

const TABS = [
  { id: "users", label: "Users & Roles", icon: Users2 },
  { id: "matrix", label: "Permission Matrix", icon: KeyRound },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "roadmap", label: "Delivery Roadmap", icon: Milestone },
] as const;

const intStatusTone: Record<string, string> = { Connected: "mint", Configured: "gold", Ready: "sky", "Future Phase": "gray" };

const phases = [
  { n: "01", t: "Foundation & CRM", d: "Platform foundation, responsive website, security, roles, lead capture, advertising readiness.", tone: "mint", label: "Live" },
  { n: "02", t: "Sales, Estimating & Onboarding", d: "Pipeline, assessments, versioned proposals, agreements, tokenized payment setup.", tone: "mint", label: "Live" },
  { n: "03", t: "Recurring Services, Work Orders & Dispatch", d: "Schedules, auto-generation, assignments, conflicts, missed-service alerts.", tone: "mint", label: "Live" },
  { n: "04", t: "Vendor Ops, Portals & Quality", d: "Vendor lifecycle, compliance, opportunities, portals, evidence, corrective actions.", tone: "gold", label: "UAT" },
  { n: "05", t: "Finance, Assets, Documents & Reporting", d: "Billing, QBO sync, margins, inventory, knowledge base, executive dashboards.", tone: "gold", label: "UAT" },
  { n: "06", t: "Consulting, Migration, Go-Live & Handover", d: "Consulting CRM, BookingKoala cutover, training, production cutover, full handover.", tone: "sky", label: "Scheduled" },
] as const;

export default function Settings() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("users");

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow text-gold">Administration · audited changes only</div>
        <h2 className="font-display display-tight text-[30px] mt-1.5">Settings & access control</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`pill border !px-4 !py-2 text-[12.5px] ${tab === t.id ? "bg-ink text-ivory border-ink" : "bg-white border-line text-ink2 hover:border-gold/50"}`}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <div className="font-display text-[20px]">Team directory</div>
            <button className="btn btn-gold !py-2 !px-4 text-[12px]"><UserCog size={13} /> Invite user</button>
          </div>
          <div className="overflow-x-auto">
            <table className="lux-table min-w-[720px]">
              <thead><tr><th>User</th><th>Role</th><th>MFA</th><th>Status</th><th>Last active</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td><div className="flex items-center gap-3"><Avatar name={u.name} size={34} /><div><div className="font-semibold">{u.name}</div><div className="text-[11px] text-mist">{u.email}</div></div></div></td>
                    <td><Badge label={u.role} t={u.role.includes("Executive") ? "gold" : u.role.includes("Admin") ? "ink" : "sky"} dot={false} /></td>
                    <td>{u.mfa ? <span className="pill bg-[#dff0e9] text-mint"><ShieldCheck size={11} /> Enforced</span> : <span className="pill bg-[#f8e1de] text-rouge"><XCircle size={11} /> Pending</span>}</td>
                    <td><Badge label={u.status} t={u.status === "Active" ? "mint" : "gray"} /></td>
                    <td className="text-[12.5px] text-mist">{u.lastActive}</td>
                    <td className="text-right"><button className="text-[12px] font-semibold text-gold">Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "matrix" && (
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <div>
              <div className="font-display text-[20px]">Role × module permissions</div>
              <div className="text-[12px] text-mist mt-0.5">Server-side enforcement · division-aware · record-level scoping · full audit history</div>
            </div>
            <Lock size={18} className="text-gold" />
          </div>
          <div className="overflow-x-auto">
            <table className="lux-table min-w-[820px]">
              <thead><tr><th>Role</th><th>CRM</th><th>Work Orders</th><th>Vendors</th><th>Finance</th><th>QA</th><th>Reports</th><th>Admin</th></tr></thead>
              <tbody>
                {permissionMatrix.map((r) => (
                  <tr key={r.role}>
                    <td className="font-semibold text-[13px]">{r.role}</td>
                    {Object.values(r.perms).map((p, i) => (
                      <td key={i}>
                        {p === "—" ? <span className="text-mist/40">—</span> : (
                          <span className={`pill ${p === "Full" ? "bg-ink text-gold2" : ["View", "Assigned", "Own Org", "Own Profile", "Own Invoices", "Own Pay", "Own Evidence", "Own"].includes(p) ? "bg-[#e8ebf2] text-ink2" : "bg-[#f4ead2] text-gold"}`}>{p}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-pearl border-t border-line text-[12px] text-mist flex flex-wrap gap-x-8 gap-y-2">
            <span className="flex items-center gap-2"><BadgeCheck size={13} className="text-mint" /> Create/edit granted separately from view</span>
            <span className="flex items-center gap-2"><BadgeCheck size={13} className="text-mint" /> Export restricted & logged</span>
            <span className="flex items-center gap-2"><BadgeCheck size={13} className="text-mint" /> Deactivation preferred over deletion</span>
          </div>
        </Card>
      )}

      {tab === "integrations" && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {integrations.map((i) => (
            <Card key={i.name} className={`p-6 ${i.status === "Future Phase" ? "opacity-75" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className={`w-11 h-11 rounded-2xl flex items-center justify-center ${i.status === "Connected" ? "bg-ink text-gold2" : i.status === "Future Phase" ? "bg-ivory text-mist border border-line" : "bg-[#f4ead2] text-gold"}`}>
                    {i.status === "Future Phase" ? <Milestone size={17} /> : i.status === "Connected" ? <Link2 size={17} /> : <RefreshCw size={17} />}
                  </span>
                  <div>
                    <div className="font-semibold text-[15px]">{i.name}</div>
                    <div className="text-[11px] text-mist">{i.category}</div>
                  </div>
                </div>
                <Badge label={i.status} t={intStatusTone[i.status]} dot={false} />
              </div>
              <p className="text-[12.5px] text-ink2/80 leading-relaxed mt-4">{i.detail}</p>
              <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-line text-[11px] text-mist">
                <span>{i.lastSync ? `Sync: ${i.lastSync}` : "—"}</span>
                {i.status !== "Future Phase" && (
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-mint" /> Auth · mapping · dedupe · retry · audit ✓</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "roadmap" && (
        <div className="grid lg:grid-cols-2 gap-5">
          {phases.map((p) => (
            <Card key={p.n} className="p-6 flex gap-5">
              <span className="font-display text-[40px] leading-none text-champ">{p.n}</span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-[15.5px]">{p.t}</h3>
                  <Badge label={p.label} t={p.tone} dot={false} />
                </div>
                <p className="text-[13px] text-mist leading-relaxed mt-2">{p.d}</p>
              </div>
            </Card>
          ))}
          <Card className="p-6 bg-ink !border-ink text-ivory noise relative overflow-hidden lg:col-span-2">
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="text-gold2 font-semibold text-[12px] tracking-widest uppercase">Future phase · separate approval</div>
                <p className="text-white/60 text-[13px] mt-2 leading-relaxed">AI receptionist & agents · native iOS/Android · advanced BI & predictive analytics · fleet telematics & IoT · white-label deployments. Each gated by change control with written impact analysis.</p>
              </div>
              <Badge label="Change-controlled" t="gold" dot={false} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
