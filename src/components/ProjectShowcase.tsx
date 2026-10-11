"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
  coverBg?: string;
  gallery?: boolean;
  galleryBg?: string;
  galleryMaxH?: number;
  galleryCover?: boolean;
  paper?: { href: string; label: string };
  logo?: string;
  portrait: boolean;
  metrics?: { value: string; label: string }[];
  highlights: string[];
  screens: Screen[];
};

/**
 * Screenshot carousel: prev/next buttons, dots, click-to-open. Tiles are sized by the
 * available height; wide screenshots show one at a time, phone screens several.
 */
function ShotCarousel({
  slides,
  accent,
  bg,
  maxTileH,
  stops,
  onOpen,
}: {
  slides: Screen[];
  accent: string;
  bg?: string;
  maxTileH?: number;
  /** Fixed number of resting positions (and dots), for rows where several screens are visible at once. */
  stops?: number;
  onOpen: (i: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(slides.length);
  const positions = useRef<number[]>([0]);

  // Resting positions: one per screen, or `stops` evenly spaced ones across the scroll range.
  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    let pos: number[];
    if (stops && max > 2) {
      pos = Array.from({ length: stops }, (_, i) => (max * i) / (stops - 1));
    } else if (stops) {
      pos = [0];
    } else {
      pos = (Array.from(el.children) as HTMLElement[]).map((t) =>
        Math.min(max, Math.max(0, t.offsetLeft + t.offsetWidth / 2 - el.clientWidth / 2))
      );
    }
    positions.current = pos;
    setCount(pos.length);
    let best = 0;
    let bestD = Infinity;
    pos.forEach((x, i) => {
      const d = Math.abs(x - el.scrollLeft);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  }, [stops]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Arrows wrap: next on the last position returns to the first, and back from the first goes to the last.
  function go(dir: 1 | -1) {
    const el = scrollerRef.current;
    const pos = positions.current;
    if (!el || pos.length < 2) return;
    const next = (active + dir + pos.length) % pos.length;
    el.scrollTo({ left: pos[next], behavior: "smooth" });
  }

  const arrow =
    "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-2xl leading-none text-white bg-[#0F0E0C]/70 border border-white/25 backdrop-blur-sm hover:bg-[#0F0E0C] hover:scale-105 transition-all cursor-pointer";

  return (
    <div className="relative flex-1 min-h-0" style={bg ? { background: bg } : undefined}>
      <div
        ref={scrollerRef}
        onScroll={measure}
        className={`relative h-full flex items-center gap-3 px-4 pt-4 pb-9 overflow-x-auto [&>:first-child]:ml-auto [&>:last-child]:mr-auto ${
          stops ? "" : "snap-x snap-mandatory"
        }`}
        style={{ scrollbarWidth: "none" }}
      >
        {slides.map((t, i) => (
          <button
            key={t.src}
            type="button"
            onClick={() => onOpen(i)}
            data-cursor="explore"
            data-cursor-label="VIEW"
            aria-label={`View ${t.alt}`}
            className="flex-shrink-0 snap-center cursor-zoom-in hover:scale-[1.01] transition-transform"
            style={{ height: `min(100%, ${maxTileH ?? 9999}px)`, maxWidth: "100%" }}
          >
            <img
              src={t.src}
              alt={t.alt}
              onLoad={measure}
              className="h-full w-auto max-w-full object-contain block rounded-xl"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className={`${arrow} left-3`}>
            ‹
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className={`${arrow} right-3`}>
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none" aria-hidden>
            {Array.from({ length: count }, (_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 18 : 6,
                  background: i === active ? accent : "rgba(128,128,128,0.45)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
  // Everything the viewer can open, cover first (deduped: some projects reuse the cover as a screen).
  const all: Screen[] = [{ src: p.cover, alt: p.coverAlt }, ...p.screens.filter((x) => x.src !== p.cover)];
  // Phone-app projects show just their screens, several at a time.
  const slides: Screen[] = p.gallery ? p.screens : all;
  return (
    <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-[6vw] pt-5 pb-[4.25rem]">
      {/* Fixed panel height (clear of the bottom dock) so every slide is the same size and nothing clips. */}
      <div className="grid grid-cols-[1fr_1fr] gap-10 max-w-6xl w-full items-stretch h-[min(calc(100vh-5.25rem),760px)]">
        {/* Media column */}
        <div
          className="rounded-3xl border-2 overflow-hidden bg-white/85 backdrop-blur-sm flex flex-col h-full min-h-0"
          style={{ borderColor: p.accent, boxShadow: "0 12px 32px -18px rgba(15,14,12,0.25)" }}
        >
          {p.galleryCover ? (
            <div className="flex-1 min-h-0 flex flex-col" style={{ background: p.galleryBg }}>
              <button
                type="button"
                onClick={() => onLightbox(all, 0)}
                data-cursor="explore"
                data-cursor-label="VIEW"
                aria-label={`View ${p.coverAlt}`}
                className="flex-[3] min-h-0 px-4 pt-4 cursor-zoom-in"
              >
                <img src={p.cover} alt={p.coverAlt} className="w-full h-full object-contain" loading="lazy" />
              </button>
              <div className="flex-[2] min-h-0 flex items-center justify-center gap-3 px-4 py-4">
                {p.screens.map((t) => (
                  <button
                    key={t.src}
                    type="button"
                    onClick={() => onLightbox(all, all.findIndex((x) => x.src === t.src))}
                    data-cursor="explore"
                    data-cursor-label="VIEW"
                    aria-label={`View ${t.alt}`}
                    className="flex-shrink-0 cursor-zoom-in hover:scale-[1.02] transition-transform"
                    style={{ height: `min(100%, ${p.galleryMaxH ?? 440}px)` }}
                  >
                    <img src={t.src} alt={t.alt} className="h-full w-auto block rounded-xl" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ShotCarousel
              slides={slides}
              accent={p.accent}
              bg={p.coverBg ?? p.galleryBg}
              maxTileH={p.gallery ? p.galleryMaxH : undefined}
              stops={p.gallery ? 3 : undefined}
              onOpen={(i) => onLightbox(slides, i)}
            />
          )}

          {p.metrics && (
            <div
              className="grid bg-[#0F0E0C] text-white flex-shrink-0"
              style={{ gridTemplateColumns: `repeat(${p.metrics.length}, minmax(0, 1fr))` }}
            >
              {p.metrics.map((m) => (
                <div key={m.label} className="px-4 py-4 border-r border-white/10 last:border-r-0">
                  <p className={`${syne.className} text-lg font-black leading-none`}>{m.value}</p>
                  <p className="text-[10px] text-white/60 mt-1 leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Text column */}
        <div className="flex flex-col min-h-0 justify-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60" style={{ color: p.accent }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          {p.badge && (
            <span className={"text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start " + p.badgeClass}>
              {p.badge}
            </span>
          )}
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
            {p.role}
          </p>
          <h3 className={`${syne.className} text-[clamp(26px,2.6vw,36px)] font-black text-[#0F0E0C] mb-3 flex items-center gap-3 leading-tight`}>
            {p.logo && <img src={p.logo} alt="" width={40} height={40} className="w-[1.15em] h-[1.15em] rounded-xl flex-shrink-0" />}
            {p.name}
          </h3>
          <p className="text-sm text-[#5A5650] leading-relaxed mb-3">{p.desc}</p>

          <div className="flex flex-wrap gap-1.5 mb-3 [@media(max-height:700px)]:hidden">
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
          <ul className="flex flex-col gap-1.5 mb-4 min-h-0 overflow-y-auto pr-1">
            {p.highlights.slice(0, 4).map((h) => (
              <li key={h} className="text-sm text-[#5A5650] leading-snug flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 flex-shrink-0">
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
            {p.paper && (
              <a
                href={p.paper.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium border-2 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ borderColor: p.accent, color: p.accent }}
              >
                {p.paper.label} ↗
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
