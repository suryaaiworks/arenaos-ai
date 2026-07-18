"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { NotificationBellProps } from "./NotificationBell.types";
import { useToast } from "../../providers/ToastProvider";

/**
 * Reusable Notification indicator bell trigger.
 * Spawns mock telemetry toast updates to test dynamic layouts.
 */
export function NotificationBell({
  badgeCount = 3,
  className = "",
  "data-testid": dataTestId = "notification-bell",
  ...props
}: NotificationBellProps) {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast("Gemini Orchestrator dispatched Navigation Agent telemetry update.", "info");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "relative p-2 rounded-lg text-arena-muted hover:text-white hover:bg-white/5 transition-all cursor-pointer select-none focus:outline-none focus-visible:outline-arena-primary",
        className
      )}
      data-testid={dataTestId}
      aria-label="Pending notifications"
      {...props}
    >
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {badgeCount > 0 && (
        <span className="absolute top-1.5 right-1.5 flex h-2 w-2 select-none" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-arena-danger opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-arena-danger" />
        </span>
      )}
    </button>
  );
}

export default NotificationBell;
