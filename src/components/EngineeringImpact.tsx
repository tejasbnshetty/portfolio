"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["800"] });

/**
 * A thin full-width strip of headline numbers that bridges the project
 * showcase and the journey. Every figure is lifted verbatim from copy that
 * already lives elsewhere on the page; nothing new is claimed here.
 */
const metrics = [
  { value: "20–30%", caption: "lower search latency", source: "Bardar backend" },
  { value: "60%", caption: "fewer assembly-line errors", source: "Axiscades" },
  { value: "30%", caption: "higher satellite ops efficiency", source: "ISRO" },
  { value: "3", caption: "peer-reviewed papers · 21 citations", source: "IEEE / IJACSA" },
];

export default function EngineeringImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    const el = ref.current;
    if (!el) return;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="impact"
      ref={ref}
      data-cursor-theme="impact"
      className="relative w-full py-14 border-y border-white/25 bg-[#0F0E0C]/[0.03]"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-7">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--c3-text)] mb-8">
          Engineering impact
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-11 lg:gap-y-0">
          {metrics.map((m, i) => (
            <div
              key={m.source}
              className={`impact-item ${revealed ? "in" : ""} lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:border-l lg:border-[#0F0E0C]/10 lg:first:border-l-0`}
              style={{ transitionDelay: `${Math.min(i, 5) * 0.03}s` }}
            >
              <p className={`${syne.className} text-[clamp(28px,3.4vw,40px)] font-black text-[#0F0E0C] leading-none whitespace-nowrap`}>
                {m.value}
              </p>
              <p className="text-sm text-[#5A5650] mt-2.5 leading-snug max-w-[180px]">{m.caption}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-muted)] mt-2">
                {m.source}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .impact-item {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .impact-item.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
