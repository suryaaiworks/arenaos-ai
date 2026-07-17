export interface TechStackCategory {
  title: string;
  items: string[];
}

export interface TechStackData {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  categories: TechStackCategory[];
}

export const TECH_STACK_DATA: TechStackData = {
  tag: "The Ecosystem",
  title: "Platform Stack",
  subtitle: "Full-Stack Monorepo Architecture",
  description:
    "ArenaOS AI leverages modern frameworks to ensure concurrency, fast static rendering, and type safety.",
  categories: [
    {
      title: "Frontend",
      items: [
        "Next.js 15 App Router",
        "React 19 Server Components",
        "Tailwind CSS v4 theme",
        "Framer Motion",
      ],
    },
    {
      title: "Backend",
      items: [
        "FastAPI async loops",
        "Python Agent runtime",
        "Pydantic validator schemas",
        "Uvicorn server",
      ],
    },
    {
      title: "AI Engine",
      items: [
        "Google Gemini models",
        "Google ADK framework",
        "Dynamic prompt caches",
        "Context history databases",
      ],
    },
    {
      title: "Database & Deploy",
      items: [
        "PostgreSQL Schema",
        "Supabase Realtime WebSockets",
        "Docker orchestration",
        "Vercel / Render",
      ],
    },
  ],
};
