import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionSeam } from "@/components/patterns/SectionSeam";
import { SectionBackdrop } from "@/components/patterns/SectionBackdrop";
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
    priceStarting: "₹12,000*",
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
    <section className="relative bg-[#1C1714] text-white py-14 sm:py-[88px] border-t border-[rgba(184,146,74,0.35)] overflow-hidden">
      {/* Brass Seam Diamond */}
      <SectionSeam />

      {/* Kolam Pattern Backdrop with Radial Mask */}
      <SectionBackdrop pattern="kolam" opacity={0.05} />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-[760px] mx-auto mb-11">
            <span className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#E0414B] block mb-2">
              Core service capabilities
            </span>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-white leading-[1.1] mb-3.5">
              Digital Infrastructure Built For Indian Scale
            </h2>
            <p className="text-[17px] text-[#D8D0C4] leading-relaxed max-w-[620px] mx-auto">
              Web, AI and marketing pipelines tailored to Indian operations and buyers.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_DATA.map((service, idx) => (
            <ScrollReveal key={service.id} delayMs={(idx % 3) * 100} className="h-full">
              <div className="bg-[#14110F] border border-[rgba(184,146,74,0.3)] rounded-[16px] p-[26px] text-white flex flex-col justify-between h-full transition-colors hover:border-[#D9B873]/60">
                <div>
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="font-display text-[21px] font-bold text-white leading-snug">
                      {service.title}
                    </h3>
                    <span className="text-2xl shrink-0" aria-hidden="true">
                      {service.icon}
                    </span>
                  </div>

                  {/* Target Industry Badge */}
                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-medium text-[#D9B873] border border-[rgba(184,146,74,0.3)] rounded-full px-2.5 py-0.5">
                      Built for: {service.targetIndustries}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] text-[#D8D0C4] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Price Starting */}
                  <div className="font-bold text-[15px] text-[#D9B873] mb-4">
                    {service.priceStarting}
                    <span className="text-[11px] font-normal text-[#A89F90] ml-2">
                      (excl. 18% GST)
                    </span>
                  </div>

                  {/* Key Deliverables Bulleted List */}
                  <div className="pt-3 border-t border-white/10 mb-4">
                    <ul className="space-y-1.5 text-xs text-[#D8D0C4]">
                      {service.keyDeliverables.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#E0414B] font-bold shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-full min-h-[44px] px-4 rounded-xl bg-[#1C1714] border border-[rgba(184,146,74,0.3)] hover:border-[#D9B873] hover:bg-[#14110F] text-white text-sm font-semibold transition-colors"
                    aria-label={`Discuss scope for ${service.title}`}
                  >
                    <span>Discuss Scope</span>
                    <span className="text-[#D9B873] font-bold">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pricing Transparency Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#A89F90] max-w-xl mx-auto">
            * All prices shown are indicative starting estimates tailored to Indian SMEs. Final quotes depend on custom technical scope, integration volume, and sprint timelines. Full 18% GST invoice provided with valid GSTIN.
          </p>
        </div>
      </Container>
    </section>
  );
}
