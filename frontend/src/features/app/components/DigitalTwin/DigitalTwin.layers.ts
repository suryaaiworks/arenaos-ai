import { TwinLayerId } from "./DigitalTwin.types";

export const MODULE_DEFAULT_LAYERS: Record<string, TwinLayerId[]> = {
  opsTelemetry: ["crowd", "seats", "medical", "incidents"],
  aiAgents: ["agents", "memory", "tasks"],
  gateInflux: ["security", "gateAlarms", "turnstiles"],
  powerUtilities: ["utilities", "powerGrid", "hvac"],
  facilityMaintenance: ["maintenance", "cleaningZones", "equipment"]
};
