import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, CalendarClock, Camera, ShieldCheck, Star, Timer } from "lucide-react";
import QuoteForm from "@/components/quote-form";
import { Logo } from "@/components/ui";
import { IMG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Request a Free Facility Assessment",
  description: "Get a tailored, line-item proposal for your property within 48 hours — onsite or virtual assessment.",
};

export default function RequestAssessment() {
  return (
    <main className="min-h-screen">
      <header className="glass border-b border-line">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <Link href="/" className="flex items-center gap-2 text-[13px] font-semibold text-ink2 hover:text-gold transition-colors">
            <ArrowLeft size={15} /> Back to site
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.window} alt="Window cleaning professional" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/96 via-ivory/92 to-ivory" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="pill bg-ink text-ivory">Free · No obligation · 48-hour proposal</span>
            <h1 className="font-display display-tight text-[42px] md:text-[56px] leading-[1.03] mt-6">
              Your property, quoted with <em className="gold-text">precision.</em>
            </h1>
            <p className="text-ink2/80 mt-5 text-[16px] leading-relaxed max-w-lg">
              Tell us about your space and schedule — we’ll scope it onsite or virtually, then deliver
              a transparent, line-item proposal built on 20+ years of facility expertise.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-10 max-w-lg">
              {[
                [Timer, "1-hour response", "Business hours, guaranteed callback"],
                [Camera, "Photo-assisted scope", "Upload photos for a faster estimate"],
                [CalendarClock, "Start in 7 days", "Most programs mobilize within a week"],
                [ShieldCheck, "Licensed & insured", "COI provided before first service"],
              ].map(([Icon, t, d]: any) => (
                <div key={t} className="bg-white/85 border border-line rounded-2xl p-4 backdrop-blur">
                  <span className="w-9 h-9 rounded-xl bg-[#f4ead2] text-gold flex items-center justify-center"><Icon size={16} /></span>
                  <div className="font-semibold text-[13.5px] mt-3">{t}</div>
                  <div className="text-mist text-[12px] mt-1 leading-relaxed">{d}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="flex text-gold2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-gold2" />)}</div>
              <span className="text-[12.5px] text-ink2 font-medium">4.9 average across 300+ verified reviews</span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-[12px] text-mist">
              <BadgeCheck size={15} className="text-gold" /> BBB Accredited · Minority & Woman-Owned · 100% Satisfaction Guarantee
            </div>
          </div>

          <div className="card p-8 bg-white/95 relative">
            <div className="absolute -top-3.5 left-8 pill bg-gold text-white shadow-lg" style={{ padding: "6px 14px" }}>Step 1 of 1 · ~2 minutes</div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
