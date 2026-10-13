"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <main id="main-content" className="flex-1 flex flex-col min-h-screen bg-[#0c0d10]">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-brand-red focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white shadow-lg"
      >
        Skip to main content
      </a>

      {/* Global Sticky Public Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Global Public Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button (Public Only) */}
      <FloatingWhatsApp />
    </>
  );
}
