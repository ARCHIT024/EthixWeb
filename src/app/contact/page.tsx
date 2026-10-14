import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { RangoliDivider } from "@/components/patterns/RangoliDivider";
import { IstStatusBadge } from "@/components/layout/IstStatusBadge";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact & Start a Project",
  description:
    "Direct contact channels for Ethixweb India. Connect via WhatsApp, direct email, or phone. Operating hours in IST with GST-compliant invoicing.",
};

const ADDRESS_BLOCKS = [
  {
    city: "Bengaluru (Primary Technical Hub)",
    tag: "Core Engineering",
    address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India",
    focus: "AI Research, Full-Stack Architecture & Sprint Delivery",
  },
  {
    city: "Delhi NCR (Operations Satellite)",
    tag: "Client Strategy",
    address: "Cyber City, DLF Phase 2, Gurugram, Haryana 122002, India",
    focus: "Enterprise Growth, Performance Marketing & B2B Invoicing",
  },
  {
    city: "Mumbai (Commercial Presence)",
    tag: "B2B Relations",
    address: "Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India",
    focus: "D2C Brand Partnerships & Retail Integrations",
  },
];

export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hi Ethixweb, I would like to discuss a project scope for my business (Web / AI / SEO / Ads / CRM)."
    );

  return (
    <div className="flex-1 flex flex-col selection:bg-brand-red selection:text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-14 sm:pb-20 bg-light-bg text-dark-bg">
        <JaaliPattern opacity={0.06} inverted={false} />

        <Container size="default" className="relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge variant="red" dot size="md">
                Direct Communication
              </Badge>
              <IstStatusBadge />
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-dark-bg leading-[1.12]">
              Start a Direct Conversation With Our Senior Team
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              Whether you need a full 14-day web sprint, an autonomous WhatsApp AI receptionist, or a high-converting ad funnel. Direct technical responses within 15 minutes during IST operational hours.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Main Contact Grid */}
      <section className="py-12 bg-white border-y border-light-border dark:bg-dark-bg dark:border-dark-border">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Primary Action Channels (WhatsApp & Direct Channels) */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal>
                {/* WhatsApp Fast-Track Hero Card */}
                <Card padding="lg" className="border-l-4 border-l-[#25D366] bg-emerald-50/20 dark:bg-dark-surface">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="success" dot size="sm">
                      Recommended Fast-Track
                    </Badge>
                    <span className="text-xs text-emerald-800 dark:text-emerald-400 font-bold">
                      Avg Response: &lt;15 mins
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-2">
                    Chat With Us on WhatsApp (+91)
                  </h2>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    Skip email ping-pong. Share your website URL or current operational bottleneck directly with our technical lead for an instant scope breakdown and estimate.
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] font-semibold text-white shadow-md shadow-emerald-900/10 gap-2"
                      leftIcon={
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.494c-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526s-.676-1.629-.927-2.231c-.244-.587-.493-.507-.677-.516-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.507 0 1.479 1.078 2.908 1.228 3.109.15.2 2.121 3.239 5.138 4.542.718.311 1.279.497 1.716.636.721.229 1.377.197 1.896.119.579-.087 1.782-.728 2.033-1.43.25-.702.25-1.303.175-1.429-.075-.126-.276-.201-.577-.352z" />
                        </svg>
                      }
                    >
                      Open WhatsApp Chat (+91 98765 43210) →
                    </Button>
                  </a>
                </Card>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                {/* Email & Phone Contact Card */}
                <Card padding="lg" className="bg-light-bg/50 dark:bg-dark-surface">
                  <h3 className="font-display text-lg font-bold text-dark-bg dark:text-white mb-4">
                    Direct Inquiries &amp; RFP Submissions
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0" aria-hidden="true">
                        ✉️
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                          Official Business Email
                        </span>
                        <a
                          href="mailto:hello@ethixweb.com"
                          className="text-base font-semibold text-brand-red hover:underline"
                        >
                          hello@ethixweb.com
                        </a>
                        <p className="text-xs text-gray-500 mt-0.5">
                          For RFPs, formal enterprise statements of work, and NDA requests.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-light-border dark:border-dark-border">
                      <span className="text-xl shrink-0" aria-hidden="true">
                        📞
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                          Direct Phone Line
                        </span>
                        <a
                          href="tel:+919876543210"
                          className="text-base font-semibold text-dark-bg dark:text-white hover:text-brand-red"
                        >
                          +91 98765 43210
                        </a>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Operational line active Monday through Saturday.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-light-border dark:border-dark-border">
                      <span className="text-xl shrink-0" aria-hidden="true">
                        ⏱️
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">
                          Active Operating Hours (IST)
                        </span>
                        <span className="text-sm font-semibold text-dark-bg dark:text-white">
                          09:30 AM – 08:00 PM IST (Mon – Sat)
                        </span>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Sunday: Automated emergency monitoring only.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-light-border dark:border-dark-border">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                        Official Social Channels
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href="https://www.linkedin.com/company/ethixweb/home/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border text-xs font-medium text-dark-bg dark:text-gray-200 hover:text-brand-red dark:hover:text-red-400 hover:border-brand-red/30 transition-colors"
                        >
                          <span>LinkedIn</span>
                          <span className="text-[10px] text-gray-400">↗</span>
                        </a>
                        <a
                          href="https://www.instagram.com/ethix.web/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border text-xs font-medium text-dark-bg dark:text-gray-200 hover:text-brand-red dark:hover:text-red-400 hover:border-brand-red/30 transition-colors"
                        >
                          <span>Instagram</span>
                          <span className="text-[10px] text-gray-400">↗</span>
                        </a>
                        <a
                          href="https://x.com/ETHIXWEB"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border text-xs font-medium text-dark-bg dark:text-gray-200 hover:text-brand-red dark:hover:text-red-400 hover:border-brand-red/30 transition-colors"
                        >
                          <span>X (Twitter)</span>
                          <span className="text-[10px] text-gray-400">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Form Slot Teaser (Form Component Integration Point) */}
            <div className="lg:col-span-6">
              <ScrollReveal delayMs={150}>
                <Card padding="lg" className="h-full flex flex-col justify-between bg-white dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="brass" size="sm">
                        Detailed Proposal Route
                      </Badge>
                      <span className="text-[11px] text-gray-400 font-mono">
                        18% GST Invoicing
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-2">
                      Submit Project Scope
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      Tell us about your project objectives. Our technical lead will review your submission and provide an itemized timeline and fixed ₹ quote within 24 hours.
                    </p>

                    {/* Interactive Contact Form with Zod Validation & Anti-Spam */}
                    <ContactForm />
                  </div>

                  {/* Privacy & Compliance Assurance */}
                  <div className="pt-6 border-t border-light-border dark:border-dark-border mt-6">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Strict NDA &amp; Privacy Protected
                      </span>
                      <span>GSTIN: 07AAAAA0000A1Z5</span>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Map-Free Address Block (High-Speed & Zero External Script Bloat) */}
      <section className="py-20 sm:py-24 bg-light-bg dark:bg-dark-surface">
        <Container size="default">
          <ScrollReveal>
            <SectionHeading
              kicker="Domestic Footprint"
              title="Map-Free Domestic Presence Across India"
              description="We deliberately avoid slow, battery-draining Google Maps iframes to protect page performance and guarantee sub-second load times."
              align="center"
              className="mb-14"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ADDRESS_BLOCKS.map((item, index) => (
              <ScrollReveal key={item.city} delayMs={index * 90}>
                <Card
                  variant="default"
                  padding="lg"
                  className="h-full flex flex-col justify-between bg-white dark:bg-dark-bg border-light-border dark:border-dark-border hover:border-brand-red/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl" aria-hidden="true">
                        📍
                      </span>
                      <Badge variant="neutral" size="sm" className="text-[10px]">
                        {item.tag}
                      </Badge>
                    </div>

                    <h3 className="font-display text-base font-bold text-dark-bg dark:text-white mb-2">
                      {item.city}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {item.address}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-light-border dark:border-dark-border text-[11px] text-gray-500">
                    <strong className="text-dark-bg dark:text-gray-300">Hub Focus:</strong>{" "}
                    {item.focus}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <RangoliDivider opacity={0.25} inverted={false} className="mt-14" />
        </Container>
      </section>
    </div>
  );
}
