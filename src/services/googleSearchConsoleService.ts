import { GSCSummary, GSCConfig } from '../types/googleSearchConsole';

export const googleSearchConsoleService = {
  async fetchSummary(range: '7d' | '28d' | '90d' = '28d'): Promise<GSCSummary> {
    try {
      const res = await fetch(`/api/seo/search-console?range=${range}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(`dss_gsc_cache_${range}`, JSON.stringify(data));
          } catch {}
        }
        return data;
      }
    } catch (e) {
      console.warn('Failed to fetch GSC data from API, checking local cache:', e);
    }

    // Fallback to local cache if offline or network fails
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(`dss_gsc_cache_${range}`);
        if (cached) {
          return JSON.parse(cached);
        }
      } catch {}
    }

    throw new Error('Unable to load Google Search Console analytics');
  },

  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      const res = await fetch('/api/seo/search-console', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_connection' }),
      });
      return await res.json();
    } catch (e: any) {
      return {
        success: false,
        message: e?.message || 'Failed to connect to Google Search Console API route.',
      };
    }
  },

  async saveConfig(config: Partial<GSCConfig>): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/seo/search-console', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_config', ...config }),
      });
      return await res.json();
    } catch (e: any) {
      return {
        success: false,
        message: e?.message || 'Failed to save Google Search Console configuration.',
      };
    }
  },

  async addTargetKeyword(keyword: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/seo/search-console', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_keyword', keyword }),
      });
      return await res.json();
    } catch (e: any) {
      return {
        success: false,
        message: e?.message || 'Failed to add target keyword.',
      };
    }
  },

  async removeTargetKeyword(keyword: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/seo/search-console', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove_keyword', keyword }),
      });
      return await res.json();
    } catch (e: any) {
      return {
        success: false,
        message: e?.message || 'Failed to remove target keyword.',
      };
    }
  },
};
