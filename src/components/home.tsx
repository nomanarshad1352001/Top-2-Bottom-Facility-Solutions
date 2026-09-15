"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Award, BadgeCheck, Building2, CalendarClock,
  Camera, CheckCircle2, ChevronRight, ClipboardCheck, Landmark, MapPin,
  Phone, Quote, Shield, ShieldCheck, Sparkles, Star, Users, Workflow,
} from "lucide-react";
import { IMG, leadSources, revenueMonths, revenueSeries } from "@/lib/data";
import { Logo } from "@/components/ui";
import { AreaChart, Donut } from "@/components/charts";
import QuoteForm from "@/components/quote-form";

const EBX: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.85, ease: EBX },
};

/* ================================ NAV ================================ */
export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="glass border-b border-line">
        <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <nav className="hidden lg:flex items-center gap-9">
            <a href="#services" className="navlink">Services</a>
            <a href="#platform" className="navlink">Platform</a>
            <a href="#process" className="navlink">Process</a>
            <a href="#about" className="navlink">About</a>
            <Link href="/login" className="navlink">Sign In</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:8885086104" className="hidden md:flex items-center gap-2 text-[13.5px] font-semibold text-ink2 hover:text-gold transition-colors">
              <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center bg-white"><Phone size={14} /></span>
              888.508.6104
            </a>
            <Link href="/request-assessment" className="btn btn-gold !py-2.5 !px-5 text-[13px]">
              Request Assessment <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================================ HERO ================================ */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="Luxury commercial lobby maintained by Top 2 Bottom" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-[#0c1424]/55 to-[#0c1424]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1424]/70 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pb-20 pt-40 w-full">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EBX }}>
          <div className="flex flex-wrap items-center gap-2.5 mb-8">
            {["Licensed · Bonded · Insured", "BBB Accredited", "Minority & Woman-Owned", "20+ Years Experience"].map((b) => (
              <span key={b} className="pill bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">{b}</span>
            ))}
          </div>
          <h1 className="font-display display-tight text-white text-[13.5vw] sm:text-7xl lg:text-[92px] leading-[0.98] max-w-5xl">
            Facility solutions,<br />
            <em className="gold-text font-medium">elevated</em> to an art.
          </h1>
          <p className="text-white/70 text-lg max-w-xl mt-7 leading-relaxed">
            More than a service — a solution. Commercial janitorial, property services, facility
            maintenance and specialty care, orchestrated on one technology platform across every
            property you own.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link href="/request-assessment" className="btn btn-gold pulse-gold">
              Request a Free Facility Assessment <ArrowRight size={16} />
            </Link>
            <a href="#services" className="btn btn-light">Explore Services</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden mt-16 backdrop-blur-md"
        >
          {[["2,400+", "Services completed / month"], ["97.4%", "QA verification pass rate"], ["98.1%", "On-time dispatch rate"], ["4.9★", "Average client rating"]].map(([v, l]) => (
            <div key={l} className="bg-white/[0.06] px-6 py-5">
              <div className="font-display text-3xl text-white">{v}</div>
              <div className="text-white/55 text-xs mt-1 tracking-wide">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================ MARQUEE ============================ */
const sectors = ["Property Management", "Commercial Offices", "Apartment Communities", "Medical Facilities", "Retail", "Financial Institutions", "Short-Term Rentals", "Construction", "Government", "Hospitality"];
function Marquee() {
  return (
    <div className="bg-ink py-5 overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap marquee-track w-max">
        {[...sectors, ...sectors].map((s, i) => (
          <span key={i} className="flex items-center gap-8 text-[13px] tracking-[0.22em] uppercase text-white/40 font-medium pr-8">
            {s} <span className="w-1.5 h-1.5 rounded-full bg-gold2 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================ SERVICES ============================ */
const serviceGroups = [
  { title: "Cleaning Services", img: IMG.team, items: ["Commercial Janitorial", "Office Cleaning", "Medical Facilities", "Retail Cleaning", "Disinfection Services"] },
  { title: "Property Services", img: IMG.housekeeping, items: ["Apartment Turnovers", "Move-In / Move-Out", "Common Area Maintenance", "Clubhouse Cleaning", "Hauling & Junk Removal"] },
  { title: "Facility Maintenance", img: IMG.cart, items: ["Pressure Washing", "Floor Care & Refinishing", "Window Cleaning", "Minor Repairs", "Preventative Maintenance"] },
  { title: "Specialty Services", img: IMG.window, items: ["Post-Construction Cleaning", "Emergency Cleanup", "Day Porter Services", "High Dusting", "Event Reset"] },
];
function Services() {
  return (
    <section id="services" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...rise} className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow text-gold flex items-center gap-3"><span className="w-8 h-px bg-gold" />What we do</div>
            <h2 className="font-display display-tight text-4xl md:text-[52px] mt-4 leading-[1.05]">Four disciplines.<br />One accountable partner.</h2>
          </div>
          <p className="text-mist max-w-sm text-[15px] leading-relaxed">Frequency programs from one-time to daily — weekly, bi-weekly, monthly, quarterly, and custom weekday schedules.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {serviceGroups.map((g, i) => (
            <motion.a key={g.title} href="/request-assessment"
              {...rise} transition={{ duration: 0.8, delay: i * 0.08, ease: EBX }}
              className="card card-hover overflow-hidden group block">
              <div className="relative h-52 overflow-hidden">
                <img src={g.img} alt={g.title} className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute top-4 left-4 font-display text-ivory/90 text-sm">0{i + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[22px]">{g.title}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-[13.5px] text-ink2">
                      <CheckCircle2 size={14} className="text-gold shrink-0" /> {it}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-gold text-[13px] font-semibold mt-5 group-hover:gap-3 transition-all">
                  Request this service <ArrowRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================= PLATFORM SHOWCASE ========================= */
function Platform() {
  return (
    <section id="platform" className="relative py-28 bg-ink text-ivory overflow-hidden noise">
      <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="absolute -bottom-52 -left-32 w-[480px] h-[480px] rounded-full bg-sky2/10 blur-[140px]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div {...rise} className="max-w-3xl">
          <div className="eyebrow text-gold2 flex items-center gap-3"><Sparkles size={14} /> Powered by T2B Command</div>
          <h2 className="font-display display-tight text-4xl md:text-[52px] mt-4 leading-[1.05] text-white">
            The operating system behind every spotless delivery.
          </h2>
          <p className="text-white/60 mt-5 text-[15.5px] leading-relaxed max-w-2xl">
            Leads, estimates, recurring schedules, dispatch, vendor networks, photo-verified QA,
            invoicing and executive reporting — one platform, one source of truth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 mt-14">
          <motion.div {...rise} className="lg:col-span-3 rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-7 overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10.5px] tracking-[0.24em] uppercase text-white/40 font-semibold">Executive revenue</div>
                <div className="font-display text-3xl text-white mt-1">$126k <span className="text-sm text-mint font-sans font-semibold">▲ 6.8% MoM</span></div>
              </div>
              <span className="pill bg-gold/15 text-gold2 border border-gold/25">Live · FY 2026</span>
            </div>
            <AreaChart data={revenueSeries} labels={revenueMonths} />
            <div className="grid grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mt-6 border border-white/10">
              {[["Open work orders", "18"], ["Verifications today", "27"], ["Active vendors", "34"]].map(([l, v]) => (
                <div key={l} className="bg-ink/60 px-4 py-3.5">
                  <div className="text-[10.5px] text-white/45 uppercase tracking-wider font-semibold">{l}</div>
                  <div className="font-display text-xl text-white mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div {...rise} className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-7">
              <div className="text-[10.5px] tracking-[0.24em] uppercase text-white/40 font-semibold mb-4">Lead sources · attributed</div>
              <Donut segments={leadSources} size={150} thickness={20} centerValue="128" centerLabel="leads Q3" />
            </motion.div>
            <motion.div {...rise} className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-7">
              <div className="text-[10.5px] tracking-[0.24em] uppercase text-white/40 font-semibold mb-5">Every module, Day One</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[["CRM & lead intake", Users], ["Work orders & dispatch", Workflow], ["Scheduling & dispatch", CalendarClock], ["Vendor portal & payouts", Building2], ["Photo-verified QA", Camera], ["Finance + QBO sync", Landmark]].map(([l, Icon]: any) => (
                  <div key={l as string} className="flex items-center gap-2.5 text-[12.5px] text-white/75">
                    <span className="w-7 h-7 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center text-gold2 shrink-0"><Icon size={13} /></span>
                    {l as string}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div {...rise} className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/login" className="btn btn-gold">Tour the Platform <ArrowUpRight size={15} /></Link>
          <span className="text-white/45 text-sm">Client & vendor portals included — no per-seat surprises.</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================= PROCESS ============================= */
const steps = [
  { n: "01", t: "Lead & scope", d: "Website, ads or phone intake creates a deduplicated CRM lead with source attribution. Onsite walk or photo/video assessment defines scope." },
  { n: "02", t: "Estimate & agreement", d: "Versioned proposals with labor, materials and margin inputs. E-signed agreement, tokenized payment setup, guided onboarding." },
  { n: "03", t: "Schedule & dispatch", d: "Recurring or one-time schedules auto-generate work orders. Conflict detection and missed-service alerts protect every visit." },
  { n: "04", t: "Vendor match & service", d: "Approved vendors matched by territory, capability, compliance and capacity. Checklists and evidence requirements travel with the job." },
  { n: "05", t: "Photo-verified QA", d: "Before-and-after evidence, inspections, pass/fail scoring and corrective actions — verified before a work order can close." },
  { n: "06", t: "Bill, pay & report", d: "Client invoices and vendor payouts tracked to the work order, synced to QuickBooks, rolled into executive KPIs." },
];
function Process() {
  return (
    <section id="process" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...rise}>
          <div className="eyebrow text-gold flex items-center gap-3"><span className="w-8 h-px bg-gold" />How it works</div>
          <h2 className="font-display display-tight text-4xl md:text-[52px] mt-4 leading-[1.05] max-w-2xl">From first click to five-star closeout.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-3xl overflow-hidden mt-14">
          {steps.map((s, i) => (
            <motion.div key={s.n} {...rise} transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EBX }} className="bg-pearl p-8 group hover:bg-white transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-display text-[44px] leading-none text-champ group-hover:text-gold2 transition-colors">{s.n}</span>
                <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-mist group-hover:text-gold group-hover:border-gold/40 transition-all"><ChevronRight size={15} /></span>
              </div>
              <h3 className="font-display text-[21px] mt-5">{s.t}</h3>
              <p className="text-mist text-[13.5px] leading-relaxed mt-2.5">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== ABOUT ============================== */
function About() {
  return (
    <section id="about" className="py-28 bg-pearl border-y border-line">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div {...rise} className="relative">
          <div className="rounded-3xl overflow-hidden">
            <img src={IMG.team} alt="Top 2 Bottom professional cleaning team" className="w-full h-[520px] object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 md:-right-8 w-64 rounded-2xl overflow-hidden border-8 border-pearl shadow-2xl floaty">
            <img src={IMG.housekeeping} alt="Detail housekeeping" className="w-full h-44 object-cover" />
          </div>
          <div className="absolute -top-6 -left-2 md:-left-6 card px-6 py-5 floaty" style={{ animationDelay: "1.2s" }}>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f4ead2] text-gold flex items-center justify-center"><Award size={18} /></span>
              <div>
                <div className="font-display text-lg leading-tight">Since 2017</div>
                <div className="text-[11px] text-mist">Minority & woman-owned</div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div {...rise}>
          <div className="eyebrow text-gold flex items-center gap-3"><span className="w-8 h-px bg-gold" />Our story</div>
          <h2 className="font-display display-tight text-4xl md:text-[46px] mt-4 leading-[1.08]">Built like family.<br />Scaling like a technology company.</h2>
          <p className="text-mist mt-6 leading-relaxed text-[15px]">
            Founded in 2017, Top 2 Bottom Facility Solutions began with a simple mission: dependable,
            high-quality facility services with every client treated like family. Today we serve
            property managers, apartment communities, commercial offices, retail, medical, financial,
            government and construction partners — backed by a 100% satisfaction guarantee.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-9">
            {[["Locally owned & operated", MapPin], ["Minority & woman-owned", Users], ["Licensed, bonded & insured", ShieldCheck], ["100% satisfaction guarantee", BadgeCheck]].map(([l, Icon]: any) => (
              <div key={l} className="flex items-center gap-3 bg-white border border-line rounded-2xl px-4 py-3.5">
                <span className="w-9 h-9 rounded-xl bg-[#f4ead2] text-gold flex items-center justify-center shrink-0"><Icon size={16} /></span>
                <span className="text-[13px] font-semibold text-ink2 leading-snug">{l}</span>
              </div>
            ))}
          </div>
          <div className="gold-line mt-9 mb-7" />
          <div className="flex items-center gap-5">
            <Quote className="text-gold shrink-0" size={26} />
            <p className="font-display italic text-lg text-ink2 leading-relaxed">
              “You receive more than a service — you gain a trusted partner committed to protecting
              your property and your peace of mind.”
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ========================== TESTIMONIALS =========================== */
const quotes = [
  { q: "T2B took over three of our Class A assets and the difference was visible in week one. The photo QA reports alone are worth it — I approve services from my phone.", n: "Carla Nguyen", r: "Director of Facilities, Meridian Property Group" },
  { q: "Turnovers used to be our biggest bottleneck. Their vendor network and scheduling platform turned a 3-day scramble into a same-day, verified process.", n: "Erin Moss", r: "Community Manager, Harborview Apartments" },
  { q: "As a bank, compliance is everything. COIs, background-checked crews, documented checklists — T2B operates at the standard we hold ourselves to.", n: "Rita Calloway", r: "VP Corporate Services, First Harbor Bank" },
];
function Testimonials() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...rise} className="text-center mb-14">
          <div className="eyebrow text-gold justify-center flex items-center gap-3"><Star size={13} className="fill-gold" /> Client voices</div>
          <h2 className="font-display display-tight text-4xl md:text-[46px] mt-4">Trusted, verified, renewed.</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <motion.figure key={t.n} {...rise} transition={{ duration: 0.8, delay: i * 0.1, ease: EBX }} className="card card-hover p-8 flex flex-col">
              <div className="flex gap-1 text-gold2 mb-5">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={15} className="fill-gold2" />)}
              </div>
              <blockquote className="font-display text-[17px] leading-relaxed text-ink2 flex-1">“{t.q}”</blockquote>
              <figcaption className="mt-7 pt-5 border-t border-line flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-ink text-gold2 font-display flex items-center justify-center text-sm">
                  {t.n.split(" ").map((w) => w[0]).join("")}
                </span>
                <div>
                  <div className="text-[13.5px] font-semibold">{t.n}</div>
                  <div className="text-[11.5px] text-mist">{t.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ QUOTE CTA ============================ */
function QuoteCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.lobby} alt="Modern office lobby" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ivory/92 backdrop-blur-[2px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-start">
        <motion.div {...rise}>
          <div className="eyebrow text-gold flex items-center gap-3"><span className="w-8 h-px bg-gold" />Free facility assessment</div>
          <h2 className="font-display display-tight text-4xl md:text-[50px] mt-4 leading-[1.05]">Tell us about your property.<br />We’ll handle the rest.</h2>
          <p className="text-ink2/80 mt-6 max-w-md text-[15px] leading-relaxed">
            Onsite walkthrough or virtual photo/video assessment — your choice. Qualified requests
            receive a tailored, line-item proposal within 48 hours.
          </p>
          <div className="mt-9 space-y-4">
            {[["Response within 1 business hour", ClipboardCheck], ["No-obligation, line-item proposal", Workflow], ["New client discounts available", Sparkles]].map(([l, Icon]: any) => (
              <div key={l} className="flex items-center gap-3 text-[14px] font-medium text-ink2">
                <span className="w-9 h-9 rounded-full bg-white border border-line flex items-center justify-center text-gold shadow-sm"><Icon size={15} /></span>
                {l}
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 text-[13px] text-mist">
            <Shield size={16} className="text-gold" />
            Your information is encrypted and never shared. SMS consent is always optional.
          </div>
        </motion.div>
        <motion.div {...rise} transition={{ duration: 0.9, delay: 0.1, ease: EBX }} className="card p-8 bg-white/95">
          <QuoteForm compact />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================= */
export function Footer() {
  return (
    <footer className="bg-ink text-ivory relative overflow-hidden noise">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo light />
            <p className="text-white/50 text-[13.5px] leading-relaxed mt-5 max-w-sm">
              A technology-driven facility services organization — delivering commercial janitorial,
              property services, maintenance and specialty care with verified quality, across every
              market we serve.
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              {["BBB", "Licensed", "Bonded", "Insured"].map((b) => (
                <span key={b} className="pill bg-white/[0.07] text-white/70 border border-white/10">{b}</span>
              ))}
            </div>
          </div>
          {[
            { h: "Services", ls: [["Commercial Janitorial", "/request-assessment"], ["Apartment Turnovers", "/request-assessment"], ["Floor & Window Care", "/request-assessment"], ["Post-Construction", "/request-assessment"], ["Pressure Washing", "/request-assessment"]] },
            { h: "Company", ls: [["About & History", "/#about"], ["Our Process", "/#process"], ["The Platform", "/#platform"], ["Careers & Vendors", "/login"], ["Consulting Division", "/login"]] },
            { h: "Portals", ls: [["Client Sign In", "/portal/client"], ["Vendor Sign In", "/portal/vendor"], ["Team Sign In", "/login"], ["Request Assessment", "/request-assessment"]] },
          ].map((col) => (
            <div key={col.h} className="md:col-span-2">
              <div className="text-[10.5px] tracking-[0.24em] uppercase text-gold2 font-semibold mb-4">{col.h}</div>
              <ul className="space-y-2.5">
                {col.ls.map(([l, href]) => (
                  <li key={l}><Link href={href} className="text-[13px] text-white/55 hover:text-gold2 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-3">
            <div className="text-[10.5px] tracking-[0.24em] uppercase text-gold2 font-semibold mb-4">Contact</div>
            <a href="tel:8885086104" className="flex items-center gap-2.5 text-white/80 hover:text-gold2 text-[14px] font-semibold"><Phone size={15} className="text-gold2" /> 888.508.6104</a>
            <a href="mailto:contact@top2bottomfacilitysolutions.com" className="block text-white/55 hover:text-gold2 text-[13px] mt-3 break-words">contact@top2bottomfacilitysolutions.com</a>
            <div className="flex items-center gap-2 text-white/55 text-[13px] mt-3"><MapPin size={14} className="text-gold2" /> Atlanta · Savannah · Nationwide 2027</div>
            <Link href="/request-assessment" className="btn btn-gold mt-6 !py-2.5 !px-5 text-[13px]">Schedule Today <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-14 pt-7 flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/35">
          <span>© 2026 Top 2 Bottom Facility Solutions LLC. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/legal/privacy" className="hover:text-gold2 transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-gold2 transition-colors">Terms & Conditions</Link>
            <span className="text-white/25">T2B Command Platform v1.0 · Day One MVP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================== PAGE ============================== */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Platform />
      <Process />
      <About />
      <Testimonials />
      <QuoteCTA />
      <Footer />
    </main>
  );
}
