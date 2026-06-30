"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import RevealPanel from "./RevealPanel";
import { ChevronDownIcon, BriefcaseIcon, CpuIcon, GitBranchIcon, SmartphoneIcon } from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const experiences = [
  {
    role: "Software Developer",
    company: "Bardar · ANU TechLauncher",
    date: "Jul 2025 – Jun 2026",
    desc: "Engineered the full backend, designed the Bardar Score algorithm, built a priority task queue and rate limiter, and led AI chatbot integration end-to-end. Reduced search latency by 20–30%.",
    accent: "#FF6B35",
    link: "https://bardar.online",
    details: [
      "Owned 10+ REST APIs across discovery, scoring and chatbot tooling endpoints.",
      "Led integration of an 11-tool agentic chatbot powered by Gemini 2.5 Flash.",
      "Set up a priority task queue with client-level rate limiting to control external API spend.",
      "Mentored two teammates on NestJS patterns and code review practice.",
    ],
  },
  {
    role: "Data Science & Backend Intern",
    company: "Axiscades Technologies · Bengaluru",
    date: "Feb – Jul 2024",
    desc: "Built Python/Flask APIs and YOLO-based defect detection pipelines for industrial manufacturing clients. Cut processing time by 25% and error rates by 60%.",
    accent: "#4361EE",
    link: null,
    details: [
      "Trained and deployed YOLO models for real-time defect detection on production lines.",
      "Built Flask microservices to serve inference results to plant-floor dashboards.",
      "Reduced manual inspection error rate by 60% through tighter confidence thresholds.",
      "Cut average processing time per batch by 25% via pipeline parallelisation.",
    ],
  },
  {
    role: "Software Consultant Intern",
    company: "Cuvasol Technologies · Bengaluru",
    date: "Oct 2022 – Jan 2023",
    desc: "Built Android onboarding flows in Java and automated 90% of QA testing workflows, cutting daily bug reports to under 2 per week.",
    accent: "#06D6A0",
    link: null,
    details: [
      "Rebuilt the onboarding flow in Java, cutting drop-off at signup by a third.",
      "Wrote an automated QA suite covering 90% of regression-prone flows.",
      "Brought daily bug reports down from double digits to under 2 per week.",
    ],
  },
];

const bgIcons = [
  { Icon: BriefcaseIcon, top: "8%", left: "92%", size: 30, color: "#4361EE", delay: 0.3, duration: 8 },
  { Icon: CpuIcon, top: "40%", left: "3%", size: 26, color: "#FF6B35", delay: 1, duration: 7 },
  { Icon: GitBranchIcon, top: "75%", left: "90%", size: 28, color: "#06D6A0", delay: 1.8, duration: 9 },
  { Icon: SmartphoneIcon, top: "92%", left: "8%", size: 24, color: "#7B2FBE", delay: 0.6, duration: 6.5 },
];

export default function Experience() {
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
    <section id="experience" ref={sectionRef} data-cursor-theme="experience" className="relative py-20 w-full overflow-hidden">
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-12`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#EEF1FF] text-[#4361EE]">
            Where I&apos;ve worked
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#FF6B35] via-[#4361EE] to-[#06D6A0] rounded-full" />

          {experiences.map((exp, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={exp.company}
                className={`animate-item slide-right ${revealed ? "visible" : ""} relative mb-10 last:mb-0`}
                style={{ transitionDelay: i * 0.12 + "s" }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-7 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-md"
                  style={{ background: exp.accent }}
                />

                <div
                  className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-shadow duration-400"
                  style={isOpen ? { boxShadow: `0 0 0 3px ${exp.accent}22, 0 12px 32px -8px ${exp.accent}33` } : undefined}
                >
                  <button
                    type="button"
                    onClick={(e) => toggle(i, e)}
                    aria-expanded={isOpen}
                    className="relative w-full text-left p-6 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className={`${syne.className} text-lg font-bold text-[#0F0E0C]`}>
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-[#9C958C] font-medium whitespace-nowrap pt-1">
                          {exp.date}
                        </span>
                        <span
                          className="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-400"
                          style={{
                            borderColor: exp.accent,
                            color: isOpen ? "#fff" : exp.accent,
                            background: isOpen ? exp.accent : "transparent",
                            transform: isOpen ? "rotate(225deg) scale(1.08)" : "rotate(0deg) scale(1)",
                          }}
                        >
                          <ChevronDownIcon width={16} height={16} />
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold mb-3" style={{ color: exp.accent }}>
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline"
                        >
                          {exp.company} ↗
                        </a>
                      ) : (
                        exp.company
                      )}
                    </p>
                    <p className="text-sm text-[#5A5650] leading-relaxed">{exp.desc}</p>
                  </button>

                  <RevealPanel open={isOpen} origin={origin}>
                    <div className="px-6 pb-6 pt-1 border-t" style={{ borderColor: exp.accent + "33" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 mt-4" style={{ color: exp.accent }}>
                        What that looked like
                      </p>
                      <ul className="flex flex-col gap-2">
                        {exp.details.map((d) => (
                          <li key={d} className="text-sm text-[#5A5650] leading-relaxed flex gap-2.5">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: exp.accent }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealPanel>
                </div>
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
        .slide-right { transform: translateX(32px); }
        .animate-item.visible {
          opacity: 1;
          transform: translate(0, 0);
        }
      `}</style>
    </section>
  );
}