'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSettings, Settings } from '@/lib/api';

interface ThemeContextType {
  settings: Settings | null;
  refreshSettings: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ settings: null, refreshSettings: () => {} });

export const useTheme = () => useContext(ThemeContext);

function applyTheme(settings: Settings) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', settings.primaryColor);
  root.style.setProperty('--color-secondary', settings.secondaryColor);

  if (settings.themeMode === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem('theme-settings');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as Settings;
        setSettings(parsed);
        applyTheme(parsed);
      } catch {}
    }

    getSettings()
      .then((data) => {
        setSettings(data);
        applyTheme(data);
        localStorage.setItem('theme-settings', JSON.stringify(data));
      })
      .catch(() => {});
  }, []);

  const refreshSettings = () => {
    getSettings()
      .then((data) => {
        setSettings(data);
        applyTheme(data);
        localStorage.setItem('theme-settings', JSON.stringify(data));
      })
      .catch(() => {});
  };

  return (
    <ThemeContext.Provider value={{ settings, refreshSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}
