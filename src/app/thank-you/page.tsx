import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, FileText, PhoneCall } from "lucide-react";
import { Logo } from "@/components/ui";

export const metadata = { title: "Thank You — Request Received" };

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  return (
    <main className="min-h-screen flex flex-col">
      <header className="glass border-b border-line">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-center">
          <Link href="/"><Logo /></Link>
        </div>
      </header>
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          <span className="w-20 h-20 rounded-full bg-[#dff0e9] text-mint flex items-center justify-center mx-auto pulse-gold">
            <CheckCircle2 size={38} />
          </span>
          <h1 className="font-display display-tight text-[40px] md:text-[52px] mt-8 leading-[1.05]">
            {c ? <>Thank you, <em className="gold-text">{c}.</em></> : "Thank you."}
          </h1>
          <p className="text-mist mt-5 text-[16px] leading-relaxed max-w-lg mx-auto">
            Your request has been received and a lead record has been created in our system.
            A confirmation email is on its way — here’s what happens next.
          </p>
          <div className="card p-2 mt-10 text-left">
            {[
              [PhoneCall, "Within 1 business hour", "A solutions advisor calls to confirm scope and schedule your assessment."],
              [Clock, "Within 48 hours", "Onsite or virtual walkthrough completed and documented."],
              [FileText, "Proposal delivered", "Line-item proposal with pricing, schedule and onboarding plan."],
            ].map(([Icon, t, d]: any, i) => (
              <div key={t} className={`flex items-start gap-4 p-5 ${i !== 2 ? "border-b border-line" : ""}`}>
                <span className="w-11 h-11 rounded-2xl bg-[#f4ead2] text-gold flex items-center justify-center shrink-0 font-display text-lg"><Icon size={18} /></span>
                <div>
                  <div className="font-semibold text-[14.5px]">{t}</div>
                  <div className="text-mist text-[13px] mt-1 leading-relaxed">{d}</div>
                </div>
                <span className="ml-auto font-display text-champ text-2xl shrink-0">0{i + 1}</span>
              </div>
            ))}
          </div>
          <Link href="/" className="btn btn-ink mt-10">Back to homepage <ArrowRight size={15} /></Link>
          <p className="text-[11.5px] text-mist mt-8">Conversion event recorded · Reference ID {`LD-${Math.floor(1043 + Math.random() * 40)}`}</p>
        </div>
      </section>
    </main>
  );
}
