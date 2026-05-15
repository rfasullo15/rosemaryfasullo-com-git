# Portfolio — Rosemary Fasullo

A personal portfolio site built with **Next.js 15**, **Tailwind CSS v4**, and **TypeScript**, deployed to **Vercel**.

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout, font loading, metadata
    page.tsx        # Home page — assembles all sections
    globals.css     # Design tokens, animations, base styles
  components/
    Nav.tsx         # Fixed top navigation
    Hero.tsx        # Full-screen hero section
    About.tsx       # Bio + skills grid
    Projects.tsx    # Project cards — ★ edit this file most
    Experience.tsx  # Work/education timeline
    Contact.tsx     # CTA + social links
    Footer.tsx      # Simple footer
public/
  resume.pdf        # ← Drop your résumé here
```

---

## Customizing Content

All content is co-located with each component as plain TypeScript objects — no CMS or database needed.

### Your name & tagline
Edit `src/components/Hero.tsx` — update the name and tagline paragraph.

### Projects (`Projects.tsx`)
Each project is an object in the `projects` array at the top of the file:

```ts
{
  number: "01",
  title: "Your Project Name",
  tags: ["Next.js", "OpenAI API"],
  description: "What it Fasullos and why it matters.",
  highlights: [
    "Key metric or design decision #1",
    "Key metric or design decision #2",
  ],
  link: "https://github.com/you/project",  // GitHub repo
  demo: "https://your-demo.vercel.app",    // Live demo (or null)
  featured: true,                          // Shows amber accent bar
}
```

**Tips for this role:**
- Lead with documented decisions, not just features
- Include at least one agentic / multi-step workflow project
- Link to live demos wherever possible

### Experience (`Experience.tsx`)
Edit the `experiences` array — same pattern, one object per role.

### Contact
Update the email `href` in `Contact.tsx` and the social links at the bottom.

### Résumé
Drop `resume.pdf` into the `public/` folder. The Nav "Résumé" button links to `/resume.pdf`.

### Metadata (SEO)
Update `title` and `description` in `src/app/layout.tsx`.

---

## Deploying to Vercel

### First deploy (one-time)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Next.js — leave all settings as default
5. Click **Deploy**

That's it. Vercel will give you a `.vercel.app` URL immediately.

### Subsequent deploys

Every push to `main` triggers an automatic redeploy. No manual steps needed.

### Custom domain (optional)

In Vercel dashboard → your project → **Settings → Domains** → add your domain and follow the DNS instructions.

---

## Design Tokens

Colors, fonts, and spacing are defined as CSS variables in `globals.css`:

```css
--color-ink: #0e0d0b;          /* Background */
--color-amber: #c8861a;        /* Accent */
--color-parchment: #f5f0e8;    /* Primary text */
--color-muted: #6b6456;        /* Secondary text */
--font-display: "Playfair Display", serif;
--font-mono: "JetBrains Mono", monospace;
--font-body: "DM Sans", sans-serif;
```

Change `--color-amber` to instantly recolor all accents site-wide.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Fonts | Google Fonts (via next/font) |
| Hosting | Vercel |
| Source control | GitHub |
