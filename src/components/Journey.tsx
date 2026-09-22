"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import RevealPanel from "./RevealPanel";
import {
  BriefcaseIcon,
  BookIcon,
  FlaskIcon,
  GitBranchIcon,
  CpuIcon,
  ChevronDownIcon,
} from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

type Kind = "work" | "study" | "research";

type Entry = {
  year: string;
  kind: Kind;
  title: string;
  org: string;
  meta: string;
  narrative: string;
  accent: string;
  link?: string;
  image?: { src: string; alt: string };
  logo?: { src: string; alt: string };
  details: string[];
};

// One chronological story. Roles and study sit on the same rail: the year a
// thing happened matters more than whether it was a job or a degree.
const entries: Entry[] = [
  {
    year: "2026",
    kind: "study",
    title: "Finishing the Master of Computing",
    org: "Australian National University",
    meta: "Jul 2024 – Jun 2026 · Canberra",
    narrative:
      "Graduating from ANU with a specialisation in Artificial Intelligence and a Distinction average. My industry capstone shipped to a real client instead of a marking rubric.",
    accent: "#4361EE",
    logo: { src: "/anu.png", alt: "Australian National University" },
    details: [
      "One of Australia's top ranked research universities.",
      "Coursework: AI, Advanced Topics in AI, Software Construction, Relational Databases, HCI, and Document Analysis.",
      "Industry capstone (Bardar) delivered real world engineering experience with an actual client.",
      "Worked in a dev team using Git workflows, code reviews, and CI/CD pipelines.",
    ],
  },
  {
    year: "2025",
    kind: "work",
    title: "Owned the Bardar backend",
    org: "Bardar · ANU TechLauncher",
    meta: "Jul 2025 – Jun 2026 · Canberra",
    narrative:
      "Engineered the entire NestJS backend from scratch: 10+ REST APIs, the log-scaled Bardar Score, a priority task queue with per-API rate limiting, and an agentic AI chatbot wired to every backend tool call. Search got 20–30% faster.",
    accent: "#FF6B35",
    link: "https://bardar.online",
    image: { src: "/bardar-dashboard.png", alt: "Bardar artist discovery dashboard" },
    details: [
      "Engineered the entire NestJS backend from scratch, owning 10+ REST APIs across artist discovery, geo-sync, genre filtering, and head-to-head comparison, integrated with source APIs and deployed on Heroku via CI/CD pipelines.",
      "Designed the Bardar Score: a custom log-scaled algorithm that ranks thousands of artists across any city globally without re-normalisation.",
      "Architected a priority task queue and per-API rate limiter to orchestrate concurrent external API calls, reducing search latency by 20–30% and eliminating pipeline breakage under concurrent load.",
      "Led end-to-end integration of an agentic AI chatbot (Gemini 2.5 Flash) with access to all backend tool calls, enabling natural language artist discovery with dynamically rendered rich UI cards.",
      "Integrated multiple third-party music APIs (MusicBrainz, Last.fm, Fanart.tv) for artist data, images, and popularity metrics.",
      "Contributed to the Next.js frontend including several pages and a real-time sync progress UI.",
    ],
  },
  {
    year: "2024",
    kind: "work",
    title: "Data science meets the factory floor",
    org: "Axiscades Technologies · Bengaluru",
    meta: "Feb – Jul 2024",
    narrative:
      "Built Python/Flask APIs and YOLO-based defect-detection pipelines for industrial manufacturing clients: 25% faster processing, 60% fewer errors on the line. The same season, I finished my B.E. at M.S. Ramaiah.",
    accent: "#06D6A0",
    details: [
      "Delivered Python/Flask backend APIs and a QR-based inventory system to automate chip fabrication inventory workflows, reducing processing time by 25%.",
      "Built YOLO-based computer vision pipelines for production line quality control. This enabled automatic detection of assembly errors and container defects, cutting error rates by 60%.",
      "Worked on complex PostgreSQL query optimisation to improve data accessibility for production teams.",
      "Designed real-time monitoring pipelines to support faster operational decision making.",
    ],
  },
  {
    year: "2023",
    kind: "research",
    title: "Machine learning for satellites",
    org: "ISRO · via M.S. Ramaiah",
    meta: "Feb 2023 – Feb 2024 · Bengaluru",
    narrative:
      "Designed and deployed ML models (CNNs, autoencoders, random forests) across 50+ configurations to optimise satellite mission operations: 30% more efficient, 85% accuracy predicting part failures. I also published my first three peer-reviewed papers this year.",
    accent: "#EF476F",
    details: [
      "Designed and deployed ML models (CNNs, Autoencoders, Random Forest) across 50+ configurations to optimise satellite mission operations, achieving a 30% increase in operational efficiency.",
      "Developed predictive maintenance workflows using Expert Systems and ML to detect satellite part failures with 85% accuracy, reducing maintenance downtime by 25%.",
      "Published three peer-reviewed papers (IEEE ICCCNT, IEEE ICCPCT, IJACSA), now cited 21 times.",
    ],
  },
  {
    year: "2022",
    kind: "work",
    title: "My first engineering job",
    org: "Cuvasol Technologies · Bengaluru",
    meta: "Oct 2022 – Jan 2023",
    narrative:
      "The first time I got paid to write software. I built the onboarding flow new users see when they register, automated 90% of QA testing, and managed communication and delivery with the client directly.",
    accent: "#7B2FBE",
    details: [
      "First professional software role. Built the onboarding flows new users see when registering for the first time.",
      "Simplified the registration process, improving user engagement by 40%.",
      "Automated 90% of QA testing workflows, drastically reducing manual testing effort.",
      "Cut daily bug reports to under 2 per week through systematic test coverage.",
      "Worked directly with the client team, managing communication and delivery independently.",
    ],
  },
  {
    year: "2020",
    kind: "study",
    title: "Where it started",
    org: "M.S. Ramaiah Institute of Technology · Bengaluru",
    meta: "Nov 2020 – May 2024",
    narrative:
      "Started a Bachelor of Engineering in Computer Science. Graduated First Class with Distinction (8.36/10), with three published papers and a hackathon win picked up along the way.",
    accent: "#FF6B35",
    logo: { src: "/msrit.png", alt: "M.S. Ramaiah Institute of Technology" },
    details: [
      "Published three IEEE / IJACSA research papers during undergrad.",
      "Won Best Social Project at IISc Bengaluru hackathon.",
      "Coursework: Data Structures & Algorithms, Data Mining & ML, Cloud Computing & Big Data, Deep Learning, Operating Systems.",
      "Built strong foundations across algorithms, mobile development, and systems programming.",
    ],
  },
];

const kindIcon: Record<Kind, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  work: BriefcaseIcon,
  study: BookIcon,
  research: FlaskIcon,
};

const kindLabel: Record<Kind, string> = {
  work: "Work",
  study: "Study",
  research: "Research",
};

const bgIcons = [
  { Icon: BriefcaseIcon, top: "6%", left: "92%", size: 30, color: "#4361EE", delay: 0.3, duration: 8 },
  { Icon: CpuIcon, top: "38%", left: "3%", size: 26, color: "#FF6B35", delay: 1, duration: 7 },
  { Icon: GitBranchIcon, top: "68%", left: "94%", size: 28, color: "#06D6A0", delay: 1.8, duration: 9 },
  { Icon: FlaskIcon, top: "90%", left: "7%", size: 24, color: "#7B2FBE", delay: 0.6, duration: 6.5 },
];

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 0 });

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
      { threshold: 0.08 }
    );
    const el = sectionRef.current;
    if (!el) return;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (obsEntries) => {
        obsEntries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function toggle(i: number, e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - rect.left) / rect.width) * 100, y: 0 });
    setOpenIdx(openIdx === i ? null : i);
  }

  return (
    <section
      id="journey"
      ref={sectionRef}
      data-cursor-theme="experience"
      className="relative py-20 w-full overflow-hidden"
    >
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        <div className={`j-head ${revealed ? "in" : ""} flex items-center gap-4 mb-4`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[var(--tint-blue)] text-[var(--c2-text)]">
            How I got here
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>My journey</h2>
        </div>
        <p className={`j-head ${revealed ? "in" : ""} text-sm text-[#5A5650] max-w-lg mb-14`}>
          Six years, four teams, two degrees, and a handful of papers, in the order they
          actually happened.
        </p>

        <div className="relative">
          {/* Rail */}
          <div
            className="absolute left-[7px] sm:left-1/2 sm:-translate-x-1/2 top-3 bottom-3 w-0.5 bg-[#E8E4DC] rounded-full"
            aria-hidden
          >
            <div
              className="w-full rounded-full bg-gradient-to-b from-[#FF6B35] via-[#EF476F] to-[#4361EE] transition-[height] duration-500 ease-out"
              style={{ height: `${((active + 1) / entries.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-col gap-14 sm:gap-11">
            {entries.map((entry, i) => {
              const isActive = active === i;
              const isHot = hovered === i || isActive;
              const isOpen = openIdx === i;
              const Icon = kindIcon[entry.kind];
              const onLeft = entry.kind !== "work";
              return (
                <div
                  key={entry.year + entry.org}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-idx={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`j-item ${revealed ? "in" : ""} relative pl-9 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-x-10`}
                  style={{ transitionDelay: `${Math.min(i, 5) * 0.03}s` }}
                >
                  {/* Rail dot */}
                  <span
                    className="absolute left-[1px] sm:left-1/2 sm:-translate-x-1/2 top-2.5 w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-300 z-10"
                    style={{
                      background: isHot ? entry.accent : "#C9C3B8",
                      transform: isHot ? "translateX(0) scale(1.25)" : "translateX(0) scale(1)",
                    }}
                  />

                  {/* Rail → card connector (desktop only) */}
                  <span
                    aria-hidden
                    className={`hidden sm:block absolute top-3 h-px w-5 transition-colors duration-300 ${onLeft ? "right-1/2" : "left-1/2"}`}
                    style={{ background: isHot ? entry.accent + "88" : "#E8E4DC" }}
                  />

                  {/* Content cell — study/research on the left, work on the right */}
                  <div className={onLeft ? "sm:col-start-1" : "sm:col-start-2"}>
                  {/* Year */}
                  <div className={`flex items-baseline gap-3 mb-3 ${onLeft ? "sm:justify-end" : ""}`}>
                    <p
                      className={`${syne.className} font-black leading-none transition-all duration-300`}
                      style={{
                        fontSize: "clamp(26px, 3.4vw, 36px)",
                        color: isHot ? entry.accent : "#B5AEA3",
                      }}
                    >
                      {entry.year}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: isHot ? entry.accent : "#B5AEA3" }}
                    >
                      <Icon width={11} height={11} strokeWidth={2} />
                      {kindLabel[entry.kind]}
                    </span>
                  </div>

                  {/* Body */}
                  <div
                    className="j-card rounded-2xl border bg-white/80 backdrop-blur-sm overflow-hidden"
                    style={{
                      borderColor: isHot ? entry.accent + "66" : "#E8E4DC",
                      boxShadow: isHot
                        ? `0 18px 40px -18px ${entry.accent}44`
                        : "0 1px 2px rgba(15,14,12,0.04)",
                      transform:
                        hovered === i
                          ? "perspective(1100px) rotateX(7deg) scale(0.985)"
                          : "perspective(1100px) rotateX(0deg) scale(1)",
                    }}
                  >
                    {entry.image && (
                      <div className="overflow-hidden max-h-52 border-b border-[#E8E4DC] bg-[#F5F4F0]">
                        <img
                          src={entry.image.src}
                          alt={entry.image.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[600ms] ease-out"
                          style={{ transform: isHot ? "scale(1.04)" : "scale(1)" }}
                        />
                      </div>
                    )}

                    <div className="p-5 sm:p-6 flex gap-4">
                      {entry.logo && (
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl border border-[#E8E4DC] bg-white flex items-center justify-center p-1.5 transition-transform duration-300"
                          style={{ transform: isHot ? "scale(1.06)" : "scale(1)" }}
                        >
                          <img
                            src={entry.logo.src}
                            alt={entry.logo.alt}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                      <h3 className={`${syne.className} text-lg font-bold text-[#0F0E0C] leading-snug`}>
                        {entry.title}
                      </h3>
                      <p className="text-sm font-semibold mt-1" style={{ color: entry.accent }}>
                        {entry.link ? (
                          <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="external"
                            className="hover:underline"
                          >
                            {entry.org} ↗
                          </a>
                        ) : (
                          entry.org
                        )}
                      </p>
                      <p className="text-xs text-[var(--ink-muted)] mt-0.5">{entry.meta}</p>

                      <p className="text-sm text-[#5A5650] leading-relaxed mt-3">
                        {entry.narrative}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => toggle(i, e)}
                        aria-expanded={isOpen}
                        className="mt-4 py-2 -my-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                        style={{ color: entry.accent }}
                      >
                        {isOpen ? "Less" : "The detail"}
                        <span
                          className="inline-flex transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          <ChevronDownIcon width={13} height={13} />
                        </span>
                      </button>

                      <RevealPanel open={isOpen} origin={origin}>
                        <ul className="flex flex-col gap-2 pt-4 mt-3 border-t" style={{ borderColor: entry.accent + "33" }}>
                          {entry.details.map((d) => (
                            <li key={d} className="text-sm text-[#5A5650] leading-relaxed flex gap-2.5">
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: entry.accent }}
                              />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </RevealPanel>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .j-head,
        .j-item {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .j-head.in,
        .j-item.in {
          opacity: 1;
          transform: translateY(0);
        }
        .j-card {
          transform-origin: 50% 100%;
          will-change: transform;
          transition: transform 0.3s cubic-bezier(0.34, 1.32, 0.64, 1),
            box-shadow 0.3s ease, border-color 0.3s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .j-card,
          .j-card img {
            transform: none !important;
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
          }
        }
      `}</style>
    </section>
  );
}
