"use client";

export default function RevealPanel({
  open,
  origin,
  children,
}: {
  open: boolean;
  origin: { x: number; y: number };
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">
        <div
          className="reveal-wipe"
          style={{
            clipPath: open
              ? `circle(150% at ${origin.x}% ${origin.y}%)`
              : `circle(0% at ${origin.x}% ${origin.y}%)`,
          }}
        >
          {children}
        </div>
      </div>
      <style jsx>{`
        .reveal-wipe {
          transition: clip-path 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
}
