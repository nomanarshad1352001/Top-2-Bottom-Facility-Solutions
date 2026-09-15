"use client";
import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

/* Before/after evidence comparator — "before" is a stylized (grimed) render
   of the same verified photo so the pair always aligns pixel-perfect. */
export default function PhotoCompare({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(52);

  function move(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <div
      ref={ref}
      className="ba-wrap aspect-[16/10] cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onMouseDown={(e) => move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img src={src} alt={`${label} after`} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={src} alt={`${label} before`} className="absolute inset-0 h-full object-cover grime" style={{ width: ref.current?.offsetWidth ?? 1200 }} draggable={false} />
        <span className="absolute bottom-3 left-3 pill bg-ink/80 text-white backdrop-blur-sm">Before</span>
      </div>
      <span className="absolute bottom-3 right-3 pill bg-mint text-white">After · verified</span>
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <div className="ba-knob"><ChevronsLeftRight size={17} className="text-ink" /></div>
      </div>
      <span className="absolute top-3 left-3 pill bg-white/85 text-ink backdrop-blur-sm">{label}</span>
    </div>
  );
}
