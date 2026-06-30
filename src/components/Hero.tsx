"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import ContactModal from "./ContactModal";
import {
  CodeIcon,
  DatabaseIcon,
  CloudIcon,
  GitBranchIcon,
} from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const chips = [
  { label: "Backend systems", color: "border-[#FF6B35] text-[#FF6B35] bg-[#FFF2ED]" },
  { label: "Full-stack", color: "border-[#4361EE] text-[#4361EE] bg-[#EEF1FF]" },
  { label: "AI integration", color: "border-[#06D6A0] text-[#059669] bg-[#E8F8F2]" },
  { label: "Published researcher", color: "border-[#7B2FBE] text-[#7B2FBE] bg-[#F3EAFF]" },
  { label: "Android", color: "border-[#EF476F] text-[#EF476F] bg-[#FEE8EF]" },
];

const bgIcons = [
  { Icon: CodeIcon, top: "12%", left: "78%", size: 30, color: "#FF6B35", delay: 0, duration: 7 },
  { Icon: DatabaseIcon, top: "65%", left: "85%", size: 26, color: "#4361EE", delay: 1.4, duration: 8 },
  { Icon: CloudIcon, top: "35%", left: "8%", size: 28, color: "#06D6A0", delay: 0.8, duration: 9 },
  { Icon: GitBranchIcon, top: "75%", left: "15%", size: 24, color: "#7B2FBE", delay: 2.2, duration: 7.5 },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("loaded"), 50);
  }, []);

  return (
    <section
      ref={heroRef}
      data-cursor-theme="hero"
      className="hero-section relative w-full min-h-screen overflow-hidden"
    >
      {/* Ambient tech icons */}
      <FloatingIcons icons={bgIcons} />

      {/* Centered content */}
      <div className="relative z-10 max-w-4xl mx-auto px-7 pt-36 pb-20 flex flex-col justify-center min-h-screen">

        {/* Headline */}
        <h1 className={`${syne.className} text-[clamp(48px,8vw,80px)] font-black leading-none mb-5`}>
          <span className="block text-[#0F0E0C] hero-line1">Hey, I&apos;m Tejas.</span>
          <span className="block grad-text hero-line2">I build things.</span>
        </h1>

        {/* Description */}
        <p className="hero-desc text-lg text-[#5A5650] max-w-xl leading-relaxed mb-9">
          <strong className="text-[#0F0E0C] font-medium">Software developer</strong><br />  
          Graduated with a Master&apos;s in Computing (AI) from the Australian National University. I&apos;m into backend
          systems, AI integrations, and the occasional published paper.
        </p>

        {/* Buttons */}
        <div className="hero-btns flex gap-3 flex-wrap mb-7">
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="px-6 py-3 rounded-full bg-[#0F0E0C] text-white text-sm font-medium hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer"
          >
            Say hello →
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border-2 border-[#0F0E0C] text-[#0F0E0C] text-sm font-medium hover:-translate-y-1 hover:shadow-lg hover:bg-[#0F0E0C] hover:text-white transition-all"
          >
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Résumé
          </a>
          <a
            href="https://bardar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            See Bardar live ↗
          </a>
        </div>

        {/* Chips */}
        <div className="hero-chips flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className={"text-xs font-semibold px-3 py-1.5 rounded-full border " + chip.color}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <style jsx>{`
        .grad-text {
          background: linear-gradient(135deg, #FF6B35 0%, #EF476F 40%, #4361EE 100%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 4s ease infinite;
        }
        @keyframes gradShift {
          0%, 100% { background-position: 0%; }
          50% { background-position: 100%; }
        }
        .hero-line1 { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.1s ease; }
        .hero-line2 { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.2s ease; }
        .hero-desc { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.3s ease; }
        .hero-btns { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.4s ease; }
        .hero-chips { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.5s ease; }
        .loaded .hero-line1,
        .loaded .hero-line2,
        .loaded .hero-desc,
        .loaded .hero-btns,
        .loaded .hero-chips {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}