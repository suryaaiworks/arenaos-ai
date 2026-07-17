export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  mockUi: {
    title: string;
    activeAgents: number;
    tasksProcessed: string;
    concurrencyRate: string;
    systemHealth: string;
  };
}

export const HERO_DATA: HeroData = {
  badge: "Agentic OS v1.0",
  title: "ArenaOS AI",
  subtitle: "The Agentic AI Operating System for Smart Stadiums",
  description:
    "Orchestrate stadium events, optimize crowd routing, and automate operations in real-time through a collaborative network of autonomous Google AI agents.",
  primaryCta: { label: "Initialize Console", href: "#contact" },
  secondaryCta: { label: "Read Architecture", href: "#architecture" },
  mockUi: {
    title: "AI AGENT ORCHESTRATION CONSOLE",
    activeAgents: 8,
    tasksProcessed: "1,452 / sec",
    concurrencyRate: "99.98%",
    systemHealth: "Optimal",
  },
};
