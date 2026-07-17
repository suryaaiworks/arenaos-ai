export interface SolutionWorkflowNode {
  step: string;
  title: string;
  description: string;
  badge: string;
}

export interface SolutionData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  nodes: SolutionWorkflowNode[];
}

export const SOLUTION_DATA: SolutionData = {
  tag: "The Solution",
  title: "ArenaOS AI Orchestrator",
  subtitle: "Collaborative AI Stadium Management",
  description:
    "By connecting a network of specialized, autonomous Google AI agents through our central orchestrator layer, ArenaOS AI bridges crowd logistics, operations, safety, and transport into a single cooperative ecosystem.",
  nodes: [
    {
      step: "01",
      title: "Unified AI Orchestration",
      description:
        "Gemini models monitor stadium data feeds, ingest incident alerts, and direct tasks to specialized agents.",
      badge: "Orchestrator",
    },
    {
      step: "02",
      title: "Collaborative Agency",
      description:
        "Agents coordinate resources (e.g., the Crowd Agent works with the Transportation Agent to route exits to under-capacity bus queues).",
      badge: "Gemini & ADK",
    },
    {
      step: "03",
      title: "Real-Time Action Loops",
      description:
        "Field staff and gate operators receive automated alerts, resolving bottlenecks inside seconds of occurrence.",
      badge: "Real-time API",
    },
  ],
};
