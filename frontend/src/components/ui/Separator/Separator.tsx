import React from "react";
import { cn } from "@/lib/utils";
import { SeparatorProps } from "./Separator.types";

/**
 * Enterprise Divider Component.
 * Supports horizontal/vertical orientation and sets accessible ARIA markup.
 */
export function Separator({
  orientation = "horizontal",
  decorative = true,
  className = "",
  "data-testid": dataTestId = "separator",
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? undefined : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      aria-hidden={decorative ? "true" : undefined}
      className={cn(
        "bg-arena-border/40 shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      data-testid={dataTestId}
      {...props}
    />
  );
}

export default Separator;
