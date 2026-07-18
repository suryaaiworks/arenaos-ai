"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ScenarioContextProps, ScenarioProviderProps, ScenarioId, ScenarioDetails, SelectedObject, SimulationReport } from "./ScenarioProvider.types";
import { apiClient } from "@/services/api/client";

const SCENARIO_MAP: Record<ScenarioId, ScenarioDetails> = {
  clear: {
    id: "clear",
    label: "Standard Operations",
    intensity: "low",
    affectedArea: "Global",
    description: "Stadium metrics functioning within baseline telemetry limits. No active alerts.",
  },
  gate_congestion: {
    id: "gate_congestion",
    label: "Heavy Ingress Congestion",
    intensity: "high",
    affectedArea: "Gate A & Sector 104",
    description: "Ingress volume at Gate A exceeds 95% threshold. Recommend rerouting to Gate B.",
  },
  medical_sos: {
    id: "medical_sos",
    label: "Medical Emergency SOS",
    intensity: "high",
    affectedArea: "Sector 204 Seat 12",
    description: "Spectator initiated medical distress trigger. Dispatching Medical Unit 1.",
  },
  parking_full: {
    id: "parking_full",
    label: "Parking Zone A Full",
    intensity: "medium",
    affectedArea: "North Parking Lot",
    description: "Capacity reached at Zone A. Redirecting vehicles to East Overflow zones.",
  },
  security_threat: {
    id: "security_threat",
    label: "Restricted Zone Intrusion",
    intensity: "high",
    affectedArea: "Perimeter Sector 4",
    description: "Unauthorized access alert at backstage gate. Dispatched Security Patrol 2.",
  },
  weather_delay: {
    id: "weather_delay",
    label: "Severe Lightning warning",
    intensity: "high",
    affectedArea: "Open Stands Sector E",
    description: "Lightning cells detected in 10km zone. Advise evacuation under concrete canopies.",
  },
  metro_failure: {
    id: "metro_failure",
    label: "Metro Line 2 Delay",
    intensity: "medium",
    affectedArea: "Transit Station",
    description: "Signal delay expected to extend passenger exit queues. Deploying shuttle buses.",
  },
  stock_shortage: {
    id: "stock_shortage",
    label: "Concessions Refill Alert",
    intensity: "low",
    affectedArea: "Food Stand 3",
    description: "Beverage inventories dropped below 15% margin. Refill dispatch triggered.",
  },
};

const ScenarioContext = createContext<ScenarioContextProps | undefined>(undefined);

/**
 * Enterprise AI Scenario Provider.
 * Standardizes venue simulations, dispatching state overrides across dashboard panels.
 */
export function ScenarioProvider({ children }: ScenarioProviderProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("clear");
  const [selectedObject, setSelectedObject] = useState<SelectedObject | null>(null);
  const [simulationResult, setSimulationResult] = useState<SimulationReport | null>(null);

  useEffect(() => {
    const savedScenario = localStorage.getItem("arena-scenario") as ScenarioId;
    if (savedScenario && SCENARIO_MAP[savedScenario]) {
      setActiveScenario(savedScenario);
    }
  }, []);

  const setScenario = async (newScenario: ScenarioId) => {
    setActiveScenario(newScenario);
    localStorage.setItem("arena-scenario", newScenario);

    if (newScenario === "clear") {
      setSimulationResult(null);
      return;
    }

    let scenarioName = "Crowd Surge";
    let prompt = "High density congestion detected at entry gates.";

    if (newScenario === "medical_sos") {
      scenarioName = "VIP Medical Emergency";
      prompt = "VIP collapse reported in Suite B area.";
    } else if (newScenario === "security_threat") {
      scenarioName = "Gate Breach";
      prompt = "Security alarm triggered at main entry gates.";
    } else if (newScenario === "weather_delay") {
      scenarioName = "Fire in Food Court";
      prompt = "Smoke detected in Sect B Food Court area.";
    } else if (newScenario === "stock_shortage") {
      scenarioName = "Lost Child";
      prompt = "A lost child reported near retail sector.";
    }

    try {
      const res = await apiClient.post<SimulationReport>("/simulation/start", {
        scenario_name: scenarioName,
        incident_prompt: prompt,
      });
      setSimulationResult(res);
    } catch (err) {
      console.error("Failed to start backend simulation:", err);
    }
  };

  const scenarioDetails = SCENARIO_MAP[activeScenario] || SCENARIO_MAP.clear;

  return (
    <ScenarioContext.Provider
      value={{
        activeScenario,
        setScenario,
        scenarioDetails,
        selectedObject,
        setSelectedObject,
        simulationResult,
        setSimulationResult,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error("useScenario must be used within a ScenarioProvider");
  }
  return context;
}

export default ScenarioProvider;
