"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FiCopy, FiSend, FiPlus, FiTrash2, FiLink } from "react-icons/fi";

export default function AdminLinksPage() {
  const [guestName, setGuestName] = useState("");
  const [links, setLinks] = useState<{ name: string; url: string }[]>([]);

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://undangan.vercel.app";

  const generateLink = () => {
    if (!guestName.trim()) {
      toast.error("Masukkan nama tamu");
      return;
    }
    const encoded = encodeURIComponent(guestName.trim());
    const url = `${baseUrl}/?to=${encoded}`;
    setLinks([{ name: guestName.trim(), url }, ...links]);
    setGuestName("");
    toast.success("Link berhasil dibuat!");
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link disalin!");
  };

  const shareWhatsApp = (name: string, url: string) => {
    const text = `Assalamualaikum ${name},\n\nKami mengundang Anda untuk hadir di acara pernikahan kami.\n\nBuka undangan di:\n${url}\n\nTerima kasih 🤎`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

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
        Generate Link Tamu
      </h2>

      {/* Input Card */}
      <div
        style={{
          padding: "1.25rem",
          borderRadius: "16px",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
          border: "1px solid rgba(232,220,200,0.5)",
          marginBottom: "1.5rem",
        }}
      >
        <label
          style={{
            display: "block",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#3A2A20",
            marginBottom: "0.5rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Nama Tamu
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Contoh: Budi Santoso"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateLink()}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid #E8DCC8",
              fontSize: "0.85rem",
              color: "#3A2A20",
              background: "#FAF5EF",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={generateLink}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.75rem 1.1rem",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #8B6F5E, #6B5043)",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(107,80,67,0.25)",
            }}
          >
            <FiPlus size={15} />
            Buat
          </button>
        </div>
      </div>

      {/* Generated Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {links.map((link, i) => (
          <div
            key={i}
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              border: "1px solid rgba(232,220,200,0.3)",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#3A2A20",
                marginBottom: "0.25rem",
              }}
            >
              {link.name}
            </p>
            <p
              style={{
                fontSize: "0.7rem",
                color: "#C4B5A6",
                marginBottom: "0.75rem",
                wordBreak: "break-all",
                lineHeight: 1.4,
              }}
            >
              {link.url}
            </p>
            <div
              style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
            >
              <button
                onClick={() => copyLink(link.url)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.7rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #E8DCC8",
                  background: "white",
                  color: "#8B6F5E",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <FiCopy size={12} />
                Salin
              </button>
              <button
                onClick={() => shareWhatsApp(link.name, link.url)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.7rem",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "#25D366",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                <FiSend size={12} />
                WhatsApp
              </button>
              <button
                onClick={() => removeLink(i)}
                style={{
                  marginLeft: "auto",
                  padding: "0.4rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: "#C4B5A6",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#C4B5A6";
                }}
              >
                <FiTrash2 size={13} />
              </button>
            </div>
          </div>
        ))}

        {links.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              borderRadius: "16px",
              background: "white",
              border: "1px dashed #E8DCC8",
            }}
          >
            <FiLink size={32} color="#D4C4BA" style={{ margin: "0 auto" }} />
            <p
              style={{
                color: "#9E8E80",
                fontSize: "0.85rem",
                marginTop: "0.75rem",
                fontWeight: 500,
              }}
            >
              Belum ada link yang dibuat
            </p>
            <p
              style={{
                color: "#C4B5A6",
                fontSize: "0.7rem",
                marginTop: "0.25rem",
              }}
            >
              Masukkan nama tamu untuk generate link personalisasi
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
