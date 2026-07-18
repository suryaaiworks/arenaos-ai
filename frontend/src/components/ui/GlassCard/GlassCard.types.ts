import React from "react";

export type GlassCardVariant = "default" | "flat";
export type GlassCardPadding = "none" | "sm" | "md" | "lg";
export type GlassCardRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The structural theme of the card.
   * @default 'default'
   */
  variant?: GlassCardVariant;
  /**
   * Inner padding sizes.
   * @default 'md'
   */
  padding?: GlassCardPadding;
  /**
   * Border radius constraints.
   * @default 'md'
   */
  rounded?: GlassCardRounded;
  /**
   * Enables active press scaling transitions.
   * @default false
   */
  interactive?: boolean;
  /**
   * Enables glow borders on hover state.
   * @default true
   */
  hover?: boolean;
  /**
   * Enables visual backdrop filter blur overlays.
   * @default true
   */
  blur?: boolean;
  /**
   * Sets static glowing animation borders.
   * @default false
   */
  glow?: boolean;
  /**
   * Sets clean borders around the card structure.
   * @default true
   */
  border?: boolean;
  "data-testid"?: string;
}
