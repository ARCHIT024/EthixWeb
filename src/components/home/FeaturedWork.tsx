import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionSeam } from "@/components/patterns/SectionSeam";
import { SectionBackdrop } from "@/components/patterns/SectionBackdrop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ConceptProject {
  id: string;
  industry: string;
  projectType: string;
  problem: string;
  whatWeBuild: string;
  expectedResultRange: string;
  techStack: string[];
}

const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    id: "clinic-ai",
    industry: "CONCEPT · HEALTHCARE",
    projectType: "Autonomous AI Receptionist & Appointment Engine",
    problem:
      "35–45% of incoming patient inquiries during peak OPD hours go unanswered or get delayed in manual WhatsApp chats, resulting in lost consultations.",
    whatWeBuild:
      "A 24/7 bilingual (English + Hindi) WhatsApp AI booking assistant directly connected to clinic slot management, backed by a sub-second doctor profile portal.",
    expectedResultRange:
      "40% – 60% reduction in response latency; 20% – 35% increase in confirmed consultation bookings.",
    techStack: ["WhatsApp Cloud API", "Next.js App Router", "Bilingual NLP", "CRM Sync"],
  },
  {
    id: "d2c-speed",
    industry: "CONCEPT · D2C",
    projectType: "Headless High-Speed Storefront & 1-Click UPI",
    problem:
      "Sluggish mobile load times (>4.2s on 4G) and complex multi-step checkout causing a 65%+ cart drop-off during peak festive ad campaigns.",
    whatWeBuild:
      "A headless Next.js storefront optimized for 90+ mobile Core Web Vitals, integrated with Cashfree/Razorpay 1-click UPI checkout and automated WhatsApp recovery.",
    expectedResultRange:
      "1.8s – 2.4s faster mobile page paint; 15% – 25% lift in checkout completion rate during festive sales.",
    techStack: ["Next.js SSG", "Razorpay Fast Checkout", "Tailwind CSS", "WhatsApp Recovery"],
  },
  {
    id: "b2b-export",
    industry: "CONCEPT · B2B EXPORT",
    projectType: "Global Technical Spec Portal & RFQ Engine",
    problem:
      "Overseas procurement managers struggle to navigate legacy PDF catalogs, while domestic trade inquiries get buried without automated lead scoring.",
    whatWeBuild:
      "A bilingual spec catalog portal with instant multi-currency RFQ generator, technical drawings viewer, and automated routing into Zoho CRM with WhatsApp team alerts.",
    expectedResultRange:
      "25% – 40% increase in qualified overseas RFQ submissions; 50% – 70% faster sales engineer quote response.",
    techStack: ["Next.js App Router", "Zoho CRM API", "Technical Schema", "Multi-Currency"],
  },
];

export function FeaturedWork() {
  return (
    <section className="relative bg-[#14110F] text-white py-14 sm:py-[88px] border-t border-[rgba(184,146,74,0.5)] overflow-hidden">
      {/* Brass Seam Diamond */}
      <SectionSeam />

      {/* Stepwell Pattern Backdrop with Radial Mask */}
      <SectionBackdrop pattern="stepwell" opacity={0.045} />

      <Container size="default" className="relative z-10">
        {/* Section Heading with Integrity Disclaimer */}
        <ScrollReveal>
          <div className="text-center max-w-[760px] mx-auto mb-11">
            <span className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#E0414B] block mb-2">
              Engineering blueprints
            </span>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-white leading-[1.1] mb-3.5">
              Featured Concept Projects
            </h2>
            <p className="text-[17px] text-[#D8D0C4] leading-relaxed max-w-[620px] mx-auto">
              Concept blueprints, not fabricated client claims. These illustrate the technical architectures and impact ranges we deliver for Indian industry verticals.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Concept Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CONCEPT_PROJECTS.map((project, idx) => (
            <ScrollReveal key={project.id} delayMs={idx * 120} className="h-full">
              <div className="bg-[#1C1714] border border-[rgba(184,146,74,0.3)] rounded-[16px] p-[26px] text-white flex flex-col justify-between h-full transition-colors hover:border-[#D9B873]/60">
                <div>
                  {/* Category Pill Tag */}
                  <div className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#D9B873] mb-3">
                    {project.industry}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[21px] font-bold text-white mb-3 leading-snug">
                    {project.projectType}
                  </h3>

                  {/* The Problem */}
                  <div className="mb-3 text-[14px] leading-relaxed text-[#D8D0C4]">
                    <strong className="text-white block text-xs uppercase tracking-wider mb-1">
                      Problem:
                    </strong>
                    {project.problem}
                  </div>

                  {/* What We Would Build */}
                  <div className="mb-4 text-[14px] leading-relaxed text-[#D8D0C4]">
                    <strong className="text-white block text-xs uppercase tracking-wider mb-1">
                      What We Build:
                    </strong>
                    {project.whatWeBuild}
                  </div>

                  {/* Expected Result Range */}
                  <div className="rounded-xl bg-[#14110F] p-3 border border-[rgba(184,146,74,0.25)] mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9B873] block mb-1">
                      Expected Result Range:
                    </span>
                    <p className="text-xs font-semibold text-white leading-snug">
                      {project.expectedResultRange}
                    </p>
                  </div>
                </div>

                {/* Tech Stack & Card Action */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium bg-[#14110F] text-[#D8D0C4] border border-white/10 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact" className="block w-full">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full min-h-[44px] px-4 rounded-xl bg-[#14110F] border border-[rgba(184,146,74,0.3)] hover:border-[#D9B873] hover:bg-[#1C1714] text-white text-sm font-semibold transition-colors cursor-pointer"
                      aria-label={`Build a solution like ${project.projectType}`}
                    >
                      Build a Solution Like This →
                    </button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
