import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import { 
  SchoolLicense, 
  SchoolLicenseStats, 
  SchoolLicenseActivity, 
  LicensePlan, 
  LicenseStatus,
  OTAUpdateConfig 
} from '../types/schoolLicense';

const RAILWAY_SERVER_URL = process.env.RAILWAY_LICENSE_SERVER_URL || 'https://schoolmis-license-server-production.up.railway.app';

// Seed benchmark licenses so system is pre-populated with real school deployments
const INITIAL_LICENSES: SchoolLicense[] = [
  {
    id: '06797aef-f6c5-47c7-98d4-67add4402cf9',
    key: 'SMIS-F713-2535-9C23-70C4',
    schoolName: 'Rainbow English Medium Primary School',
    plan: 'Enterprise',
    status: 'active',
    features: ['all_modules', 'excel_import', 'fee_receipts', 'timetable_generator', 'ota_updates'],
    expiresAt: '2026-10-07',
    notes: 'Trial For One month - Rainbow School deployment',
    createdAt: '2026-09-07T02:15:13.322Z',
    activatedAt: '2026-09-07T02:20:08.835Z',
    machineId: '87ed923b940bba8a436790c552e8225e',
    lastSeen: new Date().toISOString(),
    activationCount: 1,
    pings: 14,
    appVersion: '1.3.0',
    activityLog: [
      {
        timestamp: '2026-09-07T02:20:08.835Z',
        type: 'First Activation',
        machineId: '87ed923b940bba8a436790c552e8225e',
        ip: '103.156.19.42 (Client PC)',
        details: 'First activation bound to PC by Rainbow English Medium Primary School'
      },
      {
        timestamp: '2026-09-07T02:15:13.322Z',
        type: 'Key Created',
        machineId: null,
        ip: 'Admin Dashboard',
        details: 'Generated Enterprise license for Rainbow English Medium Primary School'
      }
    ]
  },
  {
    id: '992a831e-4cb8-4e12-b103-918d04e578fa',
    key: 'SMIS-2BEB-060A-3F2E-18DA',
    schoolName: 'St. Mary High School (Demo / Onboarding)',
    plan: 'Pro',
    status: 'inactive',
    features: ['student_management', 'attendance', 'fees', 'grades'],
    expiresAt: null, // Lifetime / Annual
    notes: 'Ready for client PC activation',
    createdAt: '2026-09-07T08:10:00.000Z',
    activatedAt: null,
    machineId: null,
    lastSeen: null,
    activationCount: 0,
    pings: 0,
    appVersion: '1.3.0',
    activityLog: [
      {
        timestamp: '2026-09-07T08:10:00.000Z',
        type: 'Key Created',
        machineId: null,
        ip: 'Admin Dashboard',
        details: 'Generated Pro license key ready for deployment'
      }
    ]
  }
];

const DEFAULT_OTA_CONFIG: OTAUpdateConfig = {
  latestVersion: '1.3.0',
  minRequiredVersion: '1.0.0',
  releaseDate: '2026-09-07',
  mandatory: false,
  changelog: '• Added Nursery, LKG, and UKG class support\n• Dynamic class-wise weekly Timetable with clickable period editor\n• Advanced Attendance Engine with full historical date navigation\n• Monthly Attendance Register (Days 1–31) with Excel export & print\n• 1-Click Daily Attendance Excel upload & duplicate-free auto-sync\n• Class-wise Fee Structure configuration with 1-click auto-generation\n• Formal printable Fee Receipts with amount-in-words (INR) and school letterhead\n• Remote Over-The-Air (OTA) Auto-Updater integration',
  asarFile: 'app.asar',
  fileSize: 14324357,
  sha256: 'CAE9199C4886F3697841D17B5290F53B0A9B8F0921D673A90F212200AB049D41',
  downloadUrl: '/api/updates/download/app.asar'
};

// Global memory cache across warm serverless requests
declare global {
  // eslint-disable-next-line no-var
  var __dss_school_licenses: SchoolLicense[] | undefined;
}

function getFilePath(): string {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, 'licenses.json');
  } catch {
    return path.join(os.tmpdir(), 'dss_licenses.json');
  }
}

// Generate formatted license key: SMIS-XXXX-XXXX-XXXX-XXXX
export function genLicenseKey(): string {
  const seg = () => crypto.randomBytes(2).toString('hex').toUpperCase();
  return `SMIS-${seg()}-${seg()}-${seg()}-${seg()}`;
}

// Load licenses from disk / memory
export function loadLicenses(): SchoolLicense[] {
  if (global.__dss_school_licenses && global.__dss_school_licenses.length > 0) {
    return global.__dss_school_licenses;
  }

  const p = getFilePath();
  try {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf8');
      const data = JSON.parse(raw);
      if (Array.isArray(data.licenses) && data.licenses.length > 0) {
        global.__dss_school_licenses = data.licenses;
        return data.licenses;
      }
    }
  } catch (e) {
    console.warn('Failed reading licenses file, fallback to initial:', e);
  }

  // Seed default licenses
  saveLicenses(INITIAL_LICENSES);
  return INITIAL_LICENSES;
}

// Save licenses to disk and cache
export function saveLicenses(licenses: SchoolLicense[]): void {
  global.__dss_school_licenses = licenses;
  try {
    const p = getFilePath();
    fs.writeFileSync(p, JSON.stringify({ licenses, updatedAt: new Date().toISOString() }, null, 2), 'utf8');
  } catch (e) {
    console.warn('Failed writing licenses file:', e);
  }
}

// Query all licenses
export function getAllLicenses(): SchoolLicense[] {
  return loadLicenses();
}

// Get license by ID
export function getLicenseById(id: string): SchoolLicense | undefined {
  return loadLicenses().find(l => l.id === id);
}

// Get license by key
export function getLicenseByKey(key: string): SchoolLicense | undefined {
  const cleanKey = key.toUpperCase().trim();
  return loadLicenses().find(l => l.key.toUpperCase().trim() === cleanKey);
}

// Create new license
export function createLicense(params: {
  schoolName: string;
  plan?: LicensePlan;
  expiresAt?: string | null;
  notes?: string;
  features?: string[];
  contactPhone?: string;
  contactEmail?: string;
  customKey?: string;
  ip?: string;
}): SchoolLicense {
  const licenses = loadLicenses();
  const plan = params.plan || 'Basic';
  const newLic: SchoolLicense = {
    id: crypto.randomUUID(),
    key: params.customKey ? params.customKey.toUpperCase().trim() : genLicenseKey(),
    schoolName: params.schoolName.trim() || 'Unnamed School',
    plan,
    status: 'inactive', // Becomes 'active' when school enters key in their desktop software
    features: params.features || ['student_management', 'attendance', 'fees'],
    expiresAt: params.expiresAt || null,
    notes: params.notes || '',
    contactPhone: params.contactPhone || '',
    contactEmail: params.contactEmail || '',
    createdAt: new Date().toISOString(),
    activatedAt: null,
    machineId: null,
    lastSeen: null,
    activationCount: 0,
    pings: 0,
    activityLog: [
      {
        timestamp: new Date().toISOString(),
        type: 'Key Created',
        machineId: null,
        ip: params.ip || 'Admin Dashboard',
        details: `Generated ${plan} license for ${params.schoolName || 'Unnamed School'}`
      }
    ]
  };

  licenses.unshift(newLic);
  saveLicenses(licenses);
  return newLic;
}

// Update license
export function updateLicense(id: string, updates: Partial<SchoolLicense>, ip = 'Admin Dashboard'): SchoolLicense | null {
  const licenses = loadLicenses();
  const idx = licenses.findIndex(l => l.id === id);
  if (idx === -1) return null;

  const lic = licenses[idx];
  if (!lic.activityLog) lic.activityLog = [];

  // Reset machine binding
  if (updates.machineId === null && lic.machineId !== null) {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Machine Reset',
      machineId: null,
      ip,
      details: `Machine binding reset by Admin. Previous machine was: ${lic.machineId}`
    });
  }

  // Status change
  if (updates.status && updates.status !== lic.status) {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Status Changed',
      machineId: lic.machineId,
      ip,
      details: `Status changed from ${lic.status} to ${updates.status}`
    });
  }

  // Expiry change
  if (updates.expiresAt !== undefined && updates.expiresAt !== lic.expiresAt) {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Expiry Extended',
      machineId: lic.machineId,
      ip,
      details: `Expiry date updated to ${updates.expiresAt || 'Lifetime (Never)'}`
    });
  }

  const updated: SchoolLicense = {
    ...lic,
    ...updates,
    activityLog: lic.activityLog.slice(0, 100),
  };

  licenses[idx] = updated;
  saveLicenses(licenses);
  return updated;
}

// Delete license
export function deleteLicense(id: string): boolean {
  const licenses = loadLicenses();
  const filtered = licenses.filter(l => l.id !== id);
  if (filtered.length !== licenses.length) {
    saveLicenses(filtered);
    return true;
  }
  return false;
}

// Reset machine binding lock
export function resetMachineBinding(id: string): SchoolLicense | null {
  return updateLicense(id, { machineId: null, activationCount: 0 });
}

// Extend expiry date
export function extendLicenseExpiry(id: string, daysOrLifetime: number | 'lifetime'): SchoolLicense | null {
  if (daysOrLifetime === 'lifetime') {
    return updateLicense(id, { expiresAt: null, status: 'active' });
  }

  const lic = getLicenseById(id);
  if (!lic) return null;

  const baseDate = lic.expiresAt && new Date(lic.expiresAt) > new Date()
    ? new Date(lic.expiresAt)
    : new Date();

  baseDate.setDate(baseDate.getDate() + daysOrLifetime);
  const newExpiry = baseDate.toISOString().split('T')[0];

  return updateLicense(id, { expiresAt: newExpiry, status: 'active' });
}

// Compute License Stats
export function getLicenseStats(): SchoolLicenseStats {
  const lics = loadLicenses();
  const now = new Date();

  return {
    total: lics.length,
    active: lics.filter(l => l.status === 'active' && (!l.expiresAt || new Date(l.expiresAt) >= now)).length,
    inactive: lics.filter(l => l.status === 'inactive').length,
    revoked: lics.filter(l => l.status === 'revoked').length,
    expired: lics.filter(l => l.status === 'expired' || (l.expiresAt && new Date(l.expiresAt) < now)).length,
    plans: {
      Basic: lics.filter(l => l.plan === 'Basic').length,
      Pro: lics.filter(l => l.plan === 'Pro').length,
      Enterprise: lics.filter(l => l.plan === 'Enterprise').length,
    }
  };
}

// Client API: Activate License (Called by desktop SchoolMIS app on PC setup)
export function activateSchoolLicense(params: {
  licenseKey: string;
  machineId: string;
  schoolName?: string;
  appVersion?: string;
  ip?: string;
}): { ok: boolean; error?: string; schoolName?: string; plan?: string; expiresAt?: string | null; features?: string[]; message?: string } {
  const { licenseKey, machineId, schoolName, appVersion, ip } = params;
  if (!licenseKey || !machineId) {
    return { ok: false, error: 'Missing license key or machine ID' };
  }

  const licenses = loadLicenses();
  const cleanKey = licenseKey.toUpperCase().trim();
  const lic = licenses.find(l => l.key.toUpperCase().trim() === cleanKey);

  if (!lic) {
    return { ok: false, error: 'Invalid license key. Contact Digital Simple Solution administration.' };
  }

  if (!lic.activityLog) lic.activityLog = [];
  const clientIp = ip || 'School Client PC';

  if (lic.status === 'revoked') {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Activation Blocked',
      machineId,
      ip: clientIp,
      details: 'Attempted activation of revoked license'
    });
    saveLicenses(licenses);
    return { ok: false, error: 'This school license has been revoked or suspended. Contact administrator.' };
  }

  if (lic.status === 'expired' || (lic.expiresAt && new Date(lic.expiresAt) < new Date())) {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Activation Blocked',
      machineId,
      ip: clientIp,
      details: 'Attempted activation of expired license'
    });
    saveLicenses(licenses);
    return { ok: false, error: 'License has expired. Please renew your subscription.' };
  }

  lic.activationCount = (lic.activationCount || 0) + 1;

  // Bind to machine ID on first activation
  if (!lic.machineId) {
    lic.machineId = machineId;
    lic.schoolName = schoolName || lic.schoolName;
    lic.activatedAt = new Date().toISOString();
    lic.status = 'active';
    lic.appVersion = appVersion;
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'First Activation',
      machineId,
      ip: clientIp,
      details: `First activation bound to PC by ${schoolName || lic.schoolName}`
    });
  } else if (lic.machineId !== machineId) {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Activation Blocked',
      machineId,
      ip: clientIp,
      details: `Blocked: Machine mismatch. Attempted: ${machineId}, Registered: ${lic.machineId}`
    });
    saveLicenses(licenses);
    return {
      ok: false,
      error: 'License is registered to a different computer. If you have changed computers, ask administrator to reset machine lock.'
    };
  } else {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Re-Activation',
      machineId,
      ip: clientIp,
      details: 'Re-activated on registered PC'
    });
  }

  lic.lastSeen = new Date().toISOString();
  lic.pings = (lic.pings || 0) + 1;
  if (lic.activityLog.length > 100) lic.activityLog.length = 100;

  saveLicenses(licenses);

  return {
    ok: true,
    schoolName: lic.schoolName,
    plan: lic.plan,
    expiresAt: lic.expiresAt,
    features: lic.features || [],
    message: 'License validated successfully.'
  };
}

// Client API: Ping Heartbeat (Called by desktop SchoolMIS app periodically & on login)
export function pingSchoolLicense(params: {
  licenseKey: string;
  machineId: string;
  ip?: string;
}): { ok: boolean; error?: string; status?: LicenseStatus; expiresAt?: string | null; plan?: string; features?: string[] } {
  const { licenseKey, machineId, ip } = params;
  const licenses = loadLicenses();
  const cleanKey = licenseKey.toUpperCase().trim();
  const lic = licenses.find(l => l.key.toUpperCase().trim() === cleanKey && l.machineId === machineId);

  if (!lic) {
    return { ok: false, error: 'License or machine binding not found.' };
  }

  if (!lic.activityLog) lic.activityLog = [];
  const clientIp = ip || 'School Client PC';

  if (lic.status === 'revoked') {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Ping Rejected',
      machineId,
      ip: clientIp,
      details: 'License has been revoked'
    });
    saveLicenses(licenses);
    return { ok: false, error: 'License revoked.' };
  }

  if (lic.expiresAt && new Date(lic.expiresAt) < new Date()) {
    lic.status = 'expired';
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Ping Expired',
      machineId,
      ip: clientIp,
      details: 'License has expired'
    });
    saveLicenses(licenses);
    return { ok: false, error: 'License expired.' };
  }

  lic.lastSeen = new Date().toISOString();
  lic.pings = (lic.pings || 0) + 1;
  lic.activityLog.unshift({
    timestamp: new Date().toISOString(),
    type: 'Login / Active Ping',
    machineId,
    ip: clientIp,
    details: 'App login / active heartbeat'
  });
  if (lic.activityLog.length > 100) lic.activityLog.length = 100;

  saveLicenses(licenses);

  return {
    ok: true,
    status: lic.status,
    expiresAt: lic.expiresAt,
    plan: lic.plan,
    features: lic.features || []
  };
}

// OTA Updates Config
export function getUpdatesConfig(clientVersion = '1.0.0'): {
  ok: boolean;
  hasUpdate: boolean;
  clientVersion: string;
  latestVersion: string;
  mandatory: boolean;
  releaseDate: string;
  changelog: string;
  fileSize?: number;
  sha256?: string;
  downloadUrl?: string;
} {
  const cfg = DEFAULT_OTA_CONFIG;
  const hasUpdate = compareVersions(cfg.latestVersion, clientVersion) > 0;

  return {
    ok: true,
    hasUpdate,
    clientVersion,
    latestVersion: cfg.latestVersion,
    mandatory: cfg.mandatory,
    releaseDate: cfg.releaseDate,
    changelog: cfg.changelog,
    fileSize: cfg.fileSize,
    sha256: cfg.sha256,
    downloadUrl: cfg.downloadUrl
  };
}

function compareVersions(v1: string, v2: string): number {
  const p1 = (v1 || '0.0.0').replace(/[^0-9.]/g, '').split('.').map(Number);
  const p2 = (v2 || '0.0.0').replace(/[^0-9.]/g, '').split('.').map(Number);
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const n1 = p1[i] || 0;
    const n2 = p2[i] || 0;
    if (n1 > n2) return 1;
    if (n1 < n2) return -1;
  }
  return 0;
}

// Check Railway deployment status
export async function checkRailwayServerStatus(): Promise<{ online: boolean; url: string; latencyMs: number; details?: any }> {
  const start = Date.now();
  try {
    const res = await fetch(`${RAILWAY_SERVER_URL}/health`, {
      method: 'GET',
      headers: { 'User-Agent': 'DigitalSimpleSolution-Admin/1.0' },
      cache: 'no-store',
    });
    const latencyMs = Date.now() - start;
    if (res.ok) {
      const data = await res.json();
      return { online: true, url: RAILWAY_SERVER_URL, latencyMs, details: data };
    }
    return { online: false, url: RAILWAY_SERVER_URL, latencyMs };
  } catch (e: any) {
    return { online: false, url: RAILWAY_SERVER_URL, latencyMs: Date.now() - start };
  }
}
