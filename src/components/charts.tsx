"use client";
import { useMemo, useState } from "react";

/* ---------------- smooth area / line chart ---------------- */
export function AreaChart({
  data, labels, height = 220, suffix = "", prefix = "$", unit = "k",
}: { data: number[]; labels: string[]; height?: number; suffix?: string; prefix?: string; unit?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 220, P = 28;
  const max = Math.max(...data) * 1.15;
  const min = Math.min(...data) * 0.75;
  const pts = data.map((v, i) => ({
    x: P + (i * (W - P * 2)) / (data.length - 1),
    y: H - P - ((v - min) / (max - min)) * (H - P * 2),
  }));
  const path = useMemo(() => smooth(pts), [data]); // eslint-disable-line
  const area = `${path} L ${pts[pts.length - 1].x} ${H - 8} L ${pts[0].x} ${H - 8} Z`;

  function smooth(p: { x: number; y: number }[]) {
    let d = `M ${p[0].x} ${p[0].y}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * W;
          let best = 0, bd = Infinity;
          pts.forEach((p, i) => { const d = Math.abs(p.x - x); if (d < bd) { bd = d; best = i; } });
          setHover(best);
        }}
      >
        <defs>
          <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c9a24b" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={P} x2={W - P} y1={P + g * (H - P * 2)} y2={P + g * (H - P * 2)} stroke="rgba(16,26,44,.07)" strokeDasharray="3 5" />
        ))}
        <path d={area} fill="url(#areaGold)" />
        <path d={path} fill="none" stroke="#a6802f" strokeWidth="2.5" strokeLinecap="round" />
        {labels.map((l, i) => (
          <text key={l + i} x={pts[i]?.x} y={H - 2} textAnchor="middle" fontSize="9.5" fill="#66718a">{l}</text>
        ))}
        {hover !== null && (
          <g>
            <line x1={pts[hover].x} x2={pts[hover].x} y1={P - 6} y2={H - 14} stroke="#101a2c" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx={pts[hover].x} cy={pts[hover].y} r="5" fill="#101a2c" stroke="#e8cf8f" strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          className="absolute -top-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-ivory bg-ink shadow-xl pointer-events-none whitespace-nowrap"
          style={{ left: `${(pts[hover].x / 640) * 100}%`, transform: "translateX(-50%)" }}
        >
          {labels[hover]} · {prefix}{data[hover]}{unit}{suffix}
        </div>
      )}
    </div>
  );
}

/* ---------------- donut ---------------- */
export function Donut({
  segments, size = 168, thickness = 22, centerLabel, centerValue,
}: { segments: { label: string; value: number; color: string }[]; size?: number; thickness?: number; centerLabel?: string; centerValue?: string }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const R = (size - thickness) / 2;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
        <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="rgba(16,26,44,.06)" strokeWidth={thickness} />
        {segments.map((s) => {
          const frac = s.value / total;
          const dash = `${frac * C - 3} ${C - frac * C + 3}`;
          const offset = -acc * C;
          acc += frac;
          return (
            <circle key={s.label} cx={size / 2} cy={size / 2} r={R} fill="none"
              stroke={s.color} strokeWidth={thickness} strokeDasharray={dash} strokeDashoffset={offset} strokeLinecap="round" />
          );
        })}
        {(centerValue || centerLabel) && (
          <g className="rotate-90" style={{ transformOrigin: "center" }}>
            <text x="50%" y="47%" textAnchor="middle" fontSize="22" fontWeight="600" fill="#101a2c" fontFamily="Fraunces, serif">{centerValue}</text>
            <text x="50%" y="59%" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#66718a">{centerLabel?.toUpperCase()}</text>
          </g>
        )}
      </svg>
      <div className="space-y-2.5 min-w-0">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2.5 text-[12.5px]">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-ink2 font-medium truncate">{s.label}</span>
            <span className="text-mist ml-auto pl-3 font-semibold">{Math.round((s.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- vertical bars ---------------- */
export function Bars({ data, labels, height = 200, accent = "#101a2c", hot = "#c9a24b" }: { data: number[]; labels: string[]; height?: number; accent?: string; hot?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[6px] w-full" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-default"
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          {hover === i && <span className="text-[10px] font-bold text-ink">{v}</span>}
          <div className="w-full rounded-t-lg transition-all duration-500 relative overflow-hidden"
            style={{
              height: `${(v / max) * 82}%`,
              background: hover === i ? `linear-gradient(180deg, ${hot}, #a6802f)` : `linear-gradient(180deg, ${accent}, #1c2b47)`,
              opacity: hover === null || hover === i ? 1 : 0.35,
            }} />
          <span className="text-[9.5px] text-mist font-medium">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- gauge ring ---------------- */
export function Ring({ value, size = 132, label, color = "#17745c" }: { value: number; size?: number; label: string; color?: string }) {
  const R = (size - 16) / 2;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="rgba(16,26,44,.07)" strokeWidth="10" />
        <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${(value / 100) * C} ${C}`} strokeLinecap="round" />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-2xl">{value}%</div>
        <div className="text-[9px] tracking-[0.18em] text-mist uppercase font-semibold">{label}</div>
      </div>
    </div>
  );
}

/* ---------------- sparkline ---------------- */
export function Spark({ data, color = "#a6802f", w = 110, h = 34 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
