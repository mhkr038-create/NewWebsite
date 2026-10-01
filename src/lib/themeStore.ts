import fs from 'fs';
import path from 'path';
import os from 'os';
import { ThemeConfig, ThemesState } from '../types/theme';

export const BUILT_IN_THEMES: ThemeConfig[] = [
  {
    id: 'minimalist-obsidian',
    name: 'Minimalist Obsidian (Linear / Vercel style)',
    description: 'Elite monochromatic dark layout featuring a 3D perspective corridor, 3 core engineering pillars, clean metric counters, and SchoolMIS ERP showcase banner.',
    category: 'built_in',
    tags: ['Minimalist', 'Obsidian', '3D Corridor', 'High-Converting', 'SaaS'],
    prompt: 'Design an ultra-clean, monochromatic luxury dark tech website with 3D perspective corridor, sleek hairline borders, high contrast white typography, and SchoolMIS ERP spotlight banner.',
    displayMode: 'full_page',
    createdAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-02T00:00:00.000Z',
    isPredefined: true,
  },
  {
    id: 'cartooneast',
    name: 'Cartoon East Creative (Horizontal Snap & Dock)',
    description: 'Award-winning creative portfolio with 3D card stack, video reel crossfade, sound effects, project details modal, and macOS dock navigation.',
    category: 'built_in',
    tags: ['Creative', 'macOS Dock', 'Video Reel', 'Interactive', 'Audio FX'],
    prompt: 'Replicate cartooneast.in award-winning design with macOS dock, full screen video reels, 3D card stack preview, project details modal, and ambient sounds.',
    displayMode: 'full_page',
    createdAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-02T00:00:00.000Z',
    isPredefined: true,
  },
  {
    id: 'modern-saas',
    name: 'SaaS Enterprise & Growth (Interactive Live Demo)',
    description: 'High-converting B2B SaaS layout with interactive product showcase, dynamic feature matrix, automated ROI calculator, and customer testimonials.',
    category: 'built_in',
    tags: ['B2B SaaS', 'Live Demo', 'Enterprise', 'ROI Calculator'],
    prompt: 'Create a high-converting B2B SaaS website with interactive live playground, ROI calculator, social proof, and enterprise grade CTAs.',
    displayMode: 'full_page',
    createdAt: '2026-10-02T00:00:00.000Z',
    updatedAt: '2026-10-02T00:00:00.000Z',
    isPredefined: true,
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Terminal & Matrix (High-Tech Neon)',
    description: 'Futuristic developer terminal aesthetic with glowing matrix particles, animated command prompt, neon borders, and cybernetic UI cards.',
    category: 'built_in',
    tags: ['Cyberpunk', 'Developer Terminal', 'Neon Glow', 'Futuristic'],
    prompt: 'Design a cyberpunk terminal website with animated command prompt, neon cyan and purple glows, live system diagnostics, and holographic UI cards.',
    displayMode: 'full_page',
    createdAt: '2026-10-02T00:00:00.000Z',
    updatedAt: '2026-10-02T00:00:00.000Z',
    isPredefined: true,
  },
];

const DEFAULT_THEMES_STATE: ThemesState = {
  activeThemeId: 'minimalist-obsidian',
  themes: BUILT_IN_THEMES,
  lastUpdated: new Date().toISOString(),
};

declare global {
  // eslint-disable-next-line no-var
  var __dss_themes_state: ThemesState | undefined;
}

function getFilePath(): string {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, 'themes.json');
  } catch {
    return path.join(os.tmpdir(), 'dss_themes.json');
  }
}

function loadThemesFromDisk(): ThemesState {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.themes) && parsed.activeThemeId) {
        // Ensure built-in themes are present and updated
        const existingIds = new Set(parsed.themes.map((t: ThemeConfig) => t.id));
        const mergedThemes = [...parsed.themes];
        for (const builtin of BUILT_IN_THEMES) {
          if (!existingIds.has(builtin.id)) {
            mergedThemes.push(builtin);
          }
        }
        return {
          activeThemeId: parsed.activeThemeId,
          themes: mergedThemes,
          lastUpdated: parsed.lastUpdated || new Date().toISOString(),
        };
      }
    }
  } catch (err) {
    console.error('Error reading themes from disk:', err);
  }
  return DEFAULT_THEMES_STATE;
}

function saveThemesToDisk(state: ThemesState): void {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving themes to disk:', err);
  }
}

function getOrInitState(): ThemesState {
  if (!global.__dss_themes_state) {
    global.__dss_themes_state = loadThemesFromDisk();
  }
  return global.__dss_themes_state;
}

export function getAllThemes(): ThemeConfig[] {
  return getOrInitState().themes;
}

export function getActiveThemeId(): string {
  return getOrInitState().activeThemeId;
}

export function getActiveTheme(): ThemeConfig {
  const state = getOrInitState();
  const found = state.themes.find((t) => t.id === state.activeThemeId);
  return found || state.themes[0] || BUILT_IN_THEMES[0];
}

export function setActiveTheme(themeId: string): { ok: boolean; activeThemeId: string; error?: string } {
  const state = getOrInitState();
  const themeExists = state.themes.some((t) => t.id === themeId);
  if (!themeExists) {
    return { ok: false, activeThemeId: state.activeThemeId, error: `Theme with id "${themeId}" not found.` };
  }
  state.activeThemeId = themeId;
  state.lastUpdated = new Date().toISOString();
  saveThemesToDisk(state);
  return { ok: true, activeThemeId: themeId };
}

export function saveTheme(themeInput: Partial<ThemeConfig>): { ok: boolean; theme: ThemeConfig; error?: string } {
  const state = getOrInitState();
  
  if (!themeInput.name || !themeInput.name.trim()) {
    return { ok: false, theme: {} as ThemeConfig, error: 'Theme name is required.' };
  }

  const now = new Date().toISOString();
  const id = themeInput.id && themeInput.id.trim()
    ? themeInput.id.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-')
    : `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  const existingIndex = state.themes.findIndex((t) => t.id === id);

  const newTheme: ThemeConfig = {
    id,
    name: themeInput.name.trim(),
    description: themeInput.description?.trim() || 'Custom user-designed theme',
    category: (themeInput.isPredefined || themeInput.category === 'built_in') ? 'built_in' : 'custom',
    tags: Array.isArray(themeInput.tags) && themeInput.tags.length > 0 ? themeInput.tags : ['Custom', 'User Design'],
    prompt: themeInput.prompt || '',
    libraries: Array.isArray(themeInput.libraries) ? themeInput.libraries : [],
    customHtml: themeInput.customHtml || '',
    customCss: themeInput.customCss || '',
    customJs: themeInput.customJs || '',
    displayMode: themeInput.displayMode || 'full_page',
    thumbnailUrl: themeInput.thumbnailUrl,
    createdAt: existingIndex >= 0 ? state.themes[existingIndex].createdAt : now,
    updatedAt: now,
    isPredefined: themeInput.isPredefined || false,
  };

  if (existingIndex >= 0) {
    state.themes[existingIndex] = newTheme;
  } else {
    state.themes.push(newTheme);
  }

  state.lastUpdated = now;
  saveThemesToDisk(state);

  return { ok: true, theme: newTheme };
}

export function deleteTheme(themeId: string): { ok: boolean; error?: string } {
  const state = getOrInitState();
  const theme = state.themes.find((t) => t.id === themeId);

  if (!theme) {
    return { ok: false, error: 'Theme not found.' };
  }

  if (theme.isPredefined || theme.category === 'built_in') {
    return { ok: false, error: 'Cannot delete built-in system themes.' };
  }

  state.themes = state.themes.filter((t) => t.id !== themeId);

  if (state.activeThemeId === themeId) {
    state.activeThemeId = 'minimalist-obsidian';
  }

  state.lastUpdated = new Date().toISOString();
  saveThemesToDisk(state);

  return { ok: true };
}

export function resetThemesToDefault(): ThemesState {
  const state: ThemesState = {
    activeThemeId: 'minimalist-obsidian',
    themes: [...BUILT_IN_THEMES],
    lastUpdated: new Date().toISOString(),
  };
  global.__dss_themes_state = state;
  saveThemesToDisk(state);
  return state;
}
