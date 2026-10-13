"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IstStatusBadge } from "./IstStatusBadge";
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
    <header className="sticky top-0 z-40 w-full border-b border-light-border bg-white/80 backdrop-blur-md transition-colors dark:border-dark-border dark:bg-dark-bg/85">
      <Container size="default">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg"
            aria-label="Ethixweb Home"
          >
            <div className="bg-dark-bg px-2.5 py-1.5 rounded-xl inline-flex items-center shadow-xs transition-transform group-hover:scale-[1.02]">
              <Image
                src="/brand/logo.webp"
                alt="Ethixweb Logo"
                width={132}
                height={22}
                className="h-5.5 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links with Animated Underline Micro-Interaction */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 bg-light-surface-subtle/80 dark:bg-dark-surface/60 border border-light-border/60 dark:border-dark-border/60 rounded-full px-2 py-1 shadow-2xs"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={isActive ? "true" : "false"}
                  className={`nav-link-animated inline-flex items-center min-h-[44px] rounded-full px-4 text-sm font-medium transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-red ${
                    isActive
                      ? "text-brand-red font-semibold bg-white dark:bg-dark-surface shadow-2xs"
                      : "text-gray-700 hover:text-dark-bg hover:bg-white/80 dark:text-gray-300 dark:hover:text-white dark:hover:bg-dark-surface"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side: IST Status Badge & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <IstStatusBadge />
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Get a quote
              </Button>
            </Link>
          </div>

          {/* Mobile Right Side: IST Indicator & Hamburger Drawer */}
          <div className="flex items-center gap-2 lg:hidden">
            <IstStatusBadge className="hidden xs:inline-flex text-[10px] px-2 py-0.5" />
            <MobileNav navLinks={NAV_LINKS} />
          </div>
        </div>
      </Container>
    </header>
  );
}
