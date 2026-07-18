import React from "react";
import { cn } from "@/lib/utils";
import { MetricCardProps } from "./MetricCard.types";
import GlassCard from "@/components/ui/GlassCard";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Reusable Telemetry Metric Card.
 * Renders numerical status metrics with trends, loaders, and subtitles.
 */
export function MetricCard({
  title,
  value,
  subtitle,
  change,
  changeType = "stable",
  loading = false,
  className = "",
  ...props
}: MetricCardProps) {
  return (
    <GlassCard
      padding="sm"
      rounded="sm"
      border={true}
      hover={true}
      className={cn("bg-arena-surface/50 select-none flex flex-col space-y-2 text-left", className)}
      {...props}
    >
      <span className="text-[10px] uppercase font-bold text-arena-muted tracking-wider">
        {title}
      </span>
      {loading ? (
        <div className="space-y-2 py-1" aria-hidden="true">
          <Skeleton variant="text" width="60%" height="16px" />
          <Skeleton variant="text" width="40%" height="8px" />
        </div>
      ) : (
        <>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-extrabold text-arena-text tracking-tight">
              {value}
            </span>
            {change && (
              <span
                className={cn(
                  "text-[10px] font-semibold font-mono",
                  changeType === "increase" && "text-arena-success",
                  changeType === "decrease" && "text-arena-danger",
                  changeType === "stable" && "text-arena-primary"
                )}
              >
                {change}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[10px] text-arena-muted truncate">
              {subtitle}
            </p>
          )}
        </>
      )}
    </GlassCard>
  );
}

export default MetricCard;
