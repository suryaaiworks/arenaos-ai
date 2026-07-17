"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PageTransitionProps } from "./PageTransition.types";

/**
 * Reusable Page Route Transition Component.
 * Supports animation presets and automatically respects user accessibility settings.
 */
export function PageTransition({
  children,
  preset = "fade",
  disabled = false,
  className = "",
  "data-testid": dataTestId = "page-transition",
  ...props
}: PageTransitionProps) {
  const prefersReduced = useReducedMotion();
  const isTransitionDisabled = disabled || prefersReduced;

  if (isTransitionDisabled) {
    return (
      <div className={className} data-testid={dataTestId} {...props}>
        {children}
      </div>
    );
  }

  // Animation configuration presets
  const presets = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    },
  };

  const transitionSettings = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] as const, // Clean ease-out curve
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={presets[preset]}
      transition={transitionSettings}
      className={cn("w-full h-full flex flex-col flex-grow", className)}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
