"use client";
import { ComponentType, SVGProps, useEffect, useRef, useState } from "react";
import {
  SparkleIcon,
  CodeIcon,
  TerminalIcon,
  RocketIcon,
  BriefcaseIcon,
  GitBranchIcon,
  FlaskIcon,
  BookIcon,
  LayersIcon,
  BrainIcon,
} from "./icons/Icons";

/**
 * Per-section icon "themes" picked up from the nearest ancestor
 * carrying a `data-cursor-theme` attribute. Add that attribute to any
 * <section> to control which icons orbit the cursor while inside it.
 */
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const THEMES: Record<string, { icons: IconType[]; color: string }> = {
  hero: { icons: [SparkleIcon, TerminalIcon, RocketIcon], color: "#FF6B35" },
  work: { icons: [CodeIcon, RocketIcon, TerminalIcon], color: "#FF6B35" },
  experience: { icons: [BriefcaseIcon, GitBranchIcon, CodeIcon], color: "#4361EE" },
  research: { icons: [FlaskIcon, BookIcon, SparkleIcon], color: "#7B2FBE" },
  skills: { icons: [LayersIcon, BrainIcon, SparkleIcon], color: "#06D6A0" },
  default: { icons: [SparkleIcon], color: "#0F0E0C" },
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
    let t = 0;
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }

      const el = document.elementFromPoint(mx, my);
      const themedEl = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      const next = themedEl?.dataset.cursorTheme || "default";
      setTheme((prev) => (prev === next ? prev : next));

      const interactive = el?.closest("button, a, [role='button']");
      setPointerType(interactive ? "link" : "default");
    }

    function loop() {
      // ring lags the dot
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      // orbit icons drift around the dot at staggered radii/speeds
      t += 0.025;
      orbitRefs.current.forEach((el, i) => {
        if (!el) return;
        const radius = 26 + i * 10;
        const speed = 1 + i * 0.4;
        const angle = t * speed + (i * (Math.PI * 2)) / 3;
        const ox = mx + Math.cos(angle) * radius;
        const oy = my + Math.sin(angle) * radius;
        el.style.transform = `translate(${ox}px, ${oy}px)`;
      });
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  const activeTheme = THEMES[theme] || THEMES.default;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          width: pointerType === "link" ? 46 : 32,
          height: pointerType === "link" ? 46 : 32,
          borderColor: activeTheme.color,
          opacity: 0.5,
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: pointerType === "link" ? 6 : 8,
          height: pointerType === "link" ? 6 : 8,
          background: activeTheme.color,
        }}
      />
      {activeTheme.icons.map((Icon, i) => (
        <span
          key={theme + i}
          ref={(el) => { orbitRefs.current[i] = el; }}
          className="orbit-icon fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          style={{ color: activeTheme.color, opacity: 0.55 }}
        >
          <Icon width={13} height={13} strokeWidth={1.8} />
        </span>
      ))}
      <style jsx>{`
        .cursor-ring {
          transition: width 0.25s ease, height 0.25s ease, border-color 0.3s ease;
        }
        .cursor-dot {
          transition: width 0.2s ease, height 0.2s ease, background 0.3s ease;
        }
        .orbit-icon {
          transition: color 0.3s ease;
        }
      `}</style>
    </div>
  );
}
