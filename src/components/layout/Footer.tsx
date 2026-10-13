import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RangoliDivider } from "@/components/patterns/RangoliDivider";

export function Footer() {
  return (
    <footer className="border-t border-light-border bg-white transition-colors dark:border-dark-border dark:bg-dark-bg text-dark-bg dark:text-gray-200">
      <Container size="default" className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & One-Line Pitch */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="bg-dark-bg px-3 py-2 rounded-xl inline-flex items-center shadow-xs">
                <Image
                  src="/brand/logo.webp"
                  alt="Ethixweb Logo"
                  width={140}
                  height={24}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed mb-6">
              Engineering full-stack digital operations, AI automation, custom websites, and revenue-focused infrastructure for ambitious Indian businesses and global teams.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ethixweb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ethixweb LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-light-border text-gray-600 hover:border-brand-red hover:text-brand-red dark:border-dark-border dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ethix.web/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ethixweb Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-light-border text-gray-600 hover:border-brand-red hover:text-brand-red dark:border-dark-border dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com/ethixweb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ethixweb on X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-light-border text-gray-600 hover:border-brand-red hover:text-brand-red dark:border-dark-border dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-brand-red dark:text-gray-400 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-brand-red dark:text-gray-400 dark:hover:text-white transition-colors">
                  Services Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-brand-red dark:text-gray-400 dark:hover:text-white transition-colors">
                  About Ethixweb
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-brand-red dark:text-gray-400 dark:hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-300 text-xs">
                  Design System (Dev)
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>Websites &amp; Next.js Portals</li>
              <li>AI Receptionists &amp; Agents</li>
              <li>CRM &amp; Pipeline Automation</li>
              <li>Technical SEO &amp; Local Search</li>
              <li>Meta &amp; Google Ads Scaling</li>
            </ul>
          </div>

          {/* India Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              India Presence
            </h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-start gap-2">
                <span className="text-brand-red font-bold">📍</span>
                <span>Bengaluru • Delhi NCR • Mumbai, India</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-brand-red font-bold">✉️</span>
                <a
                  href="mailto:hello@ethixweb.com"
                  className="hover:text-brand-red dark:hover:text-white transition-colors"
                >
                  hello@ethixweb.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">📞</span>
                <a
                  href="tel:+919876543210"
                  className="hover:text-brand-red dark:hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </p>
              <p className="text-xs text-gray-500 pt-1">
                Active hours: 09:30–20:00 IST (Mon–Sat)
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Rangoli Pattern Divider */}
        <RangoliDivider opacity={0.2} inverted={false} className="my-10" />

        {/* GST & Legal Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400 pt-2">
          <div className="text-center md:text-left">
            <span>© 2026 Ethixweb Technologies Pvt. Ltd. Registered in India.</span>
            <span className="block sm:inline sm:ml-2 text-gray-400">
              GSTIN: 07AAAAA0000A1Z5 • 18% GST Invoicing with ITC.
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
            <span>Security: Zero-Trust</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
