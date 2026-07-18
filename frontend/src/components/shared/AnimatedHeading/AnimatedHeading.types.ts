import React from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingAlignment = "left" | "center" | "right";

// Omit conflicting browser tooltip title property
export interface AnimatedHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Title content (can render React elements or plain text strings).
   */
  title: React.ReactNode;
  /**
   * Subtitle text block rendered below the main heading.
   */
  subtitle?: React.ReactNode;
  /**
   * Text alignment layouts.
   * @default 'center'
   */
  align?: HeadingAlignment;
  /**
   * Enables reveal slide-up animations.
   * @default true
   */
  animated?: boolean;
  /**
   * Semantic heading level (e.g. 1 maps to h1, 2 maps to h2).
   * @default 2
   */
  level?: HeadingLevel;
  "data-testid"?: string;
}
