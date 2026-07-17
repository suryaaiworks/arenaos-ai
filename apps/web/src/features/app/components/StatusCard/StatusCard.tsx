import React from "react";
import { cn } from "@/lib/utils";
import { StatusCardProps } from "./StatusCard.types";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";

/**
 * Reusable Status Telemetry Card.
 * Renders status headers, colored indicator badges, and description logs.
 */
export function StatusCard({
  title,
  statusText,
  statusType = "neutral",
  details,
  className = "",
  ...props
}: StatusCardProps) {
  return (
    <GlassCard
      padding="sm"
      rounded="sm"
      border={true}
      hover={true}
      className={cn("bg-arena-surface/50 text-left select-none flex flex-col space-y-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold text-[var(--arena-text-primary,#fff)] tracking-wider truncate mr-2">
          {title}
        </span>
        <Badge
          variant={
            statusType === "success"
              ? "success"
              : statusType === "warning"
              ? "warning"
              : statusType === "error"
              ? "error"
              : statusType === "info"
              ? "ai"
              : "neutral"
          }
          size="sm"
        >
          {statusText}
        </Badge>
      </div>
      {details && (
        <p className="text-[10px] text-[var(--arena-text-muted,#94a3b8)] leading-relaxed">
          {details}
        </p>
      )}
    </GlassCard>
  );
}

export default StatusCard;
