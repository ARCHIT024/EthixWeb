# Project Context: EthixWeb India Redesign

## 1. Assessment Overview
- **Goal**: 24-hour hiring assessment delivering an India-specific redesign of [ethixweb.com](https://ethixweb.com).
- **Agency Domain**: Websites, AI automation, SEO, Google/Meta ads, and CRM integrations.
- **Evaluation Criteria**:
  - **Design + India fit (30%)**: Curated visual aesthetics tailored for the Indian business ecosystem, culturally resonance without cliché.
  - **UI/UX (20%)**: Intuitive user flows, clear information architecture, high-converting conversion points.
  - **Backend + Code Quality (20%)**: Clean TypeScript, robust Supabase Postgres schema/Auth, type safety, modular structure.
  - **PageSpeed 90+ Mobile & Desktop (20%)**: Core Web Vitals excellence, tiny JS bundle footprint, optimal asset delivery.
  - **Polish (10%)**: Flawless typography, smooth micro-interactions, responsive precision.
- **Absolute Non-Negotiables**:
  - ❌ ZERO lorem ipsum (all copy must be realistic, industry-specific, and conversion-focused).
  - ❌ ZERO broken links (internal navigation and anchors must resolve).
  - ❌ ZERO console errors or unhandled exceptions.
  - ❌ NEVER commit secrets or real credentials (.env* ignored; use `.env.example`).

---

## 2. Core Architecture & Tech Stack Rules
- **Framework**: Next.js (App Router, latest stable) with TypeScript.
- **Styling**: Tailwind CSS (clean utility structure, tailored design tokens).
- **Backend & Database**: Supabase (PostgreSQL + Supabase Auth) deployed on Vercel.
- **Rendering Strategy**:
  - **Static by Default**: All marketing and public pages must be statically generated (`export const dynamic = 'force-static'` or SSG).
  - **Dynamic Boundaries**: ONLY `/admin` and `/api` routes are dynamic.
- **Client JS Budget**:
  - Server Components by default.
  - `"use client"` is restricted to isolated interactive leaf components only (e.g. form inputs, toggles, mobile menu drawer).
- **Performance Budget & Script Governance**:
  - Strictly **NO heavy libraries** (no Three.js, Spline, heavy 3D canvases, or bulky animation runtimes).
  - Use high-performance CSS transitions and minimal SVG micro-animations instead.
  - **NO third-party tracking or heavy scripts** except Cloudflare Turnstile, which must be lazy-loaded on form interaction.

---

## 3. Brand & Aesthetics Guidelines
- **Color Identity**:
  - Primary Accent: **Ethixweb Red** (`#E11D48` / `#DC2626` / crimson-red tones balanced with deep zinc/slate dark hues and crisp modern white surfaces).
  - Background & Contrast: Sophisticated dark mode option or rich high-contrast light surfaces with glassmorphic cards and subtle red ambient glow.
- **Logo Asset**: Standardized brand mark located at `/public/brand/logo.webp`.
- **Integrity Guideline**:
  - **Never invent fake client names or fake testimonials**.
  - Use explicitly labelled **"Concept Projects"** or **"Strategic Blueprints"** to demonstrate technical and agency execution depth.

---

## 4. India-Specific Strategic Pillars (Chosen Ideas)
1. **WhatsApp Direct CTA**: Click-to-chat integration (`wa.me`) with pre-filled context for rapid lead capture popular across Indian SMEs and founders.
2. **Transparent ₹ Pricing + 18% GST**: Indian Rupee (INR / ₹) pricing packages with explicit GST breakdown and B2B invoice generation readiness.
3. **+91 Phone Validation**: Form inputs built specifically for Indian telecom formats (10-digit mobile number validation with +91 prefix).
4. **Indian Industry Verticals**: Tailored service modules addressing high-growth Indian business sectors:
   - D2C & Quick Commerce Brands
   - B2B Manufacturing & Export Houses
   - Healthcare & Multi-specialty Clinics
   - EdTech, Coaching & Professional Academies
   - Regional Enterprises & Tech Startups
5. **Subtle Jaali Motif**: High-performance, lightweight geometric SVG lattice/Jaali patterns integrated as subtle background accents and section separators.
6. **EN / HI (English / हिंदी) Hero Toggle**: Bilingual value-proposition toggle on the hero section for instant localized resonance.

---

## 5. Development Workflow & Decision Logging
- Keep a running **`DECISIONS.md`** file in the repository root.
- After every task, add a short entry specifying:
  - **What**: The changes made or features implemented.
  - **Why**: The architectural or business rationale behind the decision.
- **Git Push Policy**: **NEVER run `git push` without explicit user permission**. All changes must only be committed locally unless the user specifically asks to push.

## Visual direction (applies to every page and component)

Goal: premium, modern, world-class, with India expressed through restrained craft details and market-relevant content. India should show up in the details, never as costume.

Palette
- Primary: Ethixweb brand red (sampled from the logo). Deep near-black for text/dark sections. Warm ivory off-white background. Neutral greys.
- One accent only: a muted brass/gold, used sparingly (small highlights, dividers, icons).
- Do NOT use saturated saffron/orange, green+white+orange combinations, or Holi-style multicolour gradients.

Pattern language (SVG, inline, each under 2KB, always low opacity, 4-8%)
- Jaali: fine geometric lattice. Use as a hero background texture and a faint overlay on dark sections and cards.
- Rangoli/kolam: abstract dot-grid and symmetric line geometry (not literal festival imagery). Use for section dividers, the form success state animation, and empty states in /admin.
- Maximum one pattern per viewport. Patterns support content; they never compete with text or reduce contrast below WCAG AA.

Do NOT use
- Monuments (Taj Mahal, India Gate), elephants, peacocks, mandalas, Om symbols, tricolour, stock photos of saris/turbans, or clip-art "Indian" fonts.

Typography
- Clean modern sans for body, one confident display face. Devanagari (Noto Sans Devanagari, subsetted) only for Hindi text.

India expressed through content and UX
- WhatsApp as primary contact, ₹ pricing + GST, +91 validation, Indian industries and cities, IST availability, festive-season campaign angle (Diwali, wedding season, IPL season, year-end sale), mobile-first and light on data.

Tone: confident, warm, direct. Not "namaste" kitsch, no forced Hinglish.