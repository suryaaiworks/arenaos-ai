import React from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Slot for logo branding/icon content.
   */
  logoSlot?: React.ReactNode;
  /**
   * Slot for central navigation link wrappers.
   */
  navigationSlot?: React.ReactNode;
  /**
   * Slot for action callouts/settings/login triggers on the right side.
   */
  ctaSlot?: React.ReactNode;
  "data-testid"?: string;
}
