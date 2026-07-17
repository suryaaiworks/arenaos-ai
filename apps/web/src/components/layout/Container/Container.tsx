import React from "react";
import { cn } from "@/lib/utils";
import { ContainerProps } from "./Container.types";

/**
 * Layout Container block.
 * Centered responsive layout wrapper with default gutters.
 */
export function Container({
  children,
  maxWidth = "xl",
  className = "",
  "data-testid": dataTestId = "container",
  ...props
}: ContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn("w-full mx-auto px-4 md:px-6 lg:px-8", maxWidthClasses[maxWidth], className)}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
