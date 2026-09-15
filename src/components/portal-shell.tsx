"use client";
import Link from "next/link";
import { ArrowLeft, Bell, LifeBuoy, Phone } from "lucide-react";
import { Avatar, Logo } from "@/components/ui";

export default function PortalShell({
  variant, orgName, userName, tabs, active, children,
}: {
  variant: "client" | "vendor";
  orgName: string;
  userName: string;
  tabs: string[];
  active: string;
  children: React.ReactNode;
}) {
  const isClient = variant === "client";
  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-40 glass border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-[70px] flex items-center gap-4">
          <Link href="/"><Logo size={34} /></Link>
          <span className={`pill ${isClient ? "bg-[#f4ead2] text-gold" : "bg-[#e8ebf2] text-ink2"}`}>{isClient ? "Client Portal" : "Vendor Portal"}</span>
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {tabs.map((t) => (
              <span key={t} className={`px-3.5 py-2 rounded-full text-[13px] font-medium cursor-pointer transition-colors ${t === active ? "bg-ink text-ivory" : "text-ink2 hover:text-gold"}`}>{t}</span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <a href="tel:8885086104" className="hidden sm:flex items-center gap-2 text-[12.5px] font-semibold text-ink2"><span className="w-8 h-8 rounded-full bg-white border border-line flex items-center justify-center"><Phone size={13} /></span> 888.508.6104</a>
            <button className="w-9 h-9 rounded-full bg-white border border-line flex items-center justify-center relative">
              <Bell size={15} className="text-ink2" /><span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-gold" />
            </button>
            <div className="flex items-center gap-2.5 pl-2">
              <Avatar name={userName} size={36} />
              <div className="hidden sm:block leading-tight">
                <div className="text-[12.5px] font-semibold">{userName}</div>
                <div className="text-[10.5px] text-mist">{orgName}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
      <footer className="border-t border-line mt-8">
        <div className="max-w-6xl mx-auto px-5 py-6 flex flex-wrap items-center justify-between gap-3 text-[12px] text-mist">
          <span>© 2026 Top 2 Bottom Facility Solutions · Secured portal · all activity logged</span>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><LifeBuoy size={13} /> support@top2bottomfacilitysolutions.com</span>
            <Link href="/" className="flex items-center gap-1.5 font-semibold text-gold"><ArrowLeft size={13} /> Public site</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
