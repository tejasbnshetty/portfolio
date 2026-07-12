"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import MagneticIcon from "./MagneticIcon";
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

const projects = [
  {
    name: "Bardar",
    role: "ANU TechLauncher Capstone",
    desc: "Location-based music artist discovery platform. I owned the entire NestJS backend — 10+ REST APIs, a custom scoring algorithm, a priority task queue with rate limiting, and an agentic AI chatbot with 11 tool calls powered by Gemini 2.5 Flash.",
    tags: ["NestJS", "Next.js", "TypeScript", "Supabase", "Gemini AI", "Heroku"],
    link: "https://bardar.online",
    github: null,
    accent: "#FF6B35",
    accentBg: "#FFF2ED",
    borderClass: "border-[#FF6B35]",
    bgClass: "bg-gradient-to-br from-[#FFF8F5] to-[#FFF2ED]",
    badge: "🟢 Live product",
    badgeClass: "text-[#059669] bg-[#E8F8F2]",
    cover: "/bardar-splash.png",
    coverAlt: "Bardar — your city's music scene, in one view",
    portrait: false,
    highlights: [
      "Designed the Bardar Score — a custom log-scaled algorithm that ranks thousands of artists across any city globally without re-normalisation.",
      "Owned 10+ REST APIs covering artist discovery, geo-sync, genre filtering, bookmarking, and head-to-head comparison, integrated with MusicBrainz, Last.fm and Fanart.tv.",
      "Architected a priority task queue and per-API rate limiter so user-facing requests always preempt background sync jobs, reducing search latency by 20–30%.",
      "Led end-to-end integration of an agentic AI chatbot (Gemini 2.5 Flash) with access to all backend tool calls, enabling natural language queries like 'top jazz artists in Sydney?' with fully interactive results.",
      "Contributed to the Next.js frontend including several pages and a real-time sync progress UI.",
    ],
    screens: [
      { src: "/bardar-dashboard.png", alt: "Artist Discovery Dashboard" },
      { src: "/bardar-compare.png", alt: "Head-to-Head Artist Comparison" },
      { src: "/bardar-chat.png", alt: "AI Chatbot Interface" },
    ],
  },
  {
    name: "Nutricate",
    role: "Hackathon Project",
    desc: "Android app that uses OCR to scan food labels and instantly flags allergens against a personal database. Award-winning at IISc Bengaluru's Social Hackathon League.",
    tags: ["Android", "Java", "OCR", "Firebase", "SQLite"],
    link: null,
    github: "https://github.com/tejasbnshetty/nutricate",
    accent: "#06D6A0",
    accentBg: "#E8F8F2",
    borderClass: "border-[#06D6A0]",
    bgClass: "bg-white",
    badge: "🏆 Best Social Project · IISc Bengaluru",
    badgeClass: "text-[#059669] bg-[#E8F8F2]",
    cover: "/nutricate-splash.png",
    coverAlt: "Nutricate — scan screen",
    portrait: true,
    highlights: [
      "Solves a real problem: people with food allergies struggle to quickly verify if packaged products are safe.",
      "Uses OCR to scan food product labels directly from the phone camera, extracts ingredient text and cross-checks against a user-defined personal allergen database.",
      "Delivers instant alerts if an unsafe ingredient is detected.",
      "Built natively in Android/Java with Firebase and SQLite — designed to be fast, offline-friendly, and accessible to non-technical users.",
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
    accentBg: "#F3EAFF",
    borderClass: "border-[#7B2FBE]",
    bgClass: "bg-white",
    badge: null,
    badgeClass: "",
    cover: "/polirec-splash.png",
    coverAlt: "PoliRec — streamlining citizen and vehicle records",
    portrait: true,
    highlights: [
      "Built to address fragmented government vehicle management and public query systems.",
      "Unified platform with separate user and admin portals — users submit service requests, track status, and resolve queries in one place.",
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

const extraProjects: typeof projects = [];

const bgIcons = [
  { Icon: CodeIcon,     top: "5%",  left: "88%", size: 34, color: "#FF6B35", delay: 0,   duration: 7 },
  { Icon: TerminalIcon, top: "30%", left: "4%",  size: 28, color: "#4361EE", delay: 1.2, duration: 8 },
  { Icon: DatabaseIcon, top: "70%", left: "92%", size: 30, color: "#06D6A0", delay: 0.6, duration: 9 },
  { Icon: CpuIcon,      top: "85%", left: "6%",  size: 26, color: "#7B2FBE", delay: 2,   duration: 7.5 },
  { Icon: RocketIcon,   top: "48%", left: "95%", size: 24, color: "#EF476F", delay: 1.6, duration: 6.5 },
];

type Project = typeof projects[0];

function ProjectCard({
  p,
  i,
  isOpen,
  origin,
  onToggle,
  onLightbox,
}: {
  p: Project;
  i: number;
  isOpen: boolean;
  origin: { x: number; y: number };
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onLightbox: (index: number) => void;
}) {
  // Per-card ref for scrolling the screenshot strip
  const screensRef = useRef<HTMLDivElement>(null);

  function scrollScreens(dir: "left" | "right") {
    screensRef.current?.scrollBy({ left: dir === "right" ? 130 : -130, behavior: "smooth" });
  }

  return (
    <div
      className={`rounded-2xl border-2 ${p.borderClass} ${p.bgClass} overflow-hidden transition-shadow duration-400 hover:shadow-xl`}
      style={isOpen ? { boxShadow: `0 0 0 3px ${p.accent}22, 0 12px 32px -8px ${p.accent}33` } : undefined}
    >
      {/* ── Cover image ── */}
      <div className={`w-full overflow-hidden ${p.portrait ? "max-h-72" : "h-48"}`}>
        <img
          src={p.cover}
          alt={p.coverAlt}
          className={`w-full ${p.portrait ? "h-full object-cover object-center" : "h-full object-cover object-top"}`}
          loading="lazy"
        />
      </div>

      {/* ── Expand button ── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative w-full text-left p-5 cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            {p.badge && (
              <span className={"text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block " + p.badgeClass}>
                {p.badge}
              </span>
            )}
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
              {p.role}
            </p>
            <h3 className={`${syne.className} text-lg font-bold text-[#0F0E0C]`}>{p.name}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold transition-transform hover:scale-110 hover:rotate-12"
                style={{ background: p.accent }}
              >
                ↗
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${p.name} on GitHub`}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[#E8E4DC] text-[#5A5650] hover:border-[#0F0E0C] hover:text-[#0F0E0C] hover:scale-110 transition-all"
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
                transform: isOpen ? "rotate(225deg) scale(1.08)" : "rotate(0deg) scale(1)",
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
                <MagneticIcon Icon={TagIcon} size={11} range={5} style={{ color: p.accent }} />
                {tag}
              </span>
            );
          })}
        </div>
      </button>

      {/* ── Expanded: highlights + screenshots ── */}
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
          {p.portrait ? (
            <div className="relative">
              <div
                ref={screensRef}
                className="flex gap-2 overflow-x-auto snap-x pb-1"
                style={{ scrollbarWidth: "none" }}
              >
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
              {/* Scroll arrows — only shown when there are more than 2 screenshots */}
              {p.screens.length > 2 && (
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => scrollScreens("left")}
                    className="w-7 h-7 rounded-full border flex items-center justify-center text-base hover:border-current transition-colors"
                    style={{ borderColor: p.accent + "66", color: p.accent }}
                    aria-label="Scroll left"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollScreens("right")}
                    className="w-7 h-7 rounded-full border flex items-center justify-center text-base hover:border-current transition-colors"
                    style={{ borderColor: p.accent + "66", color: p.accent }}
                    aria-label="Scroll right"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {p.screens.map((s, si) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => onLightbox(si)}
                  className="rounded-xl overflow-hidden cursor-zoom-in hover:scale-[1.03] hover:shadow-md transition-all"
                  style={{ outline: `1.5px solid ${p.accent}33` }}
                  aria-label={`View ${s.alt}`}
                >
                  <img src={s.src} alt={s.alt} className="w-full h-auto block" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </RevealPanel>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);
  const [showMore, setShowMore] = useState(false);

  function toggle(i: number, e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - rect.left) / rect.width) * 100, y: 0 });
    setOpenIdx(openIdx === i ? null : i);
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

  const bardar = projects[0];
  const portraitProjects = projects.slice(1);

  // Build lightbox image list
  function getLightboxImages(p: Project) {
    return p.screens;
  }

  return (
    <section id="work" ref={sectionRef} data-cursor-theme="work" className="relative py-20 w-full overflow-hidden">
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-12`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#FFF2ED] text-[#FF6B35]">
            Selected work
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Things I&apos;ve built
          </h2>
        </div>

        {/* Bardar — full-width landscape */}
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} mb-4`}>
          <ProjectCard
            p={bardar} i={0} isOpen={openIdx === 0} origin={origin}
            onToggle={(e) => toggle(0, e)}
            onLightbox={(si) => setLightbox({ images: getLightboxImages(bardar), index: Math.max(0, si) })}
          />
        </div>

        {/* Nutricate + PoliRec — portrait side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:items-start mb-6">
          {portraitProjects.map((p, j) => {
            const i = j + 1;
            return (
              <div key={p.name} className={`animate-item fade-up ${revealed ? "visible" : ""}`} style={{ transitionDelay: `${(j + 1) * 0.1}s` }}>
                <ProjectCard
                  p={p} i={i} isOpen={openIdx === i} origin={origin}
                  onToggle={(e) => toggle(i, e)}
                  onLightbox={(si) => setLightbox({ images: getLightboxImages(p), index: si })}
                />
              </div>
            );
          })}
        </div>

        {extraProjects.length > 0 && (
          <>
            <div className={`flex flex-col gap-4 mb-4 transition-all duration-500 ${showMore ? "opacity-100" : "opacity-0 pointer-events-none max-h-0 overflow-hidden"}`}>
              {extraProjects.map((p, j) => {
                const i = projects.length + j;
                return (
                  <div key={p.name} className={`animate-item fade-up ${revealed && showMore ? "visible" : ""}`}>
                    <ProjectCard
                      p={p} i={i} isOpen={openIdx === i} origin={origin}
                      onToggle={(e) => toggle(i, e)}
                      onLightbox={(si) => setLightbox({ images: getLightboxImages(p), index: Math.max(0, si) })}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowMore((v) => !v)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E8E4DC] text-sm font-medium text-[#5A5650] hover:border-[#5A5650] hover:text-[#0F0E0C] transition-all"
              >
                {showMore ? "Show less ↑" : `View more projects (${extraProjects.length}) ↓`}
              </button>
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}

      <style jsx>{`
        .animate-item { opacity: 0; transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up { transform: translateY(24px); }
        .animate-item.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </section>
  );
}