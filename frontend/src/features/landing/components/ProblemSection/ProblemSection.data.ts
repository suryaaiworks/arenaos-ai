import { BadgeProps } from "@/components/ui/Badge/Badge.types";

export interface ProblemItem {
  id: string;
  metric: string;
  title: string;
  description: string;
  severity: BadgeProps["variant"];
}

export interface ProblemData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  issues: ProblemItem[];
}

export const PROBLEM_DATA: ProblemData = {
  tag: "The Challenge",
  title: "Modern Stadium Bottlenecks",
  subtitle: "Legacy Systems Fail Under Load",
  description:
    "Traditional arenas rely on siloed, manual communication channels. Security dispatchers, crowd logistics staff, and transport managers work in isolation, leading to delays, safety gaps, and high operating costs.",
  issues: [
    {
      id: "manual-flow",
      metric: "45+ Min Delays",
      title: "Manual Crowd Coordination",
      description:
        "Exits and gates clog during peak hours due to lack of adaptive traffic guidance systems.",
      severity: "error",
    },
    {
      id: "incident-lag",
      metric: "8 Min Response",
      title: "Incident Dispatch Chains",
      description:
        "Hazard reporting moves slowly through analog loops before field crews are notified.",
      severity: "error",
    },
    {
      id: "volunteer-conf",
      metric: "Blind Deploy",
      title: "Isolated Volunteer Force",
      description:
        "Event staff lack real-time coordination tools, leading to mismatched guide density at exits.",
      severity: "warning",
    },
  ],
};
