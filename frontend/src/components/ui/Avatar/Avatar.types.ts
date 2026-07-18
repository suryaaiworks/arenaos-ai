import React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away" | "none";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Image source path.
   */
  src?: string;
  /**
   * Screen-reader alternative text description.
   */
  alt?: string;
  /**
   * Fallback text initials (e.g. 'JD').
   */
  initials?: string;
  /**
   * Visual size configuration.
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Status indicators shown as glowing badges.
   * @default 'none'
   */
  status?: AvatarStatus;
  /**
   * Override status badge hex/CSS color.
   */
  customStatusColor?: string;
  "data-testid"?: string;
}
