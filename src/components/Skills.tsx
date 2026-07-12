"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import MagneticIcon from "./MagneticIcon";
import RevealPanel from "./RevealPanel";
import { ChevronDownIcon, LayersIcon, CpuIcon, CloudIcon, BrainIcon, WrenchIcon, iconForTag } from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const skillGroups = [
  {
    label: "Languages",
    color: "#FF6B35",
    bg: "#FFF2ED",
    blurb: "The languages I reach for day to day, from systems-y backend work to quick scripting.",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "Kotlin", "SQL / PostgreSQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    color: "#4361EE",
    bg: "#EEF1FF",
    blurb: "Frameworks I've shipped production or research code with, on the backend and the front.",
    skills: ["NestJS", "Next.js", "React", "Node.js", "Flask", "PyTorch", "TensorFlow", "JavaFX"],
  },
  {
    label: "Cloud & Hosting",
    color: "#06D6A0",
    bg: "#E8F8F2",
    blurb: "Where the things I build actually run, from hobby deploys to client infrastructure.",
    skills: ["AWS", "Vercel", "Heroku", "Firebase", "Supabase", "GCP"],
  },
  {
    label: "AI & ML",
    color: "#7B2FBE",
    bg: "#F3EAFF",
    blurb: "The AI/ML side of my work — both applied integrations and published research.",
    skills: ["Gemini API", "Hugging Face", "YOLO", "CNNs", "NLP", "OCR"],
  },
  {
    label: "Tools",
    color: "#EF476F",
    bg: "#FEE8EF",
    blurb: "Day-to-day tooling for shipping, testing and keeping projects maintainable.",
    skills: ["Git", "Docker", "CI/CD", "GitHub Actions", "Jira", "Android Studio", "Postman"],
  },
];

const bgIcons = [
  { Icon: LayersIcon, top: "6%", left: "4%", size: 28, color: "#FF6B35", delay: 0.2, duration: 8 },
  { Icon: CpuIcon, top: "20%", left: "95%", size: 26, color: "#4361EE", delay: 1, duration: 7 },
  { Icon: CloudIcon, top: "55%", left: "2%", size: 30, color: "#06D6A0", delay: 1.6, duration: 9 },
  { Icon: BrainIcon, top: "80%", left: "94%", size: 26, color: "#7B2FBE", delay: 0.8, duration: 7.5 },
  { Icon: WrenchIcon, top: "92%", left: "10%", size: 22, color: "#EF476F", delay: 2.2, duration: 6.5 },
];

export default function Skills() {
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
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (!el) return;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} data-cursor-theme="skills" className="relative py-20 w-full overflow-hidden">
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-12`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#E8F8F2] text-[#059669]">
            What I use
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {skillGroups.map((group, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={group.label}
                className={`animate-item fade-up ${revealed ? "visible" : ""} bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-shadow duration-400`}
                style={{
                  transitionDelay: i * 0.08 + "s",
                  ...(isOpen ? { boxShadow: `0 0 0 3px ${group.color}22, 0 12px 32px -8px ${group.color}33` } : {}),
                }}
              >
                <button
                  type="button"
                  onClick={(e) => toggle(i, e)}
                  aria-expanded={isOpen}
                  className="relative w-full text-left p-5 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit"
                      style={{ background: group.bg, color: group.color }}
                    >
                      {group.label}
                    </div>
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-400 flex-shrink-0"
                      style={{
                        borderColor: group.color,
                        color: isOpen ? "#fff" : group.color,
                        background: isOpen ? group.color : "transparent",
                        transform: isOpen ? "rotate(225deg) scale(1.08)" : "rotate(0deg) scale(1)",
                      }}
                    >
                      <ChevronDownIcon width={14} height={14} />
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const SkillIcon = iconForTag(skill);
                      return (
                        <span
                          key={skill}
                          className="text-xs font-medium pl-2 pr-2.5 py-1 rounded-full border border-[#E8E4DC] text-[#5A5650] inline-flex items-center gap-1.5 hover:border-current transition-colors cursor-default"
                        >
                          <MagneticIcon Icon={SkillIcon} size={12} range={5} style={{ color: group.color }} />
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </button>

                <RevealPanel open={isOpen} origin={origin}>
                  <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: group.color + "33" }}>
                    <p className="text-sm text-[#5A5650] leading-relaxed mt-4">{group.blurb}</p>
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
        .fade-up { transform: translateY(28px); }
        .animate-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}