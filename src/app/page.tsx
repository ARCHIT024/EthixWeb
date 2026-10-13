import React from "react";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyEthixweb } from "@/components/home/WhyEthixweb";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero Section (Fast LCP Text Headline, Bilingual EN/HI, Dual CTAs, Trust Line) */}
      <Hero />

      {/* 2. Core Services (6 Cards with Indicative ₹ Pricing & Indian SMB Deliverables) */}
      <ServicesGrid />

      {/* 3. Delivery Methodology (5 Steps with Timelines in Days) */}
      <ProcessSection />

      {/* 4. Featured Work (3 Concept Projects with SVG/CSS Graphics & Expected Ranges) */}
      <FeaturedWork />

      {/* 5. Why Ethixweb (4 Core Differentiators for Indian Buyers) */}
      <WhyEthixweb />

      {/* 6. Industries We Serve (Chips for Indian Business Sectors) */}
      <IndustriesSection />

      {/* 7. Final Conversion Section (Enquiry Teaser Form & WhatsApp Direct) */}
      <FinalCTA />
    </div>
  );
}
