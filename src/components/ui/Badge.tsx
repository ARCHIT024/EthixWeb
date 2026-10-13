import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "red" | "red-solid" | "brass" | "neutral" | "success" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  children,
  variant = "red",
  size = "md",
  dot = false,
  className = "",
  ...props
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center font-medium rounded-full tracking-wide select-none";

  const sizeClasses = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1 gap-2",
  };

  const variantClasses = {
    red: "bg-red-50 text-red-800 border border-red-200/70 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/50",
    "red-solid": "bg-brand-red text-white shadow-sm",
    brass:
      "bg-amber-50 text-amber-900 border border-amber-200/70 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800/50",
    neutral:
      "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800/70 dark:text-gray-200 dark:border-gray-700/60",
    success:
      "bg-emerald-50 text-emerald-800 border border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50",
    outline:
      "bg-transparent text-gray-700 border border-gray-300 dark:text-gray-300 dark:border-gray-700",
  };

  const dotClasses = {
    red: "bg-brand-red",
    "red-solid": "bg-white",
    brass: "bg-accent-brass",
    neutral: "bg-gray-500",
    success: "bg-emerald-600",
    outline: "bg-gray-400",
  };

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotClasses[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
