"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  enquirySchema,
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  type EnquiryInput,
} from "@/lib/validations/enquiry";
import { siteConfig } from "@/lib/siteConfig";

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
  const [cardMinHeight, setCardMinHeight] = useState<number | undefined>(undefined);
  const [submissionCount, setSubmissionCount] = useState(0);
  const formLoadedAtRef = useRef<number>(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const confirmationContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

  // Accessibility & Visibility: focus heading and center confirmation content in view
  useEffect(() => {
    if (formState === "success") {
      headingRef.current?.focus({ preventScroll: true });

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Scroll so the entire confirmation content (tick, heading, text, button) is centered in the viewport
      if (confirmationContentRef.current) {
        confirmationContentRef.current.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
      } else if (cardContainerRef.current) {
        cardContainerRef.current.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        });
      }
    }
  }, [formState, submissionCount]);

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

      // Measure card's current height before swapping to success view to prevent layout jump
      if (cardContainerRef.current) {
        setCardMinHeight(cardContainerRef.current.offsetHeight);
      }

      // Generate reference ticket ID for admin / audit (retained but not displayed to user)
      const genRef = "EW-" + Math.floor(10000 + Math.random() * 90000);
      void genRef;

      // Blur the active submit button before unmounting to prevent browser focus-loss jumping to (0,0)
      if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      setSubmissionCount((prev) => prev + 1);
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

  const handleResetToForm = () => {
    setCardMinHeight(undefined);
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
    setFieldErrors({});
    setGeneralError("");
    formLoadedAtRef.current = Date.now();
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);
  };

  // SUCCESS STATE: Minimal animated confirmation (1:1 with ethixweb-contact-success-reference.html)
  if (formState === "success") {
    const rawFirstName = formData.name ? formData.name.trim().split(/\s+/)[0] : "";
    const headingText = rawFirstName ? `Thank you, ${rawFirstName}!` : "Thank you!";

    const getResponseParagraph = () => {
      if (formData.preferred_contact === "phone") {
        return `We have your project scope. We will call you during IST hours (${siteConfig.operatingHours.display}), and your itemised ₹ quote will follow within 24 hours.`;
      }
      if (formData.preferred_contact === "email") {
        return "We have your project scope. We will email your detailed proposal and itemised ₹ quote within 24 hours.";
      }
      return "We have your project scope. We will reply on WhatsApp shortly, and your itemised ₹ quote will follow within 24 hours.";
    };

    return (
      <div
        key={`success-${submissionCount}`}
        ref={cardContainerRef}
        role="status"
        aria-live="polite"
        style={{ minHeight: cardMinHeight ? `${cardMinHeight}px` : undefined }}
        className="rounded-[24px] p-[22px] sm:p-[36px] bg-[#FAF6EF] text-[#14110F] flex flex-col items-center justify-center text-center h-full order-1 lg:order-2 scroll-mt-24"
      >
        <div
          ref={confirmationContentRef}
          className="flex flex-col items-center justify-center text-center w-full max-w-[420px]"
        >
          <svg
            width="104"
            height="104"
            viewBox="0 0 104 104"
            aria-hidden="true"
            className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px]"
          >
            <circle className="halo" cx="52" cy="52" r="44" fill="none" stroke="#25A55F" strokeWidth="2" />
            <circle className="bgc" cx="52" cy="52" r="44" fill="#25A55F" fillOpacity=".1" />
            <circle
              className="ring"
              cx="52"
              cy="52"
              r="44"
              fill="none"
              stroke="#25A55F"
              strokeWidth="3.5"
              strokeLinecap="round"
              transform="rotate(-90 52 52)"
            />
            <path
              className="chk"
              d="M32 54L46 68L73 38"
              fill="none"
              stroke="#25A55F"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2
            ref={headingRef}
            tabIndex={-1}
            className="fu font-display font-bold text-[30px] sm:text-[36px] leading-[1.15] mt-[28px] mb-[12px] text-[#14110F] outline-none"
            style={{ animationDelay: ".95s" }}
          >
            {headingText}
          </h2>

          <p
            className="fu text-[16px] sm:text-[18px] text-[#5C5347] max-w-[400px] mt-0 mb-[28px] leading-relaxed font-body"
            style={{ animationDelay: "1.1s" }}
          >
            {getResponseParagraph()}
          </p>

          <button
            type="button"
            onClick={handleResetToForm}
            className="fu inline-flex items-center justify-center rounded-full border border-[#CFC3AE] bg-white text-[#14110F] text-[15px] font-medium py-[10px] px-[20px] hover:border-[#9E907B] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:ring-offset-2"
            style={{ animationDelay: "1.25s" }}
          >
            Send another enquiry
          </button>
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
              ref={firstInputRef}
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
