import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui";
import { Footer } from "@/components/home";

const CONTENT: Record<string, { title: string; updated: string; sections: [string, string][] }> = {
  privacy: {
    title: "Privacy Policy",
    updated: "September 15, 2026",
    sections: [
      ["Information We Collect", "We collect information you provide directly — company and contact details, property information, photos or videos you submit, and service preferences. We automatically collect usage, device, and attribution data (source, medium, campaign, and click identifiers) to understand how visitors find us."],
      ["How We Use Information", "We use information to respond to requests, prepare proposals, deliver and verify services, schedule and dispatch work, process payments through tokenized providers, and improve our platform. Attribution data supports analytics and conversion measurement."],
      ["SMS & Marketing Consent", "SMS marketing consent is optional, collected separately, and never pre-checked. We retain consent source, timestamp, language version, and opt-out state. Reply STOP to opt out or HELP for help at any time."],
      ["Sharing", "We do not sell personal information. We share data only with vetted service providers (payment processing, email/SMS delivery, scheduling, accounting) under contractual confidentiality, or as required by law."],
      ["Data Security & Retention", "Data is encrypted in transit and at rest, access is role-based and logged, and records are retained only as long as needed for operations, legal, and accounting requirements."],
      ["Your Rights", "You may request access, correction, export, or deletion of your personal data by contacting privacy@top2bottomfacilitysolutions.com."],
      ["Contact", "Top 2 Bottom Facility Solutions LLC · contact@top2bottomfacilitysolutions.com · 888.508.6104."],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "September 15, 2026",
    sections: [
      ["Services", "Top 2 Bottom Facility Solutions provides commercial facility services including janitorial, property services, facility maintenance, and specialty services under mutually executed service agreements. Quotes are valid for 30 days unless stated otherwise."],
      ["Satisfaction Guarantee", "If any verified service does not meet the agreed scope, notify us within 24 hours and we will return to correct it at no charge."],
      ["Scheduling", "Recurring schedules may be adjusted with 48-hour notice. Holiday schedules are confirmed in advance. Missed-service alerts apply to provider-caused failures."],
      ["Payments", "Invoices are due per agreement terms. Payment methods are tokenized through our PCI-compliant processor; we never store raw card or bank credentials."],
      ["Photo & Evidence", "Before/after photos may be captured for quality assurance and shared with the account holder. Photos are never used for marketing without written consent."],
      ["Liability & Insurance", "We are licensed, bonded, and insured. Certificates of insurance are available upon request and attached to every commercial agreement."],
      ["Governing Terms", "Executed Master Service Agreements govern where they differ from this page."],
    ],
  },
};

export function generateStaticParams() {
  return [{ slug: "privacy" }, { slug: "terms" }];
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = CONTENT[slug] ?? CONTENT.privacy;
  return (
    <main>
      <header className="glass border-b border-line">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/"><Logo /></Link>
          <Link href="/" className="flex items-center gap-2 text-[13px] font-semibold text-ink2 hover:text-gold"><ArrowLeft size={15} /> Home</Link>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-6 py-20">
        <div className="eyebrow text-gold">Legal</div>
        <h1 className="font-display display-tight text-[44px] mt-3">{doc.title}</h1>
        <p className="text-mist text-sm mt-2">Last updated · {doc.updated}</p>
        <div className="gold-line my-10" />
        <div className="space-y-9">
          {doc.sections.map(([h, b], i) => (
            <section key={h}>
              <h2 className="font-display text-xl flex items-center gap-3">
                <span className="text-champ text-2xl">{String(i + 1).padStart(2, "0")}</span> {h}
              </h2>
              <p className="text-ink2/80 text-[14.5px] leading-relaxed mt-3">{b}</p>
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  );
}
