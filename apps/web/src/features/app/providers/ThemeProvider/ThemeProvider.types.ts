import React from "react";

export interface ThemeContextProps {
  theme: "dark";
  setTheme: (theme: "dark") => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}
