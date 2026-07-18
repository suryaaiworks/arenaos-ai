import React from "react";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: "increase" | "decrease" | "stable";
  loading?: boolean;
}
