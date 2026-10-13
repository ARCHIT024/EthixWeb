"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "fade";
}

/**
 * High-performance, zero-layout-shift scroll-reveal component.
 * Uses IntersectionObserver to trigger CSS transform/opacity once per element.
 * Respects `prefers-reduced-motion` strictly by showing immediately without animation.
 */
export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        setIsRevealed(true);
        return;
      }
    }

    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target); // Unobserve once revealed
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.12,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const delayStyle = delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : {};

  const transformStyle =
    direction === "up"
      ? isRevealed
        ? "translateY(0)"
        : "translateY(24px)"
      : "translateY(0)";

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: transformStyle,
        transition:
          "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity, transform",
        ...delayStyle,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
