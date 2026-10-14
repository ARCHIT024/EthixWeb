import React from "react";
import { getWhatsAppUrl } from "@/lib/siteConfig";

export function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppUrl(
    "Hi Ethixweb, I would like to discuss a project (Website / AI Automation / SEO / Ads / CRM)."
  );

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 print:hidden select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ethixweb on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/30 focus-visible:outline-hidden focus-visible:ring-4 focus-visible:ring-emerald-400 active:scale-95"
      >
        {/* Ambient Ring Wave */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <svg
          className="relative h-7 w-7 fill-current transition-transform duration-200 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.175.2-.351.226-.652.075s-1.27-.468-2.42-1.494c-.894-.798-1.498-1.784-1.674-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526s-.676-1.629-.927-2.231c-.244-.587-.493-.507-.677-.516-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.507 0 1.479 1.078 2.908 1.228 3.109.15.2 2.121 3.239 5.138 4.542.718.311 1.279.497 1.716.636.721.229 1.377.197 1.896.119.579-.087 1.782-.728 2.033-1.43.25-.702.25-1.303.175-1.429-.075-.126-.276-.201-.577-.352zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.977-1.408A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.167 8.167 0 0 1-4.225-1.17l-.303-.18-2.956.837.85-2.873-.198-.315A8.17 8.17 0 1 1 12 20.2z" />
        </svg>

        {/* Hover Tooltip (Hidden on touch / mobile devices for clean UX) */}
        <span
          role="tooltip"
          className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-dark-bg px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block"
        >
          Chat with an Indian specialist
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-dark-bg" />
        </span>
      </a>
    </aside>
  );
}
