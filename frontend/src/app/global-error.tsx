"use client";

import React from "react";
import Button from "@/components/ui/Button";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root Layout level Error boundary.
 * Standard HTML shell recovery fallback when root errors occur.
 */
export default function GlobalError({ error: _error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    console.error("Critical root layout exception:", _error);
  }, [_error]);

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full border border-red-900/30 bg-neutral-950 p-8 rounded-2xl text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-red-500">
            Critical Kernel Panic
          </span>
          <h2 className="text-lg font-bold text-white select-none">ArenaOS AI Stopped Working</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            A critical error occurred at the layout structure level, terminating OS threads.
          </p>
          <div className="flex items-center justify-center pt-2">
            <Button variant="destructive" size="sm" onClick={() => reset()}>
              Reset OS Console
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
