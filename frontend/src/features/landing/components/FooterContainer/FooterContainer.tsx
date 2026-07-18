import React from "react";
import { cn } from "@/lib/utils";
import { FooterContainerProps } from "./FooterContainer.types";
import { FOOTER_CONTAINER_DATA } from "./FooterContainer.data";
import Footer from "@/components/layout/Footer";
import Separator from "@/components/ui/Separator";
import Container from "@/components/layout/Container";
import { SYSTEM_CONFIG } from "@/constants";

/**
 * Reusable Footer link container.
 * Wraps our layout Footer shell with detailed sitemap sections and social links.
 */
export function FooterContainer({
  className = "",
  "data-testid": dataTestId = "footer-container",
  ...props
}: FooterContainerProps) {
  return (
    <div className={cn("w-full bg-arena-bg", className)} data-testid={dataTestId} {...props}>
      <Container maxWidth="xl" className="pt-16 pb-8">
        {/* Sitemap columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-left">
          {FOOTER_CONTAINER_DATA.columns.map((column) => (
            <div key={column.title} className="flex flex-col space-y-3">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 select-none">
                {column.title}
              </span>
              <ul className="flex flex-col space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[10px] md:text-xs text-arena-muted hover:text-arena-primary transition-colors duration-200 focus-visible:outline-arena-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social indicators */}
          <div className="flex flex-col space-y-3">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 select-none">
              Social Links
            </span>
            <ul className="flex flex-col space-y-2">
              {FOOTER_CONTAINER_DATA.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] md:text-xs text-arena-muted hover:text-arena-primary transition-colors duration-200 focus-visible:outline-arena-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator boundary */}
        <Separator orientation="horizontal" className="bg-white/5 mb-8" />

        {/* Standard core Footer layout branding */}
        <Footer className="bg-transparent border-t-0 p-0 py-0" />

        {/* Version telemetry */}
        <div className="flex items-center justify-center md:justify-start mt-6 text-[10px] font-mono text-arena-muted/50 select-none">
          <span>System Version: {SYSTEM_CONFIG.version}</span>
        </div>
      </Container>
    </div>
  );
}

export default FooterContainer;
