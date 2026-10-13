"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";

export function Hero() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hi Ethixweb, I run a business in India and would like to discuss a project (Web / AI / SEO / Ads / CRM)."
    );

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-light-bg text-dark-bg">
      {/* Subtle Architectural Jaali Lattice Background (under 1KB SVG, low opacity) */}
      <JaaliPattern opacity={0.06} inverted={false} />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Pill Bar with Bilingual Language Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            <Badge variant="red" dot size="md">
              India&apos;s Dedicated Digital Ops Partner
            </Badge>

            {/* Accessible Bilingual Pill Toggle */}
            <div
              role="group"
              aria-label="Language selection for hero message"
              className="inline-flex items-center rounded-full border border-light-border bg-white/90 p-0.5 text-xs shadow-2xs backdrop-blur-xs"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all ${
                  lang === "en"
                    ? "bg-dark-bg text-white shadow-2xs"
                    : "text-gray-500 hover:text-dark-bg"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all font-hindi ${
                  lang === "hi"
                    ? "bg-brand-red text-white shadow-2xs"
                    : "text-gray-500 hover:text-dark-bg"
                }`}
                aria-pressed={lang === "hi"}
              >
                हिंदी
              </button>
            </div>

            <Badge variant="brass" size="md">
              18% GST Invoicing
            </Badge>
          </div>

          {/* Main Headline - Pure Text for Instant LCP */}
          {lang === "en" ? (
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-dark-bg leading-[1.08] sm:leading-[1.05]">
              We run the tech. <br />
              <span className="text-brand-red">You run the business.</span>
            </h1>
          ) : (
            <h1 className="font-hindi text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-dark-bg leading-[1.18] sm:leading-[1.15]">
              हम तकनीक संभालते हैं। <br />
              <span className="text-brand-red">आप व्यापार बढ़ाइए।</span>
            </h1>
          )}

          {/* Natural Hindi Sub-line / English Proposition */}
          <div className="mt-6 max-w-2xl mx-auto space-y-2">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-normal">
              High-converting websites, 24/7 AI receptionists, CRM automation, and targeted ad campaigns engineered for Indian founders, clinics, D2C brands, and exporters.
            </p>
            {/* Always visible authentic Hindi subtitle */}
            <p className="font-hindi text-sm sm:text-base text-gray-500 leading-normal">
              वेबसाइट, एआई ऑटोमेशन, सीआरएम और डिजिटल मार्केटिंग — बिना किसी तकनीकी झंझट के।
            </p>
          </div>

          {/* Dual Primary & WhatsApp CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-md hover:shadow-brand-red/20 font-semibold"
              >
                Get a free consultation →
              </Button>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto font-semibold gap-2 border-emerald-600/30 text-emerald-800 hover:bg-emerald-50/50"
                leftIcon={
                  <svg className="w-4.5 h-4.5 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.494c-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526s-.676-1.629-.927-2.231c-.244-.587-.493-.507-.677-.516-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.507 0 1.479 1.078 2.908 1.228 3.109.15.2 2.121 3.239 5.138 4.542.718.311 1.279.497 1.716.636.721.229 1.377.197 1.896.119.579-.087 1.782-.728 2.033-1.43.25-.702.25-1.303.175-1.429-.075-.126-.276-.201-.577-.352z" />
                  </svg>
                }
              >
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust Line & Indian SME Proof */}
          <div className="mt-12 pt-8 border-t border-light-border/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-emerald-700 font-bold text-sm">✓</span>
              <span>
                <strong>18% GST Invoicing</strong> with Input Tax Credit (ITC)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-brand-red font-bold text-sm">✓</span>
              <span>
                <strong>40+ Indian SMBs</strong> Scaled &amp; Supported
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-accent-brass-dark font-bold text-sm">✓</span>
              <span>
                <strong>14-Day Delivery</strong> on Core Web Infrastructure
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-bold text-sm">✓</span>
              <span>
                <strong>90+ PageSpeed Guarantee</strong> Mobile &amp; Desktop
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
