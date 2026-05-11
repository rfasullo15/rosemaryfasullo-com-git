"use client";
import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        padding: scrolled ? "12px 48px" : "24px 48px",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        backgroundColor: scrolled ? "rgba(14,13,11,0.85)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "var(--color-parchment)",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        JD<span style={{ color: "var(--color-amber)" }}>.</span>
      </a>

      <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.color = "var(--color-parchment)")
            }
            onMouseLeave={(e) =>
              (e.target.style.color = "var(--color-muted)")
            }
          >
            {l.label}
          </a>
        ))}

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-amber)",
            textDecoration: "none",
            border: "1px solid var(--color-amber)",
            padding: "7px 18px",
            borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-amber)";
            e.currentTarget.style.color = "var(--color-ink)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-amber)";
          }}
        >
          Résumé
        </a>
      </nav>
    </header>
  );
}
