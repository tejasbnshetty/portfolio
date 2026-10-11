"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["800"] });

// `accent` is a text-safe shade (white text clears 4.5:1 on it) used for the sliding highlight.
const links: { label: string; id: string; accent: string }[] = [
  { label: "Journey", id: "journey", accent: "#4338CA" },
  { label: "Work", id: "work", accent: "#C2410C" },
  { label: "Stack", id: "skills", accent: "#047857" },
  { label: "Research", id: "research", accent: "#BE123C" },
  { label: "Contact", id: "contact", accent: "#7B2FBE" },
];

/**
 * Floating dock pinned to the bottom centre. A sliding highlight follows whichever section
 * the reader is in; "TS" is home. Replaces the old full-width top bar.
 */
export default function Navbar() {
  // -1 = home (above the first linked section), otherwise an index into `links`.
  const [active, setActive] = useState(-1);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    function compute() {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = -1;
      links.forEach((l, i) => {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(compute);
    }
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Measure the active item so the highlight can slide to it (index 0 is the home item).
  useEffect(() => {
    function measure() {
      const el = itemRefs.current[active + 1];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const accent = active >= 0 ? links[active].accent : "rgba(255,255,255,0.16)";

  return (
    <nav
      aria-label="Sections"
      className="fixed left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-1.5rem)]"
      style={{ bottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
    >
      <div className="relative flex items-center sm:gap-0.5 p-1 rounded-full bg-[#0F0E0C]/50 backdrop-blur-2xl backdrop-saturate-[1.8] ring-1 ring-white/30 shadow-[0_14px_36px_-14px_rgba(15,14,12,0.5),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.1)]">
        {/* Glass sheen: a soft highlight across the top edge */}
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" />
        {/* Sliding highlight */}
        {pill && (
          <span
            aria-hidden
            className="absolute top-1 bottom-1 rounded-full transition-[left,width,background-color] duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]"
            style={{ left: pill.left, width: pill.width, background: accent }}
          />
        )}

        <a
          ref={(el) => {
            itemRefs.current[0] = el;
          }}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Back to top"
          aria-current={active === -1 ? "true" : undefined}
          className={`${syne.className} relative z-10 px-2.5 max-[380px]:px-1.5 sm:px-3.5 py-2 text-[12px] max-[380px]:text-[11px] sm:text-[13px] font-black rounded-full text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]`}
        >
          TS
        </a>

        {links.map((link, i) => (
          <a
            key={link.id}
            ref={(el) => {
              itemRefs.current[i + 1] = el;
            }}
            href={`#${link.id}`}
            aria-current={active === i ? "true" : undefined}
            className={`relative z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)] px-2 max-[380px]:px-1.5 sm:px-3.5 py-2 text-[12px] max-[380px]:text-[11px] sm:text-sm font-medium rounded-full transition-colors duration-200 ${
              active === i ? "text-white" : "text-white/85 hover:text-white"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
