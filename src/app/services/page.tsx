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

export const metadata: Metadata = {
  title: "Services & Capabilities Catalog",
  description:
    "Explore Ethixweb's digital infrastructure services: Websites, AI Agents, Growth, CRM Data Integrations, Accessibility, and Support. Transparent ₹ pricing + 18% GST.",
};

interface ServiceDetail {
  id: string;
  category: string;
  title: string;
  indicativePrice: string;
  timeline: string;
  targetIndustries: string;
  description: string;
  deliverables: string[];
  icon: string;
}

const ALL_SERVICES: ServiceDetail[] = [
  {
    id: "websites",
    category: "Full-Stack Development",
    title: "Websites & High-Speed Web Applications",
    indicativePrice: "₹24,999*",
    timeline: "10–14 Days",
    targetIndustries: "D2C Brands, Exporters, Clinics, Real Estate",
    description:
      "Modern Next.js web applications engineered for sub-second page loads on Indian mobile networks. Completely bespoke layouts without slow bloated WordPress plugins or generic templates.",
    deliverables: [
      "Next.js App Router & TypeScript architecture",
      "90+ Google PageSpeed mobile & desktop guarantee",
      "+91 phone validation & Razorpay / UPI payment readiness",
      "Tailwind CSS custom design system & zero layout shift",
      "Static pre-rendering (SSG) for instant edge delivery",
    ],
    icon: "🌐",
  },
  {
    id: "ai",
    category: "Autonomous Systems",
    title: "AI Receptionists & Custom Workflow Agents",
    indicativePrice: "₹18,500*",
    timeline: "7–10 Days",
    targetIndustries: "Healthcare Clinics, Coaching, Advisory, Hospitality",
    description:
      "Trained conversational voice and chat agents operating 24/7 on WhatsApp and phone lines. Handles patient and student inquiries in Indian English and Hindi with instant calendar booking.",
    deliverables: [
      "WhatsApp Cloud API integration & webhook routing",
      "Bilingual (English + Hindi) conversational prompting",
      "Direct calendar booking into Google Calendar / CRM",
      "Automated appointment reminders & cancellation handling",
      "Human escalation hand-off trigger for complex queries",
    ],
    icon: "🤖",
  },
  {
    id: "growth",
    category: "Performance Acquisition",
    title: "Growth, Regional SEO & Performance Ads",
    indicativePrice: "₹22,000/mo*",
    timeline: "14–21 Day Setup",
    targetIndustries: "D2C Brands, Coaching Centres, Real Estate",
    description:
      "Paid ads and organic search infrastructure designed around Indian festive purchase cycles and local city intent. Connects directly to WhatsApp for rapid prospect conversion.",
    deliverables: [
      "Google Ads Search & Meta Ads campaign architecture",
      "WhatsApp click-to-chat ad funnels for Indian buyers",
      "Google Business Profile (GBP) ranking & local map SEO",
      "Festive timing campaigns (Diwali, Eid, New Year sales)",
      "Weekly transparent ROAS & cost-per-lead dashboards",
    ],
    icon: "📈",
  },
  {
    id: "data",
    category: "Operational Automation",
    title: "Data Pipelines & CRM Integrations",
    indicativePrice: "₹14,999*",
    timeline: "5–8 Days",
    targetIndustries: "B2B Manufacturing, Exporters, Retail Chains",
    description:
      "Bridge your website leads, WhatsApp chats, and ad conversions into a unified operational hub. Eliminate manual copy-pasting into spreadsheets and never miss a follow-up.",
    deliverables: [
      "Zoho CRM, HubSpot, or LeadSquared bidirectional sync",
      "Instant WhatsApp alert to sales team upon new inquiry",
      "Automated GST invoice generation triggers via webhooks",
      "Lead qualification scoring & automated follow-up emails",
      "Custom analytics sync to Google BigQuery or Sheets",
    ],
    icon: "🔄",
  },
  {
    id: "accessibility",
    category: "Technical Perfection",
    title: "Accessibility & Core Web Vitals Optimization",
    indicativePrice: "₹12,500*",
    timeline: "4–7 Days",
    targetIndustries: "Public Portals, High-Traffic Brands, Healthcare",
    description:
      "Comprehensive accessibility and performance tune-up for existing web properties. We ensure your web platform meets WCAG 2.1 AA standards and loads smoothly on budget Android devices.",
    deliverables: [
      "Full WCAG 2.1 AA contrast, keyboard, and screen-reader audit",
      "Largest Contentful Paint (LCP) reduction under 1.5s",
      "Cumulative Layout Shift (CLS) elimination to 0",
      "Modern WebP/AVIF asset optimization pipeline",
      "Cross-browser audit on Chrome, Safari, and Jio devices",
    ],
    icon: "⚡",
  },
  {
    id: "support",
    category: "Ongoing Operations",
    title: "Ongoing Maintenance & 24/7 Operations",
    indicativePrice: "₹8,999/mo*",
    timeline: "Continuous Retainer",
    targetIndustries: "All Indian Enterprises",
    description:
      "A dedicated technical partner on retainer. We handle uptime monitoring, server security, emergency bug fixes, and continuous improvements during active IST operational hours.",
    deliverables: [
      "99.98% uptime monitoring & automatic SSL renewals",
      "Sub-30-minute hotfix response for critical blockers",
      "Dedicated WhatsApp hotline during 09:30–20:00 IST",
      "Monthly performance, security, and lead throughput audits",
      "Included minor feature updates and copy changes",
    ],
    icon: "🛡️",
  },
];

const FAQS = [
  {
    question: "Do you provide official B2B GST tax invoices?",
    answer:
      "Yes, 100%. Ethixweb is a registered Indian entity. Every project quote and invoice comes with an itemized 18% GST breakdown and our valid GSTIN, allowing Indian companies to claim full Input Tax Credit (ITC).",
  },
  {
    question: "What domestic payment options are accepted?",
    answer:
      "We accept all major Indian payment rails: NEFT / RTGS / IMPS bank transfers, UPI (Google Pay, PhonePe, Paytm), and domestic corporate credit cards through Razorpay.",
  },
  {
    question: "Are the starting prices shown fixed or indicative?",
    answer:
      "The prices displayed are indicative starting estimates tailored to typical SME project scopes. After a brief 20-minute discovery call, you receive a transparent, fixed-scope proposal with no hidden hourly surprises.",
  },
  {
    question: "Do I own 100% of the code and digital assets?",
    answer:
      "Yes. Upon project completion and final milestone clearance, complete ownership of the source code repository, deployment accounts, domain settings, and API configurations is transferred directly to your organization.",
  },
  {
    question: "How does communication work during a sprint?",
    answer:
      "We avoid cumbersome ticketing queues. You get a dedicated Slack channel or WhatsApp direct group with our senior engineers and sprint lead, active Monday through Saturday during 09:30–20:00 IST.",
  },
  {
    question: "Can we hire Ethixweb on a dedicated monthly retainer?",
    answer:
      "Yes. For growing businesses that require continuous full-stack web engineering, AI enhancements, and ad optimization, we offer dedicated monthly sprint retainers with guaranteed engineering hours.",
  },
];

export default function ServicesPage() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent("Hi Ethixweb, I want to discuss a service from your catalog.");

  return (
    <div className="py-12 sm:py-20 bg-light-bg text-dark-bg selection:bg-brand-red selection:text-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden pb-16 sm:pb-24">
        <JaaliPattern opacity={0.05} inverted={false} />

        <Container size="default" className="relative z-10 text-center max-w-3xl mx-auto">
          <Badge variant="red" dot size="md" className="mb-4">
            Capabilities &amp; Scope
          </Badge>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-dark-bg leading-[1.12]">
            Digital Capabilities Built For Real Business Throughput
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
            From high-speed Next.js web applications to autonomous 24/7 AI receptionists. Transparent indicative ₹ pricing, 18% GST invoices, and predictable sprint delivery.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Get an Itemized Quote →
              </Button>
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="md">
                WhatsApp Direct Consultation
              </Button>
            </a>
          </div>
        </Container>
      </section>

      {/* Services Grid (6 Comprehensive Categories) */}
      <section className="py-12 bg-white border-y border-light-border dark:bg-dark-bg dark:border-dark-border">
        <Container size="default">
          <SectionHeading
            kicker="Detailed Offerings"
            title="Six Core Disciplines. Zero Agency Fluff."
            description="Explore our standardized service blocks engineered to remove operational bottlenecks and accelerate revenue."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service) => (
              <Card
                key={service.id}
                variant="interactive"
                padding="lg"
                className="flex flex-col justify-between bg-light-bg/40 dark:bg-dark-surface border-light-border dark:border-dark-border"
              >
                <div>
                  {/* Category Pill & Price */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-3xl" aria-hidden="true">
                      {service.icon}
                    </span>
                    <div className="text-right">
                      <span className="font-display font-bold text-base text-brand-red dark:text-red-400">
                        {service.indicativePrice}
                      </span>
                      <span className="block text-[10px] text-gray-400 font-mono">
                        {service.timeline}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent-brass-dark dark:text-accent-brass block mb-1">
                    {service.category}
                  </span>

                  <h2 className="font-display text-xl font-bold text-dark-bg dark:text-white mb-2 leading-snug">
                    {service.title}
                  </h2>

                  <div className="mb-4">
                    <Badge variant="neutral" size="sm" className="text-[11px]">
                      Ideal for: {service.targetIndustries}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-light-border dark:border-dark-border mb-6">
                    <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2.5">
                      Included Deliverables:
                    </p>
                    <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-red font-bold shrink-0">✓</span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2">
                  <Link href="/contact" className="block w-full">
                    <Button variant="secondary" size="sm" className="w-full justify-between font-medium">
                      <span>Book Consultation</span>
                      <span className="text-brand-red font-bold">→</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center text-xs text-gray-500">
            * All starting prices are indicative baseline estimates. Detailed statement of work provided after scoping. All invoices include 18% GST.
          </div>
        </Container>
      </section>

      {/* FAQ Section Using Native <details> (Accessible, Zero Client JS Bloat) */}
      <section className="py-20 sm:py-28 bg-light-bg dark:bg-dark-surface">
        <Container size="narrow">
          <SectionHeading
            kicker="Frequently Asked Questions"
            title="Clear Answers on Delivery, Pricing &amp; GST"
            description="Straightforward answers to the questions Indian business leaders ask us before starting a project."
            align="center"
            className="mb-12"
          />

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-light-border bg-white p-5 dark:border-dark-border dark:bg-dark-bg transition-colors shadow-2xs open:border-brand-red/40"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-dark-bg dark:text-gray-100 select-none list-none font-display">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-light-bg text-gray-500 group-open:rotate-180 group-open:bg-brand-red group-open:text-white transition-transform duration-200">
                    <svg className="h-3.5 w-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-3.5 pt-3.5 border-t border-light-border/60 dark:border-dark-border/60 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <RangoliDivider opacity={0.25} inverted={false} className="mt-14" />

          {/* Quick Support Card */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Have a custom requirement or architecture question not covered above?
            </p>
            <Link href="/contact">
              <Button variant="primary" size="md">
                Talk to Our Senior Technical Lead →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
