"use client";
import { ComponentType, SVGProps } from "react";
import { SparkleIcon } from "./icons/Icons";

const ANGLES = [-60, -20, 20, 60];

export default function IconBurst({
  fire,
  color,
  Icon = SparkleIcon,
}: {
  fire: boolean;
  color: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  if (!fire) return null;
  return (
    <span className="absolute inset-0 pointer-events-none">
      {ANGLES.map((deg, i) => (
        <span
          key={`${fire}-${i}`}
          className="burst-piece absolute top-1/2 left-1/2"
          style={{ ["--deg" as string]: `${deg}deg`, color, animationDelay: `${i * 0.03}s` }}
        >
          <Icon width={10} height={10} strokeWidth={2} />
        </span>
      ))}
      <style jsx>{`
        .burst-piece {
          opacity: 0;
          transform: translate(-50%, -50%) rotate(var(--deg)) translateY(0);
          animation: burstOut 0.55s ease-out forwards;
        }
        @keyframes burstOut {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--deg)) translateY(0) scale(0.6); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--deg)) translateY(-26px) scale(1.1); }
        }
      `}</style>
    </span>
  );
}