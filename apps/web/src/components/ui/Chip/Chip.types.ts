import React from "react";

export type ChipVariant = "solid" | "outline";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Chip label text.
   */
  label: string;
  /**
   * Styling variant.
   * @default 'solid'
   */
  variant?: ChipVariant;
  /**
   * Adds hover styles and keyboard focus indicators if true.
   * @default false
   */
  clickable?: boolean;
  /**
   * Renders close icon and triggers custom event handler.
   */
  onDelete?: () => void;
  /**
   * Prefixed icon element.
   */
  icon?: React.ReactNode;
  "data-testid"?: string;
}
