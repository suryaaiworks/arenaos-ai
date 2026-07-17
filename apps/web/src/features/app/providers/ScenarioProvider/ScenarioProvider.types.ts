import React from "react";

export type ScenarioId =
  | "clear"
  | "gate_congestion"
  | "medical_sos"
  | "parking_full"
  | "security_threat"
  | "weather_delay"
  | "metro_failure"
  | "stock_shortage";

export interface ScenarioDetails {
  id: ScenarioId;
  label: string;
  intensity: "low" | "medium" | "high";
  affectedArea: string;
  description: string;
}

export interface SelectedObject {
  id: string;
  name: string;
  type: string;
  metrics: Record<string, string>;
}

export interface ScenarioContextProps {
  activeScenario: ScenarioId;
  setScenario: (scenario: ScenarioId) => void;
  scenarioDetails: ScenarioDetails;
  selectedObject: SelectedObject | null;
  setSelectedObject: (obj: SelectedObject | null) => void;
}

export interface ScenarioProviderProps {
  children: React.ReactNode;
}
