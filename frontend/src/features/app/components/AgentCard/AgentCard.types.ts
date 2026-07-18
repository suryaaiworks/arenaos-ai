import React from "react";

export interface AgentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  status: "online" | "busy" | "offline";
  health: number;
  latency: number;
  task?: string;
  connectedSystems?: string[];
  recommendationsCount?: number;
}
