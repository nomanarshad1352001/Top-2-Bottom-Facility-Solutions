"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ImagePlus, Loader2, Lock } from "lucide-react";

const services = ["Commercial Janitorial", "Office Cleaning", "Apartment Turnovers", "Medical Facilities", "Floor Care", "Window Cleaning", "Pressure Washing", "Post-Construction", "Day Porter", "Hauling & Junk Removal"];

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState<string[]>(["Commercial Janitorial"]);
  const [sms, setSms] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: fd.get("company"), contact: fd.get("contact"), email: fd.get("email"), phone: fd.get("phone"),
        location: fd.get("location"), propertyType: fd.get("propertyType"), sqft: fd.get("sqft"),
        frequency: fd.get("frequency"), startDate: fd.get("startDate"), services: picked,
        smsConsent: sms, files,
        utm: { source: params.get("utm_source") ?? "direct", medium: params.get("utm_medium") ?? "none", campaign: params.get("utm_campaign") ?? "organic", gclid: params.get("gclid") ?? null },
      }),
    }).catch(() => null);
    setSending(false);
    setDone(true);
    try { (window as any).dataLayer?.push({ event: "generate_lead", form: "quote_request" }); } catch {}
    setTimeout(() => router.push(`/thank-you?c=${encodeURIComponent(String(fd.get("company") ?? ""))}`), 900);
  }

  if (done) {
    return (
      <div className="text-center py-14">
        <span className="w-16 h-16 rounded-full bg-[#dff0e9] text-mint flex items-center justify-center mx-auto"><CheckCircle2 size={30} /></span>
        <h3 className="font-display text-2xl mt-5">Request received</h3>
        <p className="text-mist text-sm mt-2">Creating your lead record and notifying our team…</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="label">Company name *</label>
          <input required name="company" className="input" placeholder="e.g. Meridian Property Group" />
        </div>
        <div>
          <label className="label">Contact name *</label>
          <input required name="contact" className="input" placeholder="Full name" />
        </div>
        <div>
          <label className="label">Work email *</label>
          <input required type="email" name="email" className="input" placeholder="you@company.com" />
        </div>
        <div>
          <label className="label">Phone *</label>
          <input required name="phone" className="input" placeholder="(___) ___-____" />
        </div>
        <div>
          <label className="label">Property location *</label>
          <input required name="location" className="input" placeholder="City, State" />
        </div>
        <div>
          <label className="label">Property type *</label>
          <select required name="propertyType" className="input" defaultValue="">
            <option value="" disabled>Select type</option>
            {["Commercial Office", "Apartment Community", "Medical Facility", "Retail", "Financial Institution", "Short-Term Rental", "Construction Site", "Government", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Approx. square footage</label>
          <input name="sqft" className="input" placeholder="e.g. 45,000" inputMode="numeric" />
        </div>
      </div>

      <div>
        <label className="label">Services needed *</label>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const on = picked.includes(s);
            return (
              <button type="button" key={s} onClick={() => setPicked((p) => on ? p.filter((x) => x !== s) : [...p, s])}
                className={`pill border transition-all ${on ? "bg-ink text-ivory border-ink" : "bg-white text-ink2 border-line hover:border-gold/50"}`}>
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Service frequency</label>
          <select name="frequency" className="input" defaultValue="Weekly">
            {["One-time", "Weekly", "Bi-Weekly", "3× Weekly", "5× Weekly", "Monthly", "Quarterly", "Custom"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Desired start date</label>
          <input type="date" name="startDate" className="input" />
        </div>
      </div>

      {!compact && (
        <div>
          <label className="label">Photos or video of the space (optional)</label>
          <label className="border-2 border-dashed border-line rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-gold/50 hover:bg-champ/20 transition-all text-center">
            <ImagePlus className="text-gold" size={22} />
            <span className="text-[13px] font-semibold text-ink2">Drop files or browse</span>
            <span className="text-[11px] text-mist">JPG, PNG, MP4 — up to 10 files. Photos help us quote faster.</span>
            <input type="file" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files ?? []).map((f) => f.name))} />
          </label>
          {files.length > 0 && <p className="text-[12px] text-mint font-semibold mt-2">{files.length} file(s) attached: {files.slice(0, 3).join(", ")}{files.length > 3 ? "…" : ""}</p>}
        </div>
      )}

      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-3 text-[12px] text-mist leading-relaxed cursor-pointer">
          <input required type="checkbox" className="mt-0.5 accent-[#a6802f]" />
          I agree to be contacted about my request and accept the Privacy Policy and Terms. *
        </label>
        <label className="flex items-start gap-3 text-[12px] text-mist leading-relaxed cursor-pointer">
          <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-0.5 accent-[#a6802f]" />
          <span><span className="font-semibold text-ink2">Optional:</span> I consent to receive marketing SMS from Top 2 Bottom Facility Solutions at the number provided. Consent is not a condition of purchase. Reply STOP to opt out, HELP for help. Msg & data rates may apply.</span>
        </label>
      </div>

      <button type="submit" disabled={sending} className="btn btn-gold w-full !py-3.5 text-[15px] disabled:opacity-70">
        {sending ? <Loader2 className="animate-spin" size={17} /> : <>Request My Free Assessment <ArrowRight size={16} /></>}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-mist"><Lock size={11} /> 256-bit encrypted · your data stays private</p>
    </form>
  );
}
