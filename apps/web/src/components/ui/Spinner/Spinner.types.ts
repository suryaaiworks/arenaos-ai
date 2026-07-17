import React from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg";
export type SpinnerVariant =
  "primary" | "secondary" | "success" | "warning" | "danger" | "muted" | "white";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the spinner.
   * @default 'md'
   */
  size?: SpinnerSize;
  /**
   * Color variant mapping design tokens.
   * @default 'primary'
   */
  variant?: SpinnerVariant;
  "data-testid"?: string;
}
