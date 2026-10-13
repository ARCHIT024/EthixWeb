import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionSeam } from "@/components/patterns/SectionSeam";
import { SectionBackdrop } from "@/components/patterns/SectionBackdrop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface IndustrySector {
  title: string;
  chipLabel: string;
  icon: string;
  focusArea: string;
  cities: string;
}

const INDIAN_SECTORS: IndustrySector[] = [
  {
    title: "D2C & Quick Commerce Brands",
    chipLabel: "D2C & e-commerce",
    icon: "🛍️",
    focusArea: "Headless Next.js speed, 1-click UPI checkout, and festive surge optimization.",
    cities: "Bengaluru, Mumbai, Delhi NCR, Surat",
  },
  {
    title: "Clinics, Doctors & Diagnostics",
    chipLabel: "Clinics & diagnostics",
    icon: "🩺",
    focusArea: "24/7 WhatsApp AI appointment booking, OPD slot management, and local Google Maps SEO.",
    cities: "Hyderabad, Chennai, Pune, Ahmedabad",
  },
  {
    title: "Coaching Institutes & EdTech",
    chipLabel: "Coaching & ed-tech",
    icon: "📚",
    focusArea: "High-volume inquiry qualification, WhatsApp counseling bots, and student lead scoring.",
    cities: "Kota, Delhi NCR, Jaipur, Patna",
  },
  {
    title: "Real Estate Builders & Brokers",
    chipLabel: "Real estate",
    icon: "🏢",
    focusArea: "Interactive project floorplans, site visit automation, and instant RERA-compliant lead routing.",
    cities: "Gurugram, Noida, Bengaluru, Thane",
  },
  {
    title: "B2B Manufacturing & Exporters",
    chipLabel: "Manufacturing & exports",
    icon: "🏭",
    focusArea: "International multi-currency RFQ spec portals, Zoho CRM sync, and global export SEO.",
    cities: "Ludhiana, Rajkot, Coimbatore, Morbi",
  },
  {
    title: "Hospitality & Multi-Outlet Chains",
    chipLabel: "Hospitality",
    icon: "🍽️",
    focusArea: "Direct online reservation systems, QR menu flows, and local multi-location reputation management.",
    cities: "Goa, Mumbai, Kolkata, Chandigarh",
  },
  {
    title: "Legal, CA & Corporate Advisory",
    chipLabel: "Legal & CA firms",
    icon: "⚖️",
    focusArea: "Client consultation onboarding flows, secure document intake, and GST/compliance knowledge bases.",
    cities: "Delhi, Mumbai, Bengaluru, Hyderabad",
  },
  {
    title: "Logistics & Fleet Operators",
    chipLabel: "Logistics",
    icon: "🚛",
    focusArea: "Consignment tracking web portals, driver WhatsApp alerts, and internal ops copilots.",
    cities: "Nagpur, Chennai, Indore, Kolkata",
  },
];

export function IndustriesSection() {
  return (
    <section className="relative bg-[#1C1714] text-white py-14 sm:py-[88px] border-t border-[rgba(184,146,74,0.5)] overflow-hidden">
      {/* Brass Seam Diamond */}
      <SectionSeam />

      {/* Ikat Pattern Backdrop with Radial Mask */}
      <SectionBackdrop pattern="ikat" opacity={0.05} />

      <Container size="default" className="relative z-10 text-center">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="max-w-[760px] mx-auto mb-8">
            <span className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#E0414B] block mb-2">
              Market specialisation
            </span>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-white leading-[1.1] mb-3.5">
              Engineered For High-Growth Indian Sectors
            </h2>
            <p className="text-[17px] text-[#D8D0C4] leading-relaxed max-w-[620px] mx-auto">
              We do not build generic templates. Each industry has unique operational friction points — from WhatsApp appointment drop-offs to festive advertising surges. Here is how we tailor each build.
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Industry Chips Bar matching reference */}
        <ScrollReveal delayMs={80}>
          <div className="flex gap-3 justify-center flex-wrap max-w-[900px] mx-auto mb-10">
            {INDIAN_SECTORS.map((sector) => (
              <span
                key={sector.chipLabel}
                className="inline-flex items-center gap-1.5 px-[18px] py-[10px] rounded-full text-[15px] font-medium border border-[rgba(184,146,74,0.4)] text-white bg-[#14110F] select-none hover:border-[#D9B873] transition-colors"
              >
                <span>{sector.icon}</span>
                <span>{sector.chipLabel}</span>
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Industry Sector Detailed Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {INDIAN_SECTORS.map((sector, index) => (
            <ScrollReveal key={sector.title} delayMs={(index % 4) * 80}>
              <div className="h-full rounded-2xl border border-[rgba(184,146,74,0.3)] bg-[#14110F] p-5 flex flex-col justify-between hover:border-[#D9B873]/60 transition-colors">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-xl" aria-hidden="true">
                      {sector.icon}
                    </span>
                    <h3 className="font-display text-sm font-bold text-white">
                      {sector.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#D8D0C4] leading-relaxed mb-3">
                    {sector.focusArea}
                  </p>
                </div>

                <div className="text-[11px] text-[#A89F90] pt-2 border-t border-white/10 flex items-center gap-1">
                  <span className="text-[#E0414B]" aria-hidden="true">📍</span>
                  <span>Hubs: {sector.cities}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Context Callout */}
        <ScrollReveal delayMs={150}>
          <div className="mt-10 text-center">
            <p className="text-xs text-[#A89F90]">
              Operating in a niche not listed above?{" "}
              <Link href="/contact" className="text-[#E0414B] font-semibold hover:underline">
                Tell us about your operational stack
              </Link>{" "}
              and we will prepare a tailored technical blueprint within 24 hours.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
