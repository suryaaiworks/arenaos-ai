import React from "react";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The visual direction layout.
   * @default 'horizontal'
   */
  orientation?: SeparatorOrientation;
  /**
   * If true, the separator is ignored by assistive tech screen-readers (decorative).
   * Otherwise, maps role='separator' with accessibility labels.
   * @default true
   */
  decorative?: boolean;
  "data-testid"?: string;
}
