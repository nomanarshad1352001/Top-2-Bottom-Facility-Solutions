"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell, Briefcase, Building2, CalendarDays, CheckCircle2, ChevronDown,
  ClipboardList, FileText, Home, Landmark, LogOut, PieChart,
  Search, Settings, ShieldCheck, Sparkles, Users, Wallet, X, AlertTriangle,
} from "lucide-react";
import { Avatar, Logo } from "@/components/ui";
import { notifications } from "@/lib/data";

const NAV: { group: string; items: { label: string; href: string; icon: any; badge?: string }[] }[] = [
  { group: "Overview", items: [
    { label: "Dashboard", href: "/app", icon: Home },
    { label: "Reports & KPIs", href: "/app/reports", icon: PieChart },
  ]},
  { group: "Sales & CRM", items: [
    { label: "Leads & Pipeline", href: "/app/crm", icon: Users, badge: "2" },
    { label: "Estimates & Proposals", href: "/app/proposals", icon: FileText },
  ]},
  { group: "Operations", items: [
    { label: "Work Orders", href: "/app/work-orders", icon: ClipboardList, badge: "18" },
    { label: "Schedule & Dispatch", href: "/app/schedule", icon: CalendarDays },
    { label: "Clients & Sites", href: "/app/clients", icon: Building2 },
    { label: "Quality Assurance", href: "/app/qa", icon: ShieldCheck, badge: "1" },
  ]},
  { group: "Network", items: [
    { label: "Vendors", href: "/app/vendors", icon: Briefcase, badge: "2" },
    { label: "Documents", href: "/app/documents", icon: FileText },
  ]},
  { group: "Finance", items: [
    { label: "Billing & Payments", href: "/app/finance", icon: Landmark },
  ]},
  { group: "System", items: [
    { label: "Settings & Access", href: "/app/settings", icon: Settings },
  ]},
];

const TITLES: [string, string][] = [
  ["/app/reports", "Reports & KPIs"], ["/app/crm", "Leads & Pipeline"], ["/app/proposals", "Estimates & Proposals"],
  ["/app/work-orders", "Work Orders"], ["/app/schedule", "Schedule & Dispatch"], ["/app/clients", "Clients & Sites"],
  ["/app/qa", "Quality Assurance"], ["/app/vendors", "Vendor Network"], ["/app/documents", "Documents & Knowledge"],
  ["/app/finance", "Billing & Payments"], ["/app/settings", "Settings & Access"], ["/app", "Command Dashboard"],
];

const nIcon = { alert: AlertTriangle, check: CheckCircle2, bell: Bell, doc: FileText, msg: Sparkles };

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [division, setDivision] = useState("Facility Solutions");
  const [role, setRole] = useState("Executive / Admin");
  useEffect(() => { try { setRole(localStorage.getItem("t2b-role") ?? "Executive / Admin"); } catch {} }, []);
  const title = TITLES.find(([p]) => p === pathname)?.[1] ?? (pathname.startsWith("/app/work-orders/") ? "Work Order Detail" : "T2B Command");

  return (
    <div className="min-h-screen bg-ivory">
      {/* ---------- sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 w-[264px] bg-ink text-ivory z-40 hidden lg:flex flex-col noise">
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <Link href="/"><Logo light /></Link>
          <button onClick={() => setDivision((d) => d === "Facility Solutions" ? "Consulting" : "Facility Solutions")}
            className="mt-5 w-full flex items-center justify-between gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3.5 py-2.5 hover:bg-gold/20 transition-colors">
            <span className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_10px_#17745c]" />
              <span className="text-[12.5px] font-semibold text-gold2 truncate">{division}</span>
            </span>
            <ChevronDown size={14} className="text-gold2/70" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-5">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="text-[9.5px] tracking-[0.26em] uppercase text-white/30 font-semibold px-3 mb-2">{g.group}</div>
              <div className="space-y-0.5">
                {g.items.map((it) => (
                  <Link key={it.href} href={it.href} className={`side-link ${pathname === it.href ? "active" : ""}`}>
                    <it.icon size={16} className="shrink-0" />
                    <span className="truncate">{it.label}</span>
                    {it.badge && <span className="ml-auto text-[10px] font-bold bg-gold/20 text-gold2 border border-gold/25 rounded-full px-1.5 py-0.5">{it.badge}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3.5 border-t border-white/10 space-y-2">
          <Link href="/portal/client" className="side-link !text-[12.5px]"><Building2 size={15} /> Client portal preview</Link>
          <Link href="/portal/vendor" className="side-link !text-[12.5px]"><Wallet size={15} /> Vendor portal preview</Link>
          <div className="flex items-center gap-3 px-2.5 pt-2">
            <Avatar name="Danielle Carter" size={36} />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold truncate">Danielle Carter</div>
              <div className="text-[10.5px] text-gold2/80 truncate">{role}</div>
            </div>
            <Link href="/login" className="ml-auto text-white/40 hover:text-rouge transition-colors" title="Sign out"><LogOut size={15} /></Link>
          </div>
        </div>
      </aside>

      {/* ---------- topbar ---------- */}
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 glass border-b border-line">
          <div className="px-5 sm:px-8 h-[68px] flex items-center gap-4">
            <Link href="/" className="lg:hidden shrink-0"><Logo size={30} /></Link>
            <div className="min-w-0">
              <h1 className="font-display text-[19px] leading-tight truncate">{title}</h1>
              <div className="text-[11px] text-mist hidden sm:block">Tuesday, September 15, 2026 · {division} division</div>
            </div>
            <div className="ml-auto flex items-center gap-2.5">
              <label className="hidden md:flex items-center gap-2.5 bg-white border border-line rounded-full pl-4 pr-4 py-2 w-[260px] focus-within:border-gold/60 transition-colors">
                <Search size={14} className="text-mist" />
                <input placeholder="Search work orders, clients…" className="bg-transparent outline-none text-[13px] w-full placeholder:text-mist/70" />
              </label>
              <div className="relative">
                <button onClick={() => setOpen((o) => !o)} className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center hover:border-gold/50 transition-colors relative">
                  <Bell size={16} className="text-ink2" />
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] rounded-full bg-rouge text-white text-[9.5px] font-bold flex items-center justify-center px-1">3</span>
                </button>
                {open && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-12 w-[360px] card z-50 overflow-hidden shadow-2xl">
                      <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-pearl">
                        <span className="font-semibold text-[13.5px]">Notifications</span>
                        <button onClick={() => setOpen(false)}><X size={15} className="text-mist" /></button>
                      </div>
                      <div className="max-h-[380px] overflow-y-auto">
                        {notifications.map((n) => {
                          const Icon = nIcon[n.icon];
                          return (
                            <div key={n.id} className={`flex gap-3.5 px-5 py-4 border-b border-line/60 hover:bg-pearl/70 transition-colors ${n.unread ? "bg-champ/25" : ""}`}>
                              <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.icon === "alert" ? "bg-[#f8e1de] text-rouge" : n.icon === "check" ? "bg-[#dff0e9] text-mint" : "bg-[#f4ead2] text-gold"}`}>
                                <Icon size={15} />
                              </span>
                              <div className="min-w-0">
                                <div className="text-[13px] font-semibold flex items-center gap-2">{n.title} {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}</div>
                                <div className="text-[12px] text-mist mt-0.5 leading-snug">{n.detail}</div>
                              </div>
                              <span className="ml-auto text-[10.5px] text-mist shrink-0">{n.time}</span>
                            </div>
                          );
                        })}
                      </div>
                      <Link href="/app/settings" onClick={() => setOpen(false)} className="block text-center text-[12px] font-semibold text-gold py-3 hover:bg-champ/20 border-t border-line">Notification rules & consent settings</Link>
                    </div>
                  </>
                )}
              </div>
              <Link href="/login" className="hidden sm:block"><Avatar name="Danielle Carter" size={38} /></Link>
            </div>
          </div>
        </header>
        <main className="p-5 sm:p-8 max-w-[1440px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
