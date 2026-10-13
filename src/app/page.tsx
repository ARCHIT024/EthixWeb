import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JaaliPattern } from "@/components/patterns/JaaliPattern";
import { RangoliDivider } from "@/components/patterns/RangoliDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-light-bg text-dark-bg selection:bg-brand-red selection:text-white flex flex-col justify-between">
      {/* Navigation Bar */}
      <header className="border-b border-light-border bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <Container size="default">
          <div className="flex h-18 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-dark-bg p-2 rounded-xl inline-flex items-center shadow-xs">
                <Image
                  src="/brand/logo.webp"
                  alt="Ethixweb Logo"
                  width={140}
                  height={22}
                  className="h-5.5 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/design-system">
                <Button variant="secondary" size="sm">
                  View Design System →
                </Button>
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hello%20Ethixweb%20Team"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm">
                  WhatsApp Direct
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero Section with Jaali Pattern & Brand Red Highlights */}
      <section className="relative overflow-hidden py-20 sm:py-28 flex-1 flex items-center">
        <JaaliPattern opacity={0.06} inverted={false} />

        <Container size="default" className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Badge variant="red" dot size="md">
                India Operations & Growth
              </Badge>
              <Badge variant="brass" size="md">
                IST Availability
              </Badge>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-dark-bg leading-[1.1] sm:leading-[1.08]">
              We run the tech. <br />
              <span className="text-brand-red">You run the business.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Websites, AI automation, CRM integrations, and performance marketing engineered for high-growth Indian enterprises and global teams.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/design-system">
                <Button variant="primary" size="lg">
                  Explore Design System (/design-system)
                </Button>
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hello%20Ethixweb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  Chat on WhatsApp (+91)
                </Button>
              </a>
            </div>

            {/* Rangoli Geometric Accent */}
            <RangoliDivider opacity={0.25} inverted={false} className="mt-12" />

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 font-medium">
              <span>✓ Transparent ₹ Pricing + 18% GST</span>
              <span>✓ +91 Domestic Validation</span>
              <span>✓ Zero Heavy JS Bloat</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-light-border py-6 bg-white/50 text-center text-xs text-gray-500">
        <Container size="default">
          EthixWeb India Assessment • Designed for 90+ Mobile & Desktop PageSpeed
        </Container>
      </footer>
    </main>
  );
}
