"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CommandPaletteContextProps, CommandPaletteProviderProps } from "./CommandPaletteProvider.types";
import GlassCard from "@/components/ui/GlassCard";
import Input from "@/components/ui/Input";

const CommandPaletteContext = createContext<CommandPaletteContextProps | undefined>(undefined);

/**
 * Command Palette Context Provider.
 * Coordinates dynamic console searches and keyboard bindings.
 */
export function CommandPaletteProvider({ children }: CommandPaletteProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggleOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSearch("");
  };

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen, toggleOpen }}>
      {children}

      {/* Palette Overlay Box */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-lg w-full animate-scale">
            <GlassCard
              padding="sm"
              rounded="md"
              border={true}
              className="bg-arena-surface border border-white/10 shadow-2xl relative space-y-4"
            >
              {/* Search bar */}
              <div className="px-2 pt-2">
                <Input
                  placeholder="Type a command or search dashboard (Ctrl+K)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-black/40 border-white/10"
                  autoFocus
                />
              </div>

              {/* Suggestions items */}
              <div className="max-h-60 overflow-y-auto px-2 pb-2 text-left space-y-1">
                <span className="text-[9px] uppercase font-bold text-arena-muted tracking-wider block px-3 py-1 select-none">
                  NAVIGATION SUGGESTIONS
                </span>
                
                <button
                  onClick={handleClose}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-white hover:bg-white/5 transition-all flex items-center justify-between focus:outline-none focus-visible:bg-white/5"
                >
                  <span>Go to AI Agent Command Console</span>
                  <kbd className="text-[10px] text-arena-muted font-mono" aria-hidden="true">NV</kbd>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-white hover:bg-white/5 transition-all flex items-center justify-between focus:outline-none focus-visible:bg-white/5"
                >
                  <span>Go to Crowd Density Maps</span>
                  <kbd className="text-[10px] text-arena-muted font-mono" aria-hidden="true">CR</kbd>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-white hover:bg-white/5 transition-all flex items-center justify-between focus:outline-none focus-visible:bg-white/5"
                >
                  <span>Go to System Settings</span>
                  <kbd className="text-[10px] text-arena-muted font-mono" aria-hidden="true">ST</kbd>
                </button>
              </div>

              {/* Footer details */}
              <div 
                className="flex items-center justify-between border-t border-white/5 pt-3 px-3 pb-1 text-[10px] text-arena-muted font-mono select-none"
                aria-hidden="true"
              >
                <span>Use &uarr;&darr; to navigate, Enter to select</span>
                <span>ESC to Close</span>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
  }
  return context;
}

export default CommandPaletteProvider;
