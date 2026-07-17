"use client";

import React, { useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route level Error recovery boundary.
 * Renders a premium error telemetry warning console card with clear retry actions.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application runtime exception:", error);
  }, [error]);

  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh] px-4">
      <GlassCard
        padding="lg"
        rounded="lg"
        border={true}
        className="max-w-md w-full bg-arena-surface/80 border-arena-danger/30 text-center space-y-6"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-arena-danger">
          Console System Error
        </span>
        <h2 className="text-lg font-bold text-white select-none">Thread Connection Terminated</h2>
        <p className="text-xs text-arena-muted leading-relaxed">
          The telemetry pipeline encountered an unexpected exception state.
        </p>
        <div className="flex items-center justify-center pt-2">
          <Button variant="destructive" size="sm" onClick={() => reset()}>
            Re-Initialize Console
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
