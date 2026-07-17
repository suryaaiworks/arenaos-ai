import React from "react";

export type UserRole =
  | "fan"
  | "operations"
  | "security"
  | "medical"
  | "transportation"
  | "volunteer"
  | "vendor"
  | "administrator"
  | "executive";

export interface RoleContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

export interface RoleProviderProps {
  children: React.ReactNode;
}
