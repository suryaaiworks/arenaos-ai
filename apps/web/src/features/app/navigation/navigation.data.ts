import { UserRole } from "../providers/RoleProvider/RoleProvider.types";

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

export const ROLE_NAVIGATION_ITEMS: Record<UserRole, NavItem[]> = {
  fan: [
    { label: "My Ticket Pass", href: "/app/ticket", iconName: "ticket" },
    { label: "3D Seat Finder", href: "/app/seat", iconName: "seat" },
    { label: "Smart Navigation", href: "/app/navigation", iconName: "navigation" },
    { label: "Food & Shops", href: "/app/food", iconName: "food" },
    { label: "SOS Emergency", href: "/app/emergency", iconName: "emergency" },
  ],
  operations: [
    { label: "Ops Telemetry", href: "/app", iconName: "dashboard" },
    { label: "AI Agents Registry", href: "/app/agents", iconName: "agents" },
    { label: "Gate Influx Status", href: "/app/gates", iconName: "operations" },
    { label: "Power & Utilities", href: "/app/utilities", iconName: "utilities" },
    { label: "Facility Maintenance", href: "/app/maintenance", iconName: "maintenance" },
  ],
  security: [
    { label: "Threat Console", href: "/app/security", iconName: "security" },
    { label: "Perimeter Breach", href: "/app/zones", iconName: "restricted" },
    { label: "Patrol Assignments", href: "/app/patrols", iconName: "volunteer" },
    { label: "Incident Alarm Logs", href: "/app/incidents", iconName: "emergency" },
  ],
  medical: [
    { label: "SOS Dispatch Triage", href: "/app/medical", iconName: "emergency" },
    { label: "First Responder Tracker", href: "/app/dispatch", iconName: "navigation" },
    { label: "Clinic Care Loads", href: "/app/clinics", iconName: "utilities" },
  ],
  transportation: [
    { label: "Traffic Monitor", href: "/app/transport", iconName: "transport" },
    { label: "Parking Occupancy", href: "/app/parking", iconName: "parking" },
    { label: "Metro Exit Queues", href: "/app/metro", iconName: "metro" },
  ],
  volunteer: [
    { label: "Assigned Tasks Queue", href: "/app/tasks", iconName: "volunteer" },
    { label: "Lost & Found Claims", href: "/app/lostfound", iconName: "food" },
    { label: "Guest Assistance Coords", href: "/app/help", iconName: "crowd" },
  ],
  vendor: [
    { label: "Active Orders Queue", href: "/app/vendor", iconName: "food" },
    { label: "Concessions Inventory", href: "/app/stock", iconName: "utilities" },
    { label: "Demand Forecasts", href: "/app/forecast", iconName: "analytics" },
  ],
  administrator: [
    { label: "Operational Overview", href: "/app", iconName: "dashboard" },
    { label: "AI Agent Configuration", href: "/app/configs", iconName: "agents" },
    { label: "User Role Permissioning", href: "/app/users", iconName: "volunteer" },
    { label: "Console Audit Logs", href: "/app/audit", iconName: "operations" },
  ],
  executive: [
    { label: "Executive KPIs", href: "/app/executive", iconName: "analytics" },
    { label: "Match Day Revenue", href: "/app/revenue", iconName: "revenue" },
    { label: "System Health index", href: "/app/health", iconName: "dashboard" },
  ],
};
