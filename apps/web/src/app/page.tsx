import React from "react";
import { SYSTEM_CONFIG } from "@/constants";

/**
 * Foundational Root Page for ArenaOS AI (Sprint 1.1).
 * Rendered as a React Server Component (no client scripts) to serve as a clean placeholder.
 */
export default function Home() {
  return (
    <main
      id="main-content"
      className="flex-grow flex flex-col items-center justify-center p-6 text-center min-h-screen bg-arena-bg"
    >
      <div className="max-w-xl mx-auto space-y-6">
        {/* Foundation active indicator */}
        <div className="inline-flex items-center space-x-2 bg-arena-surface border border-arena-border rounded-full px-4 py-1.5 shadow-lg">
          <span
            className="w-2 h-2 rounded-full bg-arena-primary animate-pulse"
            aria-hidden="true"
          />
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-arena-primary">
            Sprint 1.1 Foundation Active
          </span>
        </div>

        {/* Brand Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white select-none">
          {SYSTEM_CONFIG.appName}
        </h1>

        {/* Description */}
        <p className="text-xs md:text-sm text-arena-muted max-w-md mx-auto leading-relaxed">
          The Agentic AI Operating System for Smart Stadiums. Project directory architecture,
          Tailwind CSS design tokens, absolute paths, and pre-commit Git hooks are fully configured
          and ready for future sprints.
        </p>
      </div>
    </main>
  );
}
