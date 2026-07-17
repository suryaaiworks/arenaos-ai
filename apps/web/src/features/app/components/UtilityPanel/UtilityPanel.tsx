import React from "react";
import { cn } from "@/lib/utils";
import { UtilityPanelProps } from "./UtilityPanel.types";
import { useScenario } from "../../providers/ScenarioProvider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";

/**
 * Reusable Right-hand Utility Panel.
 * Dynamically displays metrics for selected Digital Twin objects or system telemetry logs.
 */
export function UtilityPanel({
  selectedObject,
  className = "",
  "data-testid": dataTestId = "utility-panel",
  ...props
}: UtilityPanelProps) {
  const { selectedObject: contextSelectedObject, setSelectedObject } = useScenario();
  const activeSelectedObject = selectedObject !== undefined ? selectedObject : contextSelectedObject;

  return (
    <aside
      className={cn(
        "w-80 shrink-0 bg-arena-bg border-l border-white/5 p-6 flex flex-col space-y-6 overflow-y-auto select-none relative z-20 hidden xl:flex",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Panel header status */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white">
          {activeSelectedObject ? "Object Telemetry" : "System Live Logs"}
        </span>
        <Badge variant={activeSelectedObject ? "info" : "live"} size="sm">
          {activeSelectedObject ? "Selected" : "Active"}
        </Badge>
      </div>

      {activeSelectedObject ? (
        /* Selected Stadium Object Details */
        <div className="space-y-6 text-left animate-fade-in">
          <div>
            <span className="text-[9px] uppercase font-mono font-bold text-arena-primary block">
              {activeSelectedObject.type} Details
            </span>
            <h3 className="text-sm font-bold text-white mt-1">
              {activeSelectedObject.name}
            </h3>
          </div>

          <div className="space-y-4">
            {Object.entries(activeSelectedObject.metrics).map(([key, val]) => (
              <GlassCard key={key} padding="sm" rounded="sm" border={true} className="bg-arena-surface/40">
                <span className="block text-[8px] uppercase font-bold text-arena-muted/50 font-mono">
                  {key}
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  {val}
                </span>
              </GlassCard>
            ))}
          </div>

          {/* Quick Actions Panel */}
          <div className="space-y-2 pt-2">
            <span className="block text-[9px] uppercase font-bold text-arena-muted font-mono">
              Quick Actions
            </span>
            <Button variant="primary" size="sm" className="w-full text-xs py-2">
              Optimize Telemetry
            </Button>
            <Button variant="outline" size="sm" className="w-full text-xs py-2 border-white/10 text-white" onClick={() => setSelectedObject(null)}>
              Clear Selection
            </Button>
          </div>
        </div>
      ) : (
        /* Default Mock Telemetry logs stream */
        <div className="space-y-4 text-left">
          <GlassCard padding="sm" rounded="sm" border={true} hover={false} className="bg-arena-surface/40">
            <span className="text-[9px] uppercase font-bold text-arena-primary tracking-wider block mb-1">
              Gemini Orchestrator
            </span>
            <p className="text-[10px] text-white/80 leading-relaxed">
              Orchestrating staff deployments at Exit Gate 3. Influx rate stabilizing at 350 / min.
            </p>
          </GlassCard>

          <GlassCard padding="sm" rounded="sm" border={true} hover={false} className="bg-arena-surface/40">
            <span className="text-[9px] uppercase font-bold text-arena-secondary tracking-wider block mb-1">
              Crowd Agent
            </span>
            <p className="text-[10px] text-white/80 leading-relaxed">
              Turnstile logs analyzed. Ingress lines balanced across Sectors A, B, and C.
            </p>
          </GlassCard>

          {/* Loading indicators */}
          <div className="space-y-2 pt-2" aria-hidden="true">
            <Skeleton variant="text" width="60%" height="8px" />
            <Skeleton variant="text" width="40%" height="8px" />
          </div>
        </div>
      )}
    </aside>
  );
}

export default UtilityPanel;
