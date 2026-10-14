"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#14110F]/75 backdrop-blur-md backdrop-saturate-150 text-white border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.25)] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 h-[76px] flex items-center justify-between gap-4">
        {/* Brand Logo without pill wrapper */}
        <Link
          href="/"
          className="flex items-center focus-visible:outline-2 focus-visible:outline-white rounded-lg transition-opacity hover:opacity-85"
          aria-label="Ethixweb Home"
        >
          <Image
            src="/brand/logo.webp"
            alt="Ethixweb Logo"
            width={132}
            height={22}
            className="h-6 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links (Centred, 28px gap, 15px font-medium, 2px #E0414B underline on active) */}
        <nav
          aria-label="Main Navigation"
          className="hidden min-[900px]:flex items-center gap-[28px] text-[15px] font-medium text-white"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-2 focus-visible:outline-2 focus-visible:outline-white ${
                  isActive
                    ? "text-white underline decoration-[#E0414B] decoration-2 underline-offset-[6px]"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side CTA (Red #B3202A Pill, Min-Height 44px, Padding 0 24px, Bold 16px) */}
        <div className="hidden min-[900px]:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[16px] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get a quote
          </Link>
        </div>

        {/* Mobile Hamburger Drawer Trigger (Below 900px) */}
        <div className="flex items-center min-[900px]:hidden">
          <MobileNav navLinks={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
