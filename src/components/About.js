const skills = [
  { category: "AI & ML", items: ["OpenAI API", "Anthropic API", "LangChain", "Prompt Engineering", "RLHF / Model Evaluation", "Agentic Workflows"] },
  { category: "Development", items: ["React", "Next.js", "TypeScript", "Python", "PHP", "REST APIs"] },
  { category: "Tools & Infra", items: ["Vercel", "AWS", "GitHub", "Docker", "Moodle / LMS", "Tailwind CSS"] },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "4rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-amber)",
          }}
        >
          01 / About
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* Left: bio */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "var(--color-parchment)",
              marginBottom: "1.5rem",
            }}
          >
  
            Rigorous by training.
            <br />
            <span style={{ color: "var(--color-amber)" }}>Builder</span> by instinct.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-muted)",
              marginBottom: "1.25rem",
            }}
          >
            I hold a double major in Computer Science and Physics and a Master's
            degree in Physics — a background that trained me to model complex
            systems, reason through challenges, and stay skeptical of
            easy answers.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-muted)",
              marginBottom: "1.25rem",
            }}
          >
            Today I research and train AI-powered applications: agentic systems, LLM
            integrations, and automation pipelines that solve real problems.
            My current work includes AI model evaluation at Mercor, where I
            write and assess physics-grounded prompts to improve reasoning
            capabilities in frontier models.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "var(--color-muted)",
            }}
          >
            I'm drawn to roles where innovation is a driving force, not a
            buzzword, and where change is embraced as a catalyst.
          </p>
        </div>

        {/* Right: skills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {skills.map((group) => (
            <div key={group.category}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-amber)",
                  marginBottom: "0.75rem",
                }}
              >
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--color-parchment-dim)",
                      border: "1px solid var(--color-border-light)",
                      padding: "4px 12px",
                      borderRadius: "2px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
