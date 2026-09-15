"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Fingerprint, Landmark, Lock, ShieldCheck, Sparkles, Users, Wrench } from "lucide-react";
import { Logo } from "@/components/ui";
import { IMG } from "@/lib/data";

const EBX: [number, number, number, number] = [0.22, 1, 0.36, 1];

const roles = [
  { name: "Executive / Admin", desc: "Full platform — dashboards, CRM, dispatch, QA, finance", icon: Sparkles, to: "/app", accent: "#a6802f" },
  { name: "Operations Manager", desc: "Work orders, scheduling, dispatch & escalations", icon: Wrench, to: "/app/work-orders", accent: "#101a2c" },
  { name: "Sales", desc: "Leads, pipeline, estimates & proposals", icon: Users, to: "/app/crm", accent: "#2d6da3" },
  { name: "Finance", desc: "Invoicing, AR, vendor pay & QBO sync", icon: Landmark, to: "/app/finance", accent: "#17745c" },
  { name: "Client Portal", desc: "Meridian Property Group — services, evidence & invoices", icon: Building2, to: "/portal/client", accent: "#a6802f" },
  { name: "Vendor Portal", desc: "CrystalClean Crew — opportunities, jobs & payouts", icon: ShieldCheck, to: "/portal/vendor", accent: "#101a2c" },
];

export default function Login() {
  const router = useRouter();
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* left form side */}
      <div className="flex flex-col px-6 sm:px-14 py-8 relative">
        <div className="flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <Link href="/" className="text-[13px] font-semibold text-mist hover:text-gold flex items-center gap-2"><ArrowLeft size={14} /> Site</Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EBX }} className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-14">
          <div className="eyebrow text-gold">Secure access</div>
          <h1 className="font-display display-tight text-[38px] leading-[1.05] mt-3">Welcome back to<br />T2B Command.</h1>
          <p className="text-mist text-sm mt-4 leading-relaxed">Demo mode — choose a role to enter. Production uses Microsoft 365 SSO with MFA, role + record-level permissions, and full audit history.</p>

          <div className="space-y-2.5 mt-9">
            {roles.map((r, i) => (
              <motion.button
                key={r.name}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease: EBX }}
                onClick={() => { try { localStorage.setItem("t2b-role", r.name); } catch {} router.push(r.to); }}
                className="w-full card card-hover px-5 py-4 flex items-center gap-4 text-left group"
              >
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-ivory shrink-0" style={{ background: `linear-gradient(135deg, ${r.accent}, #101a2c)` }}>
                  <r.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold text-[14px]">{r.name}</span>
                  <span className="block text-mist text-[12px] truncate">{r.desc}</span>
                </span>
                <ArrowRight size={16} className="ml-auto text-mist group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0" />
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-8 text-[11.5px] text-mist">
            <Fingerprint size={14} className="text-gold" /> MFA enforced · <Lock size={12} /> SOC 2-aligned controls · Session audit enabled
          </div>
        </motion.div>
      </div>

      {/* right visual side */}
      <div className="relative hidden lg:block overflow-hidden">
        <img src={IMG.glassRoof} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/60 to-ink/20" />
        <div className="absolute bottom-0 inset-x-0 p-14">
          <div className="gold-line w-24 mb-8" />
          <p className="font-display text-white text-[34px] leading-[1.15] max-w-lg">
            One platform. Every property, crew, checklist and invoice — <em className="gold-text">verified.</em>
          </p>
          <div className="flex gap-8 mt-10">
            {[["97.4%", "QA pass rate"], ["98.1%", "On-time dispatch"], ["34", "Vendor partners"]].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-2xl text-gold2">{v}</div>
                <div className="text-white/50 text-[11px] mt-1 tracking-wide uppercase">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
