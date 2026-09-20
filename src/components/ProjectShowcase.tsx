"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Syne } from "next/font/google";
import { iconForTag } from "./icons/Icons";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

type Screen = { src: string; alt: string };

type Project = {
  name: string;
  role: string;
  desc: string;
  tags: string[];
  link: string | null;
  linkLabel?: string;
  github: string | null;
  accent: string;
  badge: string | null;
  badgeClass: string;
  cover: string;
  coverAlt: string;
  portrait: boolean;
  metrics?: { value: string; label: string }[];
  highlights: string[];
  screens: Screen[];
};

function PanelSlide({
  p,
  index,
  total,
  onLightbox,
}: {
  p: Project;
  index: number;
  total: number;
  onLightbox: (images: Screen[], i: number) => void;
}) {
  return (
    <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-[6vw]">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-10 max-w-6xl w-full items-center">
        {/* Media column */}
        <div
          className="rounded-3xl border-2 overflow-hidden bg-white/85 backdrop-blur-sm"
          style={{ borderColor: p.accent, boxShadow: "0 12px 32px -18px rgba(15,14,12,0.25)" }}
        >
          <div className="overflow-hidden h-[52vh] max-h-[520px]" data-cursor="explore">
            <img src={p.cover} alt={p.coverAlt} className="w-full h-full object-cover object-top" loading="lazy" />
          </div>

          {p.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#0F0E0C] text-white">
              {p.metrics.map((m) => (
                <div key={m.label} className="px-4 py-4 border-r border-white/10 last:border-r-0">
                  <p className={`${syne.className} text-lg font-black leading-none`}>{m.value}</p>
                  <p className="text-[10px] text-white/60 mt-1 leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          <div
            className="flex gap-2 overflow-x-auto snap-x p-3"
            style={{ scrollbarWidth: "none" }}
            data-cursor="drag"
          >
            {p.screens.map((s, si) => (
              <button
                key={s.src}
                type="button"
                onClick={() => onLightbox(p.screens, si)}
                className="flex-shrink-0 w-28 snap-start rounded-xl overflow-hidden cursor-zoom-in hover:scale-105 hover:shadow-md transition-all"
                style={{ outline: `1.5px solid ${p.accent}33` }}
                aria-label={`View ${s.alt}`}
              >
                <img src={s.src} alt={s.alt} className="w-full h-auto block" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Text column */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60" style={{ color: p.accent }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          {p.badge && (
            <span className={"text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block " + p.badgeClass}>
              {p.badge}
            </span>
          )}
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
            {p.role}
          </p>
          <h3 className={`${syne.className} text-4xl lg:text-5xl font-black text-[#0F0E0C] mb-4`}>{p.name}</h3>
          <p className="text-[15px] text-[#5A5650] leading-relaxed mb-4 max-w-md">{p.desc}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.tags.map((tag) => {
              const TagIcon = iconForTag(tag);
              return (
                <span
                  key={tag}
                  className="text-xs font-medium pl-2 pr-2.5 py-0.5 rounded-full bg-[#F5F4F0] text-[#5A5650] inline-flex items-center gap-1"
                >
                  <TagIcon width={11} height={11} strokeWidth={1.8} style={{ color: p.accent }} />
                  {tag}
                </span>
              );
            })}
          </div>

          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.accent }}>
            Highlights
          </p>
          <ul className="flex flex-col gap-2 mb-5 max-h-[34vh] overflow-y-auto pr-2">
            {p.highlights.map((h) => (
              <li key={h} className="text-sm text-[#5A5650] leading-relaxed flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ background: p.accent }}
              >
                {p.linkLabel} ↗
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                aria-label={`${p.name} on GitHub`}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E8E4DC] text-[#5A5650] hover:border-[#0F0E0C] hover:text-[#0F0E0C] transition-all"
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase({
  panels,
  onLightbox,
}: {
  panels: Project[];
  onLightbox: (images: Screen[], i: number) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(panels.length - 1) * 100}vw`]);

  if (reducedMotion) return null;

  return (
    <div ref={wrapperRef} className="relative hidden lg:block" style={{ height: `${panels.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <motion.div className="flex h-full will-change-transform" style={{ x }}>
          {panels.map((p, i) => (
            <PanelSlide key={p.name} p={p} index={i} total={panels.length} onLightbox={onLightbox} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
