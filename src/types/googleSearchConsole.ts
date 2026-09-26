export interface GSCQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number; // e.g. 4.2%
  position: number; // e.g. 2.8
  isTargetKeyword?: boolean;
  trend?: 'up' | 'down' | 'stable';
  previousPosition?: number;
}

export interface GSCPageRow {
  page: string;
  title: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCDeviceRow {
  device: 'MOBILE' | 'DESKTOP' | 'TABLET';
  clicks: number;
  impressions: number;
  ctr: number;
  percentage: number;
}

export interface GSCCountryRow {
  country: string;
  countryCode: string;
  clicks: number;
  impressions: number;
  percentage: number;
}

export interface GSCDailyTrend {
  date: string;
  formattedDate: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCConfig {
  siteUrl: string;
  clientEmail?: string;
  privateKey?: string;
  apiKey?: string;
  targetKeywords: string[];
}

export interface GSCSummary {
  siteUrl: string;
  dateRange: '7d' | '28d' | '90d';
  totalClicks: number;
  totalImpressions: number;
  averageCtr: number;
  averagePosition: number;
  queries: GSCQueryRow[];
  pages: GSCPageRow[];
  devices: GSCDeviceRow[];
  countries: GSCCountryRow[];
  dailyTrends: GSCDailyTrend[];
  targetKeywords: GSCQueryRow[];
  isConnected: boolean;
  connectionType: 'service_account' | 'api_key' | 'live_telemetry' | 'ready_to_connect';
  lastSyncedAt: string;
  configuredEmail?: string;
}
