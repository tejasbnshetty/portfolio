"use client";
import { useState, useEffect, useRef } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import RevealPanel from "./RevealPanel";
import { BookIcon, SparkleIcon, FlaskIcon } from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const degrees = [
  {
    abbr: "ANU",
    institution: "Australian National University",
    location: "Canberra, ACT",
    degree: "Master of Computing",
    spec: "Specialisation: Artificial Intelligence",
    period: "Jul 2024 – Jun 2026",
    gpa: "GPA: 5.5 / 7 — Distinction average",
    accent: "#4361EE",
    accentBg: "#EEF1FF",
    // Drop a file named anu.png (or .jpg, .webp) into public/ to use it
    logo: "/anu.png",
    highlights: [
      "One of Australia's top ranked research universities.",
      "Coursework: AI, Advanced Topics in AI, Software Construction, Relational Databases, HCI, and Document Analysis.",
      "Industry capstone (Bardar) delivered real world engineering experience with an actual client.",
      "Worked in a dev team using Git workflows, code reviews, and CI/CD pipelines.",
    ],
  },
  {
    abbr: "MSRIT",
    institution: "M.S. Ramaiah Institute of Technology",
    location: "Bengaluru, KA",
    degree: "Bachelor of Engineering and Computer Science",
    spec: null,
    period: "Nov 2020 – May 2024",
    gpa: "GPA: 8.36 / 10 — First Class with Distinction",
    accent: "#FF6B35",
    accentBg: "#FFF2ED",
    // Drop a file named msrit.png (or .jpg, .webp) into public/ to use it
    logo: "/msrit.png",
    highlights: [
      "Published three IEEE / IJACSA research papers during undergrad.",
      "Won Best Social Project at IISc Bengaluru hackathon.",
      "Coursework: Data Structures & Algorithms, Data Mining & ML, Cloud Computing & Big Data, Deep Learning, Operating Systems.",
      "Built strong foundations across algorithms, mobile development, and systems programming.",
    ],
  },
];

const bgIcons = [
  { Icon: BookIcon, top: "8%", left: "88%", size: 28, color: "#4361EE", delay: 0.4, duration: 8 },
  { Icon: SparkleIcon, top: "55%", left: "4%", size: 24, color: "#FF6B35", delay: 1.2, duration: 7 },
  { Icon: FlaskIcon, top: "80%", left: "90%", size: 26, color: "#7B2FBE", delay: 2, duration: 9 },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 0 });
  const [revealed, setRevealed] = useState(false);

  function toggle(i: number, e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((e.clientX - rect.left) / rect.width) * 100, y: 0 });
    setOpenIdx(openIdx === i ? null : i);
  }

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
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (!el) return;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} data-cursor-theme="experience" className="relative py-20 w-full overflow-hidden">
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-12`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#EEF1FF] text-[#4361EE]">
            Where I studied
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Education
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {degrees.map((deg, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={deg.abbr}
                className={`animate-item fade-up ${revealed ? "visible" : ""} bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden transition-shadow duration-400`}
                style={{
                  transitionDelay: i * 0.1 + "s",
                  ...(isOpen ? { boxShadow: `0 0 0 3px ${deg.accent}22, 0 12px 32px -8px ${deg.accent}33` } : {}),
                }}
              >
                <button
                  type="button"
                  onClick={(e) => toggle(i, e)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    {/* Institution logo / branded monogram */}
                    <div
                      className="edu-logo flex-shrink-0 w-16 h-16 flex items-center justify-center overflow-hidden"
                      style={{}}
                    >
                      {/* If the logo file exists in public/, this <img> shows it.
                          Otherwise it falls back gracefully to the abbreviated text. */}
                      <img
                        src={deg.logo}
                        alt={deg.abbr}
                        width={56}
                        height={56}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <span
                        className="hidden w-full h-full items-center justify-center text-xs font-black tracking-tight leading-tight text-center px-1"
                        style={{ color: deg.accent, display: "none" }}
                      >
                        {deg.abbr}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: deg.accent }}>
                        {deg.location} · {deg.period}
                      </p>
                      <h3 className={`${syne.className} text-lg font-bold text-[#0F0E0C] leading-snug`}>
                        {deg.institution}
                      </h3>
                      <p className="text-sm text-[#5A5650] mt-0.5">{deg.degree}</p>
                      {deg.spec && <p className="text-xs text-[#9C958C] mt-0.5">{deg.spec}</p>}
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-400"
                        style={{
                          borderColor: deg.accent,
                          color: isOpen ? "#fff" : deg.accent,
                          background: isOpen ? deg.accent : "transparent",
                          transform: isOpen ? "rotate(225deg) scale(1.08)" : "rotate(0deg) scale(1)",
                        }}
                      >
                        <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>

                <RevealPanel open={isOpen} origin={origin}>
                  <div className="px-6 pb-6 pt-1 border-t" style={{ borderColor: deg.accent + "33" }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 mt-4" style={{ color: deg.accent }}>
                      Highlights
                    </p>
                    <ul className="flex flex-col gap-2">
                      {deg.highlights.map((h) => (
                        <li key={h} className="text-sm text-[#5A5650] leading-relaxed flex gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: deg.accent }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealPanel>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .animate-item {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up { transform: translateY(24px); }
        .animate-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}