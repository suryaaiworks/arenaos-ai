import React from "react";

export interface TimelineStep {
  id: string;
  label: string;
  time: string;
  status: "upcoming" | "active" | "completed";
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps?: TimelineStep[];
  currentStepId?: string;
}
