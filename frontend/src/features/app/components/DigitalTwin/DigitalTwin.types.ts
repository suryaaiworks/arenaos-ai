import React from "react";
import { SelectedObject } from "../../providers/ScenarioProvider/ScenarioProvider.types";

export type TwinLayerId =
  | "crowd"
  | "seats"
  | "security"
  | "medical"
  | "parking"
  | "transit"
  | "concessions"
  | "utilities"
  | "accessibility"
  | "incidents"
  | "agents"
  | "memory"
  | "tasks"
  | "gateAlarms"
  | "turnstiles"
  | "powerGrid"
  | "hvac"
  | "maintenance"
  | "cleaningZones"
  | "equipment";

export interface TwinSector {
  id: string;
  name: string;
  occupancy: number; // percentage
  status: "clear" | "crowded" | "breached" | "alert";
  coordinates: string; // Path coordinates
}

export interface TwinMarker {
  id: string;
  name: string;
  type: "gate" | "sos" | "parking" | "security" | "medical" | "concession" | "agent" | "gateAlarm" | "turnstile" | "powerGrid" | "hvac" | "maintenance" | "cleaningZone" | "equipment";
  status: "ok" | "alert" | "critical";
  x: number;
  y: number;
  label: string;
  stats?: string;
  prediction?: string;
  opStatus?: string;
  incidentHistory?: string;
}

export interface DigitalTwinProps extends React.HTMLAttributes<HTMLDivElement> {
  activeLayers?: TwinLayerId[];
  module?: string;
  onSelectObject?: (details: SelectedObject) => void;
}
