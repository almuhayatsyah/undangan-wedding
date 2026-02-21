"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FiUsers, FiCheckCircle, FiXCircle, FiUserPlus } from "react-icons/fi";

interface RsvpEntry {
  id: number;
  nama: string;
  konfirmasi: boolean;
  jumlah_hadir: number;
  ucapan: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: rsvps } = await supabase
      .from("rsvp")
      .select("*")
      .order("created_at", { ascending: false });
    setData(rsvps || []);
    setLoading(false);
  };

  const totalRsvp = data.length;
  const totalHadir = data.filter((r) => r.konfirmasi).length;
  const totalTidak = data.filter((r) => !r.konfirmasi).length;
  const totalTamu = data.reduce((sum, r) => sum + (r.jumlah_hadir || 0), 0);

  const stats = [
    {
      label: "Total RSVP",
      value: totalRsvp,
      icon: FiUsers,
      color: "#8B6F5E",
      bg: "rgba(139,111,94,0.08)",
    },
    {
      label: "Hadir",
      value: totalHadir,
      icon: FiCheckCircle,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.06)",
    },
    {
      label: "Tidak Hadir",
      value: totalTidak,
      icon: FiXCircle,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.06)",
    },
    {
      label: "Total Tamu",
      value: totalTamu,
      icon: FiUserPlus,
      color: "#C9A96E",
      bg: "rgba(201,169,110,0.08)",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #E8DCC8",
              borderTopColor: "#8B6F5E",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <p style={{ color: "#9E8E80", fontSize: "0.85rem" }}>
            Memuat data...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.4rem",
          color: "#3A2A20",
          marginBottom: "1.25rem",
        }}
      >
        Dashboard
      </h2>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "1.25rem",
              borderRadius: "16px",
              background: "white",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
              border: "1px solid rgba(232,220,200,0.5)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "0.75rem",
              }}
            >
              <stat.icon size={18} color={stat.color} />
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                color: "#9E8E80",
                marginBottom: "0.25rem",
                fontWeight: 500,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#3A2A20",
                fontFamily: "var(--font-heading)",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent RSVP */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3A2A20" }}>
          RSVP Terbaru
        </h3>
        <span style={{ fontSize: "0.7rem", color: "#9E8E80" }}>
          {data.length} total
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {data.slice(0, 5).map((entry) => (
          <div
            key={entry.id}
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              border: "1px solid rgba(232,220,200,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#3A2A20",
                }}
              >
                {entry.nama}
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#C4B5A6",
                  marginTop: "2px",
                }}
              >
                {entry.jumlah_hadir} tamu •{" "}
                {new Date(entry.created_at).toLocaleDateString("id-ID")}
              </p>
            </div>
            <span
              style={{
                fontSize: "0.7rem",
                padding: "0.3rem 0.7rem",
                borderRadius: "20px",
                fontWeight: 600,
                background: entry.konfirmasi
                  ? "rgba(34,197,94,0.08)"
                  : "rgba(239,68,68,0.08)",
                color: entry.konfirmasi ? "#16a34a" : "#dc2626",
              }}
            >
              {entry.konfirmasi ? "✓ Hadir" : "✗ Tidak"}
            </span>
          </div>
        ))}

        {data.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              borderRadius: "16px",
              background: "white",
              border: "1px dashed #E8DCC8",
            }}
          >
            <FiUsers size={32} color="#D4C4BA" style={{ margin: "0 auto" }} />
            <p
              style={{
                color: "#9E8E80",
                fontSize: "0.85rem",
                marginTop: "0.75rem",
              }}
            >
              Belum ada RSVP masuk
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
