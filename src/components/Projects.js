"use client";

const projects = [
  {
    number: "01",
    title: "Physics Reasoning Evaluator",
    tags: ["Python", "Anthropic API", "RLHF"],
    description:
      "A structured evaluation harness for testing LLM performance on physics problems — from kinematics to quantum mechanics. Generates adversarial prompts, scores chain-of-thought reasoning, and surfaces failure modes in model responses. Built during model evaluation work at Mercor.",
    highlights: [
      "Systematic prompt taxonomy across 6 physics domains",
      "Automated scoring pipeline with rubric-based grading",
      "Identified 3 consistent reasoning failure modes in tested models",
    ],
    link: "https://github.com/janedoe/physics-eval",
    demo: null,
    featured: true,
  },
  {
    number: "02",
    title: "Document Q&A Agent",
    tags: ["Next.js", "OpenAI API", "LangChain", "Vercel"],
    description:
      "A production-deployed RAG application that lets users upload PDFs and ask questions against them. Built with a streaming response UI, citation tracking, and chunk-level retrieval scoring. Demonstrates full-stack AI development from API integration to deployed UI.",
    highlights: [
      "Streaming responses with real-time citation display",
      "Chunk relevance scoring surfaced to the user",
      "Deployed to Vercel with edge functions for low latency",
    ],
    link: "https://github.com/janedoe/doc-qa-agent",
    demo: "https://doc-qa.vercel.app",
    featured: true,
  },
  {
    number: "03",
    title: "Agentic Workflow Prototype",
    tags: ["Python", "LangChain", "OpenAI", "REST APIs"],
    description:
      "A multi-step AI agent that autonomously gathers, summarizes, and routes information across external APIs. Demonstrates tool use, memory management, and graceful error handling in an agentic loop. Designed to showcase build-vs-buy reasoning with documented architecture decisions.",
    highlights: [
      "Tool-use with 4 external API integrations",
      "Structured decision log for every agent action",
      "Handles partial failures with fallback routing",
    ],
    link: "https://github.com/janedoe/agentic-workflow",
    demo: null,
    featured: false,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "120px 48px",
        backgroundColor: "var(--color-ink-soft)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "4rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-amber)",
            }}
          >
            02 / Projects
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "var(--color-border)",
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-parchment)",
            marginBottom: "3.5rem",
            maxWidth: "600px",
            lineHeight: 1.2,
          }}
        >
          Selected work — built,{" "}
          <span style={{ color: "var(--color-amber)" }}>shipped,</span> and
          documented.
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
        padding: "2.5rem",
        backgroundColor: "var(--color-ink)",
        transition: "border-color 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-light)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
    >
      {/* Corner accent */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "3px",
            height: "60px",
            backgroundColor: "var(--color-amber)",
          }}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3.5rem",
            fontWeight: 700,
            color: "var(--color-border-light)",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {project.number}
        </span>

        <div>
          {/* Title + links */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
              gap: "1rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--color-parchment)",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  paddingTop: "4px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--color-amber)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-muted)")
                }
              >
                GitHub ↗
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-amber)",
                    textDecoration: "none",
                    paddingTop: "4px",
                  }}
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-amber)",
                  border: "1px solid rgba(200,134,26,0.3)",
                  padding: "2px 8px",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--color-muted)",
              marginBottom: "1.25rem",
            }}
          >
            {project.description}
          </p>

          {/* Highlights */}
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {project.highlights.map((h) => (
              <li
                key={h}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "var(--color-parchment-dim)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "var(--color-amber)",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  →
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
