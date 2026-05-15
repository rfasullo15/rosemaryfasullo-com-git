"use client";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background geometric accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,134,26,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Vertical rule */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "48px",
          top: "20%",
          bottom: "20%",
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent, var(--color-amber), transparent)",
          opacity: 0.4,
        }}
      />

      <div style={{ maxWidth: "900px", paddingLeft: "32px" }}>
        {/* Eyebrow */}
        <p
          className="animate-fade-in"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-amber)",
            marginBottom: "1.5rem",
          }}
        >
          Applied AI · Systems Thinking · Production Code
        </p>

        {/* Name */}
        <h1
          className="animate-fade-up delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--color-parchment)",
            marginBottom: "1.5rem",
          }}
        >
          Rosemary
          <br />
          <span style={{ color: "var(--color-amber)" }}>Fasullo</span>
          <span style={{ color: "var(--color-muted)" }}>.</span>
        </h1>

        {/* Divider */}
        <div
          className="animate-slide-right delay-300"
          style={{
            height: "2px",
            width: "80px",
            backgroundColor: "var(--color-amber)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Tagline */}
        <p
          className="animate-fade-up delay-400"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.65,
            color: "var(--color-muted)",
            maxWidth: "560px",
            marginBottom: "2.5rem",
          }}
        >
          I build AI-powered systems that ship — from agentic workflows and LLM
          integrations to full-stack web applications. Physics background.
          Production mindset.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up delay-500"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              backgroundColor: "var(--color-amber)",
              padding: "14px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background-color 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-amber-light)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-amber)")
            }
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-parchment)",
              backgroundColor: "transparent",
              border: "1px solid var(--color-border-light)",
              padding: "14px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "border-color 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-parchment)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border-light)")
            }
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="animate-fade-in delay-600"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, var(--color-amber), transparent)",
            animation: "pulse-amber 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
