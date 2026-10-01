export type ThemeDisplayMode = 'full_page' | 'hero_replace' | 'custom_code';
export type ThemeCategory = 'built_in' | 'custom';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  category: ThemeCategory;
  thumbnailUrl?: string;
  tags: string[];
  prompt?: string; // AI Prompt or design specification provided by user
  libraries?: string[]; // External CDN scripts / CSS links (e.g. GSAP, Three.js, Lucide, Tailwind CDN, Fonts)
  customHtml?: string; // Custom HTML/JSX/Tailwind markup
  customCss?: string; // Custom CSS styles
  customJs?: string; // Custom client JavaScript
  displayMode: ThemeDisplayMode;
  createdAt: string;
  updatedAt: string;
  isPredefined?: boolean;
}

export interface ThemesState {
  activeThemeId: string;
  themes: ThemeConfig[];
  lastUpdated: string;
}
