import React from "react";

export interface StatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  statusText: string;
  statusType?: "success" | "warning" | "error" | "info" | "neutral";
  details?: string;
  iconName?: string;
}
