"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { validateIndianPhone, validateEmail } from "@/lib/security";

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

export function LeadInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    business_name: "",
    phone: "",
    email: "",
    city: "",
    service: "Websites & High-Speed Portals",
    budget_range: "₹25,000 – ₹50,000",
    preferred_contact: "whatsapp",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Lazy-load Turnstile script on first interaction to preserve sub-second initial paint times
  const triggerTurnstileLoad = () => {
    if (turnstileLoaded || typeof window === "undefined") return;
    setTurnstileLoaded(true);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || siteKey === "your-turnstile-site-key") {
      // Dev mode: simulated token
      setTurnstileToken("dev_mode_token");
      return;
    }

    if (!document.getElementById("turnstile-script")) {
      const script = document.createElement("script");
      script.id = "turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
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

    // Clear field-specific error when user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhoneBlur = () => {
    if (!formData.phone) return;
    const validation = validateIndianPhone(formData.phone);
    if (!validation.isValid) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: "Enter a valid 10-digit Indian mobile number (e.g. 98765 43210)",
      }));
    } else {
      setFormData((prev) => ({ ...prev, phone: validation.normalized }));
    }
  };

  const handleEmailBlur = () => {
    if (!formData.email) return;
    if (!validateEmail(formData.email)) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "Please enter a valid work email address",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validations
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!validateEmail(formData.email)) errors.email = "Valid work email is required";

    const phoneCheck = validateIndianPhone(formData.phone);
    if (!phoneCheck.isValid) {
      errors.phone = "Valid 10-digit Indian phone is required";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: phoneCheck.normalized,
          turnstile_token: turnstileToken || "dev_bypass",
          source: "contact_page",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setFormState("success");
    } catch (err: unknown) {
      setFormState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to submit. Please reach out directly on WhatsApp (+91 98765 43210)."
      );
    }
  };

  if (formState === "success") {
    const whatsappFollowup =
      "https://wa.me/919876543210?text=" +
      encodeURIComponent(
        `Hi Ethixweb, I just submitted an inquiry on your website for ${formData.service} (${formData.name} - ${formData.business_name || "New Project"}).`
      );

    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-8 sm:p-10 text-center dark:bg-emerald-950/20">
        {/* Abstract Kolam/Rangoli Success Node */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300">
          <svg className="h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <Badge variant="success" size="md" dot className="mb-3">
          Scope Received in Supabase
        </Badge>

        <h3 className="font-display text-2xl font-bold text-dark-bg dark:text-white mb-2">
          Thank you, {formData.name}!
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
          Your project details have been recorded. Our technical lead will review your requirements and send an itemized proposal to <strong className="text-dark-bg dark:text-white">{formData.email}</strong> within 15 minutes during IST operating hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={whatsappFollowup} target="_blank" rel="noopener noreferrer">
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
              });
            }}
            className="text-xs font-semibold text-gray-500 hover:text-dark-bg dark:hover:text-white py-2 px-3"
          >
            Submit Another Project
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
      {/* Error Banner */}
      {formState === "error" && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-medium text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Row 1: Name & Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          name="name"
          placeholder="e.g. Vikramaditya Singhania"
          value={formData.name}
          onChange={handleInputChange}
          error={fieldErrors.name}
          required
        />
        <Input
          label="Company / Brand Name"
          name="business_name"
          placeholder="e.g. Veda Organics Pvt Ltd"
          value={formData.business_name}
          onChange={handleInputChange}
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
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={handlePhoneBlur}
          error={fieldErrors.phone}
          helperText="10-digit Indian phone number"
          required
        />
        <Input
          label="Official Work Email"
          name="email"
          type="email"
          placeholder="founder@company.in"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleEmailBlur}
          error={fieldErrors.email}
          helperText="For NDA & proposal delivery"
          required
        />
      </div>

      {/* Row 3: City with Quick Chips */}
      <div>
        <Input
          label="City / Base of Operations"
          name="city"
          placeholder="e.g. Bengaluru, Karnataka"
          value={formData.city}
          onChange={handleInputChange}
        />
        {/* Quick Indian City Chips */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mr-1">
            Quick Pick:
          </span>
          {INDIAN_CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, city: c }))}
              className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors ${
                formData.city.includes(c)
                  ? "bg-brand-red text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-dark-surface dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: Service Selection & Indicative Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Primary Service <span className="text-brand-red">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100"
          >
            <option value="Websites & High-Speed Portals">Websites &amp; High-Speed Next.js Portals</option>
            <option value="AI Receptionists & Voice/Chat">AI Receptionists &amp; Custom Voice Agents</option>
            <option value="Growth, SEO & Paid Ads">Growth, Regional SEO &amp; Performance Ads</option>
            <option value="Data Pipelines & CRM Integrations">Data Pipelines &amp; CRM Integrations</option>
            <option value="Accessibility & Core Web Vitals">Accessibility &amp; Core Web Vitals Tuning</option>
            <option value="Full Digital Retainer Support">Full Digital Operations Retainer</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Indicative Budget (₹ INR) <span className="text-brand-red">*</span>
          </label>
          <select
            name="budget_range"
            value={formData.budget_range}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100"
          >
            <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000 (Sprint MVP)</option>
            <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000 (Full Platform)</option>
            <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000 (Enterprise AI)</option>
            <option value="₹2,50,000+">₹2,50,000+ (Custom Retainer)</option>
          </select>
        </div>
      </div>

      {/* Row 5: Preferred Contact Radio */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
          Preferred Mode of Initial Response
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "whatsapp", label: "💬 WhatsApp", desc: "Fastest (<15m)" },
            { id: "phone", label: "📞 Phone Call", desc: "IST Hours" },
            { id: "email", label: "✉️ Email RFP", desc: "Detailed PDF" },
          ].map((mode) => (
            <label
              key={mode.id}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                formData.preferred_contact === mode.id
                  ? "border-brand-red bg-red-50/50 text-brand-red dark:bg-red-950/20 dark:border-brand-red font-semibold"
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

      {/* Row 6: Message / Project Scope */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
          Project Objectives &amp; Desired Launch Date
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Briefly describe what bottlenecks you are looking to solve, current website URL, or desired integrations..."
          value={formData.message}
          onChange={handleInputChange}
          className="w-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 px-3.5 focus:border-brand-red focus:outline-hidden focus:ring-2 focus:ring-red-100 placeholder:text-gray-400"
        />
      </div>

      {/* Turnstile Container (Lazy Rendered) */}
      <div ref={turnstileContainerRef} className="min-h-[40px] flex items-center justify-center" />

      {/* Submit Action */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={formState === "submitting"}
        className="w-full font-semibold shadow-md"
      >
        {formState === "submitting"
          ? "Securing in Supabase..."
          : "Submit Project Scope & Request Quote →"}
      </Button>

      <p className="text-center text-[11px] text-gray-400 pt-1">
        🔒 Encrypted &amp; private. All quotes include transparent 18% GST invoice.
      </p>
    </form>
  );
}
