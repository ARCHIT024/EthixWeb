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
  description: string;
  icon: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "websites",
    title: "Websites & High-Converting Portals",
    category: "Full-Stack Web",
    priceStarting: "₹24,999*",
    description:
      "Lightning-fast Next.js websites built with zero bloat. Engineered for sub-second speeds on Indian 4G and seamless UPI checkouts.",
    icon: "🌐",
  },
  {
    id: "ai-agents",
    title: "AI Receptionists & Voice/Chat Agents",
    category: "AI Automation",
    priceStarting: "₹18,500*",
    description:
      "24/7 bilingual voice and chat agents that qualify patient and buyer inquiries, answer FAQs, and book consultations directly.",
    icon: "🤖",
  },
  {
    id: "seo",
    title: "Technical SEO & Regional Search",
    category: "Organic Demand",
    priceStarting: "₹19,999*",
    description:
      "Dominate local Google Maps search and regional organic rankings in your city with programmatic schema and entity optimization.",
    icon: "📈",
  },
  {
    id: "ads",
    title: "Google & Meta Performance Ads",
    category: "Paid Acquisition",
    priceStarting: "₹12,000*",
    description:
      "Data-backed ad campaigns timed to Indian purchase triggers: festive seasons, local search queries, and WhatsApp lead funnels.",
    icon: "🎯",
  },
  {
    id: "crm",
    title: "CRM Pipelines & Auto Syncs",
    category: "Data Pipelines",
    priceStarting: "₹14,999*",
    description:
      "Connect website forms, calls, and ad campaigns directly into Zoho, HubSpot, or Google Sheets with automated WhatsApp alerts.",
    icon: "🔄",
  },
  {
    id: "maintenance",
    title: "Dedicated Maintenance & 24/7 Ops",
    category: "Ongoing Support",
    priceStarting: "₹8,999/mo*",
    description:
      "Continuous uptime monitoring, security patches, and emergency hotfix response with a dedicated technical team during active IST hours.",
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

        {/* 6 Minimal & Sleek Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              delayMs={(idx % 3) * 100}
              className="h-full flex flex-col"
            >
              <div className="group bg-[#14110F] border border-[rgba(184,146,74,0.25)] rounded-[20px] p-6 sm:p-7 text-white flex-1 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#D9B873]/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                <div>
                  {/* Top: Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" aria-hidden="true">
                      {service.icon}
                    </span>
                    <span className="text-[11px] font-semibold text-[#D9B873] border border-[rgba(184,146,74,0.3)] rounded-full px-2.5 py-0.5 bg-[#1C1714]">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[20px] font-bold text-white leading-snug mb-3 md:min-h-[54px]">
                    {service.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-[14px] text-[#D8D0C4] leading-relaxed mb-6 md:min-h-[64px]">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Section: Indicative Price & Action */}
                <div className="pt-4 border-t border-white/[0.08] mt-auto">
                  <div className="flex items-baseline justify-between mb-3.5">
                    <span className="text-[11px] text-[#A89F90] uppercase tracking-wider font-mono">
                      Starting at
                    </span>
                    <div className="text-right">
                      <span className="font-display font-bold text-[17px] text-[#D9B873]">
                        {service.priceStarting}
                      </span>
                      <span className="text-[10px] text-[#A89F90] ml-1.5 font-normal">
                        (excl. 18% GST)
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-full min-h-[42px] px-4 rounded-xl bg-[#1C1714] border border-[rgba(184,146,74,0.3)] group-hover:border-[#D9B873]/80 group-hover:bg-[#1C1714]/90 text-white text-sm font-semibold transition-all"
                    aria-label={`Discuss scope for ${service.title}`}
                  >
                    <span>Discuss Scope</span>
                    <span className="text-[#D9B873] font-bold transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Link to Full Catalog */}
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D9B873] hover:text-[#f0d499] transition-colors"
          >
            <span>Explore full deliverables & specifications in our service catalog</span>
            <span>→</span>
          </Link>
        </div>

        {/* Pricing Transparency Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#A89F90] max-w-xl mx-auto">
            * All prices shown are indicative starting estimates tailored to Indian SMEs. Final quotes depend on custom technical scope, integration volume, and sprint timelines. Full 18% GST invoice provided with valid GSTIN.
          </p>
        </div>
      </Container>
    </section>
  );
}
