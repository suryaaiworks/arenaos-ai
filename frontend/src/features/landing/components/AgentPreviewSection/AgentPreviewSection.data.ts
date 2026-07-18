import { AvatarProps } from "@/components/ui/Avatar/Avatar.types";

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  description: string;
  initials: string;
  status: AvatarProps["status"];
}

export interface AgentPreviewData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  agents: AgentInfo[];
}

export const AGENT_PREVIEW_DATA: AgentPreviewData = {
  tag: "ArenaOS Agents",
  title: "Meet the AI Agent Team",
  subtitle: "Cooperative Agents Working in Harmony",
  description:
    "Deploy and orchestrate specialized agents powered by Gemini models that monitor, coordinate, and execute tasks across the venue automatically.",
  agents: [
    {
      id: "nav-agent",
      name: "Navigation Agent",
      role: "Crowd Routing",
      description: "Directs fans dynamically to underutilized gates and concession lines.",
      initials: "NV",
      status: "online",
    },
    {
      id: "crowd-agent",
      name: "Crowd Agent",
      role: "Density Analysis",
      description: "Monitors ingress metrics and prevents bottlenecks at turnstiles.",
      initials: "CR",
      status: "online",
    },
    {
      id: "em-agent",
      name: "Emergency Agent",
      role: "Incident Dispatch",
      description: "Coordinates security and first-responder routes during incidents.",
      initials: "EM",
      status: "busy",
    },
    {
      id: "ops-agent",
      name: "Operations Agent",
      role: "Facility & Restock",
      description: "Monitors vendor stock status and coordinates replenishment teams.",
      initials: "OP",
      status: "online",
    },
    {
      id: "acc-agent",
      name: "Accessibility Agent",
      role: "ADA Support",
      description: "Monitors wheelchair path lanes, elevators, and inclusive logistics.",
      initials: "AC",
      status: "online",
    },
    {
      id: "trans-agent",
      name: "Transportation Agent",
      role: "Transit Coordination",
      description: "Coordinates parking queues, rideshare flow, and shuttle frequencies.",
      initials: "TR",
      status: "away",
    },
    {
      id: "conc-agent",
      name: "Concierge Agent",
      role: "Guest Assistance",
      description: "Resolves guest questions about seating, ticket upgrades, and menus.",
      initials: "CO",
      status: "online",
    },
    {
      id: "notif-agent",
      name: "Notification Agent",
      role: "Alert Dispatch",
      description: "Broadcasts critical directives to screens, staff radios, and mobile alerts.",
      initials: "NT",
      status: "online",
    },
  ],
};
