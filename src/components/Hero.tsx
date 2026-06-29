"use client";
import { useEffect, useRef } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const chips = [
  { label: "Backend systems", color: "border-[#FF6B35] text-[#FF6B35] bg-[#FFF2ED]" },
  { label: "Full-stack", color: "border-[#4361EE] text-[#4361EE] bg-[#EEF1FF]" },
  { label: "AI integration", color: "border-[#06D6A0] text-[#059669] bg-[#E8F8F2]" },
  { label: "Published researcher", color: "border-[#7B2FBE] text-[#7B2FBE] bg-[#F3EAFF]" },
  { label: "Android", color: "border-[#EF476F] text-[#EF476F] bg-[#FEE8EF]" },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("loaded"), 50);
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative w-full min-h-screen overflow-hidden">
      {/* Floating blobs — full viewport */}
      <div className="pointer-events-none absolute inset-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-4xl mx-auto px-7 pt-36 pb-20 flex flex-col justify-center min-h-screen">

        {/* Available tag */}
        <div className="available-tag flex items-center gap-2 text-[#059669] bg-[#E8F8F2] text-sm font-medium px-4 py-2 rounded-full w-fit mb-7">
          <span className="pulse-dot w-2 h-2 rounded-full bg-[#06D6A0] inline-block" />
          Open to work — Canberra, AU
        </div>

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
          <a
            href="mailto:tejasbnshetty@gmail.com"
            className="px-6 py-3 rounded-full bg-[#0F0E0C] text-white text-sm font-medium hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Say hello →
          </a>
          <a
            href="https://bardar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#FF6B35] text-white text-sm font-medium hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            See Bardar live ↗
          </a>
          <a
            href="https://github.com/tejasbnshetty"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-[#E8E4DC] text-[#5A5650] text-sm font-medium hover:border-[#5A5650] hover:text-[#0F0E0C] transition-all"
          >
            GitHub
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

      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          opacity: 0.13;
          animation: floatBlob 8s ease-in-out infinite;
        }
        .blob-1 { width: 500px; height: 500px; background: #FF6B35; top: -150px; right: -100px; animation-delay: 0s; }
        .blob-2 { width: 350px; height: 350px; background: #4361EE; bottom: 0px; left: -100px; animation-delay: 2s; }
        .blob-3 { width: 250px; height: 250px; background: #06D6A0; top: 40%; right: 5%; animation-delay: 4s; }
        .blob-4 { width: 180px; height: 180px; background: #FFD166; top: 15%; left: 50%; animation-delay: 1s; }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(8deg); }
        }
        .pulse-dot { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
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
        .available-tag { opacity: 0; transform: translateY(-12px); transition: all 0.5s ease; }
        .hero-line1 { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.1s ease; }
        .hero-line2 { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.2s ease; }
        .hero-desc { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.3s ease; }
        .hero-btns { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.4s ease; }
        .hero-chips { opacity: 0; transform: translateY(28px); transition: all 0.6s 0.5s ease; }
        .loaded .available-tag,
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