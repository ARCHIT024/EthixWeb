import React from "react";

/**
 * SectionSeam: 12x12px brass (#B8924A) diamond rotated 45deg,
 * absolutely positioned at top: -6px, left: 50%, margin-left: -6px, z-index: 2.
 * Placed on the top edge of each section below the hero.
 */
export function SectionSeam({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute -top-[6px] left-1/2 -ml-[6px] w-[12px] h-[12px] rotate-45 bg-[#B8924A] z-[2] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
