"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRole } from "../../providers/RoleProvider";
import { UserRole } from "../../providers/RoleProvider/RoleProvider.types";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const ROLE_LABELS: Record<UserRole, string> = {
  fan: "Fan Experience",
  operations: "Operations Command",
  security: "Security Monitor",
  medical: "Emergency & Medical",
  transportation: "Transportation Loop",
  volunteer: "Volunteer Coordinator",
  vendor: "Food & Vendor",
  administrator: "Stadium Admin",
  executive: "Executive KPI View",
};

/**
 * Reusable dropdown role toggler.
 * Updates role permissions and navigation listings dynamically.
 */
export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelectRole = (r: UserRole) => {
    setRole(r);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-arena-muted hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-semibold cursor-pointer focus:outline-none focus-visible:outline-arena-primary"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Switch operator user role"
      >
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>{ROLE_LABELS[role]}</span>
        <svg className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 z-50 animate-fade-in">
          <GlassCard 
            padding="sm" 
            rounded="sm" 
            border={true} 
            className="bg-arena-surface border border-white/10 shadow-2xl p-1 text-left flex flex-col space-y-0.5 max-h-80 overflow-y-auto"
          >
            <span className="text-[9px] uppercase font-bold text-arena-muted tracking-wider px-3 py-1.5 block select-none border-b border-white/5">
              SWITCH CONSOLE ROLE
            </span>
            {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleSelectRole(r)}
                className={cn(
                  "w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none cursor-pointer",
                  role === r
                    ? "bg-arena-primary text-white"
                    : "text-arena-muted hover:bg-white/5 hover:text-white"
                )}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </GlassCard>
        </div>
      )}
    </div>
  );
}

export default RoleSwitcher;
