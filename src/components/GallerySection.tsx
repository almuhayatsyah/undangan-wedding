"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import {
  HiOutlineXMark,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = weddingConfig.gallery;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  // Masonry-style heights for visual variety
  const heights = [
    "240px",
    "300px",
    "260px",
    "320px",
    "280px",
    "300px",
    "260px",
  ];

  return (
    <section className="section">
      {/* Title */}
      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0)}
        className="text-center mb-8"
      >
        <p className="section-subtitle" style={{ marginBottom: "0.5rem" }}>
          Galeri
        </p>
        <h2 className="section-title">Momen Berharga</h2>
        <div className="ornament-divider">
          <span className="ornament-icon">✦</span>
        </div>
      </motion.div>

      {/* Masonry Grid */}
      <div className="columns-2 gap-3 space-y-3">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={fadeUpInitial}
            whileInView={fadeUpAnimate()}
            viewport={viewportOnce}
            transition={fadeUpTransition(i * 0.1)}
            className="break-inside-avoid cursor-pointer overflow-hidden rounded-xl relative group"
            style={{ height: heights[i % heights.length] }}
            onClick={() => openLightbox(i)}
          >
            <img
              src={photo}
              alt={`Gallery photo ${i + 1}`}
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <HiOutlineXMark size={28} />
            </button>

            {/* Nav buttons */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
            >
              <HiOutlineChevronLeft size={32} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
            >
              <HiOutlineChevronRight size={32} />
            </button>

            {/* Photo */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <img
                src={photos[lightboxIndex]}
                alt={`Gallery photo ${lightboxIndex + 1}`}
                style={{
                  maxWidth: "92vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
