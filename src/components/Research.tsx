"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import FloatingIcons from "./FloatingIcons";
import RevealPanel from "./RevealPanel";
import { ChevronDownIcon, FlaskIcon, BookIcon } from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const publications = [
  {
    venue: "IEEE ICCCNT 2023",
    title: "Android Application for Food Label Recognition to Ensure Safe Food Consumption Leveraging OCR",
    link: "https://doi.org/10.1109/ICCCNT56998.2023.10307054",
    badgeColor: "#4361EE",
    badgeBg: "#EEF1FF",
    abstract:
      "Presents Nutricate, an Android app that pairs on-device OCR with a personal allergen profile to flag unsafe ingredients in real time, removing the need to manually parse dense food labels.",
  },
  {
    venue: "IEEE ICCPCT 2023",
    title: "Customer Feedback Analysis Based on Emotion Detection Using Machine Learning Techniques with Privacy Preservation",
    link: "https://doi.org/10.1109/ICCPCT58313.2023.10244876",
    badgeColor: "#059669",
    badgeBg: "#E8F8F2",
    abstract:
      "Proposes a privacy-preserving pipeline for detecting emotion in customer feedback, balancing model accuracy against techniques that limit exposure of identifiable customer data.",
  },
  {
    venue: "IJACSA Vol. 14, 2023",
    title: "Deep Learning Driven Web Security: Detecting and Preventing Explicit Content",
    link: "https://thesai.org/Downloads/Volume14No10/Paper_40-Deep_Learning_Driven_Web_Security.pdf",
    badgeColor: "#7B2FBE",
    badgeBg: "#F3EAFF",
    abstract:
      "Evaluates deep learning architectures for real-time detection and filtering of explicit web content, with an emphasis on minimising false negatives in safety-critical filtering systems.",
  },
];

const bgIcons = [
  { Icon: FlaskIcon, top: "10%", left: "6%", size: 28, color: "#7B2FBE", delay: 0.4, duration: 8 },
  { Icon: BookIcon, top: "60%", left: "92%", size: 26, color: "#4361EE", delay: 1.2, duration: 7 },
  { Icon: FlaskIcon, top: "85%", left: "10%", size: 22, color: "#059669", delay: 2, duration: 9 },
];

export default function Research() {
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
    <section id="research" ref={sectionRef} data-cursor-theme="research" className="relative py-20 w-full overflow-hidden">
      <FloatingIcons icons={bgIcons} />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-12`}>
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#F3EAFF] text-[#7B2FBE]">
            Academic work
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Research
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {publications.map((pub, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={pub.venue}
                className={`animate-item slide-up ${revealed ? "visible" : ""} bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-shadow duration-400 group`}
                style={{
                  transitionDelay: i * 0.1 + "s",
                  ...(isOpen ? { boxShadow: `0 0 0 3px ${pub.badgeColor}22, 0 12px 32px -8px ${pub.badgeColor}33` } : {}),
                }}
              >
                <button
                  type="button"
                  onClick={(e) => toggle(i, e)}
                  aria-expanded={isOpen}
                  className="relative w-full text-left p-6 flex gap-5 items-start cursor-pointer"
                >
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 mt-0.5"
                    style={{ background: pub.badgeBg, color: pub.badgeColor }}
                  >
                    {pub.venue}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0F0E0C] leading-relaxed group-hover:text-[#4361EE] transition-colors">
                      {pub.title}
                    </p>
                  </div>
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-400 flex-shrink-0"
                    style={{
                      borderColor: pub.badgeColor,
                      color: isOpen ? "#fff" : pub.badgeColor,
                      background: isOpen ? pub.badgeColor : "transparent",
                      transform: isOpen ? "rotate(225deg) scale(1.08)" : "rotate(0deg) scale(1)",
                    }}
                  >
                    <ChevronDownIcon width={16} height={16} />
                  </span>
                </button>

                <RevealPanel open={isOpen} origin={origin}>
                  <div className="px-6 pb-6 pt-1 border-t ml-[0px]" style={{ borderColor: pub.badgeColor + "33" }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 mt-4" style={{ color: pub.badgeColor }}>
                      Abstract
                    </p>
                    <p className="text-sm text-[#5A5650] leading-relaxed mb-4">{pub.abstract}</p>
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: pub.badgeBg, color: pub.badgeColor }}
                    >
                      Read full paper ↗
                    </a>
                  </div>
                </RevealPanel>
              </div>
            );
          })}
        </div>

        {/* Google Scholar CTA */}
        <div className={`animate-item fade-up ${revealed ? "visible" : ""} mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#E8E4DC] bg-white`}>
          <div>
            <p className="text-sm font-semibold text-[#0F0E0C]">3 peer-reviewed publications · 21 total citations</p>
            <p className="text-xs text-[#9C958C] mt-0.5">IEEE ICCCNT, IEEE ICCPCT, IJACSA</p>
          </div>
          <a
            href="https://scholar.google.com/citations?user=43Hpn2cAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4361EE] text-white text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
              <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5 12 0z"/>
            </svg>
            View on Google Scholar
          </a>
        </div>
      </div>

      <style jsx>{`
        .animate-item {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up { transform: translateY(24px); }
        .slide-up { transform: translateY(32px); }
        .animate-item.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}