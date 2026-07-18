import React from "react";
import { cn } from "@/lib/utils";
import { BadgeProps } from "./Badge.types";

/**
 * Reusable Status Badge Component.
 * Supports status variations, customizable padding sizes, and left-side icons.
 */
export function Badge({
  children,
  variant = "neutral",
  size = "md",
  rounded = true,
  customIcon,
  className = "",
  "data-testid": dataTestId = "badge",
  ...props
}: BadgeProps) {
  const baseStyle =
    "inline-flex items-center font-semibold tracking-wider uppercase border select-none";

  const variantClasses = {
    success:
      "bg-arena-success/10 border-arena-success/30 text-arena-success shadow-[0_0_10px_rgba(34,197,94,0.1)]",
    warning:
      "bg-arena-warning/10 border-arena-warning/30 text-arena-warning shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    error:
      "bg-arena-danger/10 border-arena-danger/30 text-arena-danger shadow-[0_0_10px_rgba(239,68,68,0.1)]",
    info: "bg-arena-primary/10 border-arena-primary/30 text-arena-primary shadow-[0_0_10px_rgba(79,124,255,0.1)]",
    neutral: "bg-arena-surface border-arena-border text-arena-muted",
    live: "bg-arena-danger/15 border-arena-danger/40 text-arena-danger animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.25)]",
    ai: "bg-arena-secondary/15 border-arena-secondary/40 text-arena-secondary shadow-[0_0_12px_rgba(124,92,255,0.25)]",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-3 py-1 text-[10px] md:text-xs",
    lg: "px-4 py-1.5 text-[11px] md:text-sm",
  };

  return (
    <span
      className={cn(
        baseStyle,
        variantClasses[variant],
        sizeClasses[size],
        rounded ? "rounded-full" : "rounded-md",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Live ping animation trigger */}
      {variant === "live" && !customIcon && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-arena-danger mr-1.5 animate-ping"
          aria-hidden="true"
        />
      )}

      {/* Custom prefixed icon */}
      {customIcon && (
        <span className="mr-1.5 inline-flex" aria-hidden="true">
          {customIcon}
        </span>
      )}

      <span>{children}</span>
    </span>
  );
}

export default Badge;
