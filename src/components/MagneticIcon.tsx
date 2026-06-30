"use client";
import { ComponentType, SVGProps, useRef, useState } from "react";

/**
 * Wrap an icon in this and place it inside a `relative` hover target
 * (e.g. a card with onMouseMove forwarded, or simply nest this directly —
 * it listens on its own bounding box). On hover, the icon drifts a few
 * pixels toward the cursor, then eases back to center on mouse leave.
 */
export default function MagneticIcon({
  Icon,
  size = 18,
  range = 10,
  className = "",
  style = {},
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: number;
  range?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width * 6)) * range;
    const dy = ((e.clientY - cy) / (rect.height * 6)) * range;
    setOffset({ x: dx, y: dy });
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={`magnetic-icon inline-flex ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        ...style,
      }}
    >
      <Icon width={size} height={size} strokeWidth={1.8} />
      <style jsx>{`
        .magnetic-icon {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </span>
  );
}
