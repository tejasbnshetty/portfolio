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
    let t = 0;
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: mx, y: my }));
    let raf = 0;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }

      const el = document.elementFromPoint(mx, my);
      const themedEl = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      const next = themedEl?.dataset.cursorTheme || "default";
      setTheme((prev) => (prev === next ? prev : next));

      const interactive = el?.closest("button, a, [role='button']");
      setPointerType(interactive ? "link" : "default");
    }

    let stretch = 0;
    let stretchAngle = 0;

    function loop() {
      // ring lags the dot
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      // how far behind the dot the ring currently is, and in which
      // direction — used to squash/stretch the ring like it's being
      // pulled along, snapping back to a circle once it catches up
      const dx = mx - rx;
      const dy = my - ry;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const targetStretch = Math.min(dist / 26, 0.5);
      const targetAngle = dist > 1.5 ? Math.atan2(dy, dx) * (180 / Math.PI) : stretchAngle;
      stretch += (targetStretch - stretch) * 0.3;
      stretchAngle += (targetAngle - stretchAngle) * 0.3;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${rx}px, ${ry}px) translate(-50%, -50%) ` +
          `rotate(${stretchAngle}deg) scale(${1 + stretch}, ${1 - stretch * 0.45})`;
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
        el.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
      });

      // comet trail — each dot chases the one before it
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
      {/* comet trail, faintest furthest back */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <span
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="trail-dot fixed top-0 left-0 rounded-full"
          style={{
            width: 6 - i * 0.8,
            height: 6 - i * 0.8,
            background: activeTheme.color,
            opacity: 0.32 - i * 0.055,
            filter: `blur(${1 + i * 0.6}px)`,
          }}
        />
      ))}

      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 rounded-full border"
        style={{
          width: pointerType === "link" ? 46 : 32,
          height: pointerType === "link" ? 46 : 32,
          borderColor: activeTheme.color,
          opacity: 0.5,
        }}
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 rounded-full"
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
          className="orbit-icon fixed top-0 left-0"
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
        .trail-dot {
          transition: background 0.3s ease;
        }
        .orbit-icon {
          transition: color 0.3s ease;
        }
      `}</style>
    </div>
  );
}