export interface TechItem {
  name: string;
  category: "core" | "ai" | "backend" | "database" | "infra";
  badgeText: string;
}

export const TRUSTED_TECH_DATA: TechItem[] = [
  { name: "Next.js 15", category: "core", badgeText: "Frontend" },
  { name: "React 19", category: "core", badgeText: "Frontend" },
  { name: "TypeScript 5", category: "core", badgeText: "Type Safety" },
  { name: "Google Gemini", category: "ai", badgeText: "GenAI Model" },
  { name: "Google ADK", category: "ai", badgeText: "Agent System" },
  { name: "FastAPI", category: "backend", badgeText: "Python API" },
  { name: "Supabase", category: "database", badgeText: "Database" },
  { name: "Tailwind CSS v4", category: "core", badgeText: "Styling" },
  { name: "Framer Motion", category: "core", badgeText: "Motion" },
  { name: "Docker", category: "infra", badgeText: "Orchestration" },
];
