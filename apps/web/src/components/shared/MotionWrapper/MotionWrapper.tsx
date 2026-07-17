"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionWrapperProps } from "./MotionWrapper.types";

/**
 * Framer Motion Animation Wrapper.
 * Automatically checks browser accessibility guidelines (prefers-reduced-motion)
 * and isolates client scripts.
 */
export function MotionWrapper({
  children,
  variant = "fade",
  delay = 0,
  duration = 0.5,
  disabled = false,
  className = "",
  "data-testid": dataTestId = "motion-wrapper",
  ...props
}: MotionWrapperProps) {
  const prefersReduced = useReducedMotion();
  const isAnimationDisabled = disabled || prefersReduced;

  // Fallback to simple HTML block if animations are disabled
  if (isAnimationDisabled) {
    return (
      <div className={className} data-testid={dataTestId} {...props}>
        {children}
      </div>
    );
  }

  // Animation configuration presets
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-down": {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
  };

  const transitionSettings = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as const, // Premium ease-out curve
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={animationVariants[variant]}
      transition={transitionSettings}
      className={className}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default MotionWrapper;
