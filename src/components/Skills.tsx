"use client";
import { useEffect, useRef } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const skillGroups = [
  {
    label: "Languages",
    color: "#FF6B35",
    bg: "#FFF2ED",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "Kotlin", "SQL / PostgreSQL", "HTML / CSS"],
  },
  {
    label: "Frameworks",
    color: "#4361EE",
    bg: "#EEF1FF",
    skills: ["NestJS", "Next.js", "React", "Node.js", "Flask", "PyTorch", "TensorFlow", "JavaFX"],
  },
  {
    label: "Cloud & Hosting",
    color: "#06D6A0",
    bg: "#E8F8F2",
    skills: ["AWS", "Vercel", "Heroku", "Firebase", "Supabase", "GCP"],
  },
  {
    label: "AI & ML",
    color: "#7B2FBE",
    bg: "#F3EAFF",
    skills: ["Gemini API", "Hugging Face", "YOLO", "CNNs", "NLP", "OCR"],
  },
  {
    label: "Tools",
    color: "#EF476F",
    bg: "#FEE8EF",
    skills: ["Git", "Docker", "CI/CD", "Android Studio", "Postman"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            e.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll(".animate-item").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 w-full">
      <div className="max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className="animate-item fade-up flex items-center gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#E8F8F2] text-[#059669]">
            What I use
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <div
              key={group.label}
              className="animate-item fade-up bg-white border border-[#E8E4DC] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: i * 0.08 + "s" }}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4"
                style={{ background: group.bg, color: group.color }}
              >
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-full border border-[#E8E4DC] text-[#5A5650] hover:border-current transition-colors cursor-default"
                    style={{ ["--hover-color" as string]: group.color }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
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