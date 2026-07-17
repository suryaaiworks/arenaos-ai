export interface ArchLayer {
  level: string;
  name: string;
  subTitle: string;
  description: string;
  technologies: string[];
}

export interface ArchitectureData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  layers: ArchLayer[];
}

export const ARCHITECTURE_DATA: ArchitectureData = {
  tag: "System Architecture",
  title: "AI Operating System Blueprint",
  subtitle: "Engineered for Resilience & Zero Lag",
  description:
    "ArenaOS AI divides system processing into isolated architectural layers, ensuring secure data streams and instant agent synchronization.",
  layers: [
    {
      level: "Layer 1",
      name: "Orchestration Layer",
      subTitle: "Gemini Core Gateway",
      description:
        "Processes venue queries, schedules prompt pipelines, and routes requests to the ADK agent engine.",
      technologies: ["Google Gemini", "FastAPI Core"],
    },
    {
      level: "Layer 2",
      name: "Collaborative Agent Layer",
      subTitle: "ADK Execution Environment",
      description:
        "Runs the 8 stadium agents in concurrent sandbox threads to resolve bottlenecks in parallel.",
      technologies: ["Google ADK", "Python runtime"],
    },
    {
      level: "Layer 3",
      name: "Telemetry & Storage Layer",
      subTitle: "Real-Time Database Gateway",
      description:
        "Aggregates turnstile records, parking queue loads, and stadium safety telemetry states.",
      technologies: ["PostgreSQL", "Supabase Realtime"],
    },
  ],
};
