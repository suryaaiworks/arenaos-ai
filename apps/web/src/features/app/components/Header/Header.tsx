import React from "react";
import { cn } from "@/lib/utils";
import { HeaderProps } from "./Header.types";
import Breadcrumb from "../Breadcrumb";
import CommandPaletteButton from "../CommandPaletteButton";
import NotificationBell from "../NotificationBell";
import ProfileMenu from "../ProfileMenu";
import RoleSwitcher from "../RoleSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

/**
 * Reusable Header Layout bar.
 * Integrates location path anchors, search triggers, alert bells, and user profile menus.
 */
export function Header({
  className = "",
  "data-testid": dataTestId = "header",
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(
        "h-16 shrink-0 px-6 flex items-center justify-between backdrop-blur-md relative z-20 select-none",
        // Background and border respond to data-theme via CSS vars
        "bg-[var(--arena-header-bg,rgba(5,8,22,0.92))] border-b border-[var(--arena-header-border,rgba(255,255,255,0.06))]",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Location Breadcrumb Trail */}
      <div className="flex items-center">
        <Breadcrumb />
      </div>

      {/* Control Widgets list */}
      <div className="flex items-center space-x-4">
        <CommandPaletteButton />
        <RoleSwitcher />
        <ThemeSwitcher />
        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  );
}

export default Header;
