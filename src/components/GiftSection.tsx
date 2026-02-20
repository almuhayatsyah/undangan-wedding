"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import { toast } from "sonner";
import { FiCopy } from "react-icons/fi";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

export default function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Nomor rekening berhasil disalin!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Gagal menyalin. Silakan salin manual.");
    }
  };

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
          Hadiah
        </p>
        <h2 className="section-title">Amplop Digital</h2>
        <div className="ornament-divider">
          <span className="ornament-icon">✦</span>
        </div>
        <p className="text-warm-gray text-sm mt-2">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun
          jika Anda ingin memberikan tanda kasih, kami menyediakan amplop
          digital di bawah ini.
        </p>
      </motion.div>

      {/* Gift Cards */}
      <div className="space-y-4">
        {weddingConfig.gifts.map((gift, i) => (
          <motion.div
            key={i}
            initial={fadeUpInitial}
            whileInView={fadeUpAnimate()}
            viewport={viewportOnce}
            transition={fadeUpTransition(i * 0.15)}
            className="glass-card-gold p-5 text-center"
          >
            {/* Bank Logo */}
            <div className="flex justify-center mb-3">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid var(--warm-gray-light)",
                }}
              >
                <img
                  src={gift.logo}
                  alt={gift.bank}
                  className="w-12 h-12"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Bank name */}
            <p className="text-charcoal text-sm font-semibold mb-1">
              {gift.bank}
            </p>

            {/* Account number */}
            <p
              className="text-charcoal text-lg font-semibold mb-1 tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {gift.accountNumber}
            </p>

            {/* Account name */}
            <p className="text-warm-gray text-sm mb-3">
              a.n. {gift.accountName}
            </p>

            {/* Copy button */}
            <button
              onClick={() => copyToClipboard(gift.accountNumber, i)}
              className="btn-outline text-xs"
              style={{
                gap: "0.4rem",
                color: copiedIndex === i ? "var(--sage)" : undefined,
                borderColor: copiedIndex === i ? "var(--sage)" : undefined,
              }}
            >
              <FiCopy size={13} />
              {copiedIndex === i ? "Tersalin!" : "Salin Nomor"}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
