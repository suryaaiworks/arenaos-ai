"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Language, LanguageContextProps, LanguageProviderProps } from "./LanguageProvider.types";

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    app_title: "ArenaOS AI",
    operations_console: "Operations Console",
    system_health: "System Health",
    latency: "System Latency",
    orchestrated_agents: "Orchestrated Agents",
    active_recommendations: "Active Recommendations",
    digital_twin_blueprint: "Interactive Digital Twin Blueprint",
    console_metrics: "Console Metrics",
    ai_recommendation_log: "AI Recommendation Log",
    simulate_event: "Simulate Incident Event",
    active_scenario: "Active Scenario",
    language_switcher: "Language Switcher",
    console_settings: "Console Settings",
    my_profile: "My Profile",
    logout: "Log Out Console",
    save_preferences: "Save Preferences",
  },
  hi: {
    app_title: "अरीनाओएस एआई",
    operations_console: "संचालन कंसोल",
    system_health: "सिस्टम स्वास्थ्य",
    latency: "सिस्टम विलंबता",
    orchestrated_agents: "सक्रिय एजेंट",
    active_recommendations: "सक्रिय सिफारिशें",
    digital_twin_blueprint: "डिजिटल ट्विन मानचित्र",
    console_metrics: "कंसोल मेट्रिक्स",
    ai_recommendation_log: "एआई सिफारिश लॉग",
    simulate_event: "घटना अनुकरण करें",
    active_scenario: "सक्रिय परिदृश्य",
    language_switcher: "भाषा बदलें",
    console_settings: "कंसोल सेटिंग्स",
    my_profile: "मेरी प्रोफ़ाइल",
    logout: "लॉग आउट",
    save_preferences: "प्राथमिकताएं सहेजें",
  },
  te: {
    app_title: "అరీనాఓఎస్ ఏఐ",
    operations_console: "ఆపరేషన్స్ కన్సోల్",
    system_health: "సిస్టమ్ ఆరోగ్యం",
    latency: "సిస్టమ్ జాప్యం",
    orchestrated_agents: "క్రియాశీల ఏజెంట్లు",
    active_recommendations: "క్రియాశీల సిఫార్సులు",
    digital_twin_blueprint: "డిజిటల్ ట్విన్ మ్యాప్",
    console_metrics: "కన్సోల్ కొలతలు",
    ai_recommendation_log: "ఏఐ సిఫార్సుల లాగ్",
    simulate_event: "ఘటనను అనుకరించు",
    active_scenario: "క్రియాశీల సినారియో",
    language_switcher: "భాష మార్చండి",
    console_settings: "కన్సోల్ సెట్టింగ్‌లు",
    my_profile: "నా ప్రొఫైల్",
    logout: "లాగ్ అవుట్",
    save_preferences: "ప్రాధాన్యతలను సేవ్ చేయి",
  },
  ar: {
    app_title: "أرينا أو إس",
    operations_console: "لوحة التحكم بالعمليات",
    system_health: "سلامة النظام",
    latency: "زمن استجابة النظام",
    orchestrated_agents: "العملاء النشطون",
    active_recommendations: "التوصيات النشطة",
    digital_twin_blueprint: "مخطط التوأم الرقمي",
    console_metrics: "مقاييس لوحة التحكم",
    ai_recommendation_log: "سجل توصيات الذكاء الاصطناعي",
    simulate_event: "محاكاة حدث طارئ",
    active_scenario: "السيناريو النشط",
    language_switcher: "تبديل اللغة",
    console_settings: "إعدادات النظام",
    my_profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    save_preferences: "حفظ الإعدادات",
  },
  fr: {
    app_title: "ArenaOS AI",
    operations_console: "Console des Opérations",
    system_health: "Santé du Système",
    latency: "Latence du Système",
    orchestrated_agents: "Agents Orchestrés",
    active_recommendations: "Recommandations Actives",
    digital_twin_blueprint: "Plan de Jumeau Numérique",
    console_metrics: "Métriques de la Console",
    ai_recommendation_log: "Log des Recommandations IA",
    simulate_event: "Simuler un Incident",
    active_scenario: "Scénario Actif",
    language_switcher: "Changer de Langue",
    console_settings: "Paramètres de la Console",
    my_profile: "Mon Profil",
    logout: "Se Déconnecter",
    save_preferences: "Enregistrer les Préférences",
  },
  es: {
    app_title: "ArenaOS AI",
    operations_console: "Consola de Operaciones",
    system_health: "Salud del Sistema",
    latency: "Latencia del Sistema",
    orchestrated_agents: "Agentes Orquestados",
    active_recommendations: "Recomendaciones Activas",
    digital_twin_blueprint: "Plano de Gemelo Digital",
    console_metrics: "Métricas de la Consola",
    ai_recommendation_log: "Registro de Recomendaciones IA",
    simulate_event: "Simular Incidente",
    active_scenario: "Escenario Activo",
    language_switcher: "Cambiar Idioma",
    console_settings: "Ajustes de la Consola",
    my_profile: "Mi Perfil",
    logout: "Cerrar Sesión",
    save_preferences: "Guardar Preferencias",
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLangState] = useState<Language>("en");

  // Load language preference from local storage
  useEffect(() => {
    const saved = localStorage.getItem("arena-language") as Language;
    if (saved && TRANSLATIONS[saved]) {
      setLangState(saved);
      // Sync document directions
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLangState(lang);
    localStorage.setItem("arena-language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  const t = useCallback((key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

export default LanguageProvider;
