import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive" | "glass" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  const baseClasses = "rounded-2xl transition-all duration-200 relative overflow-hidden";

  const paddingClasses = {
    none: "",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
  };

  const variantClasses = {
    default:
      "bg-white border border-light-border text-dark-bg shadow-sm dark:bg-dark-surface dark:border-dark-border dark:text-gray-100",
    elevated:
      "bg-white border border-light-border shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] dark:bg-dark-surface dark:border-dark-border dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.4)] text-dark-bg dark:text-gray-100",
    interactive:
      "bg-white border border-light-border hover:border-brand-red/30 hover:shadow-[0_12px_32px_-8px_rgba(229,29,37,0.12)] hover:-translate-y-0.5 cursor-pointer dark:bg-dark-surface dark:border-dark-border dark:hover:border-brand-red/40 dark:hover:shadow-[0_12px_32px_-8px_rgba(229,29,37,0.2)] text-dark-bg dark:text-gray-100",
    glass:
      "bg-white/80 backdrop-blur-md border border-white/60 shadow-sm dark:bg-dark-surface/80 dark:backdrop-blur-md dark:border-white/10 text-dark-bg dark:text-gray-100",
    dark:
      "bg-dark-surface border border-dark-border text-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]",
  };

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
