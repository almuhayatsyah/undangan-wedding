"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import { FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="section text-center" style={{ paddingBottom: "6rem" }}>
      {/* Floral top ornament */}
      <div className="text-sage-light text-2xl opacity-40 mb-4">─ ✿ ─</div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-warm-gray text-sm mb-2">
          Merupakan suatu kebahagiaan apabila
        </p>
        <p className="text-warm-gray text-sm mb-6">
          Bapak/Ibu/Saudara/i berkenan hadir di acara pernikahan kami.
        </p>

        {/* Couple names */}
        <p
          className="text-charcoal text-lg"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {weddingConfig.groom.nickname} & {weddingConfig.bride.nickname}
        </p>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="h-[1px] w-10 bg-gold/30" />
          <FiHeart className="text-gold text-sm" />
          <span className="h-[1px] w-10 bg-gold/30" />
        </div>

        {/* Credit */}
        <p className="text-warm-gray/50 text-[0.65rem] mt-8">
          Made with ❤️ — Undangan Digital
        </p>
      </motion.div>
    </footer>
  );
}
