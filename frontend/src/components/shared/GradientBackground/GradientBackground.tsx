import React from "react";
import { cn } from "@/lib/utils";
import { GradientBackgroundProps } from "./GradientBackground.types";

/**
 * Enterprise Mesh Gradient Background.
 * Renders as a pure Server Component (zero client-side hydration scripts),
 * utilizing hardware-accelerated CSS animations.
 */
export function GradientBackground({
  children,
  animated = true,
  className = "",
  "data-testid": dataTestId = "gradient-bg",
  ...props
}: GradientBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-screen bg-arena-bg overflow-hidden flex flex-col",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Background radial glow meshes */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Primary glow bubble */}
        <div
          className={cn(
            "absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-arena-primary/10 blur-[120px] md:blur-[160px]",
            animated && "animate-pulse"
          )}
        />

        {/* Secondary glow bubble */}
        <div
          className={cn(
            "absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-arena-secondary/10 blur-[120px] md:blur-[160px]",
            animated && "animate-pulse"
          )}
          style={{ animationDuration: "12s" }}
        />
      </div>

      {/* Injected content layout container */}
      <div className="relative z-10 flex-grow flex flex-col w-full">{children}</div>
    </div>
  );
}

export default GradientBackground;
