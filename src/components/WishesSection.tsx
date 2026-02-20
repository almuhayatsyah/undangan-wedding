"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  fadeUpInitial,
  fadeUpAnimate,
  fadeUpTransition,
  viewportOnce,
} from "@/lib/animations";

interface Wish {
  id: string;
  nama: string;
  ucapan: string;
  created_at: string;
  konfirmasi: boolean;
}

interface WishesSectionProps {
  refreshTrigger?: number;
}

export default function WishesSection({ refreshTrigger }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("rsvp")
        .select("id, nama, ucapan, created_at, konfirmasi")
        .not("ucapan", "is", null)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setWishes(data || []);
    } catch (err) {
      console.error("Error fetching wishes:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes, refreshTrigger]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("wishes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rsvp" },
        (payload) => {
          const newWish = payload.new as Wish;
          if (newWish.ucapan) {
            setWishes((prev) => [newWish, ...prev].slice(0, 20));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
          Doa & Ucapan
        </p>
        <h2 className="section-title">Ucapan Tamu</h2>
        <div className="ornament-divider">
          <span className="ornament-icon">✦</span>
        </div>
      </motion.div>

      {/* Wishes List */}
      <div
        className="space-y-3 max-h-[400px] overflow-y-auto pr-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {isLoading ? (
          // Skeleton loading
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-4 animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ background: "var(--sage-muted)" }}
                />
                <div
                  className="h-3 w-24 rounded"
                  style={{ background: "var(--sage-muted)" }}
                />
              </div>
              <div
                className="h-3 w-full rounded mb-1"
                style={{ background: "var(--sage-muted)", opacity: 0.5 }}
              />
              <div
                className="h-3 w-3/4 rounded"
                style={{ background: "var(--sage-muted)", opacity: 0.5 }}
              />
            </div>
          ))
        ) : wishes.length === 0 ? (
          <motion.div
            initial={fadeUpInitial}
            whileInView={fadeUpAnimate()}
            viewport={viewportOnce}
            transition={fadeUpTransition(0.1)}
            className="glass-card p-6 text-center"
          >
            <p className="text-warm-gray text-sm">
              Belum ada ucapan. Jadilah yang pertama! 💐
            </p>
          </motion.div>
        ) : (
          wishes.map((wish, i) => (
            <motion.div
              key={wish.id}
              initial={fadeUpInitial}
              whileInView={fadeUpAnimate()}
              viewport={viewportOnce}
              transition={fadeUpTransition(i * 0.05)}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--sage), var(--sage-dark))",
                    }}
                  >
                    {wish.nama.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-charcoal text-sm font-medium leading-tight">
                      {wish.nama}
                    </p>
                    <p className="text-warm-gray text-[0.65rem]">
                      {formatDate(wish.created_at)}
                    </p>
                  </div>
                </div>
                {/* Badge */}
                <span
                  className="text-[0.6rem] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: wish.konfirmasi
                      ? "var(--sage-muted)"
                      : "var(--cream-dark)",
                    color: wish.konfirmasi
                      ? "var(--sage-dark)"
                      : "var(--warm-gray)",
                  }}
                >
                  {wish.konfirmasi ? "Hadir" : "Tidak Hadir"}
                </span>
              </div>
              <p className="text-charcoal-light text-sm leading-relaxed">
                {wish.ucapan}
              </p>
            </motion.div>
          ))
        )}
      </div>

      {/* Total count */}
      {wishes.length > 0 && (
        <p className="text-center text-warm-gray text-xs mt-4">
          {wishes.length} ucapan
        </p>
      )}
    </section>
  );
}
