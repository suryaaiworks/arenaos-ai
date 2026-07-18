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

export interface SimulationReport {
  simulation_id: string;
  status: string;
  incident_timeline: string[];
  risk_heatmap: Array<{
    zone_name: string;
    location_id: string;
    risk_score: number;
    occupancy_rate: number;
  }>;
}

export interface ScenarioContextProps {
  activeScenario: ScenarioId;
  setScenario: (scenario: ScenarioId) => void;
  scenarioDetails: ScenarioDetails;
  selectedObject: SelectedObject | null;
  setSelectedObject: (obj: SelectedObject | null) => void;
  simulationResult: SimulationReport | null;
  setSimulationResult: (result: SimulationReport | null) => void;
}

export interface ScenarioProviderProps {
  children: React.ReactNode;
}
