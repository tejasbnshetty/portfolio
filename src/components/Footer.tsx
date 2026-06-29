"use client";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

const links = [
  { label: "GitHub", href: "https://github.com/tejasbnshetty" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tejasbnshetty" },
  { label: "Bardar", href: "https://bardar.online" },
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full py-20 border-t border-[#E8E4DC]">
      <div className="max-w-4xl mx-auto px-7 text-center">
        <h2 className={`${syne.className} text-4xl font-black mb-3`}>
          Let&apos;s{" "}
          <span
            className="grad-text"
          >
            work together.
          </span>
        </h2>
        <p className="text-[#5A5650] text-base mb-8">
          Open to full-time roles, freelance, and interesting problems.
        </p>

        <a
          href="mailto:tejasbnshetty@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0F0E0C] text-white font-medium text-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-200 mb-12"
        >
          tejasbnshetty@gmail.com →
        </a>

        <div className="flex justify-center gap-4 flex-wrap mb-12">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#E8E4DC] text-sm text-[#5A5650] font-medium hover:border-[#5A5650] hover:text-[#0F0E0C] transition-all"
            >
              {l.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-[#9C958C]">
          © {new Date().getFullYear()} Tejas Shetty · Built with Next.js & Tailwind
        </p>
      </div>

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