'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../context/ThemeContext';

const MinimalistObsidianTheme = dynamic(
  () => import('../components/themes/MinimalistObsidianTheme').then((m) => m.MinimalistObsidianTheme),
  { ssr: true }
);

const CartoonEastTheme = dynamic(
  () => import('../components/themes/CartoonEastTheme').then((m) => m.CartoonEastTheme),
  { ssr: true }
);

const ModernSaasTheme = dynamic(
  () => import('../components/themes/ModernSaasTheme').then((m) => m.ModernSaasTheme),
  { ssr: true }
);

const CyberpunkTheme = dynamic(
  () => import('../components/themes/CyberpunkTheme').then((m) => m.CyberpunkTheme),
  { ssr: true }
);

const CustomCodeRenderer = dynamic(
  () => import('../components/themes/CustomCodeRenderer').then((m) => m.CustomCodeRenderer),
  { ssr: true }
);

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
