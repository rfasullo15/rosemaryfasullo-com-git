"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "120px 48px",
        backgroundColor: "var(--color-ink-soft)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-amber)",
            marginBottom: "1.5rem",
          }}
        >
          04 / Contact
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--color-parchment)",
            marginBottom: "1.5rem",
          }}
        >
          Let&apos;s build something{" "}
          <span style={{ color: "var(--color-amber)" }}>worth building.</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--color-muted)",
            marginBottom: "3rem",
          }}
        >
          I&apos;m actively looking for applied AI development roles where
          careful engineering and genuine curiosity matter. If that sounds like
          your team, I&apos;d love to talk.
        </p>

        <a
          href="mailto:jane@example.com"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-ink)",
            backgroundColor: "var(--color-amber)",
            padding: "16px 40px",
            borderRadius: "2px",
            textDecoration: "none",
            display: "inline-block",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-amber-light)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-amber)")
          }
        >
          Say Hello
        </a>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
            marginTop: "3rem",
          }}
        >
          {[
            { label: "GitHub", href: "https://github.com/janedoe" },
            { label: "LinkedIn", href: "https://linkedin.com/in/janedoe" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--color-amber)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--color-muted)")
              }
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
