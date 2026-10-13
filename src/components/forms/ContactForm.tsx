"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  enquirySchema,
  SERVICE_CATEGORIES,
  BUDGET_RANGES,
  type EnquiryInput,
} from "@/lib/validations/enquiry";

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

const INDIAN_CITIES = [
  "Bengaluru",
  "Delhi NCR",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Surat",
  "Jaipur",
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
  const formLoadedAtRef = useRef<number>(0);

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

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

      setFormState("success");
    } catch (err: unknown) {
      setFormState("error");
      setGeneralError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please message us directly via WhatsApp (+91 98765 43210)."
      );
    }
  };

  if (formState === "success") {
    const whatsappUrl =
      "https://wa.me/919876543210?text=" +
      encodeURIComponent(
        `Hi Ethixweb, I just submitted an inquiry for ${formData.service} (${formData.name} - ${formData.business_name || "New Scope"}).`
      );

    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-8 sm:p-10 text-center dark:bg-emerald-950/20">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/20 dark:bg-emerald-900/60 dark:text-emerald-300">
          <svg className="h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path className="animate-checkmark-draw" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <Badge variant="success" size="md" dot className="mb-3">
          Scope Received in Database
        </Badge>

        <h3 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-2">
          Thank you, {formData.name}!
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
          Your project scope has been securely recorded. Our technical team replies to inquiries within 15 minutes during IST operational hours (09:30–20:00).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="md" className="bg-[#25D366] hover:bg-[#20ba59]">
              Fast-Track on WhatsApp Now →
            </Button>
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
            className="text-xs font-semibold text-gray-500 hover:text-dark-bg dark:hover:text-white py-2 px-3"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={triggerTurnstileLoad}
      onClick={triggerTurnstileLoad}
      className="space-y-5 text-left"
      noValidate
    >
      {/* Friendly Error State Banner */}
      {generalError && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-medium text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          ⚠️ {generalError}
        </div>
      )}

      {/* Hidden Anti-Bot Honeypot Field (Invisible to real humans, bots fill this) */}
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

      {/* Row 1: Name & Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          name="name"
          placeholder="e.g. Vikramaditya Singhania"
          value={formData.name || ""}
          onChange={handleInputChange}
          error={fieldErrors.name?.[0]}
          required
        />
        <Input
          label="Company / Brand Name"
          name="business_name"
          placeholder="e.g. Veda Organics Pvt Ltd"
          value={formData.business_name || ""}
          onChange={handleInputChange}
          error={fieldErrors.business_name?.[0]}
        />
      </div>

      {/* Row 2: Phone (+91) & Work Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="WhatsApp / Mobile Phone (+91)"
          name="phone"
          type="tel"
          placeholder="98765 43210"
          prefix="+91"
          value={formData.phone || ""}
          onChange={handleInputChange}
          error={fieldErrors.phone?.[0]}
          helperText="10-digit Indian phone (starting 6-9)"
          required
        />
        <Input
          label="Official Work Email"
          name="email"
          type="email"
          placeholder="founder@company.in"
          value={formData.email || ""}
          onChange={handleInputChange}
          error={fieldErrors.email?.[0]}
          helperText="For NDA & proposal delivery"
          required
        />
      </div>

      {/* Row 3: City & Quick Chips */}
      <div>
        <Input
          label="City / Base of Operations"
          name="city"
          placeholder="e.g. Bengaluru, Karnataka"
          value={formData.city || ""}
          onChange={handleInputChange}
          error={fieldErrors.city?.[0]}
        />
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mr-1">
            Quick Pick:
          </span>
          {INDIAN_CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, city: c }))}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all min-h-[36px] inline-flex items-center justify-center cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                formData.city?.includes(c)
                  ? "bg-brand-red text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-surface dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: Service & Budget Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Primary Service <span className="text-brand-red">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 transition-all duration-200 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100 dark:focus:ring-brand-red/20 focus:shadow-[0_0_12px_rgba(229,29,37,0.12)] min-h-[44px]"
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {fieldErrors.service?.[0] && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.service[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Indicative Budget (₹ INR) <span className="text-brand-red">*</span>
          </label>
          <select
            name="budget_range"
            value={formData.budget_range}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 transition-all duration-200 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100 dark:focus:ring-brand-red/20 focus:shadow-[0_0_12px_rgba(229,29,37,0.12)] min-h-[44px]"
          >
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {fieldErrors.budget_range?.[0] && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.budget_range[0]}</p>
          )}
        </div>
      </div>

      {/* Row 5: Preferred Contact Mode */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
          Preferred Mode of Response
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "whatsapp", label: "💬 WhatsApp", desc: "Fastest (<15m)" },
            { id: "phone", label: "📞 Phone Call", desc: "IST Hours" },
            { id: "email", label: "✉️ Email RFP", desc: "Detailed Proposal" },
          ].map((mode) => (
            <label
              key={mode.id}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer min-h-[44px] transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                formData.preferred_contact === mode.id
                  ? "border-brand-red bg-red-50/50 text-brand-red dark:bg-red-950/20 dark:border-brand-red font-semibold shadow-xs"
                  : "border-light-border dark:border-dark-border hover:bg-gray-50 text-gray-600 dark:text-gray-300 dark:hover:bg-dark-surface"
              }`}
            >
              <input
                type="radio"
                name="preferred_contact"
                value={mode.id}
                checked={formData.preferred_contact === mode.id}
                onChange={handleInputChange}
                className="sr-only"
              />
              <span className="text-xs font-medium">{mode.label}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{mode.desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Row 6: Project Scope Message (10-1000 chars) */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
          Project Objectives &amp; Overview <span className="text-brand-red">*</span>
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Briefly describe your current bottlenecks, target audience, and desired launch timeline (min 10 characters)..."
          value={formData.message || ""}
          onChange={handleInputChange}
          className={`w-full rounded-xl border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 transition-all duration-200 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:shadow-[0_0_12px_rgba(229,29,37,0.12)] ${
            fieldErrors.message?.[0]
              ? "border-red-500 focus:ring-red-100"
              : "border-light-border dark:border-dark-border focus:border-brand-red focus:ring-red-100 dark:focus:ring-brand-red/20"
          }`}
          required
        />
        {fieldErrors.message?.[0] ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.message[0]}</p>
        ) : (
          <p className="mt-1 text-[11px] text-gray-400">
            {formData.message?.length || 0} / 1000 characters (minimum 10)
          </p>
        )}
      </div>

      {/* Turnstile Container (Lazy Rendered) */}
      <div ref={turnstileContainerRef} className="min-h-[40px] flex items-center justify-center" />

      {/* Submit Button with Loading State */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={formState === "submitting"}
        className="w-full font-semibold shadow-md"
      >
        {formState === "submitting"
          ? "Validating & Submitting Scope..."
          : "Submit Project Scope & Request Quote →"}
      </Button>

      <p className="text-center text-[11px] text-gray-400 pt-1">
        🔒 Encrypted &amp; private. All quotes include transparent 18% GST invoice with ITC.
      </p>
    </form>
  );
}
