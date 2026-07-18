import React from "react";
import { cn } from "@/lib/utils";
import { GlassCardProps } from "./GlassCard.types";

/**
 * Reusable Glassmorphism Card panel.
 * Theme-aware: respects CSS variable system for both dark and light modes.
 * All sizes and visual tokens are mapped to design variables in globals.css.
 */
export function GlassCard({
  children,
  variant = "default",
  padding = "md",
  rounded = "md",
  interactive = false,
  hover = true,
  blur = true,
  glow = false,
  border = true,
  className = "",
  "data-testid": dataTestId = "glass-card",
  ...props
}: GlassCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-arena-card",
    lg: "rounded-arena-card-lg",
    xl: "rounded-3xl",
    full: "rounded-full",
  };

  const variantClasses = {
    default: "bg-arena-surface/40",
    flat: "bg-arena-surface",
  };

  return (
    <div
      className={cn(
        // Base theme-aware background using CSS var
        "arena-card",
        variantClasses[variant],
        roundedClasses[rounded],
        paddingClasses[padding],
        blur && "backdrop-blur-md",
        // Use CSS var for border: visually distinct on both themes
        border && "border border-[rgba(255,255,255,0.07)] dark:border-[rgba(255,255,255,0.07)] [html[data-theme=light]_&]:border-[rgba(30,41,59,0.10)]",
        glow && "animate-glow",
        hover && "glass-effect-hover transition-shadow hover:shadow-lg",
        interactive && "active:scale-[0.99] transition-transform cursor-pointer select-none",
        "relative overflow-hidden transition-all duration-300",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
