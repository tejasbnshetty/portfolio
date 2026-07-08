"use client";
import { ComponentType, SVGProps, useEffect, useRef, useState } from "react";
import {
  SparkleIcon,
  CodeIcon,
  RocketIcon,
  TerminalIcon,
  BriefcaseIcon,
  GitBranchIcon,
  FlaskIcon,
  BookIcon,
  LayersIcon,
  BrainIcon,
} from "./icons/Icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const THEMES: Record<string, { icons: IconType[]; color: string }> = {
  hero:       { icons: [SparkleIcon, TerminalIcon, RocketIcon], color: "#FF6B35" },
  work:       { icons: [CodeIcon, RocketIcon, TerminalIcon],    color: "#FF6B35" },
  experience: { icons: [BriefcaseIcon, GitBranchIcon, CodeIcon], color: "#4361EE" },
  education:  { icons: [BookIcon, SparkleIcon, CodeIcon],        color: "#4361EE" },
  skills:     { icons: [LayersIcon, BrainIcon, SparkleIcon],     color: "#7B2FBE" },
  research:   { icons: [FlaskIcon, BookIcon, SparkleIcon],       color: "#7B2FBE" },
  default:    { icons: [SparkleIcon, CodeIcon, RocketIcon],      color: "#0F0E0C" },
};

const TRAIL_COUNT = 5;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState("default");
  const [pointerType, setPointerType] = useState<"default" | "link">("default");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    document.body.classList.add("custom-cursor-active");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let stretch = 0;
    let stretchAngle = 0;
    let t = 0;
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: mx, y: my }));
    let raf = 0;

    function getColor(el: Element | null): string {
      // Nav and footer stay dark
      if (el?.closest("nav, footer")) return "#0F0E0C";
      // Everything else: section theme
      const themedEl = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      return THEMES[themedEl?.dataset.cursorTheme || "default"]?.color || "#0F0E0C";
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }

      const el = document.elementFromPoint(mx, my);
      const themedEl = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      const next = el?.closest("nav, footer") ? "default" : (themedEl?.dataset.cursorTheme || "default");
      setTheme((prev) => (prev === next ? prev : next));
      const interactive = el?.closest("button, a, [role='button']");
      setPointerType(interactive ? "link" : "default");
    }

    // Also update theme on scroll
    function onScroll() {
      const el = document.elementFromPoint(mx, my);
      const themedEl = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      const next = el?.closest("nav, footer") ? "default" : (themedEl?.dataset.cursorTheme || "default");
      setTheme((prev) => (prev === next ? prev : next));
    }

    function loop() {
      // ring lags the dot
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;

      // squash-and-stretch
      const dx = mx - rx;
      const dy = my - ry;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const targetStretch = Math.min(dist / 14, 1.1);
      const targetAngle = dist > 1.5 ? Math.atan2(dy, dx) * (180 / Math.PI) : stretchAngle;
      stretch += (targetStretch - stretch) * 0.45;
      stretchAngle += (targetAngle - stretchAngle) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${rx}px, ${ry}px) translate(-50%, -50%) ` +
          `rotate(${stretchAngle}deg) scale(${1 + stretch}, ${1 - stretch * 0.55})`;
      }

      // orbit icons
      t += 0.025;
      orbitRefs.current.forEach((el, i) => {
        if (!el) return;
        const radius = 26 + i * 10;
        const speed = 1 + i * 0.4;
        const angle = t * speed + (i * (Math.PI * 2)) / 3;
        const ox = mx + Math.cos(angle) * radius;
        const oy = my + Math.sin(angle) * radius;
        el.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
      });

      // comet trail
      trail[0].x += (mx - trail[0].x) * 0.4;
      trail[0].y += (my - trail[0].y) * 0.4;
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.4;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.4;
      }
      trail.forEach((p, i) => {
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
      });

      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  const activeTheme = THEMES[theme] || THEMES.default;
  const color = activeTheme.color;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      {/* Comet trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <span
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="trail-dot fixed top-0 left-0 rounded-full"
          style={{
            width: 6 - i * 0.8,
            height: 6 - i * 0.8,
            background: color,
            opacity: 0.32 - i * 0.055,
            filter: `blur(${1 + i * 0.6}px)`,
          }}
        />
      ))}

      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 rounded-full border"
        style={{
          width: pointerType === "link" ? 46 : 32,
          height: pointerType === "link" ? 46 : 32,
          borderColor: color,
          opacity: 0.5,
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 rounded-full"
        style={{
          width: pointerType === "link" ? 6 : 8,
          height: pointerType === "link" ? 6 : 8,
          background: color,
        }}
      />

      {/* Orbiting icons — change per section */}
      {activeTheme.icons.map((Icon, i) => (
        <span
          key={theme + i}
          ref={(el) => { orbitRefs.current[i] = el; }}
          className="orbit-icon fixed top-0 left-0"
          style={{ color, opacity: 0.55 }}
        >
          <Icon width={13} height={13} strokeWidth={1.8} />
        </span>
      ))}

      <style jsx>{`
        .cursor-ring {
          transition: width 0.25s ease, height 0.25s ease, border-color 0.4s ease;
        }
        .cursor-dot {
          transition: width 0.2s ease, height 0.2s ease, background 0.4s ease;
        }
        .trail-dot, .orbit-icon {
          transition: background 0.4s ease, color 0.4s ease;
        }
      `}</style>
    </div>
  );
}