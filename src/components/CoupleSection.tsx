"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

interface PersonCardProps {
  person: typeof weddingConfig.bride;
  delay: number;
  isGroom: boolean;
}

function PersonCard({ person, delay, isGroom }: PersonCardProps) {
  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpAnimate()}
      viewport={viewportOnce}
      transition={fadeUpTransition(delay)}
      className={`text-center ${isGroom ? "pb-6" : ""}`}
    >
      {/* Photo circle */}
      <div className={`flex justify-center mb-4 ${!isGroom ? "pt-6" : ""}`}>
        <div
          className="w-36 h-36 rounded-full overflow-hidden"
          style={{
            border: "3px solid var(--gold-light)",
            boxShadow: "0 4px 20px rgba(201, 169, 110, 0.2)",
          }}
        >
          <img
            src={isGroom ? "/images/pria2.webp" : "/images/wanita1.webp"}
            alt={person.fullName}
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Name */}
      <h3
        className="text-charcoal mb-1"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
        }}
      >
        {person.fullName}
      </h3>

      {/* Child order & parents */}
      <p className="text-warm-gray text-sm mb-1">{person.childOrder}</p>
      <p className="text-charcoal-light text-sm font-medium">
        {person.fatherName}
      </p>
      <p className="text-warm-gray text-xs mb-3">&</p>
      <p className="text-charcoal-light text-sm font-medium">
        {person.motherName}
      </p>
    </motion.div>
  );
}

export default function CoupleSection() {
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
          Mempelai
        </p>
        <h2 className="section-title">Calon Pengantin</h2>
        <div className="ornament-divider">
          <span className="ornament-icon">✦</span>
        </div>
      </motion.div>

      {/* Groom */}
      <PersonCard person={weddingConfig.groom} delay={0.1} isGroom={true} />

      {/* Ampersand divider */}
      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.2)}
        className="text-center my-14"
      >
        <span
          className="inline-flex items-center justify-center w-12 h-12 rounded-full text-xl text-gold"
          style={{
            fontFamily: "var(--font-heading)",
            border: "1.5px solid var(--gold-light)",
          }}
        >
          &
        </span>
      </motion.div>

      {/* Bride */}
      <PersonCard person={weddingConfig.bride} delay={0.3} isGroom={false} />
    </section>
  );
}
