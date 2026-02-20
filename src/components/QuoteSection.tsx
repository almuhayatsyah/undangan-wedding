"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/config";

export default function QuoteSection() {
  return (
    <section
      className="section"
      style={{
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-card-gold p-6 md:p-8 text-center relative overflow-hidden"
      >
        {/* Decorative quotes */}
        <span
          className="absolute top-2 left-4 text-5xl text-gold/15 select-none leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &ldquo;
        </span>

        <p
          className="text-charcoal-light text-sm leading-relaxed mb-4 relative z-10 italic"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {weddingConfig.quote.text}
        </p>

        {/* Source */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gold/30" />
          <span className="text-gold text-xs font-semibold tracking-[2px] uppercase">
            {weddingConfig.quote.source}
          </span>
          <span className="h-px w-8 bg-gold/30" />
        </div>
      </motion.div>
    </section>
  );
}
