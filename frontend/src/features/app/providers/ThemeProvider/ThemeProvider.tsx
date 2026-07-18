"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeContextProps, ThemeProviderProps, ThemeType } from "./ThemeProvider.types";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const STORAGE_KEY = "arenaos-theme";

/**
 * Enterprise Theme Provider.
 * Supports Dark and Light modes only. Defaults to Dark.
 * Persists to localStorage with key "arenaos-theme".
 * Applies data-theme attribute to <html> element so CSS vars cascade everywhere.
 * Works across all routes: Landing Page, Fan Portal, Operations Console.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeType>("dark");
  const [mounted, setMounted] = useState(false);

  // On first mount, read from localStorage (client only)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeType | null;
    if (saved === "light" || saved === "dark") {
      setThemeState(saved);
    }
    setMounted(true);
  }, []);

  // Apply theme to <html> whenever it changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    // Keep Tailwind dark class in sync for any dark: variants used
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Prevent flash on first render by suppressing until mounted
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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
