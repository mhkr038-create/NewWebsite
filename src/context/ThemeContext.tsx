'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeConfig } from '../types/theme';

const DEFAULT_THEME: ThemeConfig = {
  id: 'minimalist-obsidian',
  name: 'Minimalist Obsidian (Linear / Vercel style)',
  description: 'Elite monochromatic dark layout featuring a 3D perspective corridor, 3 core engineering pillars, clean metric counters, and SchoolMIS ERP showcase banner.',
  category: 'built_in',
  tags: ['Minimalist', 'Obsidian', '3D Corridor'],
  displayMode: 'full_page',
  createdAt: '2026-10-01T00:00:00.000Z',
  updatedAt: '2026-10-02T00:00:00.000Z',
  isPredefined: true,
};

interface ThemeContextType {
  activeThemeId: string;
  activeTheme: ThemeConfig;
  isLoading: boolean;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  activeThemeId: DEFAULT_THEME.id,
  activeTheme: DEFAULT_THEME,
  isLoading: false,
  refreshTheme: async () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState<string>(DEFAULT_THEME.id);
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchActiveTheme = useCallback(async () => {
    try {
      const res = await fetch('/api/theme/active', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.ok && data.activeTheme) {
          setActiveTheme(data.activeTheme);
          setActiveThemeId(data.activeTheme.id || DEFAULT_THEME.id);
          localStorage.setItem('dss_active_theme_id', data.activeTheme.id);
        }
      }
    } catch (err) {
      console.error('Error fetching active theme:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check localStorage cache for instant zero-flash render
    const cachedId = localStorage.getItem('dss_active_theme_id');
    if (cachedId) {
      setActiveThemeId(cachedId);
    }

    fetchActiveTheme();

    // Listen for cross-tab or admin switch events
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'dss_active_theme_id') {
        fetchActiveTheme();
      }
    };

    const handleCustomEvent = () => {
      fetchActiveTheme();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('dss_theme_changed', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('dss_theme_changed', handleCustomEvent);
    };
  }, [fetchActiveTheme]);

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId,
        activeTheme,
        isLoading,
        refreshTheme: fetchActiveTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
