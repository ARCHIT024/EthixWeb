# Engineering & Product Decisions Log (DECISIONS.md)

This log records major architectural, design, and implementation decisions made throughout the EthixWeb India redesign assessment.

---

### Entry 001: Project Scaffolding, Governance & Performance Baseline
- **Date**: 2026-10-13
- **What**:
  - Initialized Git repository on `main` branch.
  - Scaffolded Next.js (App Router) with TypeScript, Tailwind CSS, and ESLint in standard `src/` layout.
  - Established project constraints and rules in `CLAUDE.md`.
  - Configured `.gitignore` to strictly exclude all `.env*` files while allowing `.env.example`.
  - Created `.env.example` defining environment variables for Supabase, Turnstile, and site URL.
  - Created `public/brand/` directory for brand assets.
- **Why**:
  - Adhering to the 24-hour assessment rubric requires strict enforcement of Core Web Vitals, minimal client JS footprint, zero committed secrets, and consistent architectural standards from the very first commit.
  - Using Next.js App Router with Server Components by default guarantees near-zero baseline client-side JavaScript overhead on marketing pages, ensuring 90+ PageSpeed scores on mobile and desktop.
