"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import RevealPanel from "./RevealPanel";
import Lightbox from "./Lightbox";
import {
  ChevronDownIcon,
  CodeIcon,
  RocketIcon,
  TerminalIcon,
  DatabaseIcon,
  CpuIcon,
  iconForTag,
} from "./icons/Icons";

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

const bardar: Project = {
  name: "Bardar",
  role: "ANU TechLauncher Capstone",
  desc: "Location-based music artist discovery platform. I owned the entire NestJS backend: 10+ REST APIs, a custom scoring algorithm, a priority task queue with rate limiting, and an agentic AI chatbot with 11 tool calls powered by Gemini 2.5 Flash.",
  tags: ["NestJS", "Next.js", "TypeScript", "Supabase", "Gemini AI", "Heroku"],
  link: "https://bardar.online",
  linkLabel: "Visit bardar.online",
  github: null,
  accent: "#FF6B35",
  badge: "🟢 Live product",
  badgeClass: "text-[var(--c3-text)] bg-[var(--tint-green)]",
  cover: "/bardar-splash.png",
  coverAlt: "Bardar — your city's music scene, in one view",
  portrait: false,
  metrics: [
    { value: "20–30%", label: "lower search latency" },
    { value: "10+", label: "REST APIs owned" },
    { value: "11", label: "AI agent tool calls" },
    { value: "3", label: "music data sources" },
  ],
  highlights: [
    "Designed the Bardar Score: a custom log-scaled algorithm that ranks thousands of artists across any city globally without re-normalisation.",
    "Owned 10+ REST APIs covering artist discovery, geo-sync, genre filtering, bookmarking, and head-to-head comparison, integrated with MusicBrainz, Last.fm and Fanart.tv.",
    "Architected a priority task queue and per-API rate limiter so user-facing requests always preempt background sync jobs, reducing search latency by 20–30%.",
    "Led end-to-end integration of an agentic AI chatbot (using Gemini 2.5 Flash) with access to all backend tool calls, enabling natural language queries like 'top jazz artists in Sydney?' with fully interactive results.",
    "Contributed to the Next.js frontend including several pages and a real-time sync progress UI.",
  ],
  screens: [
    { src: "/bardar-dashboard.png", alt: "Artist Discovery Dashboard" },
    { src: "/bardar-compare.png", alt: "Head-to-Head Artist Comparison" },
    { src: "/bardar-chat.png", alt: "AI Chatbot Interface" },
  ],
};

const secondary: Project[] = [
  {
    name: "Nutricate",
    role: "Hackathon Project",
    desc: "Android app that uses OCR to scan food labels and instantly flags allergens against a personal database. Award-winning at IISc Bengaluru's Social Hackathon League.",
    tags: ["Android", "Java", "OCR", "Firebase", "SQLite"],
    link: null,
    github: "https://github.com/tejasbnshetty/nutricate",
    accent: "#06D6A0",
    badge: "🏆 Best Social Project · IISc Bengaluru",
    badgeClass: "text-[var(--c3-text)] bg-[var(--tint-green)]",
    cover: "/nutricate-splash.png",
    coverAlt: "Nutricate — scan screen",
    portrait: true,
    highlights: [
      "Solves a real problem: people with food allergies struggle to quickly verify if packaged products are safe.",
      "Uses OCR to scan food product labels directly from the phone camera, extracts ingredient text and cross-checks against a user-defined personal allergen database.",
      "Delivers instant alerts if an unsafe ingredient is detected.",
      "Built natively in Android/Java with Firebase and SQLite. It is designed to be fast, offline friendly, and accessible to non-technical users.",
    ],
    screens: [
      { src: "/nutricate-scan.png", alt: "Food Label OCR Scan" },
      { src: "/nutricate-unsafe.png", alt: "Allergen Detected Alert" },
    ],
  },
  {
    name: "PoliRec",
    role: "University Project",
    desc: "Government vehicle management app with separate user and admin portals. Integrated a Hugging Face LLM chatbot to automate query resolution end-to-end.",
    tags: ["Android", "Java", "Firebase", "Hugging Face LLM"],
    link: null,
    github: "https://github.com/tejasbnshetty/polirec",
    accent: "#7B2FBE",
    badge: null,
    badgeClass: "",
    cover: "/polirec-splash.png",
    coverAlt: "PoliRec — streamlining citizen and vehicle records",
    portrait: true,
    highlights: [
      "Built to address fragmented government vehicle management and public query systems.",
      "Unified platform with separate user and admin portals. Users submit service requests, track status, and resolve queries in one place.",
      "Admins manage and resolve requests from a dedicated dashboard.",
      "Integrated a Hugging Face LLM chatbot to automate responses to common queries, significantly reducing manual overhead for admin staff.",
    ],
    screens: [
      { src: "/polirec-search.png", alt: "Advanced Search" },
      { src: "/polirec-chat.png", alt: "PolyRecBot Chat Assistant" },
      { src: "/polirec-requests.png", alt: "Submitted Requests List" },
      { src: "/polirec-notification.png", alt: "Notification on Search Page" },
    ],
  },
];

const bgIcons = [
  { Icon: CodeIcon,     top: "5%",  left: "88%", size: 34, color: "#FF6B35", delay: 0,   duration: 7 },
  { Icon: TerminalIcon, top: "30%", left: "4%",  size: 28, color: "#4361EE", delay: 1.2, duration: 8 },
  { Icon: DatabaseIcon, top: "70%", left: "92%", size: 30, color: "#06D6A0", delay: 0.6, duration: 9 },
  { Icon: CpuIcon,      top: "85%", left: "6%",  size: 26, color: "#7B2FBE", delay: 2,   duration: 7.5 },
  { Icon: RocketIcon,   top: "48%", left: "95%", size: 24, color: "#EF476F", delay: 1.6, duration: 6.5 },
];

/** Cover image that drifts a few pixels toward the cursor on hover. */
function ParallaxCover({
  src,
  alt,
  className = "",
  heightClass = "h-56 sm:h-72",
  objectClass = "object-top",
}: {
  src: string;
  alt: string;
  className?: string;
  heightClass?: string;
  objectClass?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || reduced.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 10;
    el.style.transform = `scale(1.05) translate(${dx}px, ${dy}px)`;
  }
  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "scale(1) translate(0,0)";
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="explore"
      className={`overflow-hidden ${heightClass} ${className}`}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${objectClass} transition-transform duration-[500ms] ease-out`}
      />
    </div>
  );
}

function BardarHero({
  open,
  origin,
  onToggle,
  onLightbox,
}: {
  open: boolean;
  origin: { x: number; y: number };
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onLightbox: (i: number) => void;
}) {
  const p = bardar;
  return (
    <div
      className="rounded-3xl border-2 overflow-hidden bg-white/85 backdrop-blur-sm transition-shadow duration-300"
      style={{
        borderColor: p.accent,
        boxShadow: open
          ? `0 0 0 3px ${p.accent}22, 0 24px 50px -16px ${p.accent}44`
          : "0 12px 32px -18px rgba(15,14,12,0.25)",
      }}
    >
      <ParallaxCover src={p.cover} alt={p.coverAlt} heightClass="h-52 sm:h-80" />

      {/* Metric bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#0F0E0C] text-white">
        {p.metrics!.map((m) => (
          <div key={m.label} className="px-4 py-4 border-r border-white/10 last:border-r-0">
            <p className={`${syne.className} text-xl font-black leading-none`}>{m.value}</p>
            <p className="text-[11px] text-white/60 mt-1 leading-snug">{m.label}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left p-6 sm:p-8 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {p.badge && (
              <span className={"text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block " + p.badgeClass}>
                {p.badge}
              </span>
            )}
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
              {p.role}
            </p>
            <h3 className={`${syne.className} text-2xl sm:text-3xl font-black text-[#0F0E0C]`}>{p.name}</h3>
          </div>
          <span
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300"
            style={{
              borderColor: p.accent,
              color: open ? "#fff" : p.accent,
              background: open ? p.accent : "transparent",
              transform: open ? "rotate(225deg) scale(1.08)" : "rotate(0deg)",
            }}
          >
            <ChevronDownIcon width={17} height={17} />
          </span>
        </div>

        <p className="text-sm sm:text-[15px] text-[#5A5650] leading-relaxed mt-3 max-w-2xl">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
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

      </button>

      {p.link && (
        <div className="px-6 sm:px-8 -mt-2 pb-6">
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
        </div>
      )}

      <RevealPanel open={open} origin={origin}>
        <div className="px-6 sm:px-8 pb-8 pt-1 border-t" style={{ borderColor: p.accent + "33" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 mt-5" style={{ color: p.accent }}>
            Highlights
          </p>
          <ul className="flex flex-col gap-2 mb-6">
            {p.highlights.map((h) => (
              <li key={h} className="text-sm text-[#5A5650] leading-relaxed flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                {h}
              </li>
            ))}
          </ul>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.accent }}>
            Screenshots
          </p>
          <div className="grid grid-cols-3 gap-2">
            {p.screens.map((s, si) => (
              <button
                key={s.src}
                type="button"
                onClick={() => onLightbox(si)}
                data-cursor="explore"
                className="rounded-xl overflow-hidden cursor-zoom-in hover:scale-[1.03] hover:shadow-md transition-all"
                style={{ outline: `1.5px solid ${p.accent}33` }}
                aria-label={`View ${s.alt}`}
              >
                <img src={s.src} alt={s.alt} className="w-full h-auto block" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </RevealPanel>
    </div>
  );
}

function SecondaryCard({
  p,
  isOpen,
  origin,
  onToggle,
  onLightbox,
}: {
  p: Project;
  isOpen: boolean;
  origin: { x: number; y: number };
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onLightbox: (index: number) => void;
}) {
  const screensRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="card-tilt rounded-2xl border-2 bg-white/85 backdrop-blur-sm overflow-hidden h-fit"
      style={{
        borderColor: p.accent,
        ...(isOpen ? { boxShadow: `0 0 0 3px ${p.accent}22, 0 12px 32px -8px ${p.accent}33` } : {}),
      }}
    >
      <ParallaxCover src={p.cover} alt={p.coverAlt} heightClass="h-48" objectClass="object-center" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative w-full text-left p-5 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            {p.badge && (
              <span className={"text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2 inline-block " + p.badgeClass}>
                {p.badge}
              </span>
            )}
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
              {p.role}
            </p>
            <h3 className={`${syne.className} text-lg font-bold text-[#0F0E0C]`}>{p.name}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="external"
                aria-label={`${p.name} on GitHub`}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[#E8E4DC] text-[#5A5650] hover:border-[#0F0E0C] hover:text-[#0F0E0C] transition-all"
              >
                <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
                </svg>
              </a>
            )}
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300"
              style={{
                borderColor: p.accent,
                color: isOpen ? "#fff" : p.accent,
                background: isOpen ? p.accent : "transparent",
                transform: isOpen ? "rotate(225deg) scale(1.08)" : "rotate(0deg)",
              }}
            >
              <ChevronDownIcon width={16} height={16} />
            </span>
          </div>
        </div>
        <p className="text-sm text-[#5A5650] leading-relaxed mb-3">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">
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
      </button>

      <RevealPanel open={isOpen} origin={origin}>
        <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: p.accent + "33" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 mt-4" style={{ color: p.accent }}>
            Highlights
          </p>
          <ul className="flex flex-col gap-2 mb-5">
            {p.highlights.map((h) => (
              <li key={h} className="text-sm text-[#5A5650] leading-relaxed flex gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                {h}
              </li>
            ))}
          </ul>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.accent }}>
            Screenshots
          </p>
          <div ref={screensRef} className="flex gap-2 overflow-x-auto snap-x pb-1" style={{ scrollbarWidth: "none" }} data-cursor="drag">
            {p.screens.map((s, si) => (
              <button
                key={s.src}
                type="button"
                onClick={() => onLightbox(si)}
                className="flex-shrink-0 w-28 snap-start rounded-xl overflow-hidden cursor-zoom-in hover:scale-105 hover:shadow-md transition-all"
                style={{ outline: `1.5px solid ${p.accent}33` }}
                aria-label={`View ${s.alt}`}
              >
                <img src={s.src} alt={s.alt} className="w-full h-auto block" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </RevealPanel>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: Screen[]; index: number } | null>(null);

  function toggle(key: string, e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - rect.left) / rect.width) * 100, y: 0 });
    setOpenKey(openKey === key ? null : key);
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
        });
      },
      { threshold: 0.12 }
    );
    const el = sectionRef.current;
    if (!el) return;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} data-cursor-theme="work" className="relative py-20 w-full overflow-hidden">
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-4`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[var(--tint-orange)] text-[var(--c1-text)]">
            Selected work
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>Things I&apos;ve built</h2>
        </div>
        <p className={`animate-item fade-up ${revealed ? "visible" : ""} text-sm text-[#5A5650] max-w-lg mb-12`}>
          Real engineering work — a live product, an award-winning app, and a system that
          replaced a government paper trail.
        </p>

        <div className={`animate-item fade-up ${revealed ? "visible" : ""} mb-6`}>
          <BardarHero
            open={openKey === "bardar"}
            origin={origin}
            onToggle={(e) => toggle("bardar", e)}
            onLightbox={(si) => setLightbox({ images: bardar.screens, index: Math.max(0, si) })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {secondary.map((p, j) => (
            <div
              key={p.name}
              className={`animate-item fade-up ${revealed ? "visible" : ""}`}
              style={{ transitionDelay: `${Math.min(j + 1, 5) * 0.03}s` }}
            >
              <SecondaryCard
                p={p}
                isOpen={openKey === p.name}
                origin={origin}
                onToggle={(e) => toggle(p.name, e)}
                onLightbox={(si) => setLightbox({ images: p.screens, index: si })}
              />
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}

      <style jsx>{`
        .animate-item {
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .fade-up { transform: translateY(12px); }
        .animate-item.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </section>
  );
}
