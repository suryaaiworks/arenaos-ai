import React from "react";

export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, enables slow-moving mesh transition gradients.
   * @default true
   */
  animated?: boolean;
  "data-testid"?: string;
}
