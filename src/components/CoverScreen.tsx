"use client";

import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import { PiEnvelopeOpenDuotone } from "react-icons/pi";

interface CoverScreenProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export default function CoverScreen({
  guestName,
  isOpen,
  onOpen,
}: CoverScreenProps) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-200 flex flex-col items-center justify-center"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(139, 111, 94, 0.95) 0%,
              rgba(107, 80, 67, 0.98) 50%,
              rgba(139, 111, 94, 0.95) 100%
            )`,
          }}
        >
          {/* Decorative corner ornaments */}
          <div className="absolute top-6 left-6 text-3xl opacity-20 text-white select-none">
            ❀
          </div>
          <div
            className="absolute top-6 right-6 text-3xl opacity-20 text-white select-none"
            style={{ transform: "scaleX(-1)" }}
          >
            ❀
          </div>
          <div
            className="absolute bottom-6 left-6 text-3xl opacity-20 text-white select-none"
            style={{ transform: "scaleY(-1)" }}
          >
            ❀
          </div>
          <div
            className="absolute bottom-6 right-6 text-3xl opacity-20 text-white select-none"
            style={{ transform: "scale(-1)" }}
          >
            ❀
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center px-6"
          >
            {/* Wedding label */}
            <p className="text-white/90 text-xs tracking-[5px] uppercase mb-6 font-medium">
              The Wedding Of
            </p>

            {/* Couple Photo */}
            <div className="flex justify-center mb-6">
              <div
                className="w-40 h-40 rounded-full overflow-hidden"
                style={{
                  border: "3px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src="/images/pasanganku.jpg"
                  alt="Foto Mempelai"
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Couple names */}
            <h1
              className="text-white text-4xl md:text-5xl mb-2 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {weddingConfig.groom.nickname}
            </h1>
            <p
              className="text-white text-2xl mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              &
            </p>
            <h1
              className="text-white text-4xl md:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {weddingConfig.bride.nickname}
            </h1>

            {/* Ornament divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-12 bg-linear-to-r from-transparent to-white/70" />
              <span className="text-white/80">✦</span>
              <span className="h-px w-12 bg-linear-to-l from-transparent to-white/70" />
            </div>

            {/* Guest name */}
            <div className="mb-8">
              <p className="text-white/15 text-xs tracking-[3px] uppercase mb-2">
                Kepada Yth.
              </p>
              <p className="text-white/20 text-lg font-medium">
                {guestName || "Tamu Undangan"}
              </p>
            </div>

            {/* Open button */}
            <motion.button
              onClick={onOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="animate-pulse-soft"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.875rem 2.5rem",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255, 255, 255, 0.35)",
                borderRadius: "50px",
                color: "white",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                letterSpacing: "1px",
              }}
            >
              <PiEnvelopeOpenDuotone size={20} />
              Buka Undangan
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
