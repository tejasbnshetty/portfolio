"use client";

const blobSpecs = [
  { top: "-4%", left: "82%", size: 480, color: "#FF6B35", delay: 0, duration: 9 },
  { top: "9%", left: "-8%", size: 320, color: "#4361EE", delay: 2, duration: 10 },
  { top: "20%", left: "55%", size: 220, color: "#06D6A0", delay: 4, duration: 8 },
  { top: "29%", left: "14%", size: 180, color: "#FFD166", delay: 1, duration: 9.5 },
  { top: "40%", left: "90%", size: 300, color: "#EF476F", delay: 3, duration: 11 },
  { top: "52%", left: "-6%", size: 260, color: "#7B2FBE", delay: 1.5, duration: 9 },
  { top: "63%", left: "60%", size: 200, color: "#FF6B35", delay: 2.5, duration: 8.5 },
  { top: "75%", left: "4%", size: 340, color: "#4361EE", delay: 0.5, duration: 10.5 },
  { top: "87%", left: "70%", size: 240, color: "#06D6A0", delay: 3.5, duration: 9 },
  { top: "98%", left: "20%", size: 220, color: "#EF476F", delay: 2, duration: 10 },
];

/**
 * A single ambient layer of floating color blobs spanning the FULL page
 * (mounted once at the root, absolutely positioned over the whole
 * document height) rather than one copy per section. This is what makes
 * them drift continuously across section boundaries instead of getting
 * clipped at each section's edge.
 */
export default function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {blobSpecs.map((b, i) => (
        <span
          key={i}
          className="blob absolute rounded-full"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
      <style jsx>{`
        .blob {
          opacity: 0.13;
          transform: translate(-50%, -50%);
          animation-name: floatBlob;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-30px) rotate(8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob { animation: none; }
        }
      `}</style>
    </div>
  );
}