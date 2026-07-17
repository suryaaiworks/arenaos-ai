import React from "react";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actionSlot?: React.ReactNode;
  "data-testid"?: string;
}
