"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CommandPaletteButtonProps } from "./CommandPaletteButton.types";
import { useCommandPalette } from "../../providers/CommandPaletteProvider";

/**
 * Reusable Command Palette Trigger.
 * Integrates search symbols and shortcuts triggering command contexts.
 */
export function CommandPaletteButton({
  className = "",
  "data-testid": dataTestId = "command-palette-button",
  ...props
}: CommandPaletteButtonProps) {
  const { toggleOpen } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={toggleOpen}
      className={cn(
        "flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-arena-muted hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-semibold cursor-pointer select-none focus:outline-none focus-visible:outline-arena-primary",
        className
      )}
      data-testid={dataTestId}
      aria-label="Search dashboard commands"
      {...props}
    >
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-[8px] font-mono select-none" aria-hidden="true">
        Ctrl+K
      </kbd>
    </button>
  );
}

export default CommandPaletteButton;
