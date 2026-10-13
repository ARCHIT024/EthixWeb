import React, { useId } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  helperText?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function Input({
  label,
  helperText,
  error,
  prefix,
  suffix,
  id,
  className = "",
  disabled,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2"
        >
          {label}
          {required && <span className="text-brand-red ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-500 dark:text-gray-400 font-medium text-sm select-none">
            {prefix}
          </div>
        )}

        <input
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={`w-full rounded-xl border bg-white dark:bg-dark-surface text-dark-bg dark:text-gray-100 text-sm py-2.5 transition-all duration-150 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${
            prefix ? "pl-14" : "pl-3.5"
          } ${suffix ? "pr-10" : "pr-3.5"} ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-950"
              : "border-light-border dark:border-dark-border focus:border-brand-red focus:ring-red-100 dark:focus:ring-brand-red/20"
          } ${className}`}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3 flex items-center text-gray-400 dark:text-gray-500">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
