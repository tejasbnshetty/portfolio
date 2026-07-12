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

const bgIcons = [
  { Icon: CodeIcon, top: "12%", left: "78%", size: 30, color: "#FF6B35", delay: 0, duration: 7 },
  { Icon: DatabaseIcon, top: "65%", left: "85%", size: 26, color: "#4361EE", delay: 1.4, duration: 8 },
  { Icon: CloudIcon, top: "35%", left: "8%", size: 28, color: "#06D6A0", delay: 0.8, duration: 9 },
  { Icon: GitBranchIcon, top: "75%", left: "15%", size: 24, color: "#7B2FBE", delay: 2.2, duration: 7.5 },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [photoError, setPhotoError] = useState(false);

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

      <div className="relative z-10 max-w-4xl mx-auto px-7 pt-36 pb-20 flex flex-col lg:flex-row items-center lg:items-start gap-10 justify-center min-h-screen">

        {/* ── Text ── */}
        <div className="flex-1 flex flex-col">

        {/* Headline */}
        <h1 className={`${syne.className} text-[clamp(48px,8vw,80px)] font-black leading-none mb-5`}>
          <span className="block text-[#0F0E0C] hero-line1">Hey, I&apos;m Tejas.</span>
          <span className="block grad-text hero-line2">I build things.</span>
        </h1>

        {/* Description */}
        <p className="hero-desc text-lg text-[#5A5650] max-w-xl leading-relaxed mb-9">
          <strong className="text-[#0F0E0C] font-medium">Software developer based in Canberra.</strong><br />
          Fresh Master of Computing graduate from ANU, specialising in AI. I build backend systems, ship AI integrations, and occasionally publish research. I pick up new tools quickly — whether that's a new framework, a cloud platform, or a production bug at 2am.
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
            href="/Tejas_Shetty_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tejas_Shetty_CV.pdf"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border-2 border-[#0F0E0C] text-[#0F0E0C] text-sm font-medium hover:-translate-y-1 hover:shadow-lg hover:bg-[#0F0E0C] hover:text-white transition-all"
          >
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Résumé
          </a>
        </div>

        {/* Social links — always visible */}
        <div className="hero-social flex gap-3 flex-wrap">
          <a
            href="https://github.com/tejasbnshetty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E4DC] text-sm text-[#5A5650] font-medium hover:border-[#0F0E0C] hover:text-[#0F0E0C] transition-all"
          >
            <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/tejasbnshetty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E8E4DC] text-sm text-[#5A5650] font-medium hover:border-[#4361EE] hover:text-[#4361EE] transition-all"
          >
            <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
        </div>{/* end text column */}

        {/* ── Photo ── */}
        <div className="hero-photo flex-shrink-0 order-first lg:order-last">
          <div className="photo-ring w-44 h-44 sm:w-52 sm:h-52 rounded-full p-[3px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#F0ECE2]">
              {!photoError ? (
                <img
                  src="/photo.jpeg"
                  alt="Tejas Shetty"
                  className="w-full h-full object-cover"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className={`${syne.className} text-4xl font-black bg-gradient-to-br from-[#FF6B35] to-[#4361EE] bg-clip-text text-transparent select-none`}>
                    TS
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{/* end flex row */}

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
        .hero-social { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.5s ease; }
        .hero-photo { opacity: 0; transform: translateY(16px); transition: all 0.7s 0.2s ease; }
        .photo-ring {
          background: linear-gradient(135deg, #FF6B35, #EF476F, #4361EE, #06D6A0, #FF6B35);
          background-size: 300% 300%;
          animation: ringShift 6s linear infinite;
        }
        @keyframes ringShift {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .loaded .hero-line1,
        .loaded .hero-line2,
        .loaded .hero-desc,
        .loaded .hero-btns,
        .loaded .hero-social,
        .loaded .hero-photo {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}