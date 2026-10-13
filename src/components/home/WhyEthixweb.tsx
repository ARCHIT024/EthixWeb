import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionSeam } from "@/components/patterns/SectionSeam";
import { SectionBackdrop } from "@/components/patterns/SectionBackdrop";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Differentiator {
  title: string;
  tag: string;
  description: string;
  indiaAdvantage: string;
  icon: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Senior-only operators",
    tag: "No Junior Delegation",
    description:
      "When you partner with Ethixweb, you work directly with senior architects and growth engineers. Your project isn't handed off to freshers or sub-contracted out.",
    indiaAdvantage: "Direct Slack & WhatsApp technical communication with people who actually write the code.",
    icon: "⚡",
  },
  {
    title: "Dedicated WhatsApp line",
    tag: "Instant IST Turnaround",
    description:
      "No waiting in bureaucratic 48-hour email ticketing queues. We operate during 09:30–20:00 IST and respond within minutes for real-time campaign adjustments.",
    indiaAdvantage: "Matches real-time Indian retail & ad operational cycles during peak festive seasons.",
    icon: "💬",
  },
  {
    title: "18% GST invoicing",
    tag: "B2B Tax Compliance",
    description:
      "A fully compliant Indian corporate entity. Every rupee billed comes with an itemized tax invoice containing our valid GSTIN, allowing you to claim full Input Tax Credit.",
    indiaAdvantage: "Saves 18% in cash flow for Indian registered companies compared to overseas non-GST vendors.",
    icon: "🧾",
  },
  {
    title: "Global standards",
    tag: "Silicon Valley Craft",
    description:
      "We build with Next.js App Router, Supabase, and TypeScript — the exact tech stack used by Silicon Valley leaders — priced transparently in Indian Rupees without hidden charges.",
    indiaAdvantage: "Predictable scope milestones in INR, payable via NEFT, RTGS, UPI, or corporate credit cards.",
    icon: "🌐",
  },
];

export function WhyEthixweb() {
  return (
    <section className="relative bg-[#F1E9DA] text-[#14110F] py-14 sm:py-[88px] border-t border-[rgba(184,146,74,0.5)] overflow-hidden">
      {/* Brass Seam Diamond */}
      <SectionSeam />

      {/* Butta Pattern Backdrop with Radial Mask */}
      <SectionBackdrop pattern="butta" opacity={0.1} />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-[760px] mx-auto mb-11">
            <span className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#B3202A] block mb-2">
              The Ethixweb difference
            </span>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-[#14110F] leading-[1.1] mb-3.5">
              Why Indian Founders &amp; Business Leaders Choose Us
            </h2>
            <p className="text-[17px] text-[#5C5347] leading-relaxed max-w-[620px] mx-auto">
              No agency theatre. Senior people, clear pricing, fast replies. We eliminate endless delays, junior hand-offs, lack of GST compliance, and opaque billing.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIFFERENTIATORS.map((item, index) => (
            <ScrollReveal key={item.title} delayMs={index * 80} className="h-full">
              <div className="bg-white border border-[#E6DCCB] rounded-[16px] p-[26px] h-full flex flex-col justify-between">
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="h-10 w-10 rounded-xl bg-[#B3202A]/10 text-[#B3202A] flex items-center justify-center text-lg font-bold"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#8A6A2E] bg-[#F1E9DA] px-2 py-0.5 rounded">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[20px] font-bold text-[#14110F] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[15px] text-[#5C5347] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* India Advantage Callout */}
                <div className="pt-3 border-t border-[#E6DCCB]">
                  <span className="text-[10px] font-bold text-[#8A6A2E] block uppercase tracking-wider mb-1">
                    India Advantage:
                  </span>
                  <p className="text-xs text-[#5C5347] leading-relaxed">
                    {item.indiaAdvantage}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
