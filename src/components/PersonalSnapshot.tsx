"use client";
import { useEffect, useRef, useState } from "react";
import { Syne } from "next/font/google";
import MagneticIcon from "./MagneticIcon";
import {
  BookIcon,
  BrainIcon,
  BriefcaseIcon,
  FlaskIcon,
  RocketIcon,
} from "./icons/Icons";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

/**
 * A compact "who I am at a glance" band that sits between the hero and the
 * work. Deliberately NOT built from the same white expandable cards the rest
 * of the page uses: it's an asymmetric bento grid on a tinted strip, so the
 * eye gets a change of rhythm straight after the hero.
 */
export default function PersonalSnapshot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

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
    <section
      id="snapshot"
      ref={sectionRef}
      data-cursor-theme="snapshot"
      className="relative w-full py-16"
    >
      {/* Tinted full-bleed strip */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF2ED]/70 via-[#FEE8EF]/50 to-[#EEF1FF]/60 border-y border-white/40" />

      <div className="relative z-10 max-w-4xl mx-auto px-7">
        <p
          className={`snap-item ${revealed ? "in" : ""} text-xs font-bold uppercase tracking-widest text-[#EF476F] mb-6`}
        >
          The short version
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[minmax(96px,auto)]">
          {/* Education — wide */}
          <Tile
            revealed={revealed}
            delay={0}
            className="col-span-2"
            label="Studying"
            icon={BookIcon}
            accent="#4361EE"
            magnetic
          >
            <p className={`${syne.className} text-lg sm:text-xl font-bold text-[#0F0E0C] leading-tight`}>
              Master of Computing
            </p>
            <p className="text-xs text-[#5A5650] mt-1">
              ANU · specialising in AI · Distinction average
            </p>
          </Tile>

          {/* Location */}
          <Tile revealed={revealed} delay={0.03} label="Based in" accent="var(--c1-text)">
            <p className={`${syne.className} text-lg font-bold text-[#0F0E0C] leading-tight`}>
              Canberra
            </p>
            <p className="text-xs text-[#5A5650] mt-1">Australia</p>
          </Tile>

          {/* Availability — the live tile */}
          <Tile revealed={revealed} delay={0.06} label="Status" accent="var(--c3-text)">
            <p className={`${syne.className} text-lg font-bold text-[#0F0E0C] leading-tight flex items-center gap-2`}>
              <span className="live-dot" />
              Available
            </p>
            <p className="text-xs text-[#5A5650] mt-1">Full-time &amp; freelance</p>
          </Tile>

          {/* Projects */}
          <Tile
            revealed={revealed}
            delay={0.09}
            href="#work"
            cursor="explore"
            label="Selected work"
            icon={RocketIcon}
            accent="var(--c1-text)"
          >
            <p className={`${syne.className} text-3xl font-black text-[#0F0E0C] leading-none`}>03</p>
            <p className="text-xs text-[#5A5650] mt-1.5">projects, shipped end&#8209;to&#8209;end</p>
          </Tile>

          {/* Research */}
          <Tile
            revealed={revealed}
            delay={0.12}
            href="#research"
            cursor="explore"
            label="Research"
            icon={FlaskIcon}
            accent="#7B2FBE"
          >
            <p className={`${syne.className} text-3xl font-black text-[#0F0E0C] leading-none`}>03</p>
            <p className="text-xs text-[#5A5650] mt-1.5">papers · 21 citations</p>
          </Tile>

          {/* Focus */}
          <Tile revealed={revealed} delay={0.15} label="Focus" icon={BrainIcon} accent="var(--c5-text)">
            <p className={`${syne.className} text-lg font-bold text-[#0F0E0C] leading-tight`}>
              Backend + AI
            </p>
            <p className="text-xs text-[#5A5650] mt-1">systems &amp; integrations</p>
          </Tile>

          {/* Experience */}
          <Tile
            revealed={revealed}
            delay={0.15}
            href="#journey"
            cursor="explore"
            label="Experience"
            icon={BriefcaseIcon}
            accent="#4361EE"
          >
            <p className={`${syne.className} text-lg font-bold text-[#0F0E0C] leading-tight`}>
              Since 2022
            </p>
            <p className="text-xs text-[#5A5650] mt-1">4 engineering teams</p>
          </Tile>

          {/* Personality line — wide */}
          <Tile revealed={revealed} delay={0.15} className="col-span-2 md:col-span-4" plain>
            <p className="text-sm sm:text-base text-[#5A5650] leading-relaxed">
              I pick up new tools fast, whether it&apos;s a new framework or a{" "}
              <span className="text-[#0F0E0C] font-medium">production bug at 2am</span>.
            </p>
          </Tile>
        </div>
      </div>

      <style jsx>{`
        .snap-item {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .snap-item.in {
          opacity: 1;
          transform: translateY(0);
        }
        .live-dot {
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          background: #06d6a0;
          box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.5);
          animation: livePulse 2.4s ease-out infinite;
        }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(6, 214, 160, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(6, 214, 160, 0); }
          100% { box-shadow: 0 0 0 0 rgba(6, 214, 160, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .live-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}

function Tile({
  children,
  revealed,
  delay,
  label,
  icon: Icon,
  accent = "#0F0E0C",
  href,
  cursor,
  className = "",
  plain = false,
  magnetic = false,
}: {
  children: React.ReactNode;
  revealed: boolean;
  delay: number;
  label?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accent?: string;
  href?: string;
  cursor?: string;
  className?: string;
  plain?: boolean;
  magnetic?: boolean;
}) {
  const inner = (
    <>
      {(label || Icon) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: accent }}
            >
              {label}
            </span>
          )}
          {Icon && magnetic && (
            <MagneticIcon Icon={Icon} size={14} range={6} style={{ color: accent }} />
          )}
          {Icon && !magnetic && (
            <Icon width={14} height={14} strokeWidth={1.8} style={{ color: accent }} />
          )}
        </div>
      )}
      {children}
    </>
  );

  const base = `tile ${revealed ? "in" : ""} ${plain ? "tile-plain" : "tile-card"} ${className}`;
  const style = { transitionDelay: `${delay}s` } as React.CSSProperties;

  if (href) {
    return (
      <a href={href} data-cursor={cursor} className={`${base} tile-link`} style={style}>
        {inner}
        <style jsx>{tileCss}</style>
      </a>
    );
  }

  return (
    <div className={base} style={style}>
      {inner}
      <style jsx>{tileCss}</style>
    </div>
  );
}

const tileCss = `
  .tile {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease, border-color 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 16px 18px;
    border-radius: 16px;
  }
  .tile.in { opacity: 1; transform: translateY(0); }
  .tile-card {
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(6px);
  }
  .tile-plain {
    background: transparent;
    padding: 8px 2px;
  }
  .tile-link { cursor: pointer; }
  .tile-link:hover {
    box-shadow: 0 12px 28px -12px rgba(15, 14, 12, 0.25);
    border-color: rgba(255, 255, 255, 1);
    transform: translateY(-3px);
  }
`;
