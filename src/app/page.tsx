import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { RangoliDivider } from "@/components/patterns/RangoliDivider";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Hero Section with Jaali Pattern & Brand Red Highlights */}
      <section className="relative overflow-hidden py-20 sm:py-28 flex-1 flex items-center">
        <JaaliPattern opacity={0.06} inverted={false} />

        <Container size="default" className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge variant="red" dot size="md">
                India Operations &amp; Growth Partner
              </Badge>
              <Badge variant="brass" size="md">
                Dedicated IST Support
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-dark-bg leading-[1.1] sm:leading-[1.08]">
              We run the tech. <br />
              <span className="text-brand-red">You run the business.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Custom websites, AI automation agents, CRM pipelines, and revenue-driven digital infrastructure engineered for modern Indian enterprises.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Get a Free Proposal &amp; Quote →
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="lg">
                  Explore Services Catalog
                </Button>
              </Link>
            </div>

            {/* Subtle Abstract Rangoli Divider */}
            <RangoliDivider opacity={0.25} inverted={false} className="mt-12" />

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-medium">
              <span>✓ Transparent ₹ Pricing + 18% GST</span>
              <span>✓ +91 Domestic Validation</span>
              <span>✓ Zero Heavy JS Bloat</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Pillars Snapshot */}
      <section className="border-t border-light-border bg-white/70 py-16 dark:border-dark-border dark:bg-dark-surface/50">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="interactive" padding="md">
              <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold text-lg mb-3">
                ⚡
              </div>
              <h3 className="font-display text-lg font-bold mb-1.5 text-dark-bg dark:text-white">
                Sub-Second Speed
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Statically generated pages engineered for 90+ PageSpeed on mobile networks with zero layout shift.
              </p>
            </Card>

            <Card variant="interactive" padding="md">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-lg mb-3">
                💬
              </div>
              <h3 className="font-display text-lg font-bold mb-1.5 text-dark-bg dark:text-white">
                WhatsApp Fast-Track
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Direct click-to-chat with context pre-fills. Connect directly with senior technical operators.
              </p>
            </Card>

            <Card variant="interactive" padding="md">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-accent-brass-dark flex items-center justify-center font-bold text-lg mb-3">
                🧾
              </div>
              <h3 className="font-display text-lg font-bold mb-1.5 text-dark-bg dark:text-white">
                GST Compliant Invoicing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Clear B2B tax invoices with full 18% GST and Input Tax Credit (ITC) eligibility for Indian companies.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
