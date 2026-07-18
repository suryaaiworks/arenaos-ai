import React from "react";

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Top and bottom paddings.
   * @default 'lg'
   */
  spacing?: SectionSpacing;
  /**
   * Enables background coloring (surface contrast) if true.
   * @default false
   */
  hasBackground?: boolean;
  "data-testid"?: string;
}
