import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionBackdrop } from "@/components/patterns/SectionBackdrop";
import { SectionSeam } from "@/components/patterns/SectionSeam";

export function FinalCTA() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hi Ethixweb, I want to initiate a project scope (Website / AI Automation / CRM / Ads). Please share details."
    );

  return (
    <section className="relative py-14 sm:py-[88px] bg-[#B3202A] text-white border-t border-[rgba(184,146,74,0.6)] overflow-hidden">
      <SectionSeam />
      <SectionBackdrop pattern="jaali" opacity={0.08} />

      <Container size="default" className="relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            {/* Top Status Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/25 text-white/95 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9B873]" />
                Sprint Openings: 2 Available This Month
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/25 text-white/95 border border-white/20">
                18% GST Invoicing
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              Let&apos;s Build Systems That Run While You Grow.
            </h2>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-[#FBE3E3] leading-relaxed max-w-2xl mx-auto">
              Skip weeks of recruitment, agency delays, and technical fragmentation. Get an integrated digital machine built by senior operators under a 14-day delivery sprint.
            </p>

            {/* Teaser Enquiry Form Box */}
            <div className="mt-10 rounded-2xl bg-[#14110F] border border-[rgba(184,146,74,0.3)] p-6 sm:p-8 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Request an Itemized Quote &amp; Scope
                  </h3>
                  <p className="text-xs text-[#D8D0C4] mt-0.5">
                    Replies within 15 minutes during IST business hours (09:30–20:00).
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15">
                  Zero Spam
                </span>
              </div>

              {/* Teaser Form Quick Action */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl bg-[#1C1714] border border-[rgba(184,146,74,0.2)] p-3 text-xs">
                  <span className="text-[#D8D0C4] block text-[10px] uppercase tracking-wider mb-1">
                    01. Project Type
                  </span>
                  <span className="font-medium text-white">Web / AI / SEO / CRM</span>
                </div>
                <div className="rounded-xl bg-[#1C1714] border border-[rgba(184,146,74,0.2)] p-3 text-xs">
                  <span className="text-[#D8D0C4] block text-[10px] uppercase tracking-wider mb-1">
                    02. Billing Currency
                  </span>
                  <span className="font-medium text-white">₹ INR + 18% GST (ITC)</span>
                </div>
                <div className="rounded-xl bg-[#1C1714] border border-[rgba(184,146,74,0.2)] p-3 text-xs">
                  <span className="text-[#D8D0C4] block text-[10px] uppercase tracking-wider mb-1">
                    03. Turnaround
                  </span>
                  <span className="font-medium text-emerald-400">14-Day Sprint Avg</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5">
                <Link href="/contact" className="w-full sm:flex-1">
                  <span className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full bg-white text-[#8E1620] hover:bg-white/95 font-bold text-sm sm:text-base transition-colors text-center cursor-pointer">
                    Complete Detailed Scope Form →
                  </span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <span className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] font-semibold text-sm sm:text-base gap-2 transition-colors cursor-pointer">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.494c-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526s-.676-1.629-.927-2.231c-.244-.587-.493-.507-.677-.516-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.507 0 1.479 1.078 2.908 1.228 3.109.15.2 2.121 3.239 5.138 4.542.718.311 1.279.497 1.716.636.721.229 1.377.197 1.896.119.579-.087 1.782-.728 2.033-1.43.25-.702.25-1.303.175-1.429-.075-.126-.276-.201-.577-.352z" />
                    </svg>
                    Quick WhatsApp Quote
                  </span>
                </a>
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/75 mt-8">
              <span>Direct: hello@ethixweb.com</span>
              <span>•</span>
              <span>Phone: +91 98765 43210</span>
              <span>•</span>
              <span>Bengaluru • Delhi NCR • Mumbai</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
