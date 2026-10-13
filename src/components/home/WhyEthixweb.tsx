import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface Differentiator {
  title: string;
  tag: string;
  description: string;
  indiaAdvantage: string;
  icon: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Senior Technical Operators",
    tag: "No Junior Delegation",
    description:
      "When you partner with Ethixweb, you work directly with senior architects and growth engineers. Your project isn't handed off to freshers or sub-contracted out.",
    indiaAdvantage: "Direct Slack & WhatsApp technical communication with people who actually write the code.",
    icon: "⚡",
  },
  {
    title: "Dedicated WhatsApp Direct Line",
    tag: "Instant IST Turnaround",
    description:
      "No waiting in bureaucratic 48-hour email ticketing queues. We operate during 09:30–20:00 IST and respond within minutes for real-time campaign adjustments.",
    indiaAdvantage: "Matches real-time Indian retail & ad operational cycles during peak festive seasons.",
    icon: "💬",
  },
  {
    title: "18% GST Invoicing with ITC",
    tag: "B2B Tax Compliance",
    description:
      "A fully compliant Indian corporate entity. Every rupee billed comes with an itemized tax invoice containing our valid GSTIN, allowing you to claim full Input Tax Credit.",
    indiaAdvantage: "Saves 18% in cash flow for Indian registered companies compared to overseas non-GST vendors.",
    icon: "🧾",
  },
  {
    title: "Transparent ₹ Pricing & Global Standards",
    tag: "Silicon Valley Craft",
    description:
      "We build with Next.js App Router, Supabase, and TypeScript — the exact tech stack used by Silicon Valley leaders — priced transparently in Indian Rupees without hidden charges.",
    indiaAdvantage: "Predictable scope milestones in INR, payable via NEFT, RTGS, UPI, or corporate credit cards.",
    icon: "🌐",
  },
];

export function WhyEthixweb() {
  return (
    <section className="py-20 sm:py-28 bg-light-bg text-dark-bg border-t border-light-border dark:bg-dark-surface dark:border-dark-border">
      <Container size="default">
        {/* Section Heading */}
        <SectionHeading
          kicker="The Ethixweb Difference"
          title="Why Indian Founders &amp; Business Leaders Choose Us"
          description="We built Ethixweb to eliminate the four biggest frustrations Indian companies face with traditional digital agencies: endless delays, junior hand-offs, lack of GST compliance, and opaque billing."
          align="center"
          className="mb-14 sm:mb-16"
        />

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, index) => (
            <Card
              key={item.title}
              variant="default"
              padding="lg"
              className="flex flex-col justify-between bg-white dark:bg-dark-bg border-light-border dark:border-dark-border hover:border-brand-red/30 transition-all duration-300"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center text-xl font-bold">
                    {item.icon}
                  </div>
                  <Badge variant="brass" size="sm" className="text-[10px]">
                    0{index + 1}
                  </Badge>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red dark:text-red-400">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-dark-bg dark:text-white mb-3 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* India Advantage Callout */}
              <div className="pt-3 border-t border-light-border dark:border-dark-border bg-gray-50/70 dark:bg-dark-surface/50 -mx-4 -mb-4 p-4 rounded-b-2xl">
                <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 block uppercase tracking-wider mb-1">
                  India Fit:
                </span>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug">
                  {item.indiaAdvantage}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
