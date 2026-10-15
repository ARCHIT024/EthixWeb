"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle open state
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  // Keyboard accessibility: Escape key and Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when drawer is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus on first element in drawer
    const timer = setTimeout(() => {
      const first = menuRef.current?.querySelector<HTMLElement>("a, button");
      first?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Accessible Hamburger Button */}
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[#14110F] text-white hover:bg-white/10 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-white"
      >
        {isOpen ? (
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop & Translucent Dark Drawer Panel */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop with frosted blur */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Translucent Drawer Content */}
          <div
            id="mobile-navigation-drawer"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="relative ml-auto flex h-full w-full max-w-xs flex-col justify-between bg-[#14110F]/90 backdrop-blur-2xl text-white p-6 shadow-2xl border-l border-white/15"
            style={{
              backgroundColor: "rgba(20, 17, 15, 0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <Link href="/" onClick={closeMenu} className="flex items-center transition-opacity hover:opacity-85">
                  <Image
                    src="/brand/logo.webp"
                    alt="Ethixweb"
                    width={110}
                    height={18}
                    loading="lazy"
                    className="h-5 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  type="button"
                  aria-label="Close menu"
                  className="rounded-xl h-11 w-11 inline-flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-white/40 text-sm">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CTAs in drawer */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link href="/contact" onClick={closeMenu} className="w-full">
                <button
                  type="button"
                  className="w-full min-h-[44px] px-6 rounded-full bg-[#B3202A] hover:bg-[#9c1822] text-white font-bold text-[16px] transition-colors"
                >
                  Get a quote
                </button>
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20Ethixweb%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full"
              >
                <button
                  type="button"
                  className="w-full min-h-[44px] px-6 rounded-full bg-transparent border-[1.5px] border-white/50 hover:bg-white/10 text-white font-bold text-[16px] transition-colors"
                >
                  Chat on WhatsApp
                </button>
              </a>
              {/* Social Channels */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/company/ethixweb/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ethixweb on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/80 hover:text-white hover:border-[#D9B873] transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ethix.web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ethixweb on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/80 hover:text-white hover:border-[#D9B873] transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/ETHIXWEB"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ethixweb on X"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white/80 hover:text-white hover:border-[#D9B873] transition-colors"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>

              <p className="text-center text-[12px] text-[#A89F90] mt-1">
                Mon–Sat, 10 AM–7 PM IST
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
