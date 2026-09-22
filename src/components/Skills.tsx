"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import { LayersIcon, CpuIcon, CloudIcon, BrainIcon, WrenchIcon, iconForTag } from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const skillGroups = [
  {
    label: "Languages",
    color: "#FF6B35",
    blurb: "The languages I reach for day to day, from backend work to quick scripting.",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "Kotlin", "SQL / PostgreSQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    color: "#4361EE",
    blurb: "Frameworks I've shipped production or research code with, on the backend and the front.",
    skills: ["NestJS", "Next.js", "React", "Node.js", "Flask", "PyTorch", "TensorFlow", "JavaFX"],
  },
  {
    label: "Cloud & Hosting",
    color: "#06D6A0",
    blurb: "Where the things I build actually run, from hobby deploys to client infrastructure.",
    skills: ["AWS", "Vercel", "Heroku", "Firebase", "Supabase", "GCP"],
  },
  {
    label: "AI & ML",
    color: "#7B2FBE",
    blurb: "The AI/ML side of my work: applied integrations and published research.",
    skills: ["Gemini API", "Hugging Face", "YOLO", "CNNs", "NLP", "OCR"],
  },
  {
    label: "Tools",
    color: "#EF476F",
    blurb: "Day to day tooling for shipping, testing and keeping projects maintainable.",
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
  const tipRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hoverGroup, setHoverGroup] = useState<number | null>(null);
  const [tappedGroup, setTappedGroup] = useState<number | null>(null);

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

  function onMove(e: React.MouseEvent) {
    const tip = tipRef.current;
    const host = sectionRef.current;
    if (!tip || !host) return;
    const r = host.getBoundingClientRect();
    tip.style.transform = `translate(${e.clientX - r.left + 16}px, ${e.clientY - r.top + 16}px)`;
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-cursor-theme="skills"
      onMouseMove={onMove}
      className="relative py-20 w-full overflow-hidden"
    >
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        <div className={`s-item ${revealed ? "in" : ""} flex items-center gap-4 mb-4`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[var(--tint-green)] text-[var(--c3-text)]">
            What I use
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>Technical stack</h2>
        </div>
        <p className={`s-item ${revealed ? "in" : ""} text-sm text-[#5A5650] max-w-lg mb-12`}>
          Hover a chip to see where it fits. Grouped by how I actually use them.
        </p>

        <div className="flex flex-col divide-y divide-[#E8E4DC]/70">
          {skillGroups.map((group, i) => {
            const dimmed = hoverGroup !== null && hoverGroup !== i;
            return (
              <div
                key={group.label}
                className={`s-item ${revealed ? "in" : ""} py-5`}
                style={{ transitionDelay: `${Math.min(i, 5) * 0.03}s` }}
              >
              <div
                className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 sm:gap-6 transition-opacity duration-300"
                style={{ opacity: dimmed ? 0.35 : 1 }}
              >
                <button
                  type="button"
                  onClick={() => setTappedGroup((p) => (p === i ? null : i))}
                  aria-expanded={tappedGroup === i}
                  className="text-xs font-bold uppercase tracking-widest pt-1.5 text-left cursor-pointer"
                  style={{ color: group.color }}
                >
                  {group.label}
                </button>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const SkillIcon = iconForTag(skill);
                    return (
                      <span
                        key={skill}
                        onMouseEnter={() => setHoverGroup(i)}
                        onMouseLeave={() => setHoverGroup(null)}
                        className="chip text-xs font-medium pl-2 pr-3 py-1.5 rounded-full border border-[#E8E4DC] bg-white/70 text-[#5A5650] inline-flex items-center gap-1.5 transition-all duration-200 cursor-default"
                        style={
                          hoverGroup === i
                            ? { borderColor: group.color, color: "#0F0E0C", transform: "translateY(-2px)" }
                            : undefined
                        }
                      >
                        <SkillIcon width={12} height={12} strokeWidth={1.8} style={{ color: group.color }} />
                        {skill}
                      </span>
                    );
                  })}
                </div>
                {tappedGroup === i && (
                  <p className="sm:col-start-2 text-xs leading-relaxed text-[#5A5650] -mt-1">
                    {group.blurb}
                  </p>
                )}
              </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cursor-following tooltip */}
      <div
        ref={tipRef}
        className="pointer-events-none absolute top-0 left-0 z-20 max-w-[240px] rounded-xl px-3 py-2 text-xs leading-relaxed text-white shadow-lg transition-opacity duration-200"
        style={{
          background: hoverGroup !== null ? skillGroups[hoverGroup].color : "#0F0E0C",
          opacity: hoverGroup !== null ? 1 : 0,
        }}
      >
        {hoverGroup !== null ? skillGroups[hoverGroup].blurb : ""}
      </div>

      <style jsx>{`
        .s-item {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .s-item.in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
