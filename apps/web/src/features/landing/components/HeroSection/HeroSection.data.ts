export interface TelemetryCardData {
  title: string;
  value: string;
  detail: string;
  status: "success" | "warning" | "error" | "info";
  metric?: string;
}

export interface OrchestratorConsoleData {
  agentsCount: number;
  latencyMs: number;
  confidenceRate: string;
  telemetryState: string;
  requestsPerSec: number;
  statusText: string;
}

export interface HeroRedesignData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  cards: {
    crowd: TelemetryCardData;
    emergency: TelemetryCardData;
    navigation: TelemetryCardData;
    transport: TelemetryCardData;
    operations: TelemetryCardData;
    weather: TelemetryCardData;
  };
  orchestrator: OrchestratorConsoleData;
}

export const HERO_REDESIGN_DATA: HeroRedesignData = {
  badge: "Agentic OS v1.0",
  title: "ArenaOS AI",
  subtitle: "The Agentic AI Operating System for Smart Stadiums",
  description: "Orchestrate stadium events, optimize crowd routing, and automate safety dispatches in real-time through a collaborative network of autonomous Google AI agents.",
  primaryCta: { label: "Initialize Console", href: "#contact" },
  secondaryCta: { label: "Read Architecture", href: "#architecture" },
  cards: {
    crowd: {
      title: "Crowd Intelligence",
      value: "Moderate Influx",
      detail: "Sectors A-D balanced",
      status: "success",
      metric: "72% load",
    },
    emergency: {
      title: "Emergency AI",
      value: "Clear Status",
      detail: "No active hazard alerts",
      status: "success",
      metric: "0 alarms",
    },
    navigation: {
      title: "Navigation AI",
      value: "Best Route: Gate B",
      detail: "Turnstile delays resolved",
      status: "info",
      metric: "120s queue",
    },
    transport: {
      title: "Transport AI",
      value: "Smooth Transit",
      detail: "Buses routed to exit 4",
      status: "info",
      metric: "4.8m interval",
    },
    operations: {
      title: "Operations AI",
      value: "All Systems Active",
      detail: "Concessions stock green",
      status: "success",
      metric: "99.9% uptime",
    },
    weather: {
      title: "Weather Status",
      value: "28°C / Cloudy",
      detail: "Humidity 55% normal",
      status: "warning",
      metric: "10% rain prob",
    },
  },
  orchestrator: {
    agentsCount: 8,
    latencyMs: 21,
    confidenceRate: "99.8%",
    telemetryState: "Optimal",
    requestsPerSec: 1452,
    statusText: "ONLINE",
  },
};
