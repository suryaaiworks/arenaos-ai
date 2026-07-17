"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SidebarProps, SidebarItemProps } from "./Sidebar.types";
import { NAVIGATION_ITEMS, ROLE_NAVIGATION_ITEMS } from "../../navigation/navigation.data";
import { useRole } from "../../providers/RoleProvider";

/**
 * Custom vector icon parser for sidebar navigator categories.
 */
function NavIcon({ name }: { name: string }) {
  const iconBaseClass = "w-4 h-4";

  if (name === "dashboard") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    );
  }
  if (name === "agents") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  }
  if (name === "operations") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    );
  }
  if (name === "crowd") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }
  if (name === "navigation") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    );
  }
  if (name === "emergency") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  }
  if (name === "accessibility") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a1 1 0 100-2 1 1 0 000 2zm-2 4h4v7h-1v5h-2v-5H9a1 1 0 01-1-1V9a1 1 0 011-1h1zm4 2v2m1.5-2v4" />
      </svg>
    );
  }
  if (name === "ticket") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    );
  }
  if (name === "seat") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14l1 12H4L5 5zm0 12h14v2H5v-2z" />
      </svg>
    );
  }
  if (name === "food") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    );
  }
  if (name === "restricted") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    );
  }
  if (name === "parking") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16h3a3 3 0 100-6H9v6zm0 0v2" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (name === "metro") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (name === "revenue") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (name === "utilities") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  if (name === "maintenance") {
    return (
      <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg className={iconBaseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

/**
 * Reusable Sidebar Item Button component.
 */
export function SidebarItem({
  item,
  active = false,
  collapsed = false,
  className = "",
  ...props
}: SidebarItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center px-4 py-3 text-xs font-semibold rounded-xl transition-all duration-200 outline-none select-none cursor-pointer focus-visible:outline-arena-primary",
        active
          ? "bg-arena-primary text-white shadow-md shadow-arena-primary/20"
          : "bg-transparent text-[var(--arena-text-muted,#94a3b8)] hover:text-[var(--arena-text-primary,#fff)] hover:bg-[var(--arena-hover-bg,rgba(255,255,255,0.05))]",
        collapsed ? "justify-center" : "justify-start space-x-3.5",
        className
      )}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      {...props}
    >
      <span className="shrink-0" aria-hidden="true">
        <NavIcon name={item.iconName} />
      </span>
      {!collapsed && <span className="truncate">{item.label}</span>}
    </button>
  );
}

/**
 * Reusable collapsable Sidebar Navigation shell.
 */
export function Sidebar({
  collapsed = false,
  setCollapsed,
  activeHref = "/app",
  items = NAVIGATION_ITEMS,
  className = "",
  "data-testid": dataTestId = "sidebar",
  ...props
}: SidebarProps) {
  const { role } = useRole();
  const roleItems = items === NAVIGATION_ITEMS ? (ROLE_NAVIGATION_ITEMS[role] || items) : items;
  return (
    <aside
      className={cn(
        "h-screen shrink-0 flex flex-col justify-between py-6 px-4 transition-all duration-300 relative z-30 select-none",
        // Theme-aware: --arena-sidebar-bg and --arena-sidebar-border respond to data-theme
        "bg-[var(--arena-sidebar-bg,#050816)] border-r border-[var(--arena-sidebar-border,rgba(255,255,255,0.06))]",
        collapsed ? "w-20" : "w-64",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      <div className="flex flex-col space-y-6">
        {/* Sidebar Brand header logo */}
        <div 
          className={cn(
            "flex items-center pb-2 border-b border-[var(--arena-divider,rgba(255,255,255,0.06))]", 
            collapsed ? "justify-center" : "justify-between px-2"
          )}
        >
          {!collapsed ? (
            <span className="text-sm font-bold tracking-widest text-[var(--arena-text-primary,#fff)] uppercase">
              ArenaOS <span className="text-arena-primary animate-pulse">AI</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-arena-primary animate-pulse uppercase">
              OS
            </span>
          )}
          
          {/* Collapse action button */}
          {setCollapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg text-arena-muted hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:outline-arena-primary"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                {collapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Sidebar dynamic links list */}
        <nav className="flex flex-col space-y-1.5 overflow-y-auto max-h-[calc(100vh-200px)]">
          {roleItems.map((item) => (
            <SidebarItem
              key={item.label}
              item={item}
              active={activeHref === item.href}
              collapsed={collapsed}
              onClick={() => {
                window.location.href = item.href;
              }}
            />
          ))}
        </nav>
      </div>

      {/* Footer system details banner */}
      {!collapsed && (
        <div 
          className="px-2 pt-4 border-t border-[var(--arena-divider,rgba(255,255,255,0.06))] text-[10px] text-[var(--arena-text-muted,#94a3b8)]/40 font-mono text-center"
          aria-hidden="true"
        >
          <span>CONSOLE SYSTEM ACTIVE</span>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
