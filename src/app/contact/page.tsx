import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Get a Quote & Contact",
  description:
    "Initiate your project with Ethixweb. Instant WhatsApp consultation or detailed scope submission with Indian GST invoicing.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="default">
        <SectionHeading
          kicker="Start Your Project"
          title="Let's Build Your Digital Infrastructure"
          description="Direct response within 15 minutes during IST operational hours (09:30–20:00). All quotes include transparent ₹ pricing and 18% GST breakdown."
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Quick Contact & WhatsApp Option */}
          <div className="lg:col-span-5 space-y-6">
            <Card padding="lg" className="border-l-4 border-l-[#25D366]">
              <Badge variant="success" size="sm" dot className="mb-3">
                Fastest Route · Under 5 Mins
              </Badge>
              <h3 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-2">
                Chat On WhatsApp
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Connect directly with our technical lead without filling extensive forms. Ideal for quick scope scoping and instant estimates.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hi%20Ethixweb%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-block"
              >
                <Button variant="primary" size="lg" className="w-full bg-[#25D366] hover:bg-[#20ba59]">
                  Open WhatsApp Chat (+91) →
                </Button>
              </a>
            </Card>

            <Card padding="lg">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-4">
                Office &amp; Invoicing Details
              </h4>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Entity:</strong> Ethixweb Technologies Pvt. Ltd.
                </p>
                <p>
                  <strong>GSTIN:</strong> 07AAAAA0000A1Z5 (Valid B2B Invoices)
                </p>
                <p>
                  <strong>Direct Email:</strong>{" "}
                  <a href="mailto:hello@ethixweb.com" className="text-brand-red font-medium">
                    hello@ethixweb.com
                  </a>
                </p>
                <p>
                  <strong>Phone / Support:</strong>{" "}
                  <a href="tel:+919876543210" className="text-brand-red font-medium">
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <strong>Timezone:</strong> IST (UTC+5:30) • Mon–Sat 09:30–20:00
                </p>
              </div>
            </Card>
          </div>

          {/* Detailed Request Form */}
          <div className="lg:col-span-7">
            <Card padding="lg">
              <h3 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-2">
                Submit Project Details
              </h3>
              <p className="text-sm text-gray-500 mb-8">
                Fill in your initial project requirements to receive an itemized proposal and timeline.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                  <Input
                    label="Work Email"
                    type="email"
                    placeholder="rahul@company.in"
                    helperText="For NDA and proposal delivery"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="WhatsApp / Mobile (+91)"
                    type="tel"
                    placeholder="98765 43210"
                    prefix="+91"
                    helperText="10-digit Indian phone number"
                    required
                  />
                  <Input
                    label="Company Name"
                    placeholder="e.g. Acme Retail Pvt Ltd"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Primary Service Needed <span className="text-brand-red">*</span>
                  </label>
                  <select className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100">
                    <option value="website">Custom Website / Next.js Web App</option>
                    <option value="ai-agent">AI Receptionist / Voice & Chat Agent</option>
                    <option value="crm">CRM Integration & Automation (HubSpot/Zoho)</option>
                    <option value="seo">SEO & Organic Bharat Growth</option>
                    <option value="ads">Google & Meta Performance Ads</option>
                    <option value="full-ops">Full Digital Operations Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                    Project Overview &amp; Goals <span className="text-brand-red">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your current bottlenecks, target audience, and desired launch timeline..."
                    className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  Request Itemized Proposal &amp; Quote →
                </Button>

                <p className="text-center text-xs text-gray-400 mt-2">
                  🔒 Strictly confidential. 100% spam-free guarantee. No third-party data sharing.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
