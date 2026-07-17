"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChipProps } from "./Chip.types";

/**
 * Reusable Status Chip.
 * Supports click events, custom icons, and interactive delete triggers.
 */
export function Chip({
  label,
  variant = "solid",
  clickable = false,
  onDelete,
  icon,
  className = "",
  "data-testid": dataTestId = "chip",
  onClick,
  ...props
}: ChipProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (clickable && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
    }
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (onDelete && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      e.stopPropagation();
      onDelete();
    }
  };

  const baseStyle =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold select-none border transition-all duration-200 outline-none";

  const variantClasses = {
    solid: "bg-arena-surface border-arena-border text-white",
    outline: "bg-transparent border-arena-border text-arena-muted hover:text-white",
  };

  return (
    <span
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onClick={clickable ? onClick : undefined}
      className={cn(
        baseStyle,
        variantClasses[variant],
        clickable &&
          "hover:bg-arena-card hover:border-arena-primary/30 cursor-pointer focus-visible:outline-arena-primary",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Icon Prefix */}
      {icon && (
        <span className="mr-1.5 inline-flex" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Label content */}
      <span className="truncate">{label}</span>

      {/* Delete button trigger */}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          onKeyDown={handleDeleteKeyDown}
          className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-arena-muted hover:text-white hover:bg-white/10 focus:outline-none"
          aria-label={`Delete ${label} chip`}
        >
          {/* Custom SVG Close Icon */}
          <svg
            className="w-2.5 h-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default Chip;
