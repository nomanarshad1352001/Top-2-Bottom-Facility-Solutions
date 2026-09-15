import type { ReactNode } from "react";
import { tone } from "@/lib/data";

/* monogram logo */
export function Logo({ light = false, size = 40 }: { light?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
        <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill={light ? "#0f1b2d" : "#101a2c"} stroke="url(#lg)" strokeWidth="1.5" />
        <path d="M12 15h24M24 15v13c0 4.5-3.4 7.5-8 7.5-1.6 0-3.1-.34-4.4-1" stroke="#c9a24b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="35.5" cy="34" r="2.4" fill="#e8cf8f" />
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#c9a24b" />
            <stop offset="1" stopColor="#6f5318" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-none">
        <div className={`text-[9px] font-semibold tracking-[0.34em] ${light ? "text-gold2" : "text-gold"}`}>TOP 2 BOTTOM</div>
        <div className={`font-display text-[15px] mt-1 ${light ? "text-ivory" : "text-ink"}`}>Facility Solutions</div>
      </div>
    </div>
  );
}

export function Badge({ label, t = "gray", dot = true }: { label: string; t?: string; dot?: boolean }) {
  const palette = tone[t] ?? tone.gray;
  return (
    <span className={`pill ${palette}`}>
      {dot && <span className="dot bg-current opacity-70" />}
      {label}
    </span>
  );
}

export function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-ivory shrink-0"
      style={{
        width: size, height: size, fontSize: size * 0.34,
        background: "linear-gradient(135deg, #1c2b47, #101a2c)",
        boxShadow: "inset 0 0 0 1.5px rgba(201,162,75,.55)",
      }}
    >
      {initials}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function SectionHead({ eyebrow, title, sub, right }: { eyebrow: string; title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8">
      <div>
        <div className="eyebrow text-gold flex items-center gap-3">
          <span className="w-8 h-px bg-gradient-to-r from-gold to-transparent" />
          {eyebrow}
        </div>
        <h2 className="font-display display-tight text-3xl md:text-[40px] mt-3 leading-[1.08]">{title}</h2>
        {sub && <p className="text-mist mt-3 max-w-xl text-[15px] leading-relaxed">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Trend({ value, up }: { value: string; up: boolean }) {
  return (
    <span className={`pill ${up ? tone.mint : tone.rouge}`} style={{ fontSize: 10.5 }}>
      {up ? "▲" : "▼"} {value}
    </span>
  );
}
