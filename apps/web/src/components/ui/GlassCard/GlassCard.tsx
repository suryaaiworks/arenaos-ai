import React from "react";
import { cn } from "@/lib/utils";
import { GlassCardProps } from "./GlassCard.types";

/**
 * Reusable Glassmorphism Card panel.
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
        variantClasses[variant],
        roundedClasses[rounded],
        paddingClasses[padding],
        blur && "backdrop-blur-md",
        border && "border border-white/5",
        glow && "animate-glow",
        hover && "glass-effect-hover",
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
