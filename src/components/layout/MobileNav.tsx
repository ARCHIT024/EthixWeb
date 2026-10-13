"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <div className="lg:hidden">
      {/* Accessible Hamburger Button */}
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-light-border bg-white text-dark-bg hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 transition-transform focus-visible:outline-2 focus-visible:outline-brand-red dark:border-dark-border dark:bg-dark-surface dark:text-gray-100"
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

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-dark-bg/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div
            id="mobile-navigation-drawer"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="relative ml-auto flex h-full w-full max-w-xs flex-col justify-between bg-white p-6 shadow-2xl dark:bg-dark-surface"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-light-border dark:border-dark-border">
                <Link href="/" onClick={closeMenu} className="flex items-center">
                  <div className="bg-dark-bg p-2 rounded-xl inline-flex items-center shadow-xs">
                    <Image
                      src="/brand/logo.webp"
                      alt="Ethixweb"
                      width={120}
                      height={20}
                      loading="lazy"
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                </Link>
                <button
                  onClick={closeMenu}
                  type="button"
                  aria-label="Close menu"
                  className="rounded-xl h-11 w-11 inline-flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-dark-bg dark:text-gray-400 dark:hover:bg-dark-surface-elevated focus-visible:outline-2 focus-visible:outline-brand-red transition-colors"
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
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-dark-bg hover:bg-light-bg dark:text-gray-100 dark:hover:bg-dark-surface-elevated transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="text-gray-400 text-sm">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CTAs in drawer */}
            <div className="pt-6 border-t border-light-border dark:border-dark-border flex flex-col gap-3">
              <Link href="/contact" onClick={closeMenu} className="w-full">
                <Button variant="primary" size="lg" className="w-full">
                  Get a quote
                </Button>
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20Ethixweb%2C%20I%20would%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full"
              >
                <Button variant="secondary" size="md" className="w-full">
                  WhatsApp (+91)
                </Button>
              </a>
              <p className="text-center text-[11px] text-gray-400 mt-2">
                Office Hours: 09:30–20:00 IST
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
