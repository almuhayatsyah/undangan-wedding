"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiUsers, FiLink, FiLogOut } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthed(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthed) return null;

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", icon: FiHome, label: "Dashboard" },
    { href: "/admin/rsvp", icon: FiUsers, label: "RSVP" },
    { href: "/admin/links", icon: FiLink, label: "Link Tamu" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0EA" }}>
      {/* Top Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E8DCC8",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.15rem",
              color: "#3A2A20",
              fontWeight: 600,
            }}
          >
            ✦ Admin Panel
          </h1>
          <p
            style={{ fontSize: "0.65rem", color: "#9E8E80", marginTop: "2px" }}
          >
            Herman & Shinta
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            padding: "0.5rem 0.9rem",
            borderRadius: "10px",
            border: "1px solid #E8DCC8",
            background: "white",
            color: "#9E8E80",
            cursor: "pointer",
            fontWeight: 500,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "#FAF5EF";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "white";
          }}
        >
          <FiLogOut size={13} />
          Logout
        </button>
      </nav>

      {/* Content */}
      <main
        style={{
          padding: "1.25rem",
          maxWidth: "800px",
          margin: "0 auto",
          paddingBottom: "6rem",
        }}
      >
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0.6rem 1rem",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #E8DCC8",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.04)",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.4rem 1rem",
                borderRadius: "12px",
                color: isActive ? "#6B5043" : "#C4B5A6",
                fontSize: "0.65rem",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                background: isActive ? "rgba(139,111,94,0.08)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
