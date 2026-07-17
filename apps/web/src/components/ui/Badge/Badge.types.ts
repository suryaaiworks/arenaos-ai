import React from "react";

export type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral" | "live" | "ai";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Status theme configuration.
   * @default 'neutral'
   */
  variant?: BadgeVariant;
  /**
   * Badge sizes.
   * @default 'md'
   */
  size?: BadgeSize;
  /**
   * If true, badges will render as perfect circles or rounded pills.
   * @default true
   */
  rounded?: boolean;
  /**
   * Custom icon element prefix.
   */
  customIcon?: React.ReactNode;
  "data-testid"?: string;
}
