import React from "react";
import { cn } from "@/lib/utils";
import { AnnouncementBannerProps } from "./AnnouncementBanner.types";
import { ANNOUNCEMENT_DATA } from "./AnnouncementBanner.data";

/**
 * Announcement Notification Banner.
 * Renders as a pure Server Component above the navigation block.
 */
export function AnnouncementBanner({
  className = "",
  "data-testid": dataTestId = "announcement-banner",
  ...props
}: AnnouncementBannerProps) {
  return (
    <div
      className={cn(
        "w-full bg-gradient-to-r from-arena-primary/20 via-arena-secondary/20 to-arena-primary/20 border-b border-white/5 py-2.5 px-4 flex items-center justify-center text-center text-[10px] md:text-xs font-semibold z-50 relative select-none",
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      <div className="flex items-center justify-center flex-wrap gap-2">
        {/* Category Badge */}
        <span className="bg-arena-primary/20 text-arena-primary px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-wider border border-arena-primary/30">
          {ANNOUNCEMENT_DATA.badge}
        </span>

        {/* Announcement Text */}
        <span className="text-white/90">{ANNOUNCEMENT_DATA.text}</span>

        {/* Link anchor */}
        <a
          href={ANNOUNCEMENT_DATA.href}
          className="text-arena-primary hover:text-white underline ml-1 transition-colors duration-200 focus-visible:outline-arena-primary"
        >
          {ANNOUNCEMENT_DATA.ctaText} &rarr;
        </a>
      </div>
    </div>
  );
}

export default AnnouncementBanner;
