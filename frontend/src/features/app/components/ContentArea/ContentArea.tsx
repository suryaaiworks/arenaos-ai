import React from "react";
import { cn } from "@/lib/utils";
import { ContentAreaProps } from "./ContentArea.types";

/**
 * Reusable Content Scrollable Area.
 * Mapped to the semantic <main> landmark, managing scroll containers and viewports.
 */
export function ContentArea({
  children,
  className = "",
  "data-testid": dataTestId = "content-area",
  ...props
}: ContentAreaProps) {
  return (
    <main
      id="main-content"
      className={cn("flex-grow min-w-0 overflow-y-auto p-6 md:p-8 bg-arena-bg relative z-10", className)}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </main>
  );
}

export default ContentArea;
