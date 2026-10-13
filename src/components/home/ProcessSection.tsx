import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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
    <section className="py-20 sm:py-28 bg-light-bg text-dark-bg border-t border-light-border dark:bg-dark-surface dark:border-dark-border">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          kicker="Delivery Methodology"
          title="From Discovery To Live Deployment in Under 14 Days"
          description="A structured, predictable development roadmap with daily milestone updates. No endless delays or missing agency contacts."
          align="center"
          className="mb-14 sm:mb-16"
        />

        {/* 5 Steps Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <Card
              key={step.stepNumber}
              variant="default"
              padding="md"
              className="relative flex flex-col justify-between border-t-4 border-t-brand-red dark:border-t-brand-red bg-white dark:bg-dark-bg"
            >
              <div>
                {/* Step Number & Timeline Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-extrabold text-3xl text-gray-300 dark:text-gray-700">
                    {step.stepNumber}
                  </span>
                  <Badge variant="brass" size="sm" className="font-mono">
                    {step.timeline}
                  </Badge>
                </div>

                {/* Step Title */}
                <h3 className="font-display text-lg font-bold text-dark-bg dark:text-white mb-1.5">
                  {step.title}
                </h3>

                {/* Deliverable Badge */}
                <p className="text-xs font-semibold text-brand-red dark:text-red-400 mb-3">
                  {step.deliverables}
                </p>

                {/* Description */}
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Bottom Key Highlight */}
              <div className="pt-3 border-t border-light-border dark:border-dark-border">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                  ⚡ {step.highlight}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Process CTA Bar */}
        <div className="mt-14 rounded-2xl bg-white border border-light-border p-6 sm:p-8 dark:bg-dark-bg dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="font-display text-xl font-bold text-dark-bg dark:text-white">
              Ready to kick off your 14-day sprint?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Book a 20-minute discovery call with our technical lead or chat on WhatsApp for a quick estimate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Schedule Discovery Call →
              </Button>
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20Ethixweb%2C%20I%20would%20like%20to%20discuss%20a%20new%20sprint"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md">
                WhatsApp Quick Estimate
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
