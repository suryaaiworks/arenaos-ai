import React from "react";

export type PageTransitionPreset = "fade" | "slide-up" | "scale";

// Omit conflicting React 19 and Framer Motion properties
export interface PageTransitionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
> {
  /**
   * Reusable transition preset option.
   * @default 'fade'
   */
  preset?: PageTransitionPreset;
  /**
   * Disables transitions globally/locally.
   * @default false
   */
  disabled?: boolean;
  "data-testid"?: string;
}
