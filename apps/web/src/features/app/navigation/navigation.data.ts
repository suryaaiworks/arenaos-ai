export interface NavItem {
  label: string;
  href: string;
  iconName: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app", iconName: "dashboard" },
  { label: "AI Agents", href: "/app/agents", iconName: "agents" },
  { label: "Operations", href: "/app/operations", iconName: "operations" },
  { label: "Crowd Intelligence", href: "/app/crowd", iconName: "crowd" },
  { label: "Navigation", href: "/app/navigation", iconName: "navigation" },
  { label: "Emergency", href: "/app/emergency", iconName: "emergency" },
  { label: "Accessibility", href: "/app/accessibility", iconName: "accessibility" },
  { label: "Transportation", href: "/app/transport", iconName: "transport" },
  { label: "Analytics", href: "/app/analytics", iconName: "analytics" },
  { label: "Settings", href: "/app/settings", iconName: "settings" },
];
