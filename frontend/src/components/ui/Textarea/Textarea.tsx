import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { TextareaProps } from "./Textarea.types";

/**
 * Enterprise Form Textarea Field.
 * Implements forwardRef, full accessibility tags (aria-invalid, aria-describedby),
 * and maps validation colors to globals.css theme rules.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      helperText,
      error,
      success,
      disabled,
      required,
      id,
      className = "",
      rows = 4,
      "data-testid": dataTestId = "textarea",
      ...props
    },
    ref
  ) => {
    const fallbackId = useId();
    const textareaId = id || fallbackId;
    const descriptionId = `${textareaId}-desc`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    // Calculate ARIA descriptors
    const describedBy =
      cn(description && descriptionId, error && errorId, helperText && helperId) || undefined;

    return (
      <div className="flex flex-col w-full space-y-1.5 text-left">
        {/* Semantic form label */}
        {label && (
          <label
            htmlFor={textareaId}
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

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={rows}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          required={required}
          className={cn(
            "w-full px-4 py-2.5 md:py-3 text-xs md:text-sm bg-arena-surface/60 border rounded-xl text-white placeholder-arena-muted/70 transition-all duration-300 outline-none resize-none",
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

Textarea.displayName = "Textarea";
export default Textarea;
