export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: "routing" | "influx" | "incident" | "ticketing";
}

export interface FeaturesData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  features: FeatureItem[];
}

export const FEATURES_DATA: FeaturesData = {
  tag: "Platform Features",
  title: "Core Capabilities",
  subtitle: "Designed for High-Capacity Venues",
  description:
    "ArenaOS AI equips stadium teams with autonomous features to balance operations, crowd flows, and incidents.",
  features: [
    {
      id: "feat-routing",
      title: "Autonomous Routing",
      description: "Adaptive digital signs adjust dynamically, guiding exits to open gates.",
      iconName: "routing",
    },
    {
      id: "feat-influx",
      title: "Real-Time Influx Logs",
      description: "Turnstile logging triggers gate thresholds, balancing entrance queues.",
      iconName: "influx",
    },
    {
      id: "feat-incident",
      title: "Automated Dispatch",
      description: "Security incident reports automatically optimize responder dispatch routes.",
      iconName: "incident",
    },
    {
      id: "feat-ticketing",
      title: "Integrations Layer",
      description: "Connects point-of-sale systems to operations telemetry directly.",
      iconName: "ticketing",
    },
  ],
};
