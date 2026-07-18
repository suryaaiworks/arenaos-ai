import React from "react";

export interface NotificationBellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  badgeCount?: number;
  "data-testid"?: string;
}
