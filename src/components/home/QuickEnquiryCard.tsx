"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  quickEnquirySchema,
  QUICK_BUDGET_RANGES,
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
    onTurnstileLoaded?: () => void;
  }
}

export function QuickEnquiryCard() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget_range: "₹50,000 – ₹2 lakh",
    honeypot: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);

  const formLoadedAtRef = useRef<number>(0);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

  // Lazy-load Turnstile script strictly on first interaction / focus
  const triggerTurnstileLoad = () => {
    if (turnstileLoaded || typeof window === "undefined") return;
    setTurnstileLoaded(true);

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) {
      setTurnstileToken("dev_bypass");
      return;
    }

    if (document.getElementById("turnstile-script")) return;

    window.onTurnstileLoaded = () => {
      if (window.turnstile && turnstileContainerRef.current) {
        try {
          const id = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => setTurnstileToken(token),
            "error-callback": () => setTurnstileToken("error_fallback"),
          });
          widgetIdRef.current = id;
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    const script = document.createElement("script");
    script.id = "turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoaded";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    setGeneralError("");
    setFieldErrors({});

    // Client-side Zod validation
    const payload = {
      name: formData.name,
      phone: formData.phone,
      budget_range: formData.budget_range,
      honeypot: formData.honeypot,
      form_loaded_at: formLoadedAtRef.current || Date.now(),
      turnstile_token: turnstileToken || "dev_bypass",
      source: "hero" as const,
    };

    const clientParse = quickEnquirySchema.safeParse(payload);
    if (!clientParse.success) {
      const errors: Record<string, string> = {};
      for (const issue of clientParse.error.issues) {
        const path = issue.path[0]?.toString() || "form";
        errors[path] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) {
          const formatted: Record<string, string> = {};
          for (const key of Object.keys(data.fieldErrors)) {
            formatted[key] = data.fieldErrors[key][0];
          }
          setFieldErrors(formatted);
        }
        setGeneralError(
          data.error || "Failed to submit request. Please try WhatsApp directly."
        );
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
    } catch {
      setGeneralError(
        "Network connection error. Please message us on WhatsApp directly."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF6EF] text-[#14110F] rounded-[20px] p-8 w-full max-w-[460px] mx-auto lg:ml-auto">
      {/* Hidden container for Cloudflare Turnstile */}
      <div ref={turnstileContainerRef} className="hidden" aria-hidden="true" />

      {isSuccess ? (
        <div className="py-6 text-center animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-[#B3202A]/10 text-[#B3202A] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-[26px] font-bold text-[#14110F] mb-2">
            Thanks, we&apos;ll reach out shortly.
          </h2>
          <p className="text-[15px] text-[#5C5347] mb-6 leading-relaxed">
            Our technical team will review your requirements and reply within the hour via WhatsApp or phone.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20Ethixweb%2C%20I%20just%20submitted%20a%20callback%20request%20on%20your%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[46px] w-full rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[16px] transition-colors"
          >
            Open in WhatsApp (+91)
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: "",
                phone: "",
                budget_range: "₹50,000 – ₹2 lakh",
                honeypot: "",
              });
              formLoadedAtRef.current = Date.now();
            }}
            className="text-xs text-[#5C5347] hover:text-[#14110F] underline mt-4 block mx-auto cursor-pointer"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot anti-spam trap */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url_hp">Leave this empty</label>
            <input
              id="website_url_hp"
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>

          <h2 className="font-display text-[26px] font-bold text-[#14110F] mb-1 leading-tight">
            Tell us what you need
          </h2>
          <p className="text-[15px] text-[#5C5347] mb-5 leading-normal">
            We&apos;ll reply on WhatsApp or call, as you prefer.
          </p>

          {generalError && (
            <div
              role="alert"
              className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-[#B3202A] text-xs leading-normal"
            >
              {generalError}
            </div>
          )}

          <div className="grid gap-[14px]">
            {/* Field: Your name */}
            <div className="flex flex-col gap-1.5 text-[14px] font-medium text-[#3A332C]">
              <label htmlFor="hero_name" className="cursor-pointer">
                Your name
              </label>
              <input
                id="hero_name"
                name="name"
                type="text"
                placeholder="Rohan Mehta"
                value={formData.name}
                onChange={handleChange}
                onFocus={triggerTurnstileLoad}
                required
                className={`h-[46px] border rounded-[10px] px-3 font-sans text-[15px] bg-white text-[#14110F] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:border-transparent transition-all placeholder:text-gray-400 ${
                  fieldErrors.name ? "border-[#B3202A] bg-red-50/20" : "border-[#CFC3AE]"
                }`}
              />
              {fieldErrors.name && (
                <span className="text-xs text-[#B3202A] font-normal" role="alert">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            {/* Field: Mobile number */}
            <div className="flex flex-col gap-1.5 text-[14px] font-medium text-[#3A332C]">
              <label htmlFor="hero_phone" className="cursor-pointer">
                Mobile number
              </label>
              <input
                id="hero_phone"
                name="phone"
                type="tel"
                placeholder="+91 98XXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
                onFocus={triggerTurnstileLoad}
                required
                className={`h-[46px] border rounded-[10px] px-3 font-sans text-[15px] bg-white text-[#14110F] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:border-transparent transition-all placeholder:text-gray-400 ${
                  fieldErrors.phone ? "border-[#B3202A] bg-red-50/20" : "border-[#CFC3AE]"
                }`}
              />
              {fieldErrors.phone && (
                <span className="text-xs text-[#B3202A] font-normal" role="alert">
                  {fieldErrors.phone}
                </span>
              )}
            </div>

            {/* Field: Monthly budget */}
            <div className="flex flex-col gap-1.5 text-[14px] font-medium text-[#3A332C]">
              <label htmlFor="hero_budget" className="cursor-pointer">
                Monthly budget
              </label>
              <select
                id="hero_budget"
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
                onFocus={triggerTurnstileLoad}
                className="h-[46px] border border-[#CFC3AE] rounded-[10px] px-3 font-sans text-[15px] bg-white text-[#14110F] focus:outline-none focus:ring-2 focus:ring-[#B3202A] focus:border-transparent transition-all cursor-pointer"
              >
                {QUICK_BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="min-h-[46px] w-full rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[16px] flex items-center justify-center transition-colors cursor-pointer mt-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B3202A] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </span>
              ) : (
                "Request a call back"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
