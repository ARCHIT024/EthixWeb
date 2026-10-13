import React from "react";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProcessSection } from "@/components/home/ProcessSection";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* 1. Hero Section (Fast LCP Text Headline, Bilingual EN/HI, Dual CTAs, Trust Line) */}
      <Hero />

      {/* 2. Core Services (6 Cards with Indicative ₹ Pricing & Indian SMB Deliverables) */}
      <ServicesGrid />

      {/* 3. Delivery Methodology (5 Steps with Timelines in Days) */}
      <ProcessSection />
    </div>
  );
}
