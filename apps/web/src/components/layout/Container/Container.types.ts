import React from "react";

export type ContainerMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The maximum width boundary of the content shell.
   * @default 'xl'
   */
  maxWidth?: ContainerMaxWidth;
  "data-testid"?: string;
}
