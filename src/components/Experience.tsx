"use client";
import { useEffect, useRef } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const experiences = [
  {
    role: "Software Developer",
    company: "Bardar · ANU TechLauncher",
    date: "Jul 2025 – Jun 2026",
    desc: "Engineered the full backend, designed the Bardar Score algorithm, built a priority task queue and rate limiter, and led AI chatbot integration end-to-end. Reduced search latency by 20–30%.",
    accent: "#FF6B35",
    link: "https://bardar.online",
  },
  {
    role: "Data Science & Backend Intern",
    company: "Axiscades Technologies · Bengaluru",
    date: "Feb – Jul 2024",
    desc: "Built Python/Flask APIs and YOLO-based defect detection pipelines for industrial manufacturing clients. Cut processing time by 25% and error rates by 60%.",
    accent: "#4361EE",
    link: null,
  },
  {
    role: "Software Consultant Intern",
    company: "Cuvasol Technologies · Bengaluru",
    date: "Oct 2022 – Jan 2023",
    desc: "Built Android onboarding flows in Java and automated 90% of QA testing workflows, cutting daily bug reports to under 2 per week.",
    accent: "#06D6A0",
    link: null,
  },
];

export default function Experience() {
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
      { threshold: 0.15 }
    );
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll(".animate-item").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 w-full">
      <div className="max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className="animate-item fade-up flex items-center gap-4 mb-12">
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

          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              className="animate-item slide-right relative mb-10 last:mb-0"
              style={{ transitionDelay: i * 0.12 + "s" }}
            >
              {/* Dot */}
              <div
                className="absolute -left-8 top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-md"
                style={{ background: exp.accent }}
              />

              <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className={`${syne.className} text-lg font-bold text-[#0F0E0C]`}>
                    {exp.role}
                  </h3>
                  <span className="text-xs text-[#9C958C] font-medium whitespace-nowrap pt-1">
                    {exp.date}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-3" style={{ color: exp.accent }}>
                  {exp.link ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    exp.company
                  )}
                </p>
                <p className="text-sm text-[#5A5650] leading-relaxed">{exp.desc}</p>
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