import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  priceStarting: string;
  targetIndustries: string;
  description: string;
  keyDeliverables: string[];
  icon: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "websites",
    title: "Websites & High-Converting Portals",
    category: "Full-Stack Development",
    priceStarting: "₹24,999*",
    targetIndustries: "D2C Brands, Exporters, Clinics",
    description:
      "Lightning-fast Next.js websites built with zero bloat. Engineered to achieve 90+ Core Web Vitals on budget mobile devices and spotty Indian 4G connections.",
    keyDeliverables: [
      "Sub-second LCP & mobile-first architecture",
      "Razorpay, UPI & Cashfree checkout readiness",
      "+91 phone validation & lead capture routing",
    ],
    icon: "🌐",
  },
  {
    id: "ai-agents",
    title: "AI Receptionists & Voice/Chat Agents",
    category: "Autonomous Systems",
    priceStarting: "₹18,500*",
    targetIndustries: "Clinics, Coaching Institutes, Real Estate",
    description:
      "Trained AI agents that respond immediately on WhatsApp and phone calls in Indian English and Hindi. Qualifies inquiries, answers FAQs, and books visits directly.",
    keyDeliverables: [
      "Instant WhatsApp click-to-chat auto responder",
      "Bilingual voice & text inquiry qualification",
      "Auto calendar booking into Google / CRM",
    ],
    icon: "🤖",
  },
  {
    id: "seo",
    title: "Technical SEO & Regional Search",
    category: "Organic Demand",
    priceStarting: "₹19,999*",
    targetIndustries: "Healthcare, Local Chains, B2B Exporters",
    description:
      "Dominate local Google Maps search and regional organic rankings in your city. Programmatic schema, entity optimization, and zero broken links.",
    keyDeliverables: [
      "Google Business Profile (GBP) ranking optimization",
      "Local schema markup for Indian business cities",
      "Technical audits & high-intent keyword capture",
    ],
    icon: "📈",
  },
  {
    id: "ads",
    title: "Google & Meta Performance Ads",
    category: "Paid Acquisition",
    priceStarting: "₹22,000*",
    targetIndustries: "D2C Brands, Coaching Centres, Real Estate",
    description:
      "Data-backed ad campaigns timed to Indian purchase triggers: festive seasons (Diwali, Eid, Akshaya Tritiya, New Year) and local high-intent search queries.",
    keyDeliverables: [
      "Festive campaign timing & dynamic creative sets",
      "WhatsApp click-to-chat ad campaign architectures",
      "Transparent ROAS dashboards & conversion tracking",
    ],
    icon: "🎯",
  },
  {
    id: "crm",
    title: "CRM Pipelines & Auto Syncs",
    category: "Operational Automation",
    priceStarting: "₹14,999*",
    targetIndustries: "Manufacturing, Exporters, Real Estate",
    description:
      "Stop losing leads in unorganized WhatsApp chats. Connect your website forms, calls, and ad campaigns directly into Zoho, HubSpot, or Google Sheets with automated alerts.",
    keyDeliverables: [
      "Instant WhatsApp alert to sales team upon new lead",
      "Automated GST invoice generation triggers",
      "Lead scoring and follow-up sequence engines",
    ],
    icon: "🔄",
  },
  {
    id: "maintenance",
    title: "Dedicated Maintenance & 24/7 Ops",
    category: "Ongoing Support",
    priceStarting: "₹8,999/mo*",
    targetIndustries: "All Indian Enterprises",
    description:
      "Never worry about site downtime, broken checkouts, or security vulnerabilities. A dedicated technical team available during 09:30–20:00 IST to push updates and keep systems bulletproof.",
    keyDeliverables: [
      "99.98% uptime monitoring & SSL renewals",
      "Emergency hotfix response under 30 minutes",
      "Monthly performance & lead throughput audits",
    ],
    icon: "🛡️",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-light-border dark:bg-dark-bg dark:border-dark-border">
      <Container size="default">
        {/* Section Heading with Business Context */}
        <ScrollReveal>
          <SectionHeading
            kicker="Core Service Capabilities"
            title="Digital Infrastructure Built For Indian Scale"
            description="Integrated web development, autonomous AI receptionists, and marketing pipelines tailored specifically for Indian operational realities and domestic buyer behavior."
            align="center"
            className="mb-14 sm:mb-16"
          />
        </ScrollReveal>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <ScrollReveal key={service.id} delayMs={(idx % 3) * 120} className="h-full">
              <Card
                variant="interactive"
                padding="lg"
                className="flex flex-col justify-between group hover:border-brand-red/30 transition-all duration-300 h-full"
              >
              <div>
                {/* Header: Category & Indicative Pricing */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-2xl" aria-hidden="true">
                    {service.icon}
                  </span>
                  <div className="text-right">
                    <span className="font-display font-bold text-sm sm:text-base text-brand-red dark:text-red-400">
                      {service.priceStarting}
                    </span>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-wider">
                      Indicative · +18% GST
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-display text-xl font-bold text-dark-bg dark:text-white mb-2 leading-snug group-hover:text-brand-red transition-colors">
                  {service.title}
                </h3>

                {/* Indian Target Verticals Badge */}
                <div className="mb-4">
                  <Badge variant="neutral" size="sm" className="text-[11px]">
                    Built for: {service.targetIndustries}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Deliverables Bulleted List */}
                <div className="pt-4 border-t border-light-border dark:border-dark-border mb-6">
                  <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2.5">
                    What You Get:
                  </p>
                  <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    {service.keyDeliverables.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-brand-red font-bold shrink-0">✓</span>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-2">
                <Link href="/contact" className="block w-full">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-between group-hover:border-brand-red/40 group-hover:bg-red-50/50 dark:group-hover:bg-red-950/20"
                    aria-label={`Discuss scope for ${service.title}`}
                  >
                    <span>Discuss Scope</span>
                    <span className="text-brand-red font-bold">→</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

        {/* Pricing Transparency Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            * All prices shown are indicative starting estimates tailored to Indian SMEs. Final quotes depend on custom technical scope, integration volume, and sprint timelines. Full 18% GST invoice provided with valid GSTIN.
          </p>
        </div>
      </Container>
    </section>
  );
}
