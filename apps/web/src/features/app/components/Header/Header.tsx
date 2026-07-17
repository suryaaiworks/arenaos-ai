import React from "react";
import { cn } from "@/lib/utils";
import { HeaderProps } from "./Header.types";
import Breadcrumb from "../Breadcrumb";
import CommandPaletteButton from "../CommandPaletteButton";
import NotificationBell from "../NotificationBell";
import ProfileMenu from "../ProfileMenu";

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
        "h-16 shrink-0 bg-arena-bg/85 border-b border-white/5 px-6 flex items-center justify-between backdrop-blur-md relative z-20 select-none",
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
        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  );
}

export default Header;
