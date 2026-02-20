"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { FiSend, FiCheck, FiX, FiLoader } from "react-icons/fi";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

interface RsvpSectionProps {
  onSubmitSuccess?: () => void;
}

export default function RsvpSection({ onSubmitSuccess }: RsvpSectionProps) {
  const [nama, setNama] = useState("");
  const [jumlahHadir, setJumlahHadir] = useState(1);
  const [konfirmasi, setKonfirmasi] = useState<boolean>(true);
  const [ucapan, setUcapan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      toast.error("Mohon isi nama Anda");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("rsvp").insert({
        nama: nama.trim(),
        jumlah_hadir: konfirmasi ? jumlahHadir : 0,
        konfirmasi,
        ucapan: ucapan.trim() || null,
      });

      if (error) throw error;

      toast.success("Terima kasih! RSVP berhasil dikirim 🎉");
      setIsSubmitted(true);
      onSubmitSuccess?.();
    } catch {
      toast.error("Gagal mengirim RSVP. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-gold p-8 text-center"
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--sage), var(--sage-dark))",
            }}
          >
            <FiCheck className="text-white" size={28} />
          </div>
          <h3
            className="text-charcoal mb-2"
            style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem" }}
          >
            Terima Kasih!
          </h3>
          <p className="text-charcoal-light text-sm">
            Konfirmasi kehadiran Anda telah kami terima.
            {konfirmasi
              ? " Kami sangat menantikan kehadiran Anda."
              : " Kami memahami dan mendoakan yang terbaik untuk Anda."}
          </p>
        </motion.div>
      </section>
    );
  }

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
          Konfirmasi
        </p>
        <h2 className="section-title">RSVP</h2>
        <div className="ornament-divider">
          <span className="ornament-icon">✦</span>
        </div>
        <p className="text-warm-gray text-sm mt-2">
          Mohon konfirmasi kehadiran Anda
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={fadeUpInitial}
        whileInView={fadeUpAnimate()}
        viewport={viewportOnce}
        transition={fadeUpTransition(0.1)}
        onSubmit={handleSubmit}
        className="glass-card p-6 space-y-4"
      >
        {/* Nama */}
        <div>
          <label className="form-label">Nama Anda</label>
          <input
            type="text"
            className="form-input"
            placeholder="Masukkan nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        {/* Konfirmasi Kehadiran */}
        <div>
          <label className="form-label">Konfirmasi Kehadiran</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              type="button"
              onClick={() => setKonfirmasi(true)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                border: `2px solid ${konfirmasi ? "var(--sage)" : "var(--warm-gray-light)"}`,
                background: konfirmasi
                  ? "rgba(139, 159, 130, 0.1)"
                  : "transparent",
                color: konfirmasi ? "var(--sage-dark)" : "var(--warm-gray)",
              }}
            >
              <FiCheck size={16} />
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setKonfirmasi(false)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                border: `2px solid ${!konfirmasi ? "#f87171" : "var(--warm-gray-light)"}`,
                background: !konfirmasi
                  ? "rgba(248, 113, 113, 0.05)"
                  : "transparent",
                color: !konfirmasi ? "#ef4444" : "var(--warm-gray)",
              }}
            >
              <FiX size={16} />
              Tidak Hadir
            </button>
          </div>
        </div>

        {/* Jumlah Hadir */}
        {konfirmasi && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="form-label">Jumlah Tamu</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setJumlahHadir(Math.max(1, jumlahHadir - 1))}
                className="w-10 h-10 rounded-xl text-lg flex items-center justify-center hover:border-sage transition-colors"
                style={{
                  border: "2px solid var(--warm-gray-light)",
                  color: "var(--charcoal)",
                }}
              >
                −
              </button>
              <span
                className="text-lg font-semibold text-charcoal w-8 text-center"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {jumlahHadir}
              </span>
              <button
                type="button"
                onClick={() => setJumlahHadir(Math.min(5, jumlahHadir + 1))}
                className="w-10 h-10 rounded-xl text-lg flex items-center justify-center hover:border-sage transition-colors"
                style={{
                  border: "2px solid var(--warm-gray-light)",
                  color: "var(--charcoal)",
                }}
              >
                +
              </button>
              <span className="text-warm-gray text-sm ml-1">orang</span>
            </div>
          </motion.div>
        )}

        {/* Ucapan */}
        <div>
          <label className="form-label">Ucapan & Doa</label>
          <textarea
            className="form-input form-textarea"
            placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
            value={ucapan}
            onChange={(e) => setUcapan(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin" size={18} />
              Mengirim...
            </>
          ) : (
            <>
              <FiSend size={16} />
              Kirim RSVP
            </>
          )}
        </button>
      </motion.form>
    </section>
  );
}
