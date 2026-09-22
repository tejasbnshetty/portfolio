"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import IconBurst from "./IconBurst";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const EMAIL = "tejasbnshetty@gmail.com";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/tejasbnshetty",
    icon: (
      <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/tejasbnshetty",
    icon: (
      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=43Hpn2cAAAAJ&hl=en",
    icon: (
      <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5 12 0z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

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
      { threshold: 0.2 }
    );
    const el = ref.current;
    if (!el) return;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard blocked — the mailto fallback below still works */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <footer id="contact" ref={ref} className="relative w-full py-24 border-t border-white/15">
      <div className={`c-in ${revealed ? "in" : ""} max-w-4xl mx-auto px-7 text-center`}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5">
          The end of the page, not the story
        </p>
        <h2 className={`${syne.className} text-4xl sm:text-5xl font-black mb-4 text-white leading-tight`}>
          Let&apos;s build the{" "}
          <span className="grad-text">next part</span>.
        </h2>
        <p className="text-white/75 text-base mb-10 max-w-md mx-auto">
          I&apos;m in Canberra and <span className="text-white font-medium">available now</span> for
          full-time roles, freelance, and the odd hard problem.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={copyEmail}
            data-cursor={copied ? "copied" : "copy"}
            className="group relative inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white text-[#0F0E0C] font-medium text-sm hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: copied ? "var(--c3-text)" : "#FF6B35" }} />
            {copied ? "Copied to clipboard" : EMAIL}
            <IconBurst fire={copied} color="var(--c3-text)" />
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-all"
          >
            Open mail app →
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 mb-14">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/60 hover:-translate-y-0.5 transition-all"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p className="text-xs text-white/45">
          {`© ${new Date().getFullYear()} Tejas Shetty · Built with Next.js & Tailwind`}
        </p>
      </div>

      <style jsx>{`
        .c-in {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .c-in.in {
          opacity: 1;
          transform: translateY(0);
        }
        .grad-text {
          background: linear-gradient(135deg, #ff6b35 0%, #ef476f 50%, #4361ee 100%);
          background-size: 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 4s ease infinite;
        }
        @keyframes gradShift {
          0%, 100% { background-position: 0%; }
          50% { background-position: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .grad-text { animation: none; }
        }
      `}</style>
    </footer>
  );
}
