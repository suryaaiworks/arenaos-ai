import React from "react";
import { cn } from "@/lib/utils";
import { BreadcrumbProps } from "./Breadcrumb.types";

/**
 * Reusable Breadcrumb navigation trail.
 * Renders hierarchical path elements for dashboard navigation.
 */
export function Breadcrumb({
  items = [{ label: "Console", href: "/app" }, { label: "Telemetry" }],
  className = "",
  "data-testid": dataTestId = "breadcrumb",
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-[10px] md:text-xs font-mono font-semibold select-none", className)}
      data-testid={dataTestId}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            {index > 0 && (
              <span className="text-arena-muted/40" aria-hidden="true">
                /
              </span>
            )}
            {isLast ? (
              <span className="text-white" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href || "#"}
                className="text-arena-muted hover:text-white transition-colors focus-visible:outline-arena-primary"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
