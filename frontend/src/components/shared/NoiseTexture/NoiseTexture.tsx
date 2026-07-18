import React from "react";
import { cn } from "@/lib/utils";
import { NoiseTextureProps } from "./NoiseTexture.types";

/**
 * Reusable Grain Noise Overlay.
 * Renders as a pure Server Component, overlaying an SVG turbulence filter.
 */
export function NoiseTexture({
  opacity = 0.02,
  className = "",
  style,
  "data-testid": dataTestId = "noise-texture",
  ...props
}: NoiseTextureProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] pointer-events-none select-none w-full h-full",
        className
      )}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        ...style,
      }}
      data-testid={dataTestId}
      aria-hidden="true" // Decorative overlay hidden from screen readers
      {...props}
    />
  );
}

export default NoiseTexture;
