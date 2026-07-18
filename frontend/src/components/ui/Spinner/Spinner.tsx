import React from "react";
import { cn } from "@/lib/utils";
import { SpinnerProps } from "./Spinner.types";

/**
 * Pure CSS-animated Spinner.
 * Follows Server Component guidelines and provides accessibility states.
 */
export function Spinner({
  size = "md",
  variant = "primary",
  className = "",
  "data-testid": dataTestId = "spinner",
  ...props
}: SpinnerProps) {
  const sizeClasses = {
    xs: "w-3 h-3 border",
    sm: "w-4 h-4 border-[2px]",
    md: "w-6 h-6 border-[3px]",
    lg: "w-8 h-8 border-4",
  };

  const variantClasses = {
    primary: "border-arena-primary border-t-transparent",
    secondary: "border-arena-secondary border-t-transparent",
    success: "border-arena-success border-t-transparent",
    warning: "border-arena-warning border-t-transparent",
    danger: "border-arena-danger border-t-transparent",
    muted: "border-arena-muted border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div
      className={cn(
        "rounded-full animate-spin border-solid",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      role="status"
      aria-label="Loading"
      data-testid={dataTestId}
      {...props}
    />
  );
}

export default Spinner;
