"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AvatarProps } from "./Avatar.types";

/**
 * Enterprise Avatar Component.
 * Supports image load optimization via next/image, error fallbacks to initials,
 * status badge indications, and ref forwarding.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = "user avatar",
      initials,
      size = "md",
      status = "none",
      customStatusColor,
      className = "",
      "data-testid": dataTestId = "avatar",
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
      xs: "w-6 h-6 text-[10px]",
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-16 h-16 text-xl",
      xl: "w-24 h-24 text-3xl",
    };

    const statusSizeClasses = {
      xs: "w-1.5 h-1.5",
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-4 h-4",
      xl: "w-5 h-5",
    };

    const statusColors = {
      online: "bg-arena-success",
      offline: "bg-arena-muted",
      busy: "bg-arena-danger",
      away: "bg-arena-warning",
      none: "",
    };

    const shouldShowImage = src && !imageError;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center rounded-full shrink-0 select-none bg-arena-surface border border-arena-border text-white font-bold uppercase",
          sizeClasses[size],
          className
        )}
        data-testid={dataTestId}
        {...props}
      >
        {shouldShowImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials || "?"}</span>
        )}

        {/* Status indicator badge */}
        {status !== "none" && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border border-arena-bg shadow-[0_0_10px_rgba(0,0,0,0.5)]",
              statusSizeClasses[size],
              statusColors[status]
            )}
            style={customStatusColor ? { backgroundColor: customStatusColor } : undefined}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
export default Avatar;
