"use client";

import React from "react";
import { useTheme } from "@/features/app/providers/ThemeProvider";

interface ThemeToggleProps {
  /** Size variant for different navbar contexts */
  size?: "sm" | "md";
  /** Additional className for positioning overrides */
  className?: string;
}

/**
 * Premium ArenaOS AI Theme Toggle.
 * Pill-style dark / light mode switch with glow animations.
 * Reads and writes to shared localStorage key "arenaos-theme".
 * Works in: Landing Page, Fan Portal, Operations Console.
 */
export function ThemeToggle({ size = "md", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const pillH = size === "sm" ? "h-8" : "h-9";
  const pillW = size === "sm" ? "w-[72px]" : "w-[80px]";
  const iconSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative ${pillH} ${pillW} rounded-full border border-solid cursor-pointer shrink-0 overflow-hidden
        transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2
        ${isDark
          ? "bg-[#0d1432] border-white/10 shadow-[0_0_14px_rgba(79,124,255,0.25)]"
          : "bg-[#fef9c3] border-amber-300/60 shadow-[0_0_14px_rgba(251,191,36,0.30)]"
        } ${className}`}
    >
      {/* Sliding track indicator */}
      <span
        className={`absolute top-[3px] bottom-[3px] w-[32px] rounded-full transition-all duration-300 ease-in-out
          ${isDark
            ? "left-[3px] bg-gradient-to-br from-slate-700 to-slate-800 shadow-[0_2px_8px_rgba(79,124,255,0.30)]"
            : "left-[calc(100%-35px)] bg-gradient-to-br from-amber-300 to-amber-400 shadow-[0_2px_8px_rgba(251,191,36,0.50)]"
          }`}
      />

      {/* Moon icon — left */}
      <span
        className={`absolute left-[8px] top-1/2 -translate-y-1/2 ${iconSize} transition-all duration-300 z-10
          ${isDark ? "opacity-100 scale-100" : "opacity-40 scale-90"}`}
      >
        🌙
      </span>

      {/* Sun icon — right */}
      <span
        className={`absolute right-[7px] top-1/2 -translate-y-1/2 ${iconSize} transition-all duration-300 z-10
          ${isDark ? "opacity-40 scale-90" : "opacity-100 scale-100"}`}
      >
        ☀️
      </span>
    </button>
  );
}

export default ThemeToggle;
