"use client";
import { useEffect, useRef } from "react";

// A gentle repeating S-curve running top to bottom of the viewport.
const WAVE_PATH =
  "M20,0 C34,30 6,60 20,90 C34,120 6,150 20,180 C34,210 6,240 20,270 " +
  "C34,300 6,330 20,360 C34,390 6,420 20,450 C34,480 6,510 20,540 " +
  "C34,570 6,600 20,630 C34,660 6,690 20,720 C34,750 6,780 20,800";

/**
 * A curving wave fixed to the left edge of the viewport that fills with
 * color as the page is scrolled — replaces the native scrollbar as the
 * primary scroll-progress indicator.
 */
export default function ScrollProgress() {
  const overlayRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const len = overlay.getTotalLength();
    overlay.style.strokeDasharray = `${len}`;
    overlay.style.strokeDashoffset = `${len}`;

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      if (overlay) {
        overlay.style.strokeDashoffset = `${len * (1 - progress)}`;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-16 bottom-0 w-9 z-[45] pointer-events-none hidden sm:block">
      <svg viewBox="0 0 40 800" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="scrollGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="30%" stopColor="#EF476F" />
            <stop offset="62%" stopColor="#4361EE" />
            <stop offset="100%" stopColor="#06D6A0" />
          </linearGradient>
        </defs>

        {/* faint background track */}
        <path
          d={WAVE_PATH}
          fill="none"
          stroke="#0F0E0C"
          strokeOpacity={0.12}
          strokeWidth={5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* colored fill, revealed via dash-offset as you scroll */}
        <path
          ref={overlayRef}
          d={WAVE_PATH}
          fill="none"
          stroke="url(#scrollGrad)"
          strokeWidth={6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}