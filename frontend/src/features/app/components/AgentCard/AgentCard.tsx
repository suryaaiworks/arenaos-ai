import React from "react";
import { cn } from "@/lib/utils";
import { AgentCardProps } from "./AgentCard.types";
import GlassCard from "@/components/ui/GlassCard";

/**
 * Reusable AI Agent Telemetry Card.
 * Renders status parameters, latency logs, and current task streams for specialized agents.
 */
export function AgentCard({
  name,
  status,
  health,
  latency,
  task,
  connectedSystems = [],
  recommendationsCount = 0,
  className = "",
  ...props
}: AgentCardProps) {
  return (
    <GlassCard
      padding="sm"
      rounded="sm"
      border={true}
      hover={true}
      className={cn("bg-arena-surface/50 text-left select-none flex flex-col space-y-3.5", className)}
      {...props}
    >
      {/* Name and online status indicator */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-arena-text tracking-wide">
          {name}
        </span>
        <span className="flex items-center space-x-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              status === "online" && "bg-arena-success animate-pulse",
              status === "busy" && "bg-arena-warning",
              status === "offline" && "bg-arena-muted"
            )}
          />
          <span className="text-[8px] font-mono font-bold text-arena-muted uppercase">
            {status}
          </span>
        </span>
      </div>

      {/* Telemetry metrics */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-arena-muted border-b border-arena-border pb-2">
        <div>
          <span className="block text-[8px] uppercase font-bold text-arena-muted">Health</span>
          <span className="text-arena-text font-bold">{health}%</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase font-bold text-arena-muted">Latency</span>
          <span className="text-arena-text font-bold">{latency}ms</span>
        </div>
      </div>

      {/* Task descriptions */}
      {task && (
        <div className="space-y-0.5 text-left">
          <span className="block text-[8px] uppercase font-bold text-arena-muted font-mono">
            Active Task
          </span>
          <p className="text-[10px] text-arena-text/90 leading-relaxed font-sans truncate">
            {task}
          </p>
        </div>
      )}

      {/* Integrated systems */}
      <div className="flex items-center justify-between text-[8px] font-mono text-arena-muted pt-0.5">
        <span>Systems: {connectedSystems.length}</span>
        {recommendationsCount > 0 && (
          <span className="text-arena-primary font-bold">
            {recommendationsCount} Dispatch Alerts
          </span>
        )}
      </div>
    </GlassCard>
  );
}

export default AgentCard;
