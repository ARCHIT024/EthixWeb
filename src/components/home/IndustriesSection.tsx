import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface IndustrySector {
  title: string;
  icon: string;
  focusArea: string;
  cities: string;
}

const INDIAN_SECTORS: IndustrySector[] = [
  {
    title: "D2C & Quick Commerce Brands",
    icon: "🛍️",
    focusArea: "Headless Next.js speed, 1-click UPI checkout, and festive surge optimization.",
    cities: "Bengaluru, Mumbai, Delhi NCR, Surat",
  },
  {
    title: "Clinics, Doctors & Diagnostics",
    icon: "🩺",
    focusArea: "24/7 WhatsApp AI appointment booking, OPD slot management, and local Google Maps SEO.",
    cities: "Hyderabad, Chennai, Pune, Ahmedabad",
  },
  {
    title: "Coaching Institutes & EdTech",
    icon: "📚",
    focusArea: "High-volume inquiry qualification, WhatsApp counseling bots, and student lead scoring.",
    cities: "Kota, Delhi NCR, Jaipur, Patna",
  },
  {
    title: "Real Estate Builders & Brokers",
    icon: "🏢",
    focusArea: "Interactive project floorplans, site visit automation, and instant RERA-compliant lead routing.",
    cities: "Gurugram, Noida, Bengaluru, Thane",
  },
  {
    title: "B2B Manufacturing & Exporters",
    icon: "🏭",
    focusArea: "International multi-currency RFQ spec portals, Zoho CRM sync, and global export SEO.",
    cities: "Ludhiana, Rajkot, Coimbatore, Morbi",
  },
  {
    title: "Hospitality & Multi-Outlet Chains",
    icon: "🍽️",
    focusArea: "Direct online reservation systems, QR menu flows, and local multi-location reputation management.",
    cities: "Goa, Mumbai, Kolkata, Chandigarh",
  },
  {
    title: "Legal, CA & Corporate Advisory",
    icon: "⚖️",
    focusArea: "Client consultation onboarding flows, secure document intake, and GST/compliance knowledge bases.",
    cities: "Delhi, Mumbai, Bengaluru, Hyderabad",
  },
  {
    title: "Logistics & Fleet Operators",
    icon: "🚛",
    focusArea: "Consignment tracking web portals, driver WhatsApp alerts, and internal ops copilots.",
    cities: "Nagpur, Chennai, Indore, Kolkata",
  },
];

export function IndustriesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white border-t border-light-border dark:bg-dark-bg dark:border-dark-border">
      <Container size="default">
        {/* Section Heading */}
        <ScrollReveal>
          <SectionHeading
            kicker="Market Specialization"
            title="Engineered For High-Growth Indian Sectors"
            description="We do not build generic templates. Each industry has unique operational friction points — from WhatsApp appointment drop-offs to festive advertising surges. Here is how we tailor each build."
            align="center"
            className="mb-14 sm:mb-16"
          />
        </ScrollReveal>

        {/* Industry Sector Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {INDIAN_SECTORS.map((sector, index) => (
            <ScrollReveal key={sector.title} delayMs={(index % 4) * 80}>
              <div
                className="group h-full rounded-2xl border border-light-border bg-light-bg/60 p-5 dark:border-dark-border dark:bg-dark-surface/60 hover:border-brand-red/40 hover:bg-white dark:hover:bg-dark-surface hover:shadow-sm transition-all duration-200 card-lift-effect"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">
                    {sector.icon}
                  </span>
                  <h3 className="font-display text-sm font-bold text-dark-bg dark:text-white group-hover:text-brand-red transition-colors">
                    {sector.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                  {sector.focusArea}
                </p>

                <div className="text-[10px] text-gray-400 dark:text-gray-500 font-medium pt-2 border-t border-light-border/60 dark:border-dark-border/60 flex items-center gap-1">
                  <span className="text-brand-red" aria-hidden="true">📍</span>
                  <span>Active in: {sector.cities}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Context Callout */}
        <ScrollReveal delayMs={150}>
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500">
              Operating in a niche not listed above?{" "}
              <Link href="/contact" className="text-brand-red font-semibold hover:underline">
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
