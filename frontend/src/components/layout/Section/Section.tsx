import React from "react";
import { cn } from "@/lib/utils";
import { SectionProps } from "./Section.types";

/**
 * Semantic HTML Layout Section.
 * Manages responsive vertical gutters and theme-driven background surfaces.
 */
export function Section({
  children,
  spacing = "lg",
  hasBackground = false,
  className = "",
  "data-testid": dataTestId = "section",
  ...props
}: SectionProps) {
  const paddingClasses = {
    none: "py-0",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
  };

  return (
    <section
      className={cn(
        paddingClasses[spacing],
        hasBackground && "bg-arena-surface/20 border-y border-white/5",
        "relative w-full overflow-hidden",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </section>
  );
}

export default Section;
