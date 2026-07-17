import React from "react";
import { cn } from "@/lib/utils";
import { PageHeaderProps } from "./PageHeader.types";

/**
 * Reusable Page Title Header block.
 * Renders the dashboard page title, description parameters, and custom action slots.
 */
export function PageHeader({
  title,
  description,
  actionSlot,
  className = "",
  "data-testid": dataTestId = "page-header",
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[var(--arena-divider,rgba(255,255,255,0.06))] select-none", 
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Title descriptors */}
      <div className="flex flex-col space-y-1 text-left">
        <h1 className="text-lg md:text-xl font-bold tracking-tight text-[var(--arena-text-primary,#fff)]">
          {title}
        </h1>
        {description && (
          <p className="text-xs text-[var(--arena-text-muted,#94a3b8)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Optional action triggers */}
      {actionSlot && <div className="shrink-0">{actionSlot}</div>}
    </div>
  );
}

export default PageHeader;
