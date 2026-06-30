"use client";
import { ComponentType, SVGProps } from "react";

export type FloatingIconSpec = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  top: string;
  left: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotateAmt?: number;
};

/**
 * A layer of slowly drifting, low-opacity icons placed behind a section's
 * content. Pointer-events are disabled so it never blocks interaction.
 */
export default function FloatingIcons({ icons }: { icons: FloatingIconSpec[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {icons.map((spec, i) => {
        const { Icon, top, left, size, color, delay, duration, rotateAmt = 10 } = spec;
        return (
          <span
            key={i}
            className="floating-icon absolute"
            style={{
              top,
              left,
              color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--rot" as string]: `${rotateAmt}deg`,
            }}
          >
            <Icon width={size} height={size} strokeWidth={1.5} />
          </span>
        );
      })}
      <style jsx>{`
        .floating-icon {
          opacity: 0.16;
          animation-name: drift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(var(--rot)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-icon { animation: none; }
        }
      `}</style>
    </div>
  );
}
