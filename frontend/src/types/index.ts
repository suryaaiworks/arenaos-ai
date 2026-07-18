// Shared system-wide TypeScript declarations and contracts

export interface SystemConfig {
  apiUrl: string;
  appName: string;
  version: string;
}

export type ThemeMode = "light" | "dark" | "system";
