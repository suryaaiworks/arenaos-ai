"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AppShellProps } from "./AppShell.types";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ContentArea from "../../components/ContentArea";
import UtilityPanel from "../../components/UtilityPanel";

/**
 * Main authenticated Application Shell coordinator.
 * Chains navigation Sidebars, upper control Headers, content main canvases, and utility logs.
 */
export function AppShell({
  children,
  className = "",
  "data-testid": dataTestId = "app-shell",
  ...props
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen w-screen flex bg-arena-bg overflow-hidden relative font-sans text-arena-text", 
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      {/* Left Navigation Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Content wrapper panel */}
      <div className="flex-grow h-full flex flex-col overflow-hidden relative z-10">
        {/* Upper Control Bar */}
        <Header />
        
        {/* Split layouts split area */}
        <div className="flex-grow w-full flex overflow-hidden relative">
          <ContentArea>{children}</ContentArea>
          <UtilityPanel />
        </div>
      </div>
    </div>
  );
}

export default AppShell;
