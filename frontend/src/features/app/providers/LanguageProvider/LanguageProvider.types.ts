import React from "react";

export type Language = "en" | "hi" | "te" | "ar" | "fr" | "es";

export interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}
