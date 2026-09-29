import { SchoolLicense, SchoolLicenseStats, LicensePlan, LicenseStatus, OTAUpdateConfig } from '../types/schoolLicense';

export interface LicenseServerData {
  licenses: SchoolLicense[];
  stats: SchoolLicenseStats;
  railwayStatus: {
    online: boolean;
    url: string;
    latencyMs: number;
    details?: any;
  };
  otaConfig?: OTAUpdateConfig;
  serverTime: string;
}

const CACHE_KEY = 'dss_school_licenses_cache';

export const schoolLicenseService = {
  getCachedData(): LicenseServerData | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  },

  async fetchLicensesData(): Promise<LicenseServerData> {
    const res = await fetch('/api/admin/licenses', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch license data: ${res.status}`);
    }

    const data: LicenseServerData = await res.json();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      } catch {}
    }
    return data;
  },

  async createLicense(payload: {
    schoolName: string;
    plan: LicensePlan;
    expiresAt?: string | null;
    notes?: string;
    contactPhone?: string;
    contactEmail?: string;
    customKey?: string;
  }): Promise<SchoolLicense> {
    const res = await fetch('/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create',
        ...payload,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Failed to create license');
    }
    return data.license;
  },

  async resetMachineLock(id: string): Promise<SchoolLicense> {
    const res = await fetch('/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset_machine', id }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Failed to reset machine lock');
    }
    return data.license;
  },

  async extendExpiry(id: string, days?: number, isLifetime?: boolean): Promise<SchoolLicense> {
    const res = await fetch('/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'extend_expiry', id, days, isLifetime }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Failed to extend license expiry');
    }
    return data.license;
  },

  async updateStatus(id: string, status: LicenseStatus): Promise<SchoolLicense> {
    const res = await fetch('/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_status', id, status }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Failed to update license status');
    }
    return data.license;
  },

  async deleteLicense(id: string): Promise<boolean> {
    const res = await fetch('/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Failed to delete license');
    }
    return true;
  },

  async checkRailway(): Promise<{ online: boolean; url: string; latencyMs: number }> {
    const res = await fetch('/api/admin/licenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'check_railway' }),
    });
    const data = await res.json();
    return data.railwayStatus;
  },
};
