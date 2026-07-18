import React from "react";
import { cn } from "@/lib/utils";
import { FooterProps } from "./Footer.types";
import Container from "../Container";

/**
 * Reusable Global Footer shell.
 * Structural only, maps copyright placeholders and branding markers.
 */
export function Footer({
  className = "",
  "data-testid": dataTestId = "footer",
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn("w-full bg-arena-bg border-t border-white/5 py-12 md:py-16", className)}
      data-testid={dataTestId}
      {...props}
    >
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand slot */}
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-bold tracking-widest text-white uppercase select-none">
              ArenaOS <span className="text-arena-primary">AI</span>
            </span>
            <span className="text-[10px] md:text-xs text-arena-muted">
              The Agentic AI Operating System for Smart Stadiums.
            </span>
          </div>

          {/* Copy credits placeholder */}
          <div className="text-[10px] md:text-xs text-arena-muted">
            &copy; {new Date().getFullYear()} ArenaOS. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
