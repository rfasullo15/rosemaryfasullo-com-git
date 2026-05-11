export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "2rem 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
        }}
      >
        © {new Date().getFullYear()} Jane Doe
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          color: "var(--color-border-light)",
        }}
      >
        Built with Next.js · Deployed on Vercel
      </span>
    </footer>
  );
}
