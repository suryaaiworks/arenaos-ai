"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RoleContextProps, RoleProviderProps, UserRole } from "./RoleProvider.types";

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

/**
 * Enterprise Role Context Provider.
 * Coordinates active role permissions and persists selections to localStorage.
 */
export function RoleProvider({ children }: RoleProviderProps) {
  const [role, setRoleState] = useState<UserRole>("operations");

  useEffect(() => {
    const savedRole = localStorage.getItem("arena-role") as UserRole;
    if (savedRole) {
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("arena-role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

export default RoleProvider;
