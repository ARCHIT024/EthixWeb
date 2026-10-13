import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionSeam } from "@/components/patterns/SectionSeam";
import { SectionBackdrop } from "@/components/patterns/SectionBackdrop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProcessStep {
  stepNumber: string;
  title: string;
  timeline: string;
  deliverables: string;
  description: string;
  highlight: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discover & Scope",
    timeline: "Days 1–2",
    deliverables: "Technical Audit & Milestone Plan",
    description:
      "We unpack your business bottlenecks, evaluate current ad/lead leaks, and map your desired customer journey across WhatsApp, website, and CRM.",
    highlight: "Zero jargon consultation with technical operators",
  },
  {
    stepNumber: "02",
    title: "Architecture & Design",
    timeline: "Days 3–5",
    deliverables: "Mobile-First Prototypes & Copy",
    description:
      "Rapid Figma wireframing built strictly mobile-first. We write crisp, conversion-focused copy tailored to Indian buyers — no lorem ipsum placeholders.",
    highlight: "Review & sign off on real layouts before code is written",
  },
  {
    stepNumber: "03",
    title: "Engineering & AI Setup",
    timeline: "Days 6–10",
    deliverables: "Next.js Build & API Integrations",
    description:
      "Clean TypeScript development on Next.js App Router. We configure Razorpay/UPI checkout flows, +91 phone validation, and connect your AI receptionist.",
    highlight: "Server-side rendering for sub-second page loads",
  },
  {
    stepNumber: "04",
    title: "QA, Audit & Launch",
    timeline: "Days 11–12",
    deliverables: "90+ PageSpeed & Domain Cutover",
    description:
      "Rigorous performance testing across mobile devices and budget Android browsers. We verify GSTIN invoice generation, secure SSL, and go live with zero downtime.",
    highlight: "Verified 90+ Google PageSpeed score on mobile and desktop",
  },
  {
    stepNumber: "05",
    title: "Operate & Scale",
    timeline: "Day 13 onwards",
    deliverables: "IST Support & Pipeline Growth",
    description:
      "We handle ongoing maintenance, server uptime, security patches, and campaign tracking so your team stays 100% focused on fulfillment and revenue.",
    highlight: "Direct technical support during 09:30–20:00 IST",
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-[#FAF6EF] text-[#14110F] py-14 sm:py-[88px] border-t border-[rgba(184,146,74,0.5)] overflow-hidden">
      {/* Brass Seam Diamond */}
      <SectionSeam />

      {/* Bandhani Pattern Backdrop with Radial Mask */}
      <SectionBackdrop pattern="bandhani" opacity={0.1} />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-[760px] mx-auto mb-11">
            <span className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#B3202A] block mb-2">
              Delivery methodology
            </span>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-[#14110F] leading-[1.1] mb-3.5">
              From Discovery To Live Deployment in Under 14 Days
            </h2>
            <p className="text-[17px] text-[#5C5347] leading-relaxed max-w-[620px] mx-auto">
              A structured, predictable development roadmap with daily milestone updates. No endless delays or missing agency contacts.
            </p>
          </div>
        </ScrollReveal>

        {/* 5 Steps Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {PROCESS_STEPS.map((step, idx) => {
            const isLast = step.stepNumber === "05";
            return (
              <ScrollReveal key={step.stepNumber} delayMs={idx * 80} className="h-full">
                <div
                  className={`bg-white rounded-[16px] p-[26px] flex flex-col justify-between h-full border ${
                    isLast ? "border-[#B3202A]" : "border-[#E6DCCB]"
                  }`}
                >
                  <div>
                    {/* Big Step Number in #E3D5BD or #B3202A */}
                    <div
                      className={`font-display text-[44px] font-[800] leading-none mb-2 ${
                        isLast ? "text-[#B3202A]" : "text-[#E3D5BD]"
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    {/* Step Title */}
                    <h3 className="font-display text-[21px] font-bold text-[#14110F] mb-1 leading-snug">
                      {step.title}
                    </h3>

                    {/* Timeline & Deliverable */}
                    <div className="text-xs font-semibold text-[#8A6A2E] mb-3">
                      {step.timeline} · {step.deliverables}
                    </div>

                    {/* Description */}
                    <p className="text-[15px] text-[#5C5347] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Highlight */}
                  <div className="pt-3 border-t border-[#E6DCCB]">
                    <span className="text-[11px] text-[#5C5347] font-medium block">
                      ⚡ {step.highlight}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Process CTA Bar */}
        <ScrollReveal delayMs={150}>
          <div className="mt-12 rounded-[16px] bg-white border border-[#E6DCCB] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-[22px] font-bold text-[#14110F]">
                Ready to kick off your 14-day sprint?
              </h3>
              <p className="text-[15px] text-[#5C5347] mt-1">
                Book a 20-minute discovery call with our technical lead or chat on WhatsApp for a quick estimate.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[15px] transition-colors"
              >
                Schedule Discovery Call →
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hello%20Ethixweb%2C%20I%20would%20like%20to%20discuss%20a%20new%20sprint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-transparent border border-[#14110F] hover:bg-black/5 text-[#14110F] font-bold text-[15px] transition-colors"
              >
                WhatsApp Quick Estimate
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
