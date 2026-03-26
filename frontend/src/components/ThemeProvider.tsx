'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSettings, Settings } from '@/lib/api';

interface ThemeContextType {
  settings: Settings | null;
  refreshSettings: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ settings: null, refreshSettings: () => {} });

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch {
      // Use defaults
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings) return;
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
  }, [settings]);

  return (
    <ThemeContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}
