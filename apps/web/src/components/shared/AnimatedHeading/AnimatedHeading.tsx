import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedHeadingProps } from "./AnimatedHeading.types";
import MotionWrapper from "../MotionWrapper";

/**
 * Accessible Heading with optional animations.
 * Dynamically resolves semantic HTML tags (h1-h6) and applies layout-driven typography.
 */
export function AnimatedHeading({
  title,
  subtitle,
  align = "center",
  animated = true,
  level = 2,
  className = "",
  "data-testid": dataTestId = "animated-heading",
  ...props
}: AnimatedHeadingProps) {
  const HeadingTag = `h${level}` as const;

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // Typography tokens corresponding to heading levels
  const headingClasses = {
    1: "text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight",
    2: "text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight",
    3: "text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white",
    4: "text-lg md:text-2xl lg:text-3xl font-bold text-white",
    5: "text-base md:text-xl font-bold text-white",
    6: "text-sm md:text-base font-bold text-white",
  };

  const subtitleClasses = "text-xs md:text-sm text-arena-muted max-w-2xl mt-3 leading-relaxed";

  const renderContent = () => (
    <>
      <HeadingTag className={headingClasses[level]}>{title}</HeadingTag>
      {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
    </>
  );

  return (
    <div
      className={cn("flex flex-col w-full", alignmentClasses[align], className)}
      data-testid={dataTestId}
      {...props}
    >
      {animated ? (
        <MotionWrapper
          variant="slide-up"
          className={cn("flex flex-col", alignmentClasses[align], "w-full")}
        >
          {renderContent()}
        </MotionWrapper>
      ) : (
        renderContent()
      )}
    </div>
  );
}

export default AnimatedHeading;
