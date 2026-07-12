"use client";
import { useState, useEffect } from "react";
import { Syne } from "next/font/google";
import Lightbox from "./Lightbox";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

type Screen = { src: string; alt: string };

export type ProjectData = {
  name: string;
  role: string;
  desc: string;
  tags: string[];
  link: string | null;
  github: string | null;
  accent: string;
  accentBg: string;
  badge: string | null;
  badgeClass: string;
  highlights: string[];
  screens: Screen[];
  portrait: boolean;
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const p = project;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl modal-in">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[#5A5650] hover:bg-[#F5F4F0] transition-colors"
        >
          ✕
        </button>

        {/* Screenshots */}
        {p.screens.length > 0 && (
          <div className={`${p.portrait ? "flex gap-3 overflow-x-auto snap-x p-4 pb-2" : "grid grid-cols-1"}`}>
            {p.portrait ? (
              p.screens.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setLightbox({ index: i })}
                  className="flex-shrink-0 w-32 snap-start rounded-xl overflow-hidden cursor-zoom-in hover:scale-105 transition-transform"
                >
                  <img src={s.src} alt={s.alt} className="w-full h-auto block" loading="lazy" />
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={() => setLightbox({ index: 0 })}
                className="cursor-zoom-in overflow-hidden rounded-t-3xl"
              >
                <img
                  src={p.screens[0].src}
                  alt={p.screens[0].alt}
                  className="w-full h-auto block hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </button>
            )}
          </div>
        )}

        {/* Landscape additional screenshots strip */}
        {!p.portrait && p.screens.length > 1 && (
          <div className="flex gap-3 overflow-x-auto px-6 pb-2 pt-3 snap-x">
            {p.screens.slice(1).map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setLightbox({ index: i + 1 })}
                className="flex-shrink-0 w-40 snap-start rounded-xl overflow-hidden cursor-zoom-in hover:scale-105 transition-transform"
              >
                <img src={s.src} alt={s.alt} className="w-full h-auto block" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-6 pt-4">
          {p.badge && (
            <span className={"text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block " + p.badgeClass}>
              {p.badge}
            </span>
          )}
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.accent }}>
            {p.role}
          </p>
          <h2 className={`${syne.className} text-2xl font-bold text-[#0F0E0C] mb-3`}>{p.name}</h2>
          <p className="text-sm text-[#5A5650] leading-relaxed mb-5">{p.desc}</p>

          {/* Highlights */}
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.accent }}>
            Highlights
          </p>
          <ul className="flex flex-col gap-2 mb-5">
            {p.highlights.map((h) => (
              <li key={h} className="text-sm text-[#5A5650] leading-relaxed flex gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                {h}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {p.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[#F5F4F0] text-[#5A5650]">
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ background: p.accent }}
              >
                Visit live site ↗
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E8E4DC] text-sm font-medium text-[#5A5650] hover:border-[#0F0E0C] hover:text-[#0F0E0C] transition-all"
              >
                <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={p.screens}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <style jsx>{`
        .modal-in {
          animation: modalIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}