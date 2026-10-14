import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { RangoliDivider } from "@/components/patterns/RangoliDivider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us · The India Story",
  description:
    "Ethixweb is a global engineering and digital operations team with an active India hub. Learn our ethos, operating hours across IST and US timezones, and working style.",
};

interface ShiftSchedule {
  timeWindow: string;
  phase: string;
  description: string;
  activeRegions: string;
}

const WORKING_HOURS_TIMELINE: ShiftSchedule[] = [
  {
    timeWindow: "09:30 – 13:30 IST",
    phase: "India Morning Operations & Client Sprints",
    description:
      "Active client communication, sprint milestone standups, urgent campaign adjustments, and real-time WhatsApp coordination with Indian founders.",
    activeRegions: "Bengaluru, Delhi NCR, Mumbai, Hyderabad",
  },
  {
    timeWindow: "13:30 – 18:30 IST",
    phase: "Deep Engineering & AI Fine-Tuning",
    description:
      "Uninterrupted coding blocks: Next.js component implementation, Supabase database schema migrations, and prompt optimization for conversational AI receptionists.",
    activeRegions: "Core Technical Engineering Pods",
  },
  {
    timeWindow: "18:30 – 20:00 IST",
    phase: "Milestone Demos & India Wrap-Up",
    description:
      "Staging preview releases sent to clients for review, daily progress digests logged, and readiness checks for next-day ad campaigns.",
    activeRegions: "Domestic Client Sign-Offs",
  },
  {
    timeWindow: "20:00 – 23:30 IST",
    phase: "Global Overlap & US Morning Sync",
    description:
      "Strategic alignment with global cloud infrastructure, overseas API partners, and export client hand-offs (overlapping with US Eastern / Pacific morning).",
    activeRegions: "US & Global B2B Overlap",
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col selection:bg-brand-red selection:text-white">
      {/* Hero: The Honest Story */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 bg-light-bg text-dark-bg">
        <JaaliPattern opacity={0.06} inverted={false} />

        <Container size="default" className="relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-dark-bg leading-[1.12]">
              Global Engineering Standards. Rooted in India.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              Ethixweb originated as a digital operations and software team serving high-standard international businesses. Today, through our dedicated India hub, we bring that exact Silicon Valley-grade technical rigor to ambitious Indian SMBs, clinics, D2C brands, and exporters.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Honest Background & Values */}
      <section className="py-16 bg-white border-y border-light-border dark:bg-dark-bg dark:border-dark-border">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Story Statement */}
            <div className="lg:col-span-5">
              <ScrollReveal className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red dark:text-red-400">
                  Who We Are
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-bg dark:text-white leading-[1.2]">
                  No Fake Awards. No Bureaucracy. Just Senior Operators.
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Traditional Indian agencies often suffer from two extremes: cheap freelancers who disappear halfway through a build, or bloated legacy agencies that charge exorbitant retainers while delegating your work to junior trainees.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Ethixweb is built on a tight-knit model: senior developers, performance marketers, and automation engineers collaborating directly with business owners on transparent 14-day sprints.
                </p>
              </ScrollReveal>
            </div>

            {/* Core Values (4 Cards) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ScrollReveal delayMs={60} className="h-full">
                <Card padding="md" className="h-full flex flex-col justify-start bg-light-bg/50 dark:bg-dark-surface">
                  <span className="text-2xl mb-2 block" aria-hidden="true">
                    🎯
                  </span>
                  <h3 className="font-display text-base font-bold text-dark-bg dark:text-white mb-1.5">
                    Zero Vanity Code
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    We don&apos;t ship complex frameworks where simple HTML works, and we never add animations that harm mobile LCP or increase battery drain on Indian smartphones.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delayMs={120} className="h-full">
                <Card padding="md" className="h-full flex flex-col justify-start bg-light-bg/50 dark:bg-dark-surface">
                  <span className="text-2xl mb-2 block" aria-hidden="true">
                    🧾
                  </span>
                  <h3 className="font-display text-base font-bold text-dark-bg dark:text-white mb-1.5">
                    18% GST Compliant
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    As a registered Indian business, every milestone invoice includes valid GSTIN details so your accounting team can claim full Input Tax Credit without friction.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delayMs={180} className="h-full">
                <Card padding="md" className="h-full flex flex-col justify-start bg-light-bg/50 dark:bg-dark-surface">
                  <span className="text-2xl mb-2 block" aria-hidden="true">
                    ⚡
                  </span>
                  <h3 className="font-display text-base font-bold text-dark-bg dark:text-white mb-1.5">
                    Direct Line Access
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    You communicate with your lead engineer directly via dedicated WhatsApp groups and Slack. No account managers acting as games of telephone.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delayMs={240} className="h-full">
                <Card padding="md" className="h-full flex flex-col justify-start bg-light-bg/50 dark:bg-dark-surface">
                  <span className="text-2xl mb-2 block" aria-hidden="true">
                    🌐
                  </span>
                  <h3 className="font-display text-base font-bold text-dark-bg dark:text-white mb-1.5">
                    Global Craft, Domestic INR
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    We apply the exact same high-precision Next.js and AI architectures we deploy for global platforms, priced fairly for Indian domestic growth.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Operational Hours Timeline Across IST & US Hours */}
      <section className="py-20 sm:py-28 bg-light-bg dark:bg-dark-surface">
        <Container size="default">
          <ScrollReveal>
            <SectionHeading
              title="How We Work Across IST &amp; Global Timezones"
              description="Our dual-timezone operational flow ensures rapid domestic execution during Indian business hours with global infrastructure synergy."
              align="center"
              className="mb-14"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKING_HOURS_TIMELINE.map((item, index) => (
              <ScrollReveal key={item.timeWindow} delayMs={index * 80}>
                <Card
                  variant="default"
                  padding="lg"
                  className="h-full flex flex-col justify-between bg-white dark:bg-dark-bg border-light-border dark:border-dark-border"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="brass" size="sm" className="font-mono text-[10px]">
                        Phase 0{index + 1}
                      </Badge>
                      <span className="text-[11px] font-bold text-brand-red font-mono">
                        {item.timeWindow}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-dark-bg dark:text-white mb-2 leading-snug">
                      {item.phase}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-light-border dark:border-dark-border text-[11px] text-gray-500 font-medium">
                    📍 {item.activeRegions}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <RangoliDivider opacity={0.25} inverted={false} className="mt-14" />

          {/* Bottom Action */}
          <ScrollReveal delayMs={150}>
            <div className="text-center mt-6">
              <h3 className="font-display text-xl font-bold text-dark-bg dark:text-white mb-2">
                Ready to collaborate with a serious technical partner?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Book a 20-minute discovery consultation to review your current tech stack.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Schedule a Consultation →
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
