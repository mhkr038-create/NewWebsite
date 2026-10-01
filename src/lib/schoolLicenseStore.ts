import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import os from 'os';
import nodemailer from 'nodemailer';
import { 
  SchoolLicense, 
  SchoolLicenseStats, 
  SchoolLicenseActivity, 
  LicensePlan, 
  LicenseStatus,
  OTAUpdateConfig,
  PasswordResetCodeRecord 
} from '../types/schoolLicense';

const RAILWAY_SERVER_URL = process.env.RAILWAY_LICENSE_SERVER_URL || 'https://schoolmis-license-server-production.up.railway.app';

// Seed benchmark licenses with credentials and recovery emails
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
    contactPhone: '+91 85006 99708',
    contactEmail: 'mhkr038@gmail.com',
    username: 'Administrator',
    password: 'admin123',
    recoveryEmail: 'mhkr038@gmail.com',
    createdAt: '2026-09-07T02:15:13.322Z',
    activatedAt: '2026-09-07T02:20:08.835Z',
    machineId: '87ed923b940bba8a436790c552e8225e',
    lastSeen: new Date().toISOString(),
    activationCount: 1,
    pings: 14,
    appVersion: '1.3.0',
    lastCredentialSync: '2026-10-01T14:24:21.381Z',
    credentialSource: 'realtime_pc',
    localUsersCount: 2,
    localUsers: [
      { username: 'HEMANTH', role: 'Teacher' },
      { username: 'Administrator', role: 'Administrator' }
    ],
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
        details: 'Generated Enterprise license for Rainbow English Medium Primary School with username admin'
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

// Global memory cache
declare global {
  // eslint-disable-next-line no-var
  var __dss_school_licenses: SchoolLicense[] | undefined;
  // eslint-disable-next-line no-var
  var __dss_school_reset_codes: Record<string, PasswordResetCodeRecord> | undefined;
}

if (!global.__dss_school_reset_codes) {
  global.__dss_school_reset_codes = {};
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
        // Ensure legacy licenses have username/password defaults and realtime fields
        const migrated = data.licenses.map((lic: any) => ({
          ...lic,
          username: lic.username || 'admin',
          password: lic.password || 'admin123',
          recoveryEmail: lic.recoveryEmail || lic.contactEmail || 'mhkr038@gmail.com',
          lastCredentialSync: lic.lastCredentialSync || null,
          credentialSource: lic.credentialSource || (lic.machineId ? 'realtime_pc' : 'initial_default'),
          localUsersCount: lic.localUsersCount || (Array.isArray(lic.localUsers) ? lic.localUsers.length : undefined),
          localUsers: lic.localUsers || undefined,
        }));
        global.__dss_school_licenses = migrated;
        return migrated;
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

// Find license by key OR username OR recovery email
export function findLicenseByLookup(identifier: string): SchoolLicense | undefined {
  const clean = identifier.trim().toLowerCase();
  const cleanKey = identifier.trim().toUpperCase();
  return loadLicenses().find(l => 
    l.key.toUpperCase() === cleanKey || 
    l.username.toLowerCase() === clean || 
    (l.recoveryEmail && l.recoveryEmail.toLowerCase() === clean) ||
    l.schoolName.toLowerCase().includes(clean)
  );
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
  username?: string;
  password?: string;
  recoveryEmail?: string;
  customKey?: string;
  ip?: string;
}): SchoolLicense {
  const licenses = loadLicenses();
  const plan = params.plan || 'Basic';
  const username = (params.username && params.username.trim()) || 'admin';
  const password = (params.password && params.password.trim()) || 'admin123';
  const recoveryEmail = (params.recoveryEmail && params.recoveryEmail.trim().toLowerCase()) || 
                        (params.contactEmail && params.contactEmail.trim().toLowerCase()) || 
                        '';

  const newLic: SchoolLicense = {
    id: crypto.randomUUID(),
    key: params.customKey ? params.customKey.toUpperCase().trim() : genLicenseKey(),
    schoolName: params.schoolName.trim() || 'Unnamed School',
    plan,
    status: 'inactive',
    features: params.features || ['student_management', 'attendance', 'fees'],
    expiresAt: params.expiresAt || null,
    notes: params.notes || '',
    contactPhone: params.contactPhone || '',
    contactEmail: params.contactEmail || '',
    username,
    password,
    recoveryEmail,
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
        details: `Generated ${plan} license with username: ${username}`
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

  // Password or Username change
  if (updates.password || updates.username) {
    if (!updates.lastCredentialSync) {
      updates.lastCredentialSync = new Date().toISOString();
    }
    if (!updates.credentialSource) {
      updates.credentialSource = 'admin_portal';
    }
  }

  if (updates.password && updates.password !== lic.password) {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Password Updated',
      machineId: lic.machineId,
      ip,
      details: `Login password updated by ${ip}`
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

// Helper to send email via nodemailer
async function dispatchEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER || 'mhkr038@gmail.com';
  // Use environment variable, falling back to verified Google App Password
  const gmailPass = process.env.GMAIL_APP_PASSWORD || 'huhfqqqrsjfnwrev';

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    });
    await transporter.sendMail({
      from: `"SchoolMIS Security & Licensing" <${gmailUser}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log(`[LIVE EMAIL SENT TO ${to}]: Subject: ${subject}`);
    return true;
  } catch (e: any) {
    console.error('[EMAIL ERROR] Failed sending live Gmail:', e?.message || e);
    return false;
  }
}

// Mask email for security display (e.g. r***l@gmail.com)
function maskEmail(email: string): string {
  try {
    const [user, domain] = email.split('@');
    if (!domain) return email;
    const maskedUser = user.length <= 2 ? user[0] + '***' : user[0] + '***' + user[user.length - 1];
    return `${maskedUser}@${domain}`;
  } catch {
    return email;
  }
}

// ── FORGOT PASSWORD / EMAIL RECOVERY ENGINE ────────────────────────────

// Step 1: Request Password Reset Code
export async function requestPasswordResetCode(params: {
  licenseKey?: string;
  email: string;
  ip?: string;
}): Promise<{ ok: boolean; error?: string; message?: string; maskedEmail?: string }> {
  const { licenseKey, email, ip } = params;
  if (!email || !email.includes('@')) {
    return { ok: false, error: 'Please enter a valid recovery Gmail address.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const licenses = loadLicenses();

  // Find matching license
  let lic: SchoolLicense | undefined;
  if (licenseKey && licenseKey.trim()) {
    const cleanKey = licenseKey.toUpperCase().trim();
    lic = licenses.find(l => l.key.toUpperCase().trim() === cleanKey);
    if (!lic) {
      lic = findLicenseByLookup(cleanKey);
    }
    if (!lic) {
      return { ok: false, error: 'Invalid license key. Check your SchoolMIS license.' };
    }
    // Check if entered email matches recoveryEmail OR contactEmail
    const recMatches = lic.recoveryEmail && lic.recoveryEmail.trim().toLowerCase() === cleanEmail;
    const conMatches = lic.contactEmail && lic.contactEmail.trim().toLowerCase() === cleanEmail;
    if (!recMatches && !conMatches) {
      const regHint = lic.recoveryEmail || lic.contactEmail;
      return { 
        ok: false, 
        error: `The entered Gmail (${cleanEmail}) does not match the registered recovery email for ${lic.schoolName}.${regHint ? ` Registered recovery email on file is: ${maskEmail(regHint)}.` : ' No recovery email registered yet. Please set it in Admin portal.'} (Support: +91 85006 99708)` 
      };
    }
  } else {
    // Lookup by recovery email or contact email directly
    lic = licenses.find(l => 
      (l.recoveryEmail && l.recoveryEmail.trim().toLowerCase() === cleanEmail) ||
      (l.contactEmail && l.contactEmail.trim().toLowerCase() === cleanEmail)
    );
    if (!lic) {
      return { 
        ok: false, 
        error: `No registered SchoolMIS license found matching "${cleanEmail}". Please check your email or contact administrator (+91 85006 99708).` 
      };
    }
  }

  // Generate 6-digit OTP code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  if (!global.__dss_school_reset_codes) {
    global.__dss_school_reset_codes = {};
  }
  const resetRecord: PasswordResetCodeRecord = {
    code,
    licenseId: lic.id,
    email: cleanEmail,
    expiresAt,
  };
  global.__dss_school_reset_codes[cleanEmail] = resetRecord;
  lic.activeResetCode = resetRecord;

  // Dispatch email to school's Gmail
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #ffffff; padding: 36px 20px; text-align: center;">
      <div style="max-width: 520px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 32px; text-align: left;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 36px;">🏫</div>
          <h2 style="color: #38bdf8; margin: 8px 0 4px;">SchoolMIS Password Recovery</h2>
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">${lic.schoolName}</p>
        </div>
        
        <p style="color: #e5e7eb; font-size: 14px; line-height: 1.6;">
          You requested a password reset for your SchoolMIS desktop installation.
        </p>

        <p style="color: #9ca3af; font-size: 13px;">
          Enter the 6-digit security code below in your software:
        </p>
        
        <div style="background-color: #030712; border: 2px dashed #0284c7; border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #38bdf8; font-family: monospace;">
          ${code}
        </div>

        <div style="background-color: #1f2937; border-radius: 10px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #d1d5db;">
          <div><strong>Username:</strong> <code style="color: #38bdf8;">${lic.username}</code></div>
          <div style="margin-top: 4px;"><strong>License Key:</strong> <code style="color: #38bdf8;">${lic.key}</code></div>
        </div>

        <p style="color: #6b7280; font-size: 11px; margin-bottom: 0;">
          This code expires in <strong>10 minutes</strong>. If you did not request this, your administrator may have sent it, or you can contact Digital Simple Solution (+91 85006 99708).
        </p>
      </div>
    </div>
  `;

  const emailDispatched = await dispatchEmail(
    cleanEmail,
    `🔐 SchoolMIS Password Recovery Code: ${code} (${lic.schoolName})`,
    emailHtml
  );

  if (!emailDispatched) {
    return {
      ok: false,
      error: `Could not dispatch verification email to ${cleanEmail}. Please check that your email is valid or contact administrator (+91 85006 99708).`
    };
  }

  if (!lic.activityLog) lic.activityLog = [];
  lic.activityLog.unshift({
    timestamp: new Date().toISOString(),
    type: 'Recovery Code Dispatched',
    machineId: lic.machineId,
    ip: ip || 'Self-Service Desktop App',
    details: `Password reset verification code sent to Gmail: ${maskEmail(cleanEmail)}`
  });
  saveLicenses(licenses);

  return {
    ok: true,
    message: `A 6-digit verification code has been dispatched to your Gmail (${maskEmail(cleanEmail)}). Check your inbox or spam folder.`,
    maskedEmail: maskEmail(cleanEmail),
  };
}

// Step 2: Verify Code and Reset Password
export function verifyPasswordResetCode(params: {
  email: string;
  code: string;
  newPassword?: string;
  ip?: string;
}): { ok: boolean; error?: string; message?: string; username?: string; currentPassword?: string } {
  const { email, code, newPassword, ip } = params;
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = code.trim();

  let record = global.__dss_school_reset_codes?.[cleanEmail];
  let lic = record ? getLicenseById(record.licenseId) : undefined;

  if (!record || !lic) {
    const licenses = loadLicenses();
    lic = licenses.find(l => 
      l.activeResetCode && 
      (l.activeResetCode.email === cleanEmail || 
       (l.recoveryEmail && l.recoveryEmail.trim().toLowerCase() === cleanEmail) ||
       (l.contactEmail && l.contactEmail.trim().toLowerCase() === cleanEmail))
    );
    if (lic && lic.activeResetCode) {
      record = lic.activeResetCode;
    }
  }

  if (!record || !lic) {
    return { ok: false, error: 'No active recovery code found for this email. Please request a new code.' };
  }

  if (Date.now() > record.expiresAt) {
    if (global.__dss_school_reset_codes) {
      delete global.__dss_school_reset_codes[cleanEmail];
    }
    delete lic.activeResetCode;
    saveLicenses(loadLicenses());
    return { ok: false, error: 'Recovery verification code has expired. Please request a new code.' };
  }

  if (record.code !== cleanCode) {
    return { ok: false, error: 'Incorrect 6-digit verification code. Please check your Gmail and try again.' };
  }

  // Update password if newPassword provided
  if (newPassword && newPassword.trim().length >= 4) {
    updateLicense(lic.id, { 
      password: newPassword.trim(),
      credentialSource: 'otp_reset',
      lastCredentialSync: new Date().toISOString()
    }, ip || 'Self-Service Gmail OTP');
  }

  // Clear code
  delete lic.activeResetCode;
  saveLicenses(loadLicenses());
  if (global.__dss_school_reset_codes) {
    delete global.__dss_school_reset_codes[cleanEmail];
  }

  return {
    ok: true,
    message: 'Identity verified successfully! Password updated.',
    username: lic.username,
    currentPassword: newPassword ? newPassword.trim() : lic.password,
  };
}

// Admin: Send Credentials directly to School's Gmail
export async function sendCredentialsToSchoolEmail(id: string): Promise<{ ok: boolean; error?: string; message?: string }> {
  const lic = getLicenseById(id);
  if (!lic) return { ok: false, error: 'License not found.' };

  const targetEmail = lic.recoveryEmail || lic.contactEmail;
  if (!targetEmail || !targetEmail.includes('@')) {
    return { ok: false, error: `No valid recovery Gmail address configured for "${lic.schoolName}". Please set a recovery email first.` };
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #ffffff; padding: 36px 20px; text-align: center;">
      <div style="max-width: 520px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 32px; text-align: left;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 36px;">🏫</div>
          <h2 style="color: #38bdf8; margin: 8px 0 4px;">SchoolMIS Desktop Login Credentials</h2>
          <p style="color: #9ca3af; font-size: 13px; margin: 0;">${lic.schoolName}</p>
        </div>
        
        <p style="color: #e5e7eb; font-size: 14px; line-height: 1.6;">
          Hello! Here are your official administrator credentials and software license key for your SchoolMIS Windows installation:
        </p>

        <div style="background-color: #030712; border: 1px solid #1e293b; border-radius: 14px; padding: 20px; margin: 20px 0; font-family: monospace; font-size: 13px;">
          <div style="margin-bottom: 12px; color: #9ca3af;">
            <span style="display: inline-block; width: 130px; color: #64748b;">License Key:</span>
            <strong style="color: #38bdf8; letter-spacing: 1px;">${lic.key}</strong>
          </div>
          <div style="margin-bottom: 12px; color: #9ca3af;">
            <span style="display: inline-block; width: 130px; color: #64748b;">Username:</span>
            <strong style="color: #22c55e;">${lic.username}</strong>
          </div>
          <div style="margin-bottom: 12px; color: #9ca3af;">
            <span style="display: inline-block; width: 130px; color: #64748b;">Password:</span>
            <strong style="color: #f59e0b;">${lic.password}</strong>
          </div>
          <div style="color: #9ca3af;">
            <span style="display: inline-block; width: 130px; color: #64748b;">Edition:</span>
            <span style="color: #e2e8f0;">${lic.plan} Edition</span>
          </div>
        </div>

        <div style="background-color: #1e3a5f; border-left: 4px solid #38bdf8; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #bfdbfe; margin-bottom: 24px;">
          <strong>Quick Setup:</strong> Open SchoolMIS on your Windows computer, enter this License Key on the Activate tab, then sign in with your username and password above.
        </div>

        <p style="color: #6b7280; font-size: 11px; margin-bottom: 0; text-align: center;">
          Sent by Digital Simple Solution Administration. For support, call or WhatsApp +91 85006 99708.
        </p>
      </div>
    </div>
  `;

  const ok = await dispatchEmail(
    targetEmail,
    `🏫 Your SchoolMIS Login Credentials & License Key (${lic.schoolName})`,
    emailHtml
  );

  if (!lic.activityLog) lic.activityLog = [];
  lic.activityLog.unshift({
    timestamp: new Date().toISOString(),
    type: 'Credentials Dispatched',
    machineId: lic.machineId,
    ip: 'Admin Portal',
    details: `Login credentials sent to registered Gmail: ${targetEmail}`
  });
  saveLicenses(loadLicenses());

  if (!ok) {
    return {
      ok: false,
      error: `Failed delivering credentials email to ${targetEmail}. Please check that the email address is valid.`
    };
  }

  return {
    ok: true,
    message: `Credentials sent successfully to ${targetEmail}! Check inbox or spam folder.`
  };
}

// Client API: Activate License (Called by desktop SchoolMIS app on PC setup)
export function activateSchoolLicense(params: {
  licenseKey: string;
  machineId: string;
  schoolName?: string;
  appVersion?: string;
  ip?: string;
}): { 
  ok: boolean; 
  error?: string; 
  schoolName?: string; 
  plan?: string; 
  expiresAt?: string | null; 
  features?: string[]; 
  message?: string;
  username?: string;
  defaultPassword?: string;
  recoveryEmail?: string;
} {
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
    username: lic.username || 'admin',
    defaultPassword: lic.password || 'admin123',
    recoveryEmail: lic.recoveryEmail || lic.contactEmail || '',
    message: 'License validated successfully.'
  };
}

// Client API: Ping Heartbeat & Real-time Telemetry (Called by desktop SchoolMIS app periodically & on login)
export function pingSchoolLicense(params: {
  licenseKey: string;
  machineId: string;
  ip?: string;
  currentUsername?: string;
  currentPassword?: string;
  recoveryEmail?: string;
  usersCount?: number;
  usersList?: { username: string; role: string }[];
  appVersion?: string;
}): { 
  ok: boolean; 
  error?: string; 
  status?: LicenseStatus; 
  expiresAt?: string | null; 
  plan?: string; 
  features?: string[]; 
  username?: string;
  currentPassword?: string;
  recoveryEmail?: string;
  lastCredentialSync?: string | null;
  credentialSource?: string;
  localUsersCount?: number;
} {
  const { 
    licenseKey, 
    machineId, 
    ip, 
    currentUsername, 
    currentPassword, 
    recoveryEmail, 
    usersCount, 
    usersList, 
    appVersion 
  } = params;
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
  if (appVersion) lic.appVersion = appVersion;
  if (usersCount !== undefined) lic.localUsersCount = usersCount;
  if (usersList && Array.isArray(usersList)) lic.localUsers = usersList;

  // Real-time Credential Synchronization from School PC
  let credentialsUpdatedLive = false;
  if (currentPassword && currentPassword.trim().length >= 4) {
    if (lic.password !== currentPassword.trim()) {
      lic.password = currentPassword.trim();
      credentialsUpdatedLive = true;
    }
  }

  if (currentUsername && currentUsername.trim()) {
    if (lic.username !== currentUsername.trim()) {
      lic.username = currentUsername.trim();
      credentialsUpdatedLive = true;
    }
  }

  if (recoveryEmail && recoveryEmail.includes('@') && !lic.recoveryEmail) {
    lic.recoveryEmail = recoveryEmail.trim();
  }

  if (credentialsUpdatedLive || currentPassword) {
    lic.lastCredentialSync = new Date().toISOString();
    lic.credentialSource = 'realtime_pc';
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Real-time PC Sync',
      machineId,
      ip: clientIp,
      details: `Credentials verified live from School PC (User: ${lic.username})`
    });
  } else {
    lic.activityLog.unshift({
      timestamp: new Date().toISOString(),
      type: 'Login / Active Ping',
      machineId,
      ip: clientIp,
      details: `App login / active heartbeat (${lic.username || 'admin'})`
    });
  }

  if (lic.activityLog.length > 100) lic.activityLog.length = 100;
  saveLicenses(licenses);

  return {
    ok: true,
    status: lic.status,
    expiresAt: lic.expiresAt,
    plan: lic.plan,
    features: lic.features || [],
    username: lic.username,
    currentPassword: lic.password,
    recoveryEmail: lic.recoveryEmail,
    lastCredentialSync: lic.lastCredentialSync,
    credentialSource: lic.credentialSource,
    localUsersCount: lic.localUsersCount
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
