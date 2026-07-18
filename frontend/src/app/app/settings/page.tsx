"use client";

import React, { useState } from "react";
import PageHeader from "@/features/app/components/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/features/app/providers/LanguageProvider";
import { Language } from "@/features/app/providers/LanguageProvider/LanguageProvider.types";
import { useTheme } from "@/features/app/providers/ThemeProvider";
import { useToast } from "@/features/app/providers/ToastProvider";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ar", name: "العربية (Arabic - RTL)" },
  { code: "fr", name: "Français (French)" },
  { code: "es", name: "Español (Spanish)" },
];

/**
 * Premium Console Settings Page.
 * Coordinates user preferences, translations, and keyboard mapping indices.
 */
export default function SettingsPage() {
  const { language, setLanguage, t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();

  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = () => {
    addToast("Preferences saved successfully", "success");
  };

  return (
    <div className="space-y-6 select-none pb-12 text-left">
      <PageHeader
        title={t("console_settings")}
        description="Configure language preferences, accessibility, themes, and global shortcuts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Configuration Controls (Cols 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Language & Theme Selectors */}
          {/* Language & Theme Selectors */}
          <GlassCard padding="md" rounded="md" border={true} className="bg-arena-surface p-5 space-y-5 text-arena-text">
            <h3 className="text-xs font-bold font-mono tracking-widest text-arena-primary uppercase">
              GENERAL PREFERENCES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language switcher select */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] uppercase font-bold text-arena-muted font-mono">
                  {t("language_switcher")}
                </label>
                 <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="arena-input border border-arena-border text-arena-text text-xs rounded-lg p-2.5 w-full focus:outline-none focus:border-arena-primary font-semibold"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-arena-surface text-arena-text">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme cycle select */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] uppercase font-bold text-arena-muted font-mono">
                  Theme Palette Mode
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "light" | "dark")}
                  className="arena-input border border-arena-border text-arena-text text-xs rounded-lg p-2.5 w-full focus:outline-none focus:border-arena-primary font-semibold"
                >
                  <option value="dark" className="bg-arena-surface text-arena-text">🌙 Dark Mode (Mission Control)</option>
                  <option value="light" className="bg-arena-surface text-arena-text">☀️ Light Mode (Daylight)</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Accessibility Configurations */}
          <GlassCard padding="md" rounded="md" border={true} className="bg-arena-surface p-5 space-y-5 text-arena-text">
            <h3 className="text-xs font-bold font-mono tracking-widest text-arena-primary uppercase">
              ACCESSIBILITY SETTINGS
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-arena-text">Reduced Motion</span>
                  <span className="block text-[10px] text-arena-muted">Minimize animated transitions and flows.</span>
                </div>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="w-4 h-4 rounded accent-arena-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-arena-text">High Contrast Colors</span>
                  <span className="block text-[10px] text-arena-muted">Enhance border lines and text weights contrast.</span>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4 rounded accent-arena-primary"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-arena-text">Critical Alert Audios</span>
                  <span className="block text-[10px] text-arena-muted">Receive acoustic sounds on SOS medical incidents.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-arena-primary"
                />
              </div>
            </div>
          </GlassCard>

          <Button variant="primary" onClick={handleSave} className="w-full text-xs py-2.5 font-bold uppercase">
            {t("save_preferences")}
          </Button>
        </div>

        {/* Right Side: Shortcut Cheatsheets (Cols 4) */}
        <div className="lg:col-span-4 space-y-6">
          <span className="text-[10px] uppercase font-bold text-arena-muted font-mono block tracking-wider">
            Shortcuts Command Guide
          </span>

          <GlassCard padding="sm" rounded="sm" border={true} className="bg-arena-surface p-4 space-y-3.5 text-arena-text">
            <div className="flex justify-between items-center text-xs">
              <span className="text-arena-muted">Command Search Palette</span>
              <kbd className="bg-arena-card border border-arena-border px-2 py-0.5 rounded text-[10px] font-mono text-arena-text">Ctrl + K</kbd>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-arena-muted">Go to AI Agents</span>
              <kbd className="bg-arena-card border border-arena-border px-2 py-0.5 rounded text-[10px] font-mono text-arena-text">NV</kbd>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-arena-muted">Go to Settings</span>
              <kbd className="bg-arena-card border border-arena-border px-2 py-0.5 rounded text-[10px] font-mono text-arena-text">ST</kbd>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-arena-muted">Close Drawers/Modals</span>
              <kbd className="bg-arena-card border border-arena-border px-2 py-0.5 rounded text-[10px] font-mono text-arena-text">ESC</kbd>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
