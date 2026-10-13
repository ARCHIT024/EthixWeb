import React from "react";

export type PatternName =
  | "kolam"
  | "bandhani"
  | "stepwell"
  | "butta"
  | "ikat"
  | "jaali";

export interface SectionBackdropProps {
  pattern: PatternName;
  opacity?: number;
  className?: string;
  disableMask?: boolean;
}

/**
 * SectionBackdrop: Lightweight inline SVG backdrop referencing shared pattern definitions.
 * Applies radial-gradient fade mask so texture is strongest near the top and fades out,
 * ensuring text content remains clean and WCAG AA contrast compliant.
 */
export function SectionBackdrop({
  pattern,
  opacity = 0.05,
  className = "",
  disableMask = false,
}: SectionBackdropProps) {
  const maskStyle = disableMask
    ? undefined
    : {
        WebkitMaskImage:
          "radial-gradient(ellipse 65% 55% at 50% 0%, #000 10%, transparent 80%)",
        maskImage:
          "radial-gradient(ellipse 65% 55% at 50% 0%, #000 10%, transparent 80%)",
      };

  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{
        opacity,
        ...maskStyle,
      }}
    >
      <rect width="100%" height="100%" fill={`url(#${pattern})`} />
    </svg>
  );
}
