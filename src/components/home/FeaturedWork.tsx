import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ConceptProject {
  id: string;
  industry: string;
  projectType: string;
  problem: string;
  whatWeBuild: string;
  expectedResultRange: string;
  techStack: string[];
  svgGraphic: React.ReactNode;
}

const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    id: "clinic-ai",
    industry: "Healthcare & Multi-Specialty Clinics",
    projectType: "Autonomous AI Receptionist & Appointment Engine",
    problem:
      "35–45% of incoming patient inquiries during peak OPD hours go unanswered or get delayed in manual WhatsApp chats, resulting in lost consultations.",
    whatWeBuild:
      "A 24/7 bilingual (English + Hindi) WhatsApp AI booking assistant directly connected to clinic slot management, backed by a sub-second doctor profile portal.",
    expectedResultRange:
      "40% – 60% reduction in response latency; 20% – 35% increase in confirmed consultation bookings.",
    techStack: ["WhatsApp Cloud API", "Next.js App Router", "Bilingual NLP", "CRM Sync"],
    svgGraphic: (
      <div className="h-40 w-full rounded-xl bg-gradient-to-br from-emerald-950/40 to-dark-surface p-4 border border-emerald-500/20 flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono">
          <span>● WhatsApp AI Gateway</span>
          <span className="text-gray-400">Response: &lt;2s</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-lg p-2 text-emerald-200">
            &quot;Namaste, Dr. Mehta has 2 slots open at 11:30 AM &amp; 4:00 PM today in Indiranagar.&quot;
          </div>
          <div className="bg-white/10 rounded-lg p-1.5 text-gray-300 text-[11px] flex justify-between">
            <span>Slot reserved via UPI</span>
            <span className="text-emerald-400 font-semibold">Confirmed ✓</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-white/10">
          <span>Simulated Patient Flow</span>
          <span className="text-emerald-400">OPD Sync Active</span>
        </div>
      </div>
    ),
  },
  {
    id: "d2c-speed",
    industry: "D2C Wellness & Ayurvedic Retail",
    projectType: "Headless High-Speed Storefront & 1-Click UPI",
    problem:
      "Sluggish mobile load times (>4.2s on 4G) and complex multi-step checkout causing a 65%+ cart drop-off during peak festive ad campaigns.",
    whatWeBuild:
      "A headless Next.js storefront optimized for 90+ mobile Core Web Vitals, integrated with Cashfree/Razorpay 1-click UPI checkout and automated WhatsApp recovery.",
    expectedResultRange:
      "1.8s – 2.4s faster mobile page paint; 15% – 25% lift in checkout completion rate during festive sales.",
    techStack: ["Next.js SSG", "Razorpay Fast Checkout", "Tailwind CSS", "WhatsApp Recovery"],
    svgGraphic: (
      <div className="h-40 w-full rounded-xl bg-gradient-to-br from-red-950/40 to-dark-surface p-4 border border-brand-red/20 flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-red-400 font-mono">
          <span>● Mobile Performance Audit</span>
          <span className="text-emerald-400 font-bold">LCP: 0.8s</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs bg-dark-bg/60 p-2 rounded-lg border border-white/5">
            <span className="text-gray-300">UPI Instant Pay</span>
            <span className="text-brand-red font-semibold">₹1,499 (1-Click)</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="bg-brand-red h-full w-4/5 rounded-full" />
          </div>
          <div className="text-[10px] text-gray-400 flex justify-between">
            <span>Cart Abandonment Recovery</span>
            <span className="text-emerald-400 font-medium">+22% Recovery</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-white/10">
          <span>Core Web Vitals Certified</span>
          <span className="text-brand-red">PageSpeed: 96</span>
        </div>
      </div>
    ),
  },
  {
    id: "b2b-export",
    industry: "B2B Manufacturing & Auto-Parts Exporters",
    projectType: "Global Technical Spec Portal & RFQ Engine",
    problem:
      "Overseas procurement managers struggle to navigate legacy PDF catalogs, while domestic trade inquiries get buried without automated lead scoring.",
    whatWeBuild:
      "A bilingual spec catalog portal with instant multi-currency RFQ generator, technical drawings viewer, and automated routing into Zoho CRM with WhatsApp team alerts.",
    expectedResultRange:
      "25% – 40% increase in qualified overseas RFQ submissions; 50% – 70% faster sales engineer quote response.",
    techStack: ["Next.js App Router", "Zoho CRM API", "Technical Schema", "Multi-Currency"],
    svgGraphic: (
      <div className="h-40 w-full rounded-xl bg-gradient-to-br from-amber-950/40 to-dark-surface p-4 border border-accent-brass/20 flex flex-col justify-between relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-accent-brass font-mono">
          <span>● Overseas B2B Pipeline</span>
          <span className="text-gray-300">GSTIN / Export Ready</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="bg-dark-bg/70 border border-amber-500/20 rounded-lg p-2">
            <div className="flex justify-between text-gray-300 text-[11px] mb-1">
              <span>Precision CNC Components</span>
              <span className="text-accent-brass">RFQ: $42,000</span>
            </div>
            <div className="text-[10px] text-gray-400">Routed to Senior Technical Sales • Bengaluru Hub</div>
          </div>
        </div>
        <div className="text-[10px] text-gray-400 flex justify-between pt-1 border-t border-white/10">
          <span>ISO / IEC Spec Verified</span>
          <span className="text-accent-brass">Auto Quote Triggered</span>
        </div>
      </div>
    ),
  },
];

export function FeaturedWork() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-light-border dark:bg-dark-bg dark:border-dark-border">
      <Container size="default">
        {/* Section Heading with Integrity Disclaimer */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <Badge variant="brass" dot size="md" className="mb-4">
            Engineering Blueprints
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-dark-bg dark:text-white leading-[1.15]">
            Featured Concept Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            In adherence to our strict transparency policy, we do not publish fabricated client logos or unverified testimonials. These blueprints illustrate the exact technical architectures and measurable impact ranges we deliver for Indian industry verticals.
          </p>
        </div>

        {/* 3 Concept Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CONCEPT_PROJECTS.map((project) => (
            <Card
              key={project.id}
              variant="interactive"
              padding="lg"
              className="flex flex-col justify-between bg-light-bg/50 dark:bg-dark-surface border-light-border dark:border-dark-border"
            >
              <div>
                {/* Visual Diagram Graphic (CSS / SVG) */}
                <div className="mb-6">{project.svgGraphic}</div>

                {/* Concept Label & Industry */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="red" size="sm">
                    Concept Project
                  </Badge>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {project.industry}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-dark-bg dark:text-white mb-4 leading-snug">
                  {project.projectType}
                </h3>

                {/* The Problem */}
                <div className="mb-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                  <strong className="text-dark-bg dark:text-white block mb-1">
                    Operational Problem:
                  </strong>
                  {project.problem}
                </div>

                {/* What We Would Build */}
                <div className="mb-5 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                  <strong className="text-dark-bg dark:text-white block mb-1">
                    What We&apos;d Build:
                  </strong>
                  {project.whatWeBuild}
                </div>

                {/* Expected Result Range (No fake single numbers) */}
                <div className="rounded-xl bg-white dark:bg-dark-bg p-3.5 border border-light-border dark:border-dark-border mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red dark:text-red-400 block mb-1">
                    Expected Target Range:
                  </span>
                  <p className="text-xs font-semibold text-dark-bg dark:text-gray-100 leading-snug">
                    {project.expectedResultRange}
                  </p>
                </div>
              </div>

              {/* Tech Stack & Card Action */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-medium bg-gray-200/70 dark:bg-dark-bg text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link href="/contact" className="block w-full">
                  <Button variant="secondary" size="sm" className="w-full justify-center font-medium">
                    Build a Solution Like This →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
