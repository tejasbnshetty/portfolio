"use client";
import { useEffect, useRef } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const projects = [
  {
    name: "Bardar",
    role: "ANU TechLauncher Capstone",
    desc: "Location-based music artist discovery platform. I owned the entire NestJS backend — 10+ REST APIs, a custom scoring algorithm, a priority task queue with rate limiting, and an agentic AI chatbot with 11 tool calls powered by Gemini 2.5 Flash.",
    tags: ["NestJS", "Next.js", "TypeScript", "Supabase", "Gemini AI", "Heroku"],
    link: "https://bardar.online",
    linkLabel: "bardar.online ↗",
    live: true,
    accent: "#FF6B35",
    accentBg: "#FFF2ED",
    borderClass: "border-[#FF6B35]",
    bgClass: "bg-gradient-to-br from-[#FFF8F5] to-[#FFF2ED]",
    badge: "🟢 Live product",
    badgeClass: "text-[#059669] bg-[#E8F8F2]",
  },
  {
    name: "Nutricate",
    role: "Hackathon Project",
    desc: "Android app that uses OCR to scan food labels and instantly flags allergens against a personal database. Award-winning at IISc Bengaluru's Social Hackathon League.",
    tags: ["Android", "Java", "OCR", "Firebase", "SQLite"],
    link: null,
    linkLabel: null,
    live: false,
    accent: "#06D6A0",
    accentBg: "#E8F8F2",
    borderClass: "border-[#06D6A0]",
    bgClass: "bg-white",
    badge: "🏆 Best Social Project · IISc Bengaluru",
    badgeClass: "text-[#059669] bg-[#E8F8F2]",
  },
  {
    name: "PoliRec",
    role: "University Project",
    desc: "Government vehicle management app with separate user and admin portals. Integrated a Hugging Face LLM chatbot to automate query resolution end-to-end.",
    tags: ["Android", "Java", "Firebase", "Hugging Face LLM"],
    link: null,
    linkLabel: null,
    live: false,
    accent: "#7B2FBE",
    accentBg: "#F3EAFF",
    borderClass: "border-[#7B2FBE]",
    bgClass: "bg-white",
    badge: null,
    badgeClass: "",
  },
];

export default function Projects() {
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
        { threshold: 0.12 }
    );
    const el = sectionRef.current;
    if (!el) return;
    el.querySelectorAll(".animate-item").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-20 w-full">
      <div className="max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className="animate-item fade-up flex items-center gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#FFF2ED] text-[#FF6B35]">
            Selected work
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Things I&apos;ve built
          </h2>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className={`animate-item card-slide-${i % 2 === 0 ? "left" : "right"} rounded-2xl p-7 border-2 ${p.borderClass} ${p.bgClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
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
                  <h3 className={`${syne.className} text-xl font-bold text-[#0F0E0C]`}>
                    {p.name}
                  </h3>
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white text-base font-bold transition-transform hover:scale-110 hover:rotate-12"
                    style={{ background: p.accent }}
                  >
                    ↗
                  </a>
                )}
              </div>
              <p className="text-sm text-[#5A5650] leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-[#F5F4F0] text-[#5A5650]"
                  >
                    {tag}
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
        .fade-up { transform: translateY(24px); }
        .card-slide-left { transform: translateX(-36px); }
        .card-slide-right { transform: translateX(36px); }
        .animate-item.visible {
          opacity: 1;
          transform: translate(0, 0);
        }
        .animate-item:nth-child(2) { transition-delay: 0.1s; }
        .animate-item:nth-child(3) { transition-delay: 0.2s; }
        .animate-item:nth-child(4) { transition-delay: 0.3s; }
      `}</style>
    </section>
  );
}