const experiences = [
  {
    period: "2023 – Present",
    role: "AI Model Evaluator",
    company: "Mercor",
    type: "Part-time / Contract",
    description:
      "Develop and assess physics-based prompts to evaluate reasoning quality in frontier language models. Work includes constructing adversarial test cases, scoring chain-of-thought responses against rubrics, and identifying systematic failure modes — contributing directly to RLHF data pipelines.",
    skills: ["Prompt Engineering", "Model Evaluation", "Physics Reasoning", "RLHF"],
  },
  {
    period: "2022 – 2024",
    role: "Educational Technologist",
    company: "Austin College — IT Department",
    type: "Full-time",
    description:
      "Sole administrator for the college's Moodle LMS — responsible for platform maintenance, faculty training, and integrations with institutional systems. Also maintained 3D printer lab, provided tier-2 technical support, and documented institutional IT processes.",
    skills: ["Moodle / LMS", "Systems Administration", "Technical Support", "Documentation"],
  },
  {
    period: "2019 – 2022",
    role: "M.S. Physics",
    company: "Graduate Studies",
    type: "Academic",
    description:
      "Advanced study in computational and theoretical physics. Developed strong foundations in mathematical modeling, simulation, data analysis, and technical writing. Thesis research required designing experiments, building analysis pipelines, and presenting results to mixed audiences.",
    skills: ["Computational Physics", "Data Analysis", "Python", "LaTeX", "Research Methodology"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
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
          03 / Experience
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-border)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {experiences.map((exp, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: "2.5rem",
              paddingBottom: i < experiences.length - 1 ? "3.5rem" : "0",
              marginBottom: i < experiences.length - 1 ? "3.5rem" : "0",
              borderBottom:
                i < experiences.length - 1
                  ? "1px solid var(--color-border)"
                  : "none",
            }}
          >
            {/* Left: meta */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-amber)",
                  marginBottom: "0.4rem",
                }}
              >
                {exp.period}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                }}
              >
                {exp.type}
              </p>
            </div>

            {/* Right: content */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "var(--color-parchment)",
                  marginBottom: "0.25rem",
                }}
              >
                {exp.role}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--color-amber)",
                  marginBottom: "1rem",
                  letterSpacing: "0.03em",
                }}
              >
                {exp.company}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  color: "var(--color-muted)",
                  marginBottom: "1.25rem",
                }}
              >
                {exp.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-muted)",
                      border: "1px solid var(--color-border-light)",
                      padding: "3px 10px",
                      borderRadius: "2px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
