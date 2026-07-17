import React from "react";

export type MotionTransitionType =
  "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "stagger" | "zoom";

// Omit conflicting React 19 and Framer Motion properties
export interface MotionWrapperProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver" | "onAnimationStart"
> {
  /**
   * The animation preset target.
   * @default 'fade'
   */
  variant?: MotionTransitionType;
  /**
   * Animation delay (in seconds).
   * @default 0
   */
  delay?: number;
  /**
   * Animation duration (in seconds).
   * @default 0.5
   */
  duration?: number;
  /**
   * Disable transitions locally (e.g. for accessibility).
   * @default false
   */
  disabled?: boolean;
  "data-testid"?: string;
}
