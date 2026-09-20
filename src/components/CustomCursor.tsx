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
  CpuIcon,
} from "./icons/Icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// `accent` stays vivid — used for the ring/dot/trail/orbit icons (decorative, no
// text-contrast requirement). `labelBg` is a darkened sibling used only behind the
// white contextual-label text, since several accents (orange/pink/green) fail 4.5:1
// contrast with white text at full saturation.
const THEMES: Record<string, { icons: IconType[]; accent: string; labelBg: string }> = {
  hero:       { icons: [SparkleIcon, TerminalIcon, RocketIcon], accent: "#FF6B35", labelBg: "#C2410C" },
  snapshot:   { icons: [SparkleIcon, LayersIcon, CodeIcon],     accent: "#EF476F", labelBg: "#BE123C" },
  work:       { icons: [CodeIcon, RocketIcon, TerminalIcon],    accent: "#FF6B35", labelBg: "#C2410C" },
  impact:     { icons: [RocketIcon, SparkleIcon, CpuIcon],      accent: "#059669", labelBg: "#047857" },
  experience: { icons: [BriefcaseIcon, GitBranchIcon, CodeIcon], accent: "#4361EE", labelBg: "#4361EE" },
  skills:     { icons: [LayersIcon, BrainIcon, SparkleIcon],     accent: "#7B2FBE", labelBg: "#7B2FBE" },
  research:   { icons: [FlaskIcon, BookIcon, SparkleIcon],       accent: "#EF476F", labelBg: "#BE123C" },
  default:    { icons: [SparkleIcon, CodeIcon, RocketIcon],      accent: "#0F0E0C", labelBg: "#0F0E0C" },
};

// Contextual cursor labels, keyed by the `data-cursor` attribute a target opts in with.
const CURSOR_LABELS: Record<string, string> = {
  explore: "EXPLORE ↗",
  copy: "COPY",
  copied: "COPIED ✓",
  external: "OPEN ↗",
  drag: "DRAG →",
  read: "READ",
};

const TRAIL_COUNT = 5;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [theme, setTheme] = useState("default");
  const [pointerType, setPointerType] = useState<"default" | "link">("default");
  const [mode, setMode] = useState<string | null>(null);
  const [customLabel, setCustomLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    // Capability check can only run client-side; setting it here avoids an
    // SSR/hydration mismatch that a lazy initial state would cause.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(fine);
    if (!fine) return;

    // The rAF loop below drives everything through raw style.transform writes,
    // not CSS transitions/animations — the global prefers-reduced-motion kill
    // switch in globals.css can't reach it, so it needs its own check.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);

    document.body.classList.add("custom-cursor-active");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let lx = mx;
    let ly = my;
    let stretch = 0;
    let stretchAngle = 0;
    let t = 0;
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: mx, y: my }));
    let raf = 0;

    function resolveContext(el: Element | null) {
      const inChrome = !!el?.closest("nav, footer");
      const themedEl = el?.closest("[data-cursor-theme]") as HTMLElement | null;
      const nextTheme = inChrome ? "default" : themedEl?.dataset.cursorTheme || "default";

      const taggedEl = el?.closest("[data-cursor]") as HTMLElement | null;
      let nextMode = taggedEl?.dataset.cursor || null;
      const nextCustom = taggedEl?.dataset.cursorLabel || null;

      if (!nextMode) {
        const extLink = el?.closest(
          'a[target="_blank"], a[href^="http"]'
        ) as HTMLElement | null;
        if (extLink && !inChrome) nextMode = "external";
      }

      const interactive =
        !!nextMode || !!el?.closest("button, a, [role='button']");

      return { nextTheme, nextMode, nextCustom, interactive };
    }

    function apply(el: Element | null) {
      const { nextTheme, nextMode, nextCustom, interactive } = resolveContext(el);
      setTheme((p) => (p === nextTheme ? p : nextTheme));
      setMode((p) => (p === nextMode ? p : nextMode));
      setCustomLabel((p) => (p === nextCustom ? p : nextCustom));
      setPointerType((p) => {
        const next = interactive ? "link" : "default";
        return p === next ? p : next;
      });
    }

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      apply(document.elementFromPoint(mx, my));
    }

    function onScroll() {
      apply(document.elementFromPoint(mx, my));
    }

    function loop() {
      if (reduced) {
        // No lag, no squash-and-stretch, no orbit/trail motion — just track the pointer.
        rx = mx;
        ry = my;
        lx = mx;
        ly = my;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        }
        if (labelRef.current) {
          labelRef.current.style.transform = `translate(${lx + 18}px, ${ly + 18}px)`;
        }
        raf = requestAnimationFrame(loop);
        return;
      }

      // ring lags the dot
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      // label lags a touch less than the ring
      lx += (mx - lx) * 0.16;
      ly += (my - ly) * 0.16;

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

      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${lx + 18}px, ${ly + 18}px)`;
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
  const accent = activeTheme.accent;
  const labelText = mode ? customLabel || CURSOR_LABELS[mode] || null : null;
  const expanded = pointerType === "link" || !!mode;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      {/* Comet trail — decorative kinetic flourish, dropped under reduced motion */}
      {!reducedMotion &&
        Array.from({ length: TRAIL_COUNT }).map((_, i) => (
          <span
            key={i}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="trail-dot fixed top-0 left-0 rounded-full"
            style={{
              width: 6 - i * 0.8,
              height: 6 - i * 0.8,
              background: accent,
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
          width: expanded ? 46 : 32,
          height: expanded ? 46 : 32,
          borderColor: accent,
          opacity: 0.5,
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 rounded-full"
        style={{
          width: expanded ? 6 : 8,
          height: expanded ? 6 : 8,
          background: accent,
        }}
      />

      {/* Contextual label */}
      <div
        ref={labelRef}
        className="cursor-label fixed top-0 left-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
        style={{
          background: activeTheme.labelBg,
          color: "#fff",
          opacity: labelText ? 1 : 0,
          transform: "translate(18px, 18px)",
        }}
      >
        {labelText}
      </div>

      {/* Orbiting icons — change per section, dropped under reduced motion */}
      {!reducedMotion &&
        activeTheme.icons.map((Icon, i) => (
          <span
            key={theme + i}
            ref={(el) => { orbitRefs.current[i] = el; }}
            className="orbit-icon fixed top-0 left-0"
            style={{ color: accent, opacity: labelText ? 0 : 0.55 }}
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
        .cursor-label {
          transition: opacity 0.2s ease, background 0.4s ease;
        }
        .trail-dot, .orbit-icon {
          transition: background 0.4s ease, color 0.4s ease, opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}
