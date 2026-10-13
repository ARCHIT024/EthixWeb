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

---

### Entry 002: Refined Visual Direction & Cultural Design System
- **Date**: 2026-10-13
- **What**:
  - Integrated detailed visual direction guidelines into `CLAUDE.md`: restrained palette (Ethixweb brand red, warm ivory off-white, deep near-black, muted brass/gold accent), strict anti-kitsch prohibitions (no monuments/elephants/tricolour/mandala tropes).
  - Defined inline SVG micro-patterns (Jaali lattice, abstract Rangoli/kolam dot-grids capped under 2KB at 4-8% opacity).
  - Formalized Devanagari font subsetting and realistic market UX patterns (festive campaign angles, IST availability, ₹ + GST, WhatsApp first).
- **Why**:
  - High score in "Design + India fit (30%)" requires authentic, restrained, high-craft aesthetics rather than superficial clichés.
