"use client";
import { useState } from "react";
import { Syne } from "next/font/google";
import ContactModal from "./ContactModal";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer id="contact" className="w-full py-20 border-t border-white/15">
      <div className="max-w-4xl mx-auto px-7 text-center">
        <h2 className={`${syne.className} text-4xl font-black mb-3 text-white`}>
          Let&apos;s{" "}
          <span
            className="grad-text"
          >
            work together.
          </span>
        </h2>
        <p className="text-white/75 text-base mb-8">
          Open to full-time roles, freelance, and interesting problems.
        </p>

        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0F0E0C] font-medium text-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200 mb-12 cursor-pointer"
        >
          Say hello →
        </button>

        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Tejas Shetty · Built with Next.js & Tailwind
        </p>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <style jsx>{`
        .grad-text {
          background: linear-gradient(135deg, #FF6B35 0%, #EF476F 50%, #4361EE 100%);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 4s ease infinite;
        }
        @keyframes gradShift {
          0%, 100% { background-position: 0%; }
          50% { background-position: 100%; }
        }
      `}</style>
    </footer>
  );
}