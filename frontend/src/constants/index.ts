import { SystemConfig } from "../types";

export const SYSTEM_CONFIG: SystemConfig = {
  apiUrl: typeof window !== "undefined" ? "/api/v1" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"),
  appName: "ArenaOS AI",
  version: "1.0.0",
};

export const DEFAULT_THEME = "dark" as const;
