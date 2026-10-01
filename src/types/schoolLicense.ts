export type LicensePlan = 'Basic' | 'Pro' | 'Enterprise';
export type LicenseStatus = 'active' | 'inactive' | 'expired' | 'revoked';

export interface SchoolLicenseActivity {
  timestamp: string;
  type: string;
  machineId?: string | null;
  ip: string;
  details: string;
}

export interface SchoolLicense {
  id: string;
  key: string; // e.g. SMIS-XXXX-XXXX-XXXX-XXXX
  schoolName: string;
  plan: LicensePlan;
  status: LicenseStatus;
  features: string[];
  expiresAt: string | null; // YYYY-MM-DD or null for lifetime
  notes: string;
  contactPhone?: string;
  contactEmail?: string;
  username: string; // School login username (default: 'admin')
  password: string; // School login password (default: 'admin123')
  recoveryEmail?: string; // Registered Gmail for OTP password recovery
  activeResetCode?: PasswordResetCodeRecord;
  createdAt: string;
  activatedAt: string | null;
  machineId: string | null;
  lastSeen: string | null;
  activationCount: number;
  pings: number;
  appVersion?: string;
  lastCredentialSync?: string | null;
  credentialSource?: 'realtime_pc' | 'otp_reset' | 'admin_portal' | 'initial_default';
  localUsersCount?: number;
  localUsers?: { username: string; role: string }[];
  activityLog: SchoolLicenseActivity[];
}

export interface PasswordResetCodeRecord {
  code: string;
  licenseId: string;
  email: string;
  expiresAt: number;
}

export interface SchoolLicenseStats {
  total: number;
  active: number;
  inactive: number;
  expired: number;
  revoked: number;
  plans: {
    Basic: number;
    Pro: number;
    Enterprise: number;
  };
}

export interface OTAUpdateConfig {
  latestVersion: string;
  minRequiredVersion: string;
  releaseDate: string;
  mandatory: boolean;
  changelog: string;
  asarFile?: string;
  fileSize?: number;
  sha256?: string;
  downloadUrl?: string;
}
