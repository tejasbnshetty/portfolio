"use client";
import { useEffect } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const contacts = [
  {
    label: "Email",
    value: "tejasbnshetty@gmail.com",
    href: "mailto:tejasbnshetty@gmail.com",
    accent: "#FF6B35",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  // {
  //   label: "Phone",
  //   value: "0xxxxxxx",
  //   href: "tel:+61xxxxxxx",
  //   accent: "#06D6A0",
  //   icon: (
  //     <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
  //     </svg>
  //   ),
  // },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tejasbnshetty",
    href: "https://linkedin.com/in/tejasbnshetty",
    accent: "#4361EE",
    icon: (
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[300] flex items-center justify-center px-6 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0F0E0C]/55 backdrop-blur-sm"
      />
      <div
        className={`relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#5A5650] hover:bg-[#F5F4F0] transition-colors"
        >
          ✕
        </button>
        <h3 className={`${syne.className} text-2xl font-bold text-[#0F0E0C] mb-1`}>Let&apos;s talk</h3>
        <p className="text-sm text-[#5A5650] mb-6">Reach me through any of these.</p>
        <div className="flex flex-col gap-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "LinkedIn" ? "_blank" : undefined}
              rel={c.label === "LinkedIn" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E8E4DC] hover:-translate-y-0.5 transition-all duration-200 group"
              style={{ ["--hover" as string]: c.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = c.accent;
                e.currentTarget.style.background = c.accent + "0D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E4DC";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                style={{ background: c.accent + "1A", color: c.accent }}
              >
                {c.icon}
              </span>
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#9C958C]">
                  {c.label}
                </span>
                <span className="block text-sm font-medium text-[#0F0E0C]">{c.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}