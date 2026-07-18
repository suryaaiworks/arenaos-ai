import React from "react";

export interface RecommendationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  priority: "low" | "medium" | "high" | "critical";
  confidence: number;
  area: string;
  action: string;
  reason?: string;
  expectedResult?: string;
  responsibleTeam: string;
  status?: "pending" | "executing" | "resolved" | "dismissed";
  onActionClick?: () => void;
}
