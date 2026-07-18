import React from "react";

export interface NoiseTextureProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The opacity overlay level of the noise grain texture.
   * @default 0.02
   */
  opacity?: number;
  "data-testid"?: string;
}
