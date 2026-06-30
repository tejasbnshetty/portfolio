"use client";
import { useEffect, useState } from "react";

type Puff = { id: number; x: number; y: number; color: string };

let nextId = 0;
const WAVES = [0, 0.15, 0.3];

// Mirrors the per-section accent colors used elsewhere (CustomCursor, card accents)
const THEME_COLORS: Record<string, string> = {
  hero: "#FF6B35",
  work: "#FF6B35",
  experience: "#4361EE",
  research: "#7B2FBE",
  skills: "#06D6A0",
  default: "#0F0E0C",
};

/**
 * Mount once near the root, behind page content (low z-index so cards
 * sit on top of it). Listens for clicks anywhere on the page and spawns
 * a soft drifting glow plus a few faint expanding water-ripple rings,
 * colored to match whichever section was clicked.
 *
 * Anything can also trigger one manually by dispatching:
 *   window.dispatchEvent(new CustomEvent("site:burst", { detail: { x, y, color } }))
 */
export default function PageBurst() {
  const [puffs, setPuffs] = useState<Puff[]>([]);

  useEffect(() => {
    function spawn(x: number, y: number, color: string) {
      const id = nextId++;
      setPuffs((p) => [...p, { id, x, y, color }]);
      window.setTimeout(() => {
        setPuffs((p) => p.filter((puff) => puff.id !== id));
      }, 2000);
    }

    function onBurst(e: Event) {
      const { x, y, color } = (e as CustomEvent).detail as { x: number; y: number; color: string };
      spawn(x, y, color);
    }

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const themedEl = target?.closest("[data-cursor-theme]") as HTMLElement | null;
      const theme = themedEl?.dataset.cursorTheme || "default";
      spawn(e.clientX, e.clientY, THEME_COLORS[theme] || THEME_COLORS.default);
    }

    window.addEventListener("site:burst", onBurst);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("site:burst", onBurst);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {puffs.map((p) => (
        <span
          key={p.id}
          className="drift-puff absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            background: `radial-gradient(circle, ${p.color}26 0%, ${p.color}00 72%)`,
          }}
        />
      ))}
      {puffs.map((p) =>
        WAVES.map((delay, i) => (
          <span
            key={`${p.id}-wave-${i}`}
            className="ripple-wave absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              borderColor: p.color,
              animationDelay: `${delay}s`,
            }}
          />
        ))
      )}
      <style jsx>{`
        .drift-puff {
          width: 220px;
          height: 220px;
          filter: blur(18px);
          transform: translate(-50%, -50%) scale(0.4);
          opacity: 0;
          animation: drift 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes drift {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
          15% { opacity: 0.8; }
          100% { transform: translate(-50%, calc(-50% - 90px)) scale(1.3); opacity: 0; }
        }
        .ripple-wave {
          width: 20px;
          height: 20px;
          border-width: 1px;
          border-style: solid;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          animation: rippleOut 1.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        @keyframes rippleOut {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.22; }
          100% { transform: translate(-50%, -50%) scale(16); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .drift-puff, .ripple-wave { animation: none; display: none; }
        }
      `}</style>
    </div>
  );
}
