import React from "react";
import { cn } from "@/lib/utils";
import { NavbarProps } from "./Navbar.types";
import Container from "../Container";

/**
 * Reusable Global Navbar layout shell.
 * Employs slots for branding, central menu collections, and right call-to-actions.
 */
export function Navbar({
  logoSlot,
  navigationSlot,
  ctaSlot,
  className = "",
  "data-testid": dataTestId = "navbar",
  ...props
}: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full bg-arena-bg/60 border-b border-white/5 backdrop-blur-md",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl">
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Main Navigation"
        >
          {/* Logo brand slot */}
          <div className="flex items-center shrink-0">
            {logoSlot || (
              <span className="text-sm font-bold tracking-widest text-white uppercase">
                ArenaOS <span className="text-arena-primary">AI</span>
              </span>
            )}
          </div>

          {/* Central links navigation container */}
          <div className="hidden md:flex items-center justify-center flex-grow px-8">
            {navigationSlot}
          </div>

          {/* Action trigger slots */}
          <div className="flex items-center justify-end shrink-0">{ctaSlot}</div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
