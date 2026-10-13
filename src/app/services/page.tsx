import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services Catalog",
  description:
    "AI automation, Next.js web applications, CRM workflows, technical SEO, and paid performance marketing for Indian businesses.",
};

const SERVICES = [
  {
    title: "AI Receptionists & Custom Agents",
    tag: "Autonomous Ops",
    description:
      "Voice and chat AI agents tuned for Indian English and Hindi inquiries. Qualify leads, handle FAQs, and book calendar appointments 24/7.",
    features: ["WhatsApp & IVR Voice Integration", "CRM Lead Synced Instantly", "Context-Aware Qualification"],
  },
  {
    title: "Websites & High-Speed Portals",
    tag: "Next.js & Turbopack",
    description:
      "Blazing fast web applications and landing pages engineered for 90+ PageSpeed on mobile networks with zero layout shift.",
    features: ["Sub-second Paint Times", "Conversion-Focused Architecture", "Zero Lorem Ipsum Copy"],
  },
  {
    title: "CRM & Operational Workflows",
    tag: "Pipeline Sync",
    description:
      "Connect HubSpot, Zoho, GoHighLevel, Razorpay, and WhatsApp API into a unified, automated operational engine.",
    features: ["Automated WhatsApp Alerts", "GST Invoice Auto-Generation", "Lead Assignment Routing"],
  },
  {
    title: "Technical SEO & Bharat Visibility",
    tag: "Organic Moat",
    description:
      "Technical architectures, programmatic local SEO, and search authority systems designed to compound inbound pipeline organically.",
    features: ["Core Web Vitals Perfection", "Schema Markup for Indian Entities", "Zero Link Rot Guarantee"],
  },
];

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="default">
        <SectionHeading
          kicker="Full Service Catalog"
          title="Digital Infrastructure Built For Modern Scale"
          description="Everything your business needs to automate operations, capture demand, and outpace competitors in India and abroad."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {SERVICES.map((service) => (
            <Card key={service.title} variant="interactive" padding="lg">
              <Badge variant="red" size="sm" dot className="mb-4">
                {service.tag}
              </Badge>
              <h3 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-2 mb-8 text-xs text-gray-500 dark:text-gray-400">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <span className="text-brand-red font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button variant="secondary" size="sm" className="w-full">
                  Inquire For This Service →
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
