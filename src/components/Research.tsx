"use client";
import { useEffect, useRef } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const publications = [
  {
    venue: "IEEE ICCCNT 2023",
    title: "Android Application for Food Label Recognition to Ensure Safe Food Consumption Leveraging OCR",
    link: "https://doi.org/10.1109/ICCCNT56998.2023.10307054",
    badgeColor: "#4361EE",
    badgeBg: "#EEF1FF",
  },
  {
    venue: "IEEE ICCPCT 2023",
    title: "Customer Feedback Analysis Based on Emotion Detection Using Machine Learning Techniques with Privacy Preservation",
    link: "https://doi.org/10.1109/ICCPCT58313.2023.10244876",
    badgeColor: "#059669",
    badgeBg: "#E8F8F2",
  },
  {
    venue: "IJACSA Vol. 14, 2023",
    title: "Deep Learning Driven Web Security: Detecting and Preventing Explicit Content",
    link: "https://thesai.org/Downloads/Volume14No10/Paper_40-Deep_Learning_Driven_Web_Security.pdf",
    badgeColor: "#7B2FBE",
    badgeBg: "#F3EAFF",
  },
];

export default function Research() {
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
    <section id="research" ref={sectionRef} className="py-20 w-full">
      <div className="max-w-4xl mx-auto px-7">
        {/* Section header */}
        <div className="animate-item fade-up flex items-center gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#F3EAFF] text-[#7B2FBE]">
            Academic work
          </span>
          <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
            Research
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {publications.map((pub, i) => (
            <a
              key={pub.venue}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-item slide-up bg-white border border-[#E8E4DC] rounded-2xl p-6 flex gap-5 items-start hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
              style={{ transitionDelay: i * 0.1 + "s" }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 mt-0.5"
                style={{ background: pub.badgeBg, color: pub.badgeColor }}
              >
                {pub.venue}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#0F0E0C] leading-relaxed mb-2 group-hover:text-[#4361EE] transition-colors">
                  {pub.title}
                </p>
              </div>
              <span className="text-[#9C958C] group-hover:text-[#4361EE] transition-colors text-lg flex-shrink-0">
                ↗
              </span>
            </a>
          ))}
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