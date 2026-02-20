"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/config";
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { FiNavigation } from "react-icons/fi";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

interface EventCardProps {
  event: (typeof weddingConfig.events)[number];
  delay: number;
}

function EventCard({ event, delay }: EventCardProps) {
  const dateStr = new Date(event.date).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpAnimate()}
      viewport={viewportOnce}
      transition={fadeUpTransition(delay)}
      className="mb-8"
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      {/* Title Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--sage), var(--sage-dark))",
          padding: "1rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "white",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          {event.title}
        </h3>
      </div>

      {/* Card Body */}
      <div
        className="glass-card"
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          padding: "1.25rem 1.5rem",
        }}
      >
        <div className="space-y-3">
          {/* Description */}
          {event.description && (
            <p className="text-warm-gray text-xs italic mb-1">
              {event.description}
            </p>
          )}

          {/* Date */}
          <div className="flex items-start gap-3">
            <HiOutlineCalendarDays
              className="text-gold mt-0.5 shrink-0"
              size={18}
            />
            <p className="text-charcoal-light text-sm">{dateStr}</p>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <HiOutlineClock className="text-gold mt-0.5 shrink-0" size={18} />
            <p className="text-charcoal-light text-sm">
              {event.time} - {event.endTime} {event.timezone}
            </p>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <HiOutlineMapPin className="text-gold mt-0.5 shrink-0" size={18} />
            <div>
              <p className="text-charcoal text-sm font-medium">{event.venue}</p>
              <p className="text-warm-gray text-xs mt-0.5">{event.address}</p>
            </div>
          </div>
        </div>

        {/* Maps button */}
        <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs"
          >
            <FiNavigation size={14} />
            Buka Maps
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventSection() {
  const events = weddingConfig.events;

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
          Rangkaian Acara Adat Aceh
        </p>
        <h2 className="section-title">Acara Pernikahan</h2>
        <div className="ornament-divider">
          <span className="ornament-icon">✦</span>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {events.map((event, i) => (
          <EventCard key={event.title} event={event} delay={i * 0.2} />
        ))}
      </div>
    </section>
  );
}
