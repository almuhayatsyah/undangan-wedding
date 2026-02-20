"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function HeroSection() {
  const countdown = useCountdown(weddingConfig.weddingDate);

  const countdownItems = [
    { label: "Hari", value: countdown.days },
    { label: "Jam", value: countdown.hours },
    { label: "Menit", value: countdown.minutes },
    { label: "Detik", value: countdown.seconds },
  ];

  return (
    <section
      className="section"
      style={{ textAlign: "center", paddingTop: "3rem" }}
    >
      {/* Bismillah */}
      <motion.p
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0)}
        className="text-warm-gray text-sm mb-6"
        style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </motion.p>

      {/* Label */}
      <motion.p
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.1)}
        className="text-xs tracking-[4px] uppercase text-warm-gray font-medium mb-6"
      >
        The Wedding Of
      </motion.p>

      {/* Couple Photo */}
      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.15)}
        className="mb-6 flex justify-center px-4"
      >
        <div
          className="w-full max-w-[200px] overflow-hidden"
          style={{
            borderRadius: "12px",
            border: "3px solid var(--gold-light)",
            boxShadow: "0 8px 30px rgba(201, 169, 110, 0.25)",
          }}
        >
          <img
            src="/images/fotosection.webp"
            alt="Foto Mempelai"
            className="w-full"
            style={{ objectFit: "cover", display: "block", maxHeight: "240px" }}
          />
        </div>
      </motion.div>

      {/* Couple Names */}
      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.2)}
      >
        <h1
          className="text-charcoal leading-tight mb-1"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
          }}
        >
          {weddingConfig.groom.nickname}
        </h1>
        <p
          className="text-gold text-2xl my-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          &
        </p>
        <h1
          className="text-charcoal leading-tight"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
          }}
        >
          {weddingConfig.bride.nickname}
        </h1>
      </motion.div>

      {/* Ornament */}
      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.3)}
        className="flex items-center justify-center gap-3 my-6"
      >
        <span className="h-px w-16 bg-linear-to-r from-transparent to-gold/50" />
        <span className="text-gold text-sm">❦</span>
        <span className="h-px w-16 bg-linear-to-l from-transparent to-gold/50" />
      </motion.div>

      {/* Date text */}
      <motion.p
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.4)}
        className="text-charcoal-light text-sm mb-8"
      >
        {new Date(weddingConfig.weddingDate).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </motion.p>

      {/* Countdown */}
      <motion.div
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.5)}
        className="flex justify-center gap-3"
      >
        {countdownItems.map((item) => (
          <div key={item.label} className="glass-card-gold p-3 text-center">
            <span
              className="block text-2xl font-semibold text-charcoal"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[0.65rem] text-warm-gray tracking-[2px] uppercase font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
