"use client";

import React, { createContext, useContext, useState } from "react";
import { ThemeContextProps, ThemeProviderProps } from "./ThemeProvider.types";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * Custom Theme Context provider.
 * Keeps variables pointing to the locked dark stadium console layout.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"dark">("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeProvider;
