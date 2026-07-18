import React from "react";

export type SkeletonVariant = "text" | "rectangle" | "circle" | "card";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual preset shape layout.
   * @default 'rectangle'
   */
  variant?: SkeletonVariant;
  /**
   * Loading animation behavior.
   * @default 'pulse'
   */
  animated?: SkeletonAnimation;
  /**
   * Custom width style parameter.
   */
  width?: string;
  /**
   * Custom height style parameter.
   */
  height?: string;
  /**
   * Custom border radius overrides.
   */
  rounded?: string;
  "data-testid"?: string;
}
