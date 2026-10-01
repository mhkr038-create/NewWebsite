'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { MinimalistObsidianTheme } from '../components/themes/MinimalistObsidianTheme';
import { CartoonEastTheme } from '../components/themes/CartoonEastTheme';
import { ModernSaasTheme } from '../components/themes/ModernSaasTheme';
import { CyberpunkTheme } from '../components/themes/CyberpunkTheme';
import { CustomCodeRenderer } from '../components/themes/CustomCodeRenderer';

export function HomeContent() {
  const { activeTheme, activeThemeId } = useTheme();

  switch (activeThemeId) {
    case 'cartooneast':
      return <CartoonEastTheme />;
    case 'modern-saas':
      return <ModernSaasTheme />;
    case 'cyberpunk-neon':
      return <CyberpunkTheme />;
    case 'minimalist-obsidian':
      return <MinimalistObsidianTheme />;
    default:
      // If custom theme with custom code
      if (activeTheme?.customHtml) {
        return <CustomCodeRenderer theme={activeTheme} />;
      }
      return <MinimalistObsidianTheme />;
  }
}
