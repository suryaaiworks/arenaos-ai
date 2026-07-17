import React from "react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

/**
 * Custom 404 route layout.
 * Displays a console router routing error using GlassCard and Button.
 */
export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[70vh] px-4">
      <GlassCard
        padding="lg"
        rounded="lg"
        border={true}
        className="max-w-md w-full bg-arena-surface/80 border-arena-primary/20 text-center space-y-6"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest text-arena-primary">
          Target Not Found
        </span>
        <h2 className="text-xl font-extrabold text-white select-none">Console Routing 404</h2>
        <p className="text-xs text-arena-muted leading-relaxed">
          The requested console path does not exist on this stadium command system.
        </p>
        <div className="flex items-center justify-center pt-2">
          <Link href="/">
            <Button variant="primary" size="sm">
              Return to Console Root
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
