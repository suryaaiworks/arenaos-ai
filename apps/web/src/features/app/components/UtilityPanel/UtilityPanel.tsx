import React from "react";
import { cn } from "@/lib/utils";
import { UtilityPanelProps } from "./UtilityPanel.types";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Reusable Right-hand Utility Panel.
 * Shows system telemetry logs, live agent notifications, and loading skeletons.
 */
export function UtilityPanel({
  className = "",
  "data-testid": dataTestId = "utility-panel",
  ...props
}: UtilityPanelProps) {
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
          System Live Logs
        </span>
        <Badge variant="live" size="sm">
          Active
        </Badge>
      </div>

      {/* Mock Telemetry entries */}
      <div className="space-y-4">
        <GlassCard padding="sm" rounded="sm" border={true} hover={false} className="bg-arena-surface/40">
          <span className="text-[9px] uppercase font-bold text-arena-primary tracking-wider block mb-1">
            Gemini Orchestrator
          </span>
          <p className="text-[10px] text-white/80 leading-relaxed text-left">
            Orchestrating staff deployments at Exit Gate 3. Influx rate stabilizing at 350 / min.
          </p>
        </GlassCard>

        <GlassCard padding="sm" rounded="sm" border={true} hover={false} className="bg-arena-surface/40">
          <span className="text-[9px] uppercase font-bold text-arena-secondary tracking-wider block mb-1">
            Crowd Agent
          </span>
          <p className="text-[10px] text-white/80 leading-relaxed text-left">
            Turnstile logs analyzed. Ingress lines balanced across Sectors A, B, and C.
          </p>
        </GlassCard>

        {/* Loading indicators */}
        <div className="space-y-2 pt-2" aria-hidden="true">
          <Skeleton variant="text" width="60%" height="8px" />
          <Skeleton variant="text" width="40%" height="8px" />
        </div>
      </div>
    </aside>
  );
}

export default UtilityPanel;
