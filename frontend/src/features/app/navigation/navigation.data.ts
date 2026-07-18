import { UserRole } from "../providers/RoleProvider/RoleProvider.types";

export interface NavItem {
  label: string;
  href: string;
  iconName: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/app", iconName: "dashboard" },
  { label: "AI Agents", href: "/app/agents", iconName: "agents" },
  { label: "Operations", href: "/app", iconName: "operations" },
  { label: "Crowd Intelligence", href: "/app", iconName: "crowd" },
  { label: "Navigation", href: "/app", iconName: "navigation" },
  { label: "Emergency", href: "/app", iconName: "emergency" },
  { label: "Accessibility", href: "/app", iconName: "accessibility" },
  { label: "Transportation", href: "/app", iconName: "transport" },
  { label: "Analytics", href: "/app", iconName: "analytics" },
  { label: "Settings", href: "/app/settings", iconName: "settings" },
];

export const ROLE_NAVIGATION_ITEMS: Record<UserRole, NavItem[]> = {
  fan: [
    { label: "My Ticket Pass", href: "/app/ticket", iconName: "ticket" },
    { label: "3D Seat Finder", href: "/app", iconName: "seat" },
    { label: "Smart Navigation", href: "/app", iconName: "navigation" },
    { label: "Food & Shops", href: "/app", iconName: "food" },
    { label: "SOS Emergency", href: "/app", iconName: "emergency" },
  ],
  operations: [
    { label: "Ops Telemetry", href: "/app/ops-telemetry", iconName: "dashboard" },
    { label: "AI Agents Registry", href: "/app/agents", iconName: "agents" },
    { label: "Gate Influx Status", href: "/app/gate-influx", iconName: "operations" },
    { label: "Power & Utilities", href: "/app/power-utilities", iconName: "utilities" },
    { label: "Facility Maintenance", href: "/app/facility-maintenance", iconName: "maintenance" },
  ],
  security: [
    { label: "Threat Console", href: "/app", iconName: "security" },
    { label: "Perimeter Breach", href: "/app", iconName: "restricted" },
    { label: "Patrol Assignments", href: "/app", iconName: "volunteer" },
    { label: "Incident Alarm Logs", href: "/app", iconName: "emergency" },
  ],
  medical: [
    { label: "SOS Dispatch Triage", href: "/app", iconName: "emergency" },
    { label: "First Responder Tracker", href: "/app", iconName: "navigation" },
    { label: "Clinic Care Loads", href: "/app", iconName: "utilities" },
  ],
  transportation: [
    { label: "Traffic Monitor", href: "/app", iconName: "transport" },
    { label: "Parking Occupancy", href: "/app", iconName: "parking" },
    { label: "Metro Exit Queues", href: "/app", iconName: "metro" },
  ],
  volunteer: [
    { label: "Assigned Tasks Queue", href: "/app", iconName: "volunteer" },
    { label: "Lost & Found Claims", href: "/app", iconName: "food" },
    { label: "Guest Assistance Coords", href: "/app", iconName: "crowd" },
  ],
  vendor: [
    { label: "Active Orders Queue", href: "/app", iconName: "food" },
    { label: "Concessions Inventory", href: "/app", iconName: "utilities" },
    { label: "Demand Forecasts", href: "/app", iconName: "analytics" },
  ],
  administrator: [
    { label: "Operational Overview", href: "/app", iconName: "dashboard" },
    { label: "AI Agent Configuration", href: "/app", iconName: "agents" },
    { label: "User Role Permissioning", href: "/app", iconName: "volunteer" },
    { label: "Console Audit Logs", href: "/app", iconName: "operations" },
  ],
  executive: [
    { label: "Executive KPIs", href: "/app", iconName: "analytics" },
    { label: "Match Day Revenue", href: "/app", iconName: "revenue" },
    { label: "System Health index", href: "/app", iconName: "dashboard" },
  ],
};
