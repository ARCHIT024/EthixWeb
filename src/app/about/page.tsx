import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ethixweb — an elite digital operations, web architecture, and AI automation partner for Indian and global enterprises.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="default">
        <SectionHeading
          kicker="About Ethixweb"
          title="We Run The Tech. You Run The Business."
          description="We are a senior team of engineers, growth operators, and AI specialists helping businesses transition from fragmented tools to automated machines."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card padding="lg">
            <Badge variant="brass" size="sm" dot className="mb-3">
              Core Ethos
            </Badge>
            <h3 className="font-display text-xl font-bold mb-3 text-dark-bg dark:text-white">
              Zero Vanity Code
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              We do not build bloated tech for the sake of trends. Every line of code, automation trigger, and landing page is measured by business throughput and conversion speed.
            </p>
          </Card>

          <Card padding="lg">
            <Badge variant="red" size="sm" dot className="mb-3">
              India Alignment
            </Badge>
            <h3 className="font-display text-xl font-bold mb-3 text-dark-bg dark:text-white">
              B2B Trust &amp; GST Readiness
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Transparent ₹ pricing, 18% GST invoices with Input Tax Credit, and dedicated IST operational availability to match real-time sales cycles.
            </p>
          </Card>

          <Card padding="lg">
            <Badge variant="success" size="sm" dot className="mb-3">
              Performance Budget
            </Badge>
            <h3 className="font-display text-xl font-bold mb-3 text-dark-bg dark:text-white">
              Core Web Vitals Obsessed
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Strictly zero heavy JavaScript runtimes. Statically generated pages loading under 1 second even on patchy 4G Indian mobile networks.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Start a Conversation With Our Team →
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
