import React from "react";
import type { Metadata } from "next";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig, getWhatsAppUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact & Start a Project",
  description:
    "Direct contact channels for Ethixweb India. Connect via WhatsApp, direct email, or phone. Operating hours in IST with GST-compliant invoicing.",
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className="flex-1 flex flex-col selection:bg-[#B3202A] selection:text-white">
      {/* 1. Heading Band: Background ivory #FAF6EF, 64px 0 72px */}
      <section className="relative overflow-hidden bg-[#FAF6EF] text-[#14110F] text-center pt-[64px] pb-[72px]">
        <JaaliPattern opacity={0.06} inverted={false} />

        <div className="relative z-10 max-w-[1160px] mx-auto px-6 text-center">
          <h1 className="font-display font-extrabold text-[40px] sm:text-[56px] leading-[1.06] tracking-[-0.02em] text-[#14110F] max-w-[880px] mx-auto mt-0 mb-[18px]">
            Start a Direct Conversation With Our Senior Team
          </h1>
          <p className="text-[19px] text-[#5C5347] max-w-[860px] mx-auto leading-relaxed m-0">
            Whether you need a full 14-day web sprint, an autonomous WhatsApp AI receptionist, or a high-converting ad funnel. Direct technical responses within 15 minutes during IST operational hours.
          </p>
        </div>
      </section>

      {/* 2. Contact Section: Background ink #14110F, 72px 0 */}
      <section className="relative bg-[#14110F] text-white py-[72px]">
        <div className="max-w-[1160px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-[28px] items-stretch">
          {/* Left Card: Dark Info Card (#1C1714) */}
          <div className="rounded-[24px] p-[22px] lg:p-[36px] bg-[#1C1714] border border-[rgba(184,146,74,0.35)] text-white flex flex-col h-full order-2 lg:order-1">
            {/* a) Top Row: Fastest route & Avg response */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium bg-[rgba(61,190,122,0.14)] text-[#6FD9A0]">
                Fastest route
              </span>
              <span className="text-[14px] text-[#D9B873] font-medium">
                Avg response: under 15 mins
              </span>
            </div>

            {/* b) H2: Chat with us on WhatsApp */}
            <h2 className="font-display text-[30px] font-bold text-white leading-[1.15] mt-[18px] mb-[10px]">
              Chat with us on WhatsApp
            </h2>

            {/* c) Paragraph */}
            <p className="text-[16px] text-[#D8D0C4] mt-0 mb-[22px] leading-relaxed">
              Skip the email ping-pong. Share your website or your current bottleneck, and our technical lead replies with an instant scope breakdown.
            </p>

            {/* d) WhatsApp Full-Width Red Pill */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center min-h-[54px] w-full px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[16px] transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              Open WhatsApp chat · {siteConfig.phone}
            </a>

            {/* e) Hairline */}
            <hr className="border-0 border-t border-[rgba(184,146,74,0.3)] my-[28px]" />

            {/* f) Three Detail Rows */}
            {/* 1. Business email */}
            <div className="flex gap-4 items-start mb-[22px]">
              <div className="w-[44px] h-[44px] rounded-[12px] border border-[rgba(184,146,74,0.5)] flex items-center justify-center shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D9B873"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-[0.12em] text-[#D9B873] font-bold">
                  Business email
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-display text-[20px] font-bold text-white hover:underline block leading-snug"
                >
                  {siteConfig.email}
                </a>
                <div className="text-[14px] text-[#A89F90] mt-0.5">
                  For RFPs, formal statements of work and NDAs.
                </div>
              </div>
            </div>

            {/* 2. Direct phone line */}
            <div className="flex gap-4 items-start mb-[22px]">
              <div className="w-[44px] h-[44px] rounded-[12px] border border-[rgba(184,146,74,0.5)] flex items-center justify-center shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D9B873"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-[0.12em] text-[#D9B873] font-bold">
                  Direct phone line
                </div>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="font-display text-[20px] font-bold text-white hover:underline block leading-snug"
                >
                  {siteConfig.phone}
                </a>
                <div className="text-[14px] text-[#A89F90] mt-0.5">
                  Active Monday to Saturday.
                </div>
              </div>
            </div>

            {/* 3. Operating hours */}
            <div className="flex gap-4 items-start mb-[22px]">
              <div className="w-[44px] h-[44px] rounded-[12px] border border-[rgba(184,146,74,0.5)] flex items-center justify-center shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D9B873"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <div className="text-[12px] uppercase tracking-[0.12em] text-[#D9B873] font-bold">
                  Operating hours (IST)
                </div>
                <div className="font-display text-[20px] font-bold text-white leading-snug">
                  {siteConfig.operatingHours.display}
                </div>
                <div className="text-[14px] text-[#A89F90] mt-0.5">
                  {siteConfig.operatingHours.note}
                </div>
              </div>
            </div>

            {/* g) Hairline & What happens next */}
            <hr className="border-0 border-t border-[rgba(184,146,74,0.3)] mt-[10px] mb-[28px]" />

            <div className="text-[12px] uppercase tracking-[0.12em] text-[#D9B873] font-bold mb-[16px]">
              What happens next
            </div>

            <div className="flex gap-[14px] mb-[18px] items-start">
              <span className="w-[30px] h-[30px] rounded-full bg-[#B3202A] text-white font-bold text-[14px] flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <div className="font-bold text-white text-[15px]">We reply</div>
                <div className="text-[14px] text-[#A89F90]">
                  Within 15 minutes on WhatsApp, within 24 hours by email.
                </div>
              </div>
            </div>

            <div className="flex gap-[14px] mb-[18px] items-start">
              <span className="w-[30px] h-[30px] rounded-full bg-[#B3202A] text-white font-bold text-[14px] flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <div className="font-bold text-white text-[15px]">A short scope call</div>
                <div className="text-[14px] text-[#A89F90]">
                  Your technical lead goes through the project with you.
                </div>
              </div>
            </div>

            <div className="flex gap-[14px] mb-[18px] items-start">
              <span className="w-[30px] h-[30px] rounded-full bg-[#B3202A] text-white font-bold text-[14px] flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <div className="font-bold text-white text-[15px]">An itemised ₹ quote</div>
                <div className="text-[14px] text-[#A89F90]">
                  Clear timeline, fixed price, GST invoice with ITC.
                </div>
              </div>
            </div>

            {/* h) Social Row (Pinned to bottom) */}
            <div className="mt-auto pt-[22px] border-t border-[rgba(184,146,74,0.3)] flex gap-[10px] flex-wrap items-center">
              <span className="text-[12px] uppercase tracking-[0.12em] text-[#D9B873] font-bold mr-[6px]">
                Follow
              </span>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3.5 py-1.5 text-[14px] text-white border border-[rgba(184,146,74,0.45)] bg-transparent hover:border-[#D9B873] hover:text-[#D9B873] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3.5 py-1.5 text-[14px] text-white border border-[rgba(184,146,74,0.45)] bg-transparent hover:border-[#D9B873] hover:text-[#D9B873] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3.5 py-1.5 text-[14px] text-white border border-[rgba(184,146,74,0.45)] bg-transparent hover:border-[#D9B873] hover:text-[#D9B873] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                X (Twitter)
              </a>
            </div>
          </div>

          {/* Right Card: Light Form Card (#FAF6EF) */}
          <ContactForm />
        </div>
      </section>

      {/* 3. Domestic Presence Section: Background sand #F1E9DA, 88px 0 */}
      <section className="bg-[#F1E9DA] text-[#14110F] py-[88px]">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium bg-[#FBEDEC] text-[#B3202A] mx-auto">
              Domestic footprint
            </span>
            <h2 className="font-display text-[32px] sm:text-[44px] font-extrabold tracking-[-0.01em] leading-[1.1] mt-4 mb-3 max-w-[760px] mx-auto text-[#14110F]">
              Map-Free Domestic Presence Across India
            </h2>
            <p className="text-[18px] text-[#5C5347] max-w-[640px] mx-auto mb-11 leading-relaxed">
              We avoid slow, battery-draining map embeds to protect page performance and keep load times fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {siteConfig.hubs.map((hub) => (
              <div
                key={hub.city}
                className="bg-white border border-[#E6DCCB] rounded-[20px] p-[28px] flex flex-col h-full"
              >
                <div>
                  <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] bg-[#F1E9DA] text-[#14110F] font-medium">
                    {hub.tag}
                  </span>
                </div>
                <h3 className="font-display text-[22px] font-bold text-[#14110F] mt-4 mb-1.5 leading-snug">
                  {hub.title}
                </h3>
                <p className="text-[15px] text-[#5C5347] m-0 leading-relaxed">
                  {hub.address}
                </p>
                <div className="mt-auto pt-[18px] border-t border-[#E6DCCB] text-[14px] text-[#5C5347]">
                  <b className="font-bold text-[#14110F]">Hub focus:</b> {hub.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
