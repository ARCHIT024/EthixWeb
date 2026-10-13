import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { RangoliDivider } from "@/components/patterns/RangoliDivider";

export function FinalCTA() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=" +
    encodeURIComponent(
      "Hi Ethixweb, I want to initiate a project scope (Website / AI Automation / CRM / Ads). Please share details."
    );

  return (
    <section className="py-20 sm:py-28 bg-light-bg text-dark-bg border-t border-light-border dark:bg-dark-bg dark:border-dark-border relative overflow-hidden">
      <Container size="default">
        {/* Main CTA Card with Inverted Dark Canvas & Subtle Jaali Background */}
        <div className="relative rounded-3xl bg-dark-bg text-white p-8 sm:p-14 lg:p-16 border border-dark-border shadow-card-dark overflow-hidden">
          {/* Subtle Jaali architectural overlay (low opacity 7%) */}
          <JaaliPattern opacity={0.07} inverted={true} />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Top Status Pill */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <Badge variant="brass" dot size="md">
                Sprint Openings: 2 Available This Month
              </Badge>
              <Badge variant="red" size="md">
                18% GST Invoicing
              </Badge>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Let&apos;s Build Systems That Run While You Grow.
            </h2>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Skip weeks of recruitment, agency delays, and technical fragmentation. Get an integrated digital machine built by senior operators under a 14-day delivery sprint.
            </p>

            {/* Teaser Enquiry Form Box */}
            <div className="mt-10 rounded-2xl bg-dark-surface/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md text-left shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Request an Itemized Quote &amp; Scope
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Replies within 15 minutes during IST business hours (09:30–20:00).
                  </p>
                </div>
                <Badge variant="neutral" size="sm" className="hidden sm:inline-flex">
                  Zero Spam
                </Badge>
              </div>

              {/* Teaser Form Quick Action */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs">
                  <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">
                    01. Project Type
                  </span>
                  <span className="font-medium text-white">Web / AI / SEO / CRM</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs">
                  <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">
                    02. Billing Currency
                  </span>
                  <span className="font-medium text-white">₹ INR + 18% GST (ITC)</span>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-xs">
                  <span className="text-gray-400 block text-[10px] uppercase tracking-wider mb-1">
                    03. Turnaround
                  </span>
                  <span className="font-medium text-emerald-400">14-Day Sprint Avg</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5">
                <Link href="/contact" className="w-full sm:flex-1">
                  <Button variant="primary" size="lg" className="w-full font-semibold">
                    Complete Detailed Scope Form (/contact) →
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
                    className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20ba59] border-transparent font-semibold gap-2"
                    leftIcon={
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.494c-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526s-.676-1.629-.927-2.231c-.244-.587-.493-.507-.677-.516-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.507 0 1.479 1.078 2.908 1.228 3.109.15.2 2.121 3.239 5.138 4.542.718.311 1.279.497 1.716.636.721.229 1.377.197 1.896.119.579-.087 1.782-.728 2.033-1.43.25-.702.25-1.303.175-1.429-.075-.126-.276-.201-.577-.352z" />
                      </svg>
                    }
                  >
                    Quick WhatsApp Quote
                  </Button>
                </a>
              </div>
            </div>

            {/* Rangoli Geometric Accent */}
            <RangoliDivider opacity={0.3} inverted={true} className="mt-10" />

            {/* Direct Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
              <span>Direct: hello@ethixweb.com</span>
              <span>•</span>
              <span>Phone: +91 98765 43210</span>
              <span>•</span>
              <span>Bengaluru • Delhi NCR • Mumbai</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
