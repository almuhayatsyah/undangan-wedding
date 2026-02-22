"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";

const ADMIN_PASSWORD = "herman&amanda2026";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Password salah!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background:
          "linear-gradient(135deg, #3A2A20 0%, #6B5043 50%, #8B6F5E 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2.5rem",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #8B6F5E, #6B5043)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 4px 12px rgba(107,80,67,0.3)",
          }}
        >
          <FiLock color="white" size={22} />
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.6rem",
              color: "#3A2A20",
              marginBottom: "0.4rem",
            }}
          >
            Twopad wedding
          </h1>
          <p style={{ color: "#9E8E80", fontSize: "0.8rem" }}>
            Kelola undangan pernikahan Herman & Amanda
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#3A2A20",
                marginBottom: "0.5rem",
                letterSpacing: "0.5px",
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Masukkan password admin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: `2px solid ${error ? "#ef4444" : "#E8DCC8"}`,
                fontSize: "0.9rem",
                color: "#3A2A20",
                background: "#FAF5EF",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "#8B6F5E";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "#E8DCC8";
              }}
            />
            {error && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "0.4rem",
                }}
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.85rem",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #8B6F5E, #6B5043)",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(107,80,67,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseDown={(e) => {
              (e.target as HTMLElement).style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
