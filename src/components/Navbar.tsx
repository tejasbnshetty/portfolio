"use client";
import { useState, useEffect } from "react";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["800"] });

const links: string[] = ["Work", "Experience", "Research", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAF7]/90 backdrop-blur-md shadow-sm border-b border-[#E8E4DC]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-4xl mx-auto px-7 py-4 flex items-center justify-between">
        <span
          className={`${syne.className} font-black text-lg bg-gradient-to-r from-[#FF6B35] to-[#4361EE] bg-clip-text text-transparent`}
        >
          TS
        </span>
        <div className="flex gap-6">
          {links.map((link: string) => {
            const href = "#" + link.toLowerCase();
            return (
              <a
                key={link}
                href={href}
                className="text-sm text-[#5A5650] hover:text-[#0F0E0C] transition-colors font-medium"
              >
                {link}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}