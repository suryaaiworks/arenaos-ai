import React from "react";
import { NavItem } from "../../navigation/navigation.data";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  activeHref?: string;
  items?: NavItem[];
  "data-testid"?: string;
}

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: NavItem;
  active?: boolean;
  collapsed?: boolean;
}
