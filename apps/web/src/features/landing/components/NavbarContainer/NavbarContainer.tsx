"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavbarContainerProps } from "./NavbarContainer.types";
import { NAVBAR_DATA } from "./NavbarContainer.data";
import Navbar from "@/components/layout/Navbar";
import Button from "@/components/ui/Button";

/**
 * Responsive Client Navigation wrapper.
 * Consumes the layout Navbar component, controlling scrolls and mobile drawers.
 */
export function NavbarContainer({
  className = "",
  "data-testid": dataTestId = "navbar-container",
  ...props
}: NavbarContainerProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoSlot = (
    <a
      href="#top"
      className="text-sm md:text-base font-bold tracking-widest text-white uppercase select-none focus-visible:outline-arena-primary"
    >
      ArenaOS <span className="text-arena-primary animate-pulse">AI</span>
    </a>
  );

  const navigationSlot = (
    <ul className="flex items-center space-x-8">
      {NAVBAR_DATA.links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-xs md:text-sm text-arena-muted hover:text-white transition-colors duration-200 font-semibold focus-visible:outline-arena-primary"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const ctaSlot = (
    <div className="flex items-center space-x-3">
      {NAVBAR_DATA.actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          size="sm"
          onClick={() => {
            window.location.href = action.href;
          }}
        >
          {action.label}
        </Button>
      ))}

      {/* Mobile drawer toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex items-center justify-center p-2 rounded-full text-arena-muted hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
        aria-label="Toggle Mobile Menu"
        aria-expanded={mobileOpen}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <Navbar
        logoSlot={logoSlot}
        navigationSlot={navigationSlot}
        ctaSlot={ctaSlot}
        className={cn(
          scrolled
            ? "bg-arena-bg/85 shadow-lg border-b border-white/5 backdrop-blur-md"
            : "bg-transparent border-transparent backdrop-blur-none",
          className
        )}
        data-testid={dataTestId}
        {...props}
      />

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 md:hidden z-40 bg-arena-bg/95 border-b border-white/5 backdrop-blur-lg py-6 px-4 animate-fade-in">
          <ul className="flex flex-col space-y-4 text-center">
            {NAVBAR_DATA.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-arena-muted hover:text-white transition-colors duration-200 font-semibold block py-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default NavbarContainer;
