import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "brass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red disabled:opacity-50 disabled:cursor-not-allowed select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer will-change-transform";

  const sizeClasses = {
    sm: "text-xs px-3.5 py-2.5 rounded-lg gap-1.5 min-h-[44px]",
    md: "text-sm px-5 py-2.5 rounded-xl gap-2 min-h-[44px]",
    lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold min-h-[48px]",
  };

  const variantClasses = {
    primary:
      "bg-brand-red text-white hover:bg-brand-red-hover active:bg-brand-red-dark focus-visible:ring-brand-red shadow-sm hover:shadow-[0_4px_20px_-4px_rgba(229,29,37,0.35)]",
    secondary:
      "bg-white text-dark-bg border border-light-border hover:bg-light-surface-subtle hover:border-gray-300 dark:bg-dark-surface dark:text-gray-100 dark:border-dark-border dark:hover:bg-dark-surface-elevated dark:hover:border-gray-700 focus-visible:ring-gray-400 shadow-sm",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100/70 hover:text-dark-bg dark:text-gray-300 dark:hover:bg-dark-surface-elevated/70 dark:hover:text-white focus-visible:ring-gray-400",
    brass:
      "bg-accent-brass text-dark-bg hover:bg-accent-brass-hover font-semibold focus-visible:ring-accent-brass shadow-sm hover:shadow-[0_4px_20px_-4px_rgba(197,155,75,0.35)]",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
