"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProfileMenuProps } from "./ProfileMenu.types";
import Avatar from "@/components/ui/Avatar";
import GlassCard from "@/components/ui/GlassCard";

/**
 * Custom Profile Dropdown Menu.
 * Controls user settings shortcuts and handles console session logouts.
 */
export function ProfileMenu({
  className = "",
  "data-testid": dataTestId = "profile-menu",
  ...props
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div
      ref={menuRef}
      className={cn("relative inline-block text-left select-none", className)}
      data-testid={dataTestId}
      {...props}
    >
      {/* Dropdown toggle trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 text-left focus:outline-none focus-visible:outline-arena-primary cursor-pointer"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User settings dropdown menu"
      >
        <Avatar initials="AD" size="sm" status="online" />
        <div className="hidden md:flex flex-col text-xs font-semibold" aria-hidden="true">
          <span className="text-white">Admin Console</span>
          <span className="text-arena-muted text-[10px] font-mono">FIFA-2026</span>
        </div>
      </button>

      {/* Menu dropdown overlay list */}
      {open && (
        <div className="absolute right-0 mt-2.5 w-48 z-50 animate-fade-in">
          <GlassCard
            padding="sm"
            rounded="sm"
            border={true}
            className="bg-arena-surface border border-white/10 shadow-2xl p-1 text-left flex flex-col space-y-1"
          >
            <span className="text-[9px] uppercase font-bold text-arena-muted tracking-wider px-3 py-1.5 block select-none border-b border-white/5">
              ACCOUNT MANAGEMENT
            </span>
            
            <a
              href="#profile"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-xs font-semibold rounded-lg text-white hover:bg-white/5 transition-all block focus:outline-none focus-visible:bg-white/5"
            >
              My Profile
            </a>

            <a
              href="/app/settings"
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-xs font-semibold rounded-lg text-white hover:bg-white/5 transition-all block focus:outline-none focus-visible:bg-white/5"
            >
              Console Settings
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-arena-danger hover:bg-arena-danger/10 transition-all block focus:outline-none focus-visible:bg-arena-danger/10 cursor-pointer"
            >
              Log Out Console
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
