import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "./Input.types";

/**
 * Enterprise Form Input Field.
 * Implements forwardRef, full accessibility tags (aria-invalid, aria-describedby),
 * and maps validation colors to globals.css theme rules.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      helperText,
      error,
      success,
      startIcon,
      endIcon,
      disabled,
      required,
      id,
      className = "",
      type = "text",
      "data-testid": dataTestId = "input",
      ...props
    },
    ref
  ) => {
    const fallbackId = useId();
    const inputId = id || fallbackId;
    const descriptionId = `${inputId}-desc`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Calculate ARIA descriptors
    const describedBy =
      cn(description && descriptionId, error && errorId, helperText && helperId) || undefined;

    return (
      <div className="flex flex-col w-full space-y-1.5 text-left">
        {/* Semantic form label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs md:text-sm font-semibold tracking-wide text-white select-none"
          >
            {label}
            {required && (
              <span className="text-arena-danger ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Help Description */}
        {description && (
          <span
            id={descriptionId}
            className="text-[10px] md:text-xs text-arena-muted leading-relaxed block"
          >
            {description}
          </span>
        )}

        {/* Input positioning anchor */}
        <div className="relative flex items-center w-full">
          {startIcon && (
            <span
              className="absolute left-4 text-arena-muted flex items-center pointer-events-none"
              aria-hidden="true"
            >
              {startIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            required={required}
            className={cn(
              "w-full px-4 py-2.5 md:py-3 text-xs md:text-sm bg-arena-surface/60 border rounded-xl text-white placeholder-arena-muted/70 transition-all duration-300 outline-none",
              startIcon ? "pl-11" : "pl-4",
              endIcon ? "pr-11" : "pr-4",
              disabled && "opacity-50 pointer-events-none",
              error
                ? "border-arena-danger/60 focus:border-arena-danger focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                : success
                  ? "border-arena-success/60 focus:border-arena-success focus:shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                  : "border-arena-border/60 focus:border-arena-primary focus:shadow-[0_0_15px_rgba(79,124,255,0.15)]",
              className
            )}
            data-testid={dataTestId}
            {...props}
          />

          {endIcon && (
            <span
              className="absolute right-4 text-arena-muted flex items-center pointer-events-none"
              aria-hidden="true"
            >
              {endIcon}
            </span>
          )}
        </div>

        {/* Error notification / helper status */}
        {error ? (
          <span
            id={errorId}
            role="alert"
            className="text-[10px] md:text-xs font-semibold text-arena-danger leading-relaxed block animate-pulse"
          >
            {error}
          </span>
        ) : (
          helperText && (
            <span
              id={helperId}
              className="text-[10px] md:text-xs text-arena-muted leading-relaxed block"
            >
              {helperText}
            </span>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
