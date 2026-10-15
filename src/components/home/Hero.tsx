import React from "react";
import Link from "next/link";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { CityConstellation } from "@/components/hero/CityConstellation";

export function Hero() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent("Hi Ethixweb, I would like to discuss a project for my business.");

  return (
    <section className="relative overflow-hidden bg-[#14110F] text-white -mt-[76px] pt-[76px]">
      {/* Decorative Architectural Jaali SVG Texture (0.09 Opacity, 0 Images, 0 JS) */}
      <JaaliPattern opacity={0.09} />

      {/* 1260px Max-Width Content Grid: 2-column vertically centered, stacks below 900px */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-6 pt-6 pb-12 sm:pt-10 sm:pb-14 lg:pt-10 lg:pb-14 grid grid-cols-1 min-[900px]:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left Column: Proposition & CTAs with 400ms CSS-only Fade-Up */}
        <div className="hero-fade-up text-left min-[900px]:-translate-y-3">
          {/* Main Page H1 */}
          <h1 className="font-display font-[800] text-[clamp(40px,5.5vw,64px)] leading-[1.04] tracking-[-0.02em] text-white mt-0 mb-3 text-left">
            We run the tech.<br />
            You run the <span className="text-[#E0414B]">business.</span>
          </h1>

          {/* 3. Authentic Hindi Proposition Line */}
          <p className="font-hindi font-[500] text-[22px] leading-snug text-[#D9B873] mb-5">
            आपकी टेक्नोलॉजी हम संभालें, आप अपना बिज़नेस बढ़ाएँ।
          </p>

          {/* 4. Core Proposition Paragraph */}
          <p className="font-sans text-[19px] leading-relaxed text-[#D8D0C4] max-w-[520px] mb-8">
            Websites, AI receptionists, SEO and ads for Indian businesses, built by a senior team at world-class standards, with ₹ pricing and GST invoices.
          </p>

          {/* 5. CTA Row */}
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[16px] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-center"
            >
              Get a free consultation
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-transparent border-[1.5px] border-white/50 hover:bg-white/10 text-white font-bold text-[16px] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-center"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* 6. Small Operational Hours Line */}
          <p className="text-[14px] text-[#A89F90] mt-7">
            Mon–Sat, 10 AM–7 PM IST
          </p>
        </div>

        {/* Right Column: City Constellation (Desktop only, hidden on mobile) */}
        <div className="hidden min-[900px]:flex w-full items-center justify-end">
          <CityConstellation />
        </div>
      </div>
    </section>
  );
}
