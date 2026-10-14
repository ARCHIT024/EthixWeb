"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  enquirySchema,
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  type EnquiryInput,
} from "@/lib/validations/enquiry";
import { siteConfig, getWhatsAppUrl } from "@/lib/siteConfig";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const QUICK_PICK_CITIES = [
  "Bengaluru",
  "Delhi NCR",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
];

export function ContactForm() {
  const [formData, setFormData] = useState<Partial<EnquiryInput>>({
    name: "",
    business_name: "",
    phone: "",
    email: "",
    city: "",
    service: "Websites & High-Speed Portals",
    budget_range: "₹25,000 – ₹50,000",
    preferred_contact: "whatsapp",
    message: "",
    honeypot: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [generalError, setGeneralError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const formLoadedAtRef = useRef<number>(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

  // Stabilize view upon submission: ensure the card is in comfortable view without jumping to page top
  useEffect(() => {
    if (formState === "success" && cardContainerRef.current) {
      const rect = cardContainerRef.current.getBoundingClientRect();
      if (rect.top < 60) {
        cardContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [formState]);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Lazy-load Cloudflare Turnstile script ONLY on first interaction or focus
  const triggerTurnstileLoad = () => {
    if (turnstileLoaded || typeof window === "undefined") return;
    setTurnstileLoaded(true);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || siteKey === "your-turnstile-site-key") {
      setTurnstileToken("dev_mode_token");
      return;
    }

    if (!document.getElementById("turnstile-script")) {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;

      window.onloadTurnstileCallback = () => {
        if (turnstileContainerRef.current && window.turnstile) {
          widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => setTurnstileToken(token),
            theme: "auto",
          });
        }
      };

      document.body.appendChild(script);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Client-Side Pre-Validation using shared Zod Schema
    const payload = {
      ...formData,
      form_loaded_at: formLoadedAtRef.current || Date.now(),
      turnstile_token: turnstileToken || "dev_bypass",
      source: "contact_page",
    };

    const parseResult = enquirySchema.safeParse(payload);
    if (!parseResult.success) {
      const errors: Record<string, string[]> = {};
      for (const issue of parseResult.error.issues) {
        const field = issue.path[0]?.toString() || "form";
        if (!errors[field]) errors[field] = [];
        errors[field].push(issue.message);
      }
      setFieldErrors(errors);
      setGeneralError("Please review the highlighted fields below.");
      return;
    }

    setFormState("submitting");
    setGeneralError("");
    setFieldErrors({});

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 422 && result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          throw new Error(result.error || "Validation failed on server.");
        }
        if (res.status === 429) {
          throw new Error(result.error || "Rate limit reached. Please wait before submitting again.");
        }
        throw new Error(result.error || "Failed to submit enquiry. Please try again.");
      }

      // Generate a clean agency reference ticket ID
      const genRef = "EW-" + Math.floor(10000 + Math.random() * 90000);
      setReferenceId(genRef);

      // Blur the active submit button before unmounting to prevent browser focus-loss jumping to (0,0)
      if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      setFormState("success");
    } catch (err: unknown) {
      setFormState("error");
      setGeneralError(
        err instanceof Error
          ? err.message
          : `An unexpected error occurred. Please message us directly via WhatsApp (${siteConfig.phone}).`
      );
    }
  };

  // SUCCESS STATE: Replaces form body inside the same card, maintaining height & rich details
  if (formState === "success") {
    const followupMsg = `Hi Ethixweb, I just submitted project scope #${referenceId || "EW"} for ${formData.service} (${formData.name}${formData.business_name ? ` - ${formData.business_name}` : ""}). Looking forward to the proposal!`;
    const followupUrl = getWhatsAppUrl(followupMsg);

    return (
      <div
        ref={cardContainerRef}
        className="rounded-[24px] p-[22px] lg:p-[36px] bg-[#FAF6EF] text-[#14110F] flex flex-col h-full order-1 lg:order-2 scroll-mt-24"
      >
        {/* Top Meta Row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Scope Logged in Sprint Queue
          </span>
          <span className="text-[13px] sm:text-[14px] text-[#7A6F60] font-mono font-medium">
            Ref: #{referenceId || "EW-SCOPE"}
          </span>
        </div>

        {/* Hero Confirmation with Animated Green Checkmark inside Circle */}
        <div className="flex flex-col items-center text-center mt-5 mb-4">
          <div className="relative flex items-center justify-center mb-3">
            {/* Soft green pulse glow ring */}
            <div className="absolute w-20 h-20 rounded-full bg-[#10B981]/20 animate-ping opacity-30 pointer-events-none" />

            {/* Green circle container with pop animation */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#ECFDF5] border-2 border-[#10B981] flex items-center justify-center text-[#059669] shadow-sm animate-circle-pop">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9 stroke-[#059669]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  className="animate-checkmark-draw"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="font-display text-[26px] sm:text-[30px] font-bold text-[#14110F] mb-1.5 leading-tight">
            Scope Received, {formData.name || "Partner"}!
          </h2>

          <p className="text-[15px] sm:text-[16px] text-[#5C5347] max-w-lg leading-relaxed">
            Your project scope has been securely logged with NDA privacy. Our technical lead is reviewing your objectives and preparing an itemised ₹ quote within 24 hours.
          </p>
        </div>

        {/* Submission Receipt Breakdown Card */}
        <div className="bg-white border border-[#E3D5BD] rounded-[18px] p-4 sm:p-5 mb-4 text-left shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E3D5BD]/60 pb-3 mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[12px] uppercase font-bold tracking-[0.12em] text-[#B3202A]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Submission Receipt</span>
            </div>
            <span className="text-[12px] text-[#7A6F60] font-medium font-mono">
              IST Operational Hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7A6F60] block font-semibold">Primary Service</span>
              <span className="text-[#14110F] font-bold block mt-0.5">{formData.service || "Websites & High-Speed Portals"}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7A6F60] block font-semibold">Indicative Budget</span>
              <span className="text-[#14110F] font-bold block mt-0.5">{formData.budget_range || "₹25,000 – ₹50,000"}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7A6F60] block font-semibold">Contact Email</span>
              <span className="text-[#14110F] font-bold block mt-0.5 truncate">{formData.email || formData.phone || "Direct Inquiry"}</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7A6F60] block font-semibold">Preferred Response</span>
              <span className="text-[#14110F] font-bold block mt-0.5 capitalize">
                {formData.preferred_contact === "whatsapp"
                  ? "WhatsApp (under 15 mins)"
                  : formData.preferred_contact === "phone"
                  ? "Phone Call (IST hours)"
                  : "Formal Email RFP"}
              </span>
            </div>
            {formData.business_name && (
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7A6F60] block font-semibold">Organization</span>
                <span className="text-[#14110F] font-bold block mt-0.5">{formData.business_name}</span>
              </div>
            )}
            {formData.city && (
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7A6F60] block font-semibold">Location / Base</span>
                <span className="text-[#14110F] font-bold block mt-0.5">{formData.city}</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Operational Milestones */}
        <div className="bg-white/80 border border-[#E3D5BD] rounded-[18px] p-4 sm:p-5 mb-4 text-left">
          <div className="text-[12px] uppercase tracking-[0.12em] text-[#B3202A] font-bold mb-3 flex items-center justify-between">
            <span>Next Operational Milestones</span>
            <span className="text-[12px] text-[#059669] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              Active
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Step 1: Completed */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#ECFDF5] border border-[#10B981] text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#14110F]">Scope Logged & Encrypted (Done)</div>
                <div className="text-[13px] text-[#7A6F60]">Your submission is registered under strict NDA and privacy protocols.</div>
              </div>
            </div>

            {/* Step 2: Underway */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#FBEDEC] border border-[#B3202A] text-[#B3202A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                2
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#14110F]">Technical Lead Review (In Progress)</div>
                <div className="text-[13px] text-[#7A6F60]">Senior architect evaluates requirements, tech stack, and milestone breakdown.</div>
              </div>
            </div>

            {/* Step 3: Next */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#F3E2C3]/70 border border-[#CFC3AE] text-[#7A5A1E] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                3
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#14110F]">Itemised ₹ Quote & 18% GST Invoice</div>
                <div className="text-[13px] text-[#7A6F60]">Delivered to {formData.email || "your inbox"} within 24 hours with full ITC eligibility.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mb-3">
          <a
            href={followupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center min-h-[50px] px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-[#14110F]"
          >
            Fast-Track on WhatsApp →
          </a>
          <button
            type="button"
            onClick={() => {
              setFormState("idle");
              setFormData({
                name: "",
                business_name: "",
                phone: "",
                email: "",
                city: "",
                service: "Websites & High-Speed Portals",
                budget_range: "₹25,000 – ₹50,000",
                preferred_contact: "whatsapp",
                message: "",
                honeypot: "",
              });
              formLoadedAtRef.current = Date.now();
            }}
            className="flex items-center justify-center min-h-[50px] px-6 rounded-full border border-[#CFC3AE] bg-white text-[#14110F] font-bold text-[15px] hover:border-[#B3202A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#14110F]"
          >
            Submit Another Scope
          </button>
        </div>

        {/* Direct Escalation Strip */}
        <div className="text-center text-[13px] text-[#5C5347] bg-[#F3E2C3]/30 rounded-[12px] p-2.5 border border-[#E3D5BD]/70 mb-3">
          Need instant escalation? Direct line:{" "}
          <a href={`tel:${siteConfig.phoneRaw}`} className="font-bold text-[#14110F] hover:underline">
            {siteConfig.phone}
          </a>{" "}
          · Email:{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-bold text-[#14110F] hover:underline">
            {siteConfig.email}
          </a>
        </div>

        {/* Pinned Card Footer */}
        <div className="mt-auto pt-[18px] flex justify-between gap-3 flex-wrap text-[13px] text-[#7A6F60] border-t border-[#E3D5BD]">
          <span>Strict NDA and privacy protected</span>
          {siteConfig.gstin ? <span>GSTIN: {siteConfig.gstin}</span> : <span>18% GST invoice with ITC</span>}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardContainerRef}
      className="rounded-[24px] p-[22px] lg:p-[36px] bg-[#FAF6EF] text-[#14110F] flex flex-col h-full order-1 lg:order-2 scroll-mt-24"
    >
      {/* Top Meta Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium bg-[#F3E2C3] text-[#7A5A1E]">
          Detailed proposal route
        </span>
        <span className="text-[14px] text-[#7A6F60]">18% GST invoicing</span>
      </div>

      {/* Card Heading */}
      <h2 className="font-display text-[30px] font-bold text-[#14110F] leading-[1.15] mt-[18px] mb-[8px]">
        Submit your project scope
      </h2>
      <p className="text-[16px] text-[#5C5347] m-0 leading-relaxed">
        Tell us your objectives. Our technical lead will review and send an itemised ₹ quote within 24 hours.
      </p>

      {/* Interactive Form */}
      <form
        onSubmit={handleSubmit}
        onFocus={triggerTurnstileLoad}
        onClick={triggerTurnstileLoad}
        noValidate
        className="flex flex-col flex-1"
      >
        {/* Anti-Bot Honeypot */}
        <div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website_url_hp">Leave this field blank</label>
          <input
            id="website_url_hp"
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* SECTION 1: ABOUT YOU */}
        <div className="flex items-center gap-3 mt-[28px] mb-[16px] text-[13px] uppercase font-bold tracking-[0.12em] text-[#B3202A] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#E3D5BD]">
          About you
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact_name" className="text-[14px] font-bold text-[#3A332C]">
              Full name <span className="text-[#B3202A]">*</span>
            </label>
            <input
              id="contact_name"
              type="text"
              name="name"
              placeholder="e.g. Vikramaditya Singhania"
              value={formData.name || ""}
              onChange={handleInputChange}
              required
              aria-invalid={!!fieldErrors.name?.[0]}
              aria-describedby={fieldErrors.name?.[0] ? "name-error" : undefined}
              className={`h-[50px] rounded-[12px] border px-[14px] text-[16px] bg-white text-[#14110F] transition-all placeholder:text-[#A89F90] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2 ${
                fieldErrors.name?.[0] ? "border-[#B3202A]" : "border-[#CFC3AE]"
              }`}
            />
            {fieldErrors.name?.[0] && (
              <p id="name-error" role="alert" className="text-[13px] text-[#B3202A]">
                {fieldErrors.name[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact_business_name" className="text-[14px] font-bold text-[#3A332C]">
              Company or brand
            </label>
            <input
              id="contact_business_name"
              type="text"
              name="business_name"
              placeholder="e.g. Veda Organics Pvt Ltd"
              value={formData.business_name || ""}
              onChange={handleInputChange}
              className="h-[50px] rounded-[12px] border border-[#CFC3AE] px-[14px] text-[16px] bg-white text-[#14110F] transition-all placeholder:text-[#A89F90] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact_phone" className="text-[14px] font-bold text-[#3A332C]">
              WhatsApp / mobile (+91) <span className="text-[#B3202A]">*</span>
            </label>
            <input
              id="contact_phone"
              type="tel"
              name="phone"
              placeholder="98765 43210"
              value={formData.phone || ""}
              onChange={handleInputChange}
              required
              aria-invalid={!!fieldErrors.phone?.[0]}
              aria-describedby={fieldErrors.phone?.[0] ? "phone-error" : "phone-help"}
              className={`h-[50px] rounded-[12px] border px-[14px] text-[16px] bg-white text-[#14110F] transition-all placeholder:text-[#A89F90] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2 ${
                fieldErrors.phone?.[0] ? "border-[#B3202A]" : "border-[#CFC3AE]"
              }`}
            />
            {fieldErrors.phone?.[0] ? (
              <p id="phone-error" role="alert" className="text-[13px] text-[#B3202A]">
                {fieldErrors.phone[0]}
              </p>
            ) : (
              <small id="phone-help" className="text-[13px] text-[#7A6F60] font-normal">
                10 digits, starting 6–9
              </small>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact_email" className="text-[14px] font-bold text-[#3A332C]">
              Work email <span className="text-[#B3202A]">*</span>
            </label>
            <input
              id="contact_email"
              type="email"
              name="email"
              placeholder="founder@company.in"
              value={formData.email || ""}
              onChange={handleInputChange}
              required
              aria-invalid={!!fieldErrors.email?.[0]}
              aria-describedby={fieldErrors.email?.[0] ? "email-error" : "email-help"}
              className={`h-[50px] rounded-[12px] border px-[14px] text-[16px] bg-white text-[#14110F] transition-all placeholder:text-[#A89F90] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2 ${
                fieldErrors.email?.[0] ? "border-[#B3202A]" : "border-[#CFC3AE]"
              }`}
            />
            {fieldErrors.email?.[0] ? (
              <p id="email-error" role="alert" className="text-[13px] text-[#B3202A]">
                {fieldErrors.email[0]}
              </p>
            ) : (
              <small id="email-help" className="text-[13px] text-[#7A6F60] font-normal">
                For your proposal and NDA
              </small>
            )}
          </div>
        </div>

        {/* SECTION 2: YOUR PROJECT */}
        <div className="flex items-center gap-3 mt-[30px] mb-[16px] text-[13px] uppercase font-bold tracking-[0.12em] text-[#B3202A] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#E3D5BD]">
          Your project
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact_city" className="text-[14px] font-bold text-[#3A332C]">
            City or base of operations
          </label>
          <input
            id="contact_city"
            type="text"
            name="city"
            placeholder="e.g. Bengaluru, Karnataka"
            value={formData.city || ""}
            onChange={handleInputChange}
            className="h-[50px] rounded-[12px] border border-[#CFC3AE] px-[14px] text-[16px] bg-white text-[#14110F] transition-all placeholder:text-[#A89F90] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2"
          />
        </div>

        {/* Quick Pick City Pills */}
        <div className="flex gap-2 flex-wrap mt-3 mb-[18px]">
          {QUICK_PICK_CITIES.map((city) => {
            const isPicked = formData.city === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, city }))}
                className={`rounded-full px-3.5 py-1.5 text-[14px] border transition-colors cursor-pointer min-h-[36px] ${
                  isPicked
                    ? "bg-[#FBEDEC] border-[#B3202A] text-[#14110F] font-bold"
                    : "bg-white border-[#CFC3AE] text-[#14110F] hover:border-[#B3202A]"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact_service" className="text-[14px] font-bold text-[#3A332C]">
              Primary service <span className="text-[#B3202A]">*</span>
            </label>
            <select
              id="contact_service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="h-[50px] rounded-[12px] border border-[#CFC3AE] px-[14px] text-[16px] bg-white text-[#14110F] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2"
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact_budget" className="text-[14px] font-bold text-[#3A332C]">
              Indicative budget (₹) <span className="text-[#B3202A]">*</span>
            </label>
            <select
              id="contact_budget"
              name="budget_range"
              value={formData.budget_range}
              onChange={handleInputChange}
              className="h-[50px] rounded-[12px] border border-[#CFC3AE] px-[14px] text-[16px] bg-white text-[#14110F] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2"
            >
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION 3: HOW SHOULD WE REPLY? */}
        <div className="flex items-center gap-3 mt-[30px] mb-[16px] text-[13px] uppercase font-bold tracking-[0.12em] text-[#B3202A] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#E3D5BD]">
          How should we reply?
        </div>

        <fieldset className="border-0 p-0 m-0">
          <legend className="sr-only">How should we reply?</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "whatsapp", title: "WhatsApp", sub: "Fastest, under 15 min" },
              { id: "phone", title: "Phone call", sub: "IST hours" },
              { id: "email", title: "Email RFP", sub: "Detailed proposal" },
            ].map((option) => {
              const isSelected = formData.preferred_contact === option.id;
              return (
                <label
                  key={option.id}
                  className={`flex flex-col gap-0.5 rounded-[14px] p-[14px] cursor-pointer transition-all border-[1.5px] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#B3202A] has-[:focus-visible]:ring-offset-2 ${
                    isSelected
                      ? "border-[#B3202A] bg-[#FBEDEC] text-[#14110F]"
                      : "border-[#CFC3AE] bg-white text-[#14110F] hover:border-[#B3202A]/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="preferred_contact"
                    value={option.id}
                    checked={isSelected}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-[15px] font-bold text-[#14110F]">{option.title}</span>
                  <small className="text-[13px] text-[#7A6F60] font-normal">{option.sub}</small>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* SECTION 4: TELL US MORE */}
        <div className="flex items-center gap-3 mt-[30px] mb-[16px] text-[13px] uppercase font-bold tracking-[0.12em] text-[#B3202A] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#E3D5BD]">
          Tell us more
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact_message" className="text-[14px] font-bold text-[#3A332C]">
            Project objectives <span className="text-[#B3202A]">*</span>
          </label>
          <textarea
            id="contact_message"
            name="message"
            value={formData.message || ""}
            onChange={handleInputChange}
            placeholder="Describe your bottlenecks, your audience and your launch timeline (at least 10 characters)"
            required
            aria-invalid={!!fieldErrors.message?.[0]}
            aria-describedby="char-count message-error"
            className={`h-[120px] rounded-[12px] border p-[14px] text-[16px] bg-white text-[#14110F] resize-none transition-all placeholder:text-[#A89F90] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2 ${
              fieldErrors.message?.[0] ? "border-[#B3202A]" : "border-[#CFC3AE]"
            }`}
          />
          <div id="char-count" className="text-right text-[13px] text-[#7A6F60] mt-1.5 mb-6">
            {formData.message?.length || 0} / 1000 characters
          </div>
          {fieldErrors.message?.[0] && (
            <p id="message-error" role="alert" className="text-[13px] text-[#B3202A] -mt-4 mb-4">
              {fieldErrors.message[0]}
            </p>
          )}
        </div>

        {/* Turnstile Container (Lazy Rendered) */}
        <div ref={turnstileContainerRef} className="min-h-0 my-0.5" />

        {/* General Error Banner */}
        {generalError && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-[12px] border border-[#B3202A]/40 bg-[#FBEDEC] p-3.5 text-[14px] font-medium text-[#B3202A] mb-4"
          >
            ⚠️ {generalError}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="flex items-center justify-center min-h-[58px] w-full px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[17px] transition-colors focus-visible:outline-2 focus-visible:outline-[#14110F] disabled:opacity-70 cursor-pointer"
        >
          {formState === "submitting"
            ? "Validating & Submitting Scope..."
            : "Submit project scope & request quote →"}
        </button>

        <div className="text-center text-[14px] text-[#5C5347] mt-4">
          Encrypted and private. Every quote includes a transparent 18% GST invoice with ITC.
        </div>

        {/* Pinned Card Footer */}
        <div className="mt-auto pt-[22px] flex justify-between gap-3 flex-wrap text-[13px] text-[#7A6F60]">
          <span>Strict NDA and privacy protected</span>
          {siteConfig.gstin ? <span>GSTIN: {siteConfig.gstin}</span> : null}
        </div>
      </form>
    </div>
  );
}
