import React from "react";
import { cn } from "@/lib/utils";
import { SkeletonProps } from "./Skeleton.types";

/**
 * Reusable Skeleton Placeholder.
 * Used for building progressive loading states (shimmers, pulses) during asynchronous fetches.
 */
export function Skeleton({
  variant = "rectangle",
  animated = "pulse",
  width,
  height,
  rounded,
  className = "",
  style,
  "data-testid": dataTestId = "skeleton",
  ...props
}: SkeletonProps) {
  const baseStyle = "bg-white/5 relative overflow-hidden";

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-pulse shadow-inner", // Pure CSS fallback pulse
    none: "",
  };

  const variantClasses = {
    text: "h-3 w-3/4 rounded",
    rectangle: "w-full h-full rounded-md",
    circle: "rounded-full aspect-square",
    card: "w-full h-40 rounded-arena-card border border-white/5",
  };

  const customStyle = {
    width,
    height,
    borderRadius: rounded,
    ...style,
  };

  return (
    <div
      style={customStyle}
      className={cn(baseStyle, variantClasses[variant], animationClasses[animated], className)}
      data-testid={dataTestId}
      aria-hidden="true" // Decorative loading element, hidden from screen-readers
      {...props}
    />
  );
}

export default Skeleton;
