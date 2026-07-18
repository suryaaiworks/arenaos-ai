"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type DashboardModule =
  | "opsTelemetry"
  | "aiAgents"
  | "gateInflux"
  | "powerUtilities"
  | "facilityMaintenance";

interface DashboardContextProps {
  selectedModule: DashboardModule;
  setSelectedModule: (module: DashboardModule) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModule, setSelectedModule] = useState<DashboardModule>("opsTelemetry");
  return (
    <DashboardContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return ctx;
};
