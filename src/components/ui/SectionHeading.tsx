import React from "react";
import { Badge } from "./Badge";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  kicker?: string;
  kickerVariant?: "red" | "brass" | "neutral";
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
}

export function SectionHeading({
  kicker,
  kickerVariant = "red",
  title,
  description,
  align = "center",
  inverted = false,
  className = "",
  ...props
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div
      className={`flex flex-col max-w-3xl ${alignClasses} ${className}`}
      {...props}
    >
      {kicker && (
        <Badge
          variant={kickerVariant}
          size="md"
          dot
          className="mb-4 shadow-xs"
        >
          {kicker}
        </Badge>
      )}

      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
          inverted ? "text-white" : "text-dark-bg dark:text-white"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            inverted
              ? "text-gray-300"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
