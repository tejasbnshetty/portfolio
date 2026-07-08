"use client";
import { useEffect, useState } from "react";

type LightboxImage = { src: string; alt: string };

export default function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    setIdx(startIndex);
  }, [startIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* Image */}
      <div
        className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx].src}
          alt={images[idx].alt}
          className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain lightbox-img"
        />

        {/* Caption */}
        <p className="absolute -bottom-8 left-0 right-0 text-center text-xs text-white/60">
          {images[idx].alt}
          {images.length > 1 && ` · ${idx + 1} / ${images.length}`}
        </p>
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white text-2xl flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white text-2xl flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors text-lg"
        aria-label="Close"
      >
        ✕
      </button>

      <style jsx>{`
        .lightbox-img {
          animation: lightboxIn 0.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}