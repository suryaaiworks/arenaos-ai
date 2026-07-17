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
  cpuLoad: string;
  memoryUsage: string;
  currentEvent: string;
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
    food: TelemetryCardData;
    assistant: TelemetryCardData;
    match: TelemetryCardData;
  };
  orchestrator: OrchestratorConsoleData;
}

export const HERO_REDESIGN_DATA: HeroRedesignData = {
  badge: "Product Preview OS v1.0",
  title: "ArenaOS AI",
  subtitle: "The Agentic AI Operating System for Smart Stadiums",
  description: "Orchestrate stadium events, optimize crowd routing, and automate safety dispatches in real-time through a collaborative network of autonomous Google AI agents.",
  primaryCta: { label: "Initialize Console", href: "#contact" },
  secondaryCta: { label: "Read Architecture", href: "#architecture" },
  cards: {
    crowd: {
      title: "Crowd Intelligence",
      value: "Live Occupancy: 82%",
      detail: "Gate A congestion: High",
      status: "warning",
      metric: "58,402 in seats",
    },
    emergency: {
      title: "Emergency Center",
      value: "Alert Status: Clear",
      detail: "Medical Team: Standby",
      status: "success",
      metric: "0 hazard triggers",
    },
    navigation: {
      title: "Smart Navigation",
      value: "Best Route: Gate B",
      detail: "Current Gate: Optimizing",
      status: "info",
      metric: "120s turnstile",
    },
    transport: {
      title: "Transportation",
      value: "Metro Link: 2m wait",
      detail: "Parking: 88% capacity",
      status: "info",
      metric: "Ride Share loop normal",
    },
    operations: {
      title: "Operations Center",
      value: "System Health: 99.9%",
      detail: "Power: Active, Staff: deployed",
      status: "success",
      metric: "Fans & Cooling: normal",
    },
    weather: {
      title: "Weather Intelligence",
      value: "Temp: 28°C / Dry",
      detail: "Rain Risk: 10%, Wind: 8km/h",
      status: "success",
      metric: "Pitch moisture: 78%",
    },
    food: {
      title: "Food & Shops",
      value: "Vendors: 92% active",
      detail: "Queue Time: 3m avg",
      status: "success",
      metric: "Digital payments online",
    },
    assistant: {
      title: "AI Assistant",
      value: "Voice link active",
      detail: "Listening for telemetry queries",
      status: "info",
      metric: "Ready to coordinate",
    },
    match: {
      title: "Match Center",
      value: "Live: ARS 2 - 1 CHE",
      detail: "Kickoff Timer: 74:20",
      status: "success",
      metric: "Spectator volume: peak",
    },
  },
  orchestrator: {
    agentsCount: 8,
    latencyMs: 21,
    confidenceRate: "99.8%",
    telemetryState: "Optimal",
    requestsPerSec: 1452,
    statusText: "ONLINE",
    cpuLoad: "14.5%",
    memoryUsage: "2.4 GB / 16 GB",
    currentEvent: "London Derby (Live)",
  },
};
