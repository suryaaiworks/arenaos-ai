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
  | "accessibility";

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
  type: "gate" | "sos" | "parking" | "security" | "medical" | "concession";
  status: "ok" | "alert" | "critical";
  x: number;
  y: number;
  label: string;
}

export interface DigitalTwinProps extends React.HTMLAttributes<HTMLDivElement> {
  activeLayers?: TwinLayerId[];
  onSelectObject?: (details: SelectedObject) => void;
}
