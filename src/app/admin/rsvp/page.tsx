"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { FiTrash2, FiRefreshCw, FiSearch, FiUsers } from "react-icons/fi";

interface RsvpEntry {
  id: number;
  nama: string;
  konfirmasi: boolean;
  jumlah_hadir: number;
  ucapan: string | null;
  created_at: string;
}

export default function AdminRsvpPage() {
  const [data, setData] = useState<RsvpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "hadir" | "tidak">("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: rsvps } = await supabase
      .from("rsvp")
      .select("*")
      .order("created_at", { ascending: false });
    setData(rsvps || []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus RSVP ini?")) return;
    const { error } = await supabase.from("rsvp").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus");
    } else {
      toast.success("RSVP berhasil dihapus");
      setData(data.filter((r) => r.id !== id));
    }
  };

  const filtered = data
    .filter((r) => {
      if (filter === "hadir") return r.konfirmasi;
      if (filter === "tidak") return !r.konfirmasi;
      return true;
    })
    .filter((r) => r.nama.toLowerCase().includes(search.toLowerCase()));

  const filters = [
    { key: "all" as const, label: "Semua", count: data.length },
    {
      key: "hadir" as const,
      label: "Hadir",
      count: data.filter((r) => r.konfirmasi).length,
    },
    {
      key: "tidak" as const,
      label: "Tidak Hadir",
      count: data.filter((r) => !r.konfirmasi).length,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.25rem",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.4rem",
            color: "#3A2A20",
          }}
        >
          Daftar RSVP
        </h2>
        <button
          onClick={fetchData}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            padding: "0.5rem 0.9rem",
            borderRadius: "10px",
            border: "1px solid #E8DCC8",
            background: "white",
            color: "#8B6F5E",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <FiRefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "0.75rem" }}>
        <FiSearch
          size={15}
          color="#C4B5A6"
          style={{
            position: "absolute",
            left: "0.85rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
        <input
          type="text"
          placeholder="Cari nama tamu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: "2.5rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            borderRadius: "12px",
            border: "1px solid #E8DCC8",
            fontSize: "0.85rem",
            color: "#3A2A20",
            background: "white",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              fontSize: "0.75rem",
              padding: "0.45rem 0.85rem",
              borderRadius: "20px",
              fontWeight: filter === f.key ? 600 : 400,
              border: `1.5px solid ${filter === f.key ? "#8B6F5E" : "#E8DCC8"}`,
              background: filter === f.key ? "#8B6F5E" : "white",
              color: filter === f.key ? "white" : "#9E8E80",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid #E8DCC8",
              borderTopColor: "#8B6F5E",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 0.75rem",
            }}
          />
          <p style={{ color: "#9E8E80", fontSize: "0.8rem" }}>Memuat...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {filtered.map((entry) => (
            <div
              key={entry.id}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "14px",
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                border: "1px solid rgba(232,220,200,0.3)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: entry.ucapan ? "0.6rem" : 0,
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
                    {new Date(entry.created_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
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
                    {entry.konfirmasi
                      ? `✓ Hadir (${entry.jumlah_hadir})`
                      : "✗ Tidak"}
                  </span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    style={{
                      padding: "0.4rem",
                      borderRadius: "8px",
                      border: "none",
                      background: "transparent",
                      color: "#C4B5A6",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#ef4444";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(239,68,68,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#C4B5A6";
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              {entry.ucapan && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#5A4A3F",
                    padding: "0.6rem 0.75rem",
                    borderRadius: "10px",
                    background: "#FAF5EF",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{entry.ucapan}&rdquo;
                </p>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
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
                {search ? "Tidak ditemukan" : "Belum ada RSVP"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
