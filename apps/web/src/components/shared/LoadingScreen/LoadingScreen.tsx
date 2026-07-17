import React from "react";
import { cn } from "@/lib/utils";
import { LoadingScreenProps } from "./LoadingScreen.types";
import Spinner from "@/components/ui/Spinner";

/**
 * Premium OS Loading Splash Screen.
 * Reusable full-viewport overlay rendering rotating status spinners and background meshes.
 */
export function LoadingScreen({
  className = "",
  "data-testid": dataTestId = "loading-screen",
  ...props
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] text-white",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full bg-arena-primary/10 blur-[120px]" />
        <div className="absolute bottom-[30%] right-[30%] w-[40%] h-[40%] rounded-full bg-arena-secondary/10 blur-[120px]" />
      </div>

      {/* Loading controls container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <Spinner size="lg" variant="primary" className="shadow-[0_0_30px_rgba(79,124,255,0.35)]" />
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-white uppercase animate-pulse">
            Initializing Console
          </span>
          <span className="text-[10px] text-arena-muted">Connecting to ArenaOS AI Network...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
