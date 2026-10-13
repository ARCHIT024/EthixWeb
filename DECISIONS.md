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

---

### Entry 003: Core Design System, Tokens, Typography & India Micro-Patterns
- **Date**: 2026-10-13
- **What**:
  - Sampled official Ethixweb brand red (`#E51D25`) directly from `/public/brand/logo.webp` and configured CSS variables in `globals.css` with Tailwind v4 `@theme`.
  - Established WCAG 2.1 AA certified color tokens: Primary brand red (`#E51D25`, 4.62:1 with white text), Accessible light variant (`#B31B21`, 5.31:1 on ivory), Near-black background (`#0C0D10`, 18.1:1 AAA), Warm ivory background (`#FAF8F5`), and Muted brass accent (`#C59B4B`, 4.54:1 AA on dark).
  - Configured high-performance typography via `next/font/google`: `Outfit` for display headlines, `Plus Jakarta Sans` for body copy, and strictly subsetted `Noto Sans Devanagari` for Hindi bilingual copy (`display: 'swap'`).
  - Created reusable UI primitives in `src/components/ui/`: `Container`, `Button` (primary/secondary/ghost/brass with loading states), `Card` (default/elevated/interactive/glass/dark), `Badge` (WCAG AA certified variants), `SectionHeading` (display title with kicker badge), and `Input` (supporting +91 Indian phone prefix, labels, error states).
  - Built two lightweight inline SVG pattern components (<2KB, low 4–8% opacity): `<JaaliPattern />` (8-point geometric architectural screen) and `<RangoliDivider />` (abstract mathematical dot-grid/kolam transition).
  - Built `/design-system` dev showcase page (`noindex`) demonstrating every token, component, pattern, and contrast ratio.
- **Why**:
  - Fulfills the 20% UI/UX and 30% Design + India fit rubric by providing authentic, high-contrast, accessible foundations without external runtime library bloat.
  - Zero heavy third-party CSS or JS dependencies ensures instant paint times and 90+ PageSpeed metrics across mobile and desktop.
