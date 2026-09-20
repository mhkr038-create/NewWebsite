import fs from 'fs';
import path from 'path';
import os from 'os';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type ClickCategory = 'cta' | 'whatsapp' | 'demo' | 'navigation' | 'form_submit' | 'phone' | 'link' | 'button';

export interface DailyVisitorStat {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "Sep 14"
  uniqueVisitors: number;
  totalPageViews: number;
  devices: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  topLocations: { location: string; visitors: number; countryCode: string }[];
  topPages: { path: string; views: number }[];
  visitorIds?: string[];
}

export interface TrackedClick {
  id: string;
  timestamp: string;
  date: string;
  timeFormatted: string;
  elementText: string;
  elementType: ClickCategory;
  pagePath: string;
  targetUrl?: string;
  section?: string;
  device: DeviceType;
  location: string;
  visitorId: string;
}

export interface TrackedVisitorSession {
  id: string;
  visitorId: string;
  timestamp: string; // Full ISO timestamp (e.g. 2026-09-20T03:45:12.345Z)
  date: string; // YYYY-MM-DD
  timeFormatted: string; // e.g. "9:15 AM"
  timeWithSeconds: string; // e.g. "09:15:32 AM"
  dateTimeFormatted: string; // e.g. "Sep 20, 2026 • 9:15 AM"
  hour: number; // 0 - 23
  path: string;
  pageTitle: string;
  device: DeviceType;
  location: string;
  referrer: string;
  userAgent?: string;
  isNewToday: boolean;
}

export interface ServerAnalyticsState {
  dailyStats: Record<string, DailyVisitorStat>;
  clicks: TrackedClick[];
  allVisitorIds: string[];
  visitorSessions: TrackedVisitorSession[];
}

const INITIAL_STATE: ServerAnalyticsState = {
  dailyStats: {},
  clicks: [],
  allVisitorIds: [],
  visitorSessions: [],
};

// Global memory cache across warm serverless requests
declare global {
  // eslint-disable-next-line no-var
  var __dss_server_analytics_state: ServerAnalyticsState | undefined;
}

function getLocalFilePath(): string {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, 'analytics_store.json');
  } catch {
    return path.join(os.tmpdir(), 'dss_analytics_store.json');
  }
}

function getFallbackFilePath(): string {
  return path.join(os.tmpdir(), 'dss_analytics_store.json');
}

// Optional Upstash / Vercel KV REST Integration (Zero-dependency)
async function tryCloudKvGet(): Promise<ServerAnalyticsState | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/dss_analytics_state`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
    }
  } catch (e) {
    console.warn('Cloud KV get failed, falling back to local/tmp', e);
  }
  return null;
}

async function tryCloudKvSet(state: ServerAnalyticsState): Promise<void> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) return;

  try {
    await fetch(`${url}/set/dss_analytics_state`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.stringify(state)),
    });
  } catch (e) {
    console.warn('Cloud KV set failed', e);
  }
}

// Load state from Cloud KV -> Memory -> Filesystem -> Tmp
export async function loadServerAnalytics(): Promise<ServerAnalyticsState> {
  // 1. Check Cloud KV first if credentials exist
  const cloudState = await tryCloudKvGet();
  if (cloudState) {
    global.__dss_server_analytics_state = cloudState;
    return cloudState;
  }

  // 2. Check Memory cache
  if (global.__dss_server_analytics_state) {
    return global.__dss_server_analytics_state;
  }

  // 3. Check persistent file in /data
  const primaryPath = getLocalFilePath();
  try {
    if (fs.existsSync(primaryPath)) {
      const raw = fs.readFileSync(primaryPath, 'utf-8');
      const parsed = JSON.parse(raw);
      global.__dss_server_analytics_state = parsed;
      return parsed;
    }
  } catch {
    // Fallback to /tmp
  }

  // 4. Check tmp file
  const tmpPath = getFallbackFilePath();
  try {
    if (fs.existsSync(tmpPath)) {
      const raw = fs.readFileSync(tmpPath, 'utf-8');
      const parsed = JSON.parse(raw);
      global.__dss_server_analytics_state = parsed;
      return parsed;
    }
  } catch {}

  const fresh = JSON.parse(JSON.stringify(INITIAL_STATE));
  global.__dss_server_analytics_state = fresh;
  return fresh;
}

// Save state to Memory -> Filesystem / Tmp -> Cloud KV
export async function saveServerAnalytics(state: ServerAnalyticsState): Promise<void> {
  global.__dss_server_analytics_state = state;

  const jsonStr = JSON.stringify(state);

  // Try saving to data directory
  let savedToFile = false;
  try {
    const primaryPath = getLocalFilePath();
    fs.writeFileSync(primaryPath, jsonStr, 'utf-8');
    savedToFile = true;
  } catch {
    // Write-protected or read-only filesystem (e.g. Vercel)
  }

  // If local /data wasn't writable, write to /tmp
  if (!savedToFile) {
    try {
      const tmpPath = getFallbackFilePath();
      fs.writeFileSync(tmpPath, jsonStr, 'utf-8');
    } catch (e) {
      console.warn('Failed to save to /tmp', e);
    }
  }

  // Sync to Cloud KV in background if configured
  await tryCloudKvSet(state);
}

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function getFormattedDate(d = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getPageTitle(path: string): string {
  if (path === '/') return 'Home Page';
  if (path === '/free-school-management-software') return 'Free School Software';
  if (path === '/services') return 'Services Overview';
  if (path === '/solutions') return 'Solutions Hub';
  if (path === '/demos') return 'Live Demos';
  if (path === '/digital-products') return 'Digital Products';
  if (path === '/intake-form') return 'Intake Form';
  if (path === '/blog') return 'Growth Blog';
  if (path === '/contact') return 'Contact Page';
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').replace(/-/g, ' ');
    return `Blog: ${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
  }
  if (path.startsWith('/solutions/')) {
    const ind = path.replace('/solutions/', '').replace(/-/g, ' ');
    return `Solution: ${ind.charAt(0).toUpperCase() + ind.slice(1)}`;
  }
  if (path.startsWith('/demo/')) {
    const d = path.replace('/demo/', '').replace(/-/g, ' ');
    return `Demo: ${d.charAt(0).toUpperCase() + d.slice(1)}`;
  }
  return path.replace('/', '').replace(/-/g, ' ').toUpperCase();
}

// Server-side recording of page views
export async function recordServerPageView(params: {
  path: string;
  visitorId: string;
  device: DeviceType;
  location: string;
  referrer?: string;
  userAgent?: string;
}): Promise<TrackedVisitorSession | null> {
  if (params.path.startsWith('/admin')) return null;

  const state = await loadServerAnalytics();
  const todayKey = getTodayKey();

  if (!state.dailyStats) state.dailyStats = {};
  if (!state.allVisitorIds) state.allVisitorIds = [];
  if (!state.visitorSessions) state.visitorSessions = [];

  let dayStat = state.dailyStats[todayKey];
  if (!dayStat) {
    dayStat = {
      date: todayKey,
      formattedDate: getFormattedDate(),
      uniqueVisitors: 0,
      totalPageViews: 0,
      devices: { mobile: 0, tablet: 0, desktop: 0 },
      topLocations: [],
      topPages: [],
      visitorIds: [],
    };
    state.dailyStats[todayKey] = dayStat;
  }

  if (!dayStat.visitorIds) dayStat.visitorIds = [];
  if (!dayStat.devices) dayStat.devices = { mobile: 0, tablet: 0, desktop: 0 };
  if (!dayStat.topLocations) dayStat.topLocations = [];
  if (!dayStat.topPages) dayStat.topPages = [];

  // Increment total page views
  dayStat.totalPageViews += 1;

  const isNewToday = !dayStat.visitorIds.includes(params.visitorId);

  // Check unique visitor for today
  if (isNewToday) {
    dayStat.visitorIds.push(params.visitorId);
    dayStat.uniqueVisitors += 1;

    // Increment device count
    dayStat.devices[params.device] = (dayStat.devices[params.device] || 0) + 1;

    // Track location
    const locName = params.location || 'Online Visitor';
    const locItem = dayStat.topLocations.find((l) => l.location.toLowerCase() === locName.toLowerCase());
    if (locItem) {
      locItem.visitors += 1;
    } else {
      dayStat.topLocations.push({ location: locName, visitors: 1, countryCode: 'IN' });
    }
  }

  // Track overall unique visitor
  if (!state.allVisitorIds.includes(params.visitorId)) {
    state.allVisitorIds.push(params.visitorId);
  }

  // Track page path
  const pageItem = dayStat.topPages.find((p) => p.path === params.path);
  if (pageItem) {
    pageItem.views += 1;
  } else {
    dayStat.topPages.push({ path: params.path, views: 1 });
  }

  // Create date and time visitor session log
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const timeWithSeconds = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  const dateTimeFormatted = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${timeFormatted}`;

  const cleanTitle = getPageTitle(params.path);

  const session: TrackedVisitorSession = {
    id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    visitorId: params.visitorId,
    timestamp: now.toISOString(),
    date: todayKey,
    timeFormatted,
    timeWithSeconds,
    dateTimeFormatted,
    hour: now.getHours(),
    path: params.path,
    pageTitle: cleanTitle,
    device: params.device,
    location: params.location || 'Online Visitor',
    referrer: params.referrer || 'Direct / Bookmark',
    userAgent: params.userAgent,
    isNewToday,
  };

  // Prepend new visitor session log (keep latest 500)
  state.visitorSessions = [session, ...state.visitorSessions].slice(0, 500);

  await saveServerAnalytics(state);
  return session;
}

// Server-side recording of clicks
export async function recordServerClick(params: {
  elementText: string;
  elementType: ClickCategory;
  pagePath: string;
  targetUrl?: string;
  device: DeviceType;
  location: string;
  visitorId: string;
}): Promise<TrackedClick> {
  const state = await loadServerAnalytics();
  if (!state.clicks) state.clicks = [];

  const now = new Date();
  const newClick: TrackedClick = {
    id: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: now.toISOString(),
    date: now.toISOString().split('T')[0],
    timeFormatted: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    elementText: params.elementText || 'Clicked Element',
    elementType: params.elementType || 'button',
    pagePath: params.pagePath || '/',
    targetUrl: params.targetUrl,
    device: params.device || 'desktop',
    location: params.location || 'Online Visitor',
    visitorId: params.visitorId || 'usr-anon',
  };

  // Prepend recent click and keep up to 500
  state.clicks = [newClick, ...state.clicks].slice(0, 500);

  await saveServerAnalytics(state);
  return newClick;
}

// Compute full consolidated analytics response for Admin Portal
export async function getServerAnalyticsSummary() {
  const state = await loadServerAnalytics();
  const todayKey = getTodayKey();

  const dailyStatsList: DailyVisitorStat[] = Object.values(state.dailyStats || {}).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const today = state.dailyStats[todayKey] || {
    date: todayKey,
    formattedDate: getFormattedDate(),
    uniqueVisitors: 0,
    totalPageViews: 0,
    devices: { mobile: 0, tablet: 0, desktop: 0 },
    topLocations: [],
    topPages: [],
  };

  // Device Aggregation across all days
  const deviceTotals = { mobile: 0, tablet: 0, desktop: 0 };
  dailyStatsList.forEach((d) => {
    deviceTotals.mobile += d.devices?.mobile || 0;
    deviceTotals.tablet += d.devices?.tablet || 0;
    deviceTotals.desktop += d.devices?.desktop || 0;
  });

  const totalDeviceViews = deviceTotals.mobile + deviceTotals.tablet + deviceTotals.desktop || 1;
  const deviceSummary = {
    mobile: deviceTotals.mobile,
    tablet: deviceTotals.tablet,
    desktop: deviceTotals.desktop,
    mobilePct: Math.round((deviceTotals.mobile / totalDeviceViews) * 100),
    tabletPct: Math.round((deviceTotals.tablet / totalDeviceViews) * 100),
    desktopPct: Math.round((deviceTotals.desktop / totalDeviceViews) * 100),
  };

  // Location Aggregation
  const locationMap: Record<string, number> = {};
  dailyStatsList.forEach((d) => {
    (d.topLocations || []).forEach((l) => {
      locationMap[l.location] = (locationMap[l.location] || 0) + l.visitors;
    });
  });

  const totalLocationVisits = Object.values(locationMap).reduce((a, b) => a + b, 0) || 1;
  const topLocations = Object.entries(locationMap)
    .map(([location, count]) => ({
      location,
      visitors: count,
      percentage: Math.round((count / totalLocationVisits) * 100),
      flag: location.toLowerCase().includes('india') ? '🇮🇳' : '🌐',
    }))
    .sort((a, b) => b.visitors - a.visitors);

  // Top Pages Aggregation
  const pagesMap: Record<string, number> = {};
  dailyStatsList.forEach((d) => {
    (d.topPages || []).forEach((p) => {
      pagesMap[p.path] = (pagesMap[p.path] || 0) + p.views;
    });
  });

  const totalPageViewsSum = dailyStatsList.reduce((sum, d) => sum + (d.totalPageViews || 0), 0);
  const topPages = Object.entries(pagesMap)
    .map(([path, views]) => ({
      path,
      title: path === '/' ? 'Home • Growth Engine' : path.replace('/', '').replace(/-/g, ' ').toUpperCase(),
      views,
      percentage: totalPageViewsSum > 0 ? Math.round((views / totalPageViewsSum) * 100) : 0,
    }))
    .sort((a, b) => b.views - a.views);

  // Click Intelligence
  const clicks = state.clicks || [];
  const totalClicks = clicks.length;

  const elementClicksMap: Record<string, { count: number; category: ClickCategory; page: string; href?: string }> = {};
  const categoryClicksMap: Record<string, number> = {};
  const pageClicksMap: Record<string, number> = {};

  clicks.forEach((c) => {
    const key = `${c.elementText}:::${c.pagePath}`;
    if (!elementClicksMap[key]) {
      elementClicksMap[key] = { count: 0, category: c.elementType, page: c.pagePath, href: c.targetUrl };
    }
    elementClicksMap[key].count += 1;

    categoryClicksMap[c.elementType] = (categoryClicksMap[c.elementType] || 0) + 1;
    pageClicksMap[c.pagePath] = (pageClicksMap[c.pagePath] || 0) + 1;
  });

  const topClickedElements = Object.entries(elementClicksMap)
    .map(([key, data]) => ({
      elementText: key.split(':::')[0],
      category: data.category,
      pagePath: data.page,
      targetUrl: data.href,
      clicks: data.count,
      percentage: totalClicks > 0 ? Math.round((data.count / totalClicks) * 100) : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  const clicksByCategory = Object.entries(categoryClicksMap)
    .map(([cat, count]) => ({
      category: cat as ClickCategory,
      label: cat.toUpperCase(),
      clicks: count,
      percentage: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  const clicksByPage = Object.entries(pageClicksMap)
    .map(([page, count]) => ({
      path: page,
      clicks: count,
      percentage: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  const totalUniqueVisitors = state.allVisitorIds?.length || dailyStatsList.reduce((sum, d) => sum + (d.uniqueVisitors || 0), 0);
  const overallCtr = totalPageViewsSum > 0 ? Number(((totalClicks / totalPageViewsSum) * 100).toFixed(1)) : 0;

  // Compute 24-Hour Activity Distribution
  const hourlyDistribution = Array.from({ length: 24 }, (_, h) => {
    const hourLabel = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
    return {
      hour: h,
      label: hourLabel,
      todayCount: 0,
      totalCount: 0,
    };
  });

  const visitorSessions = state.visitorSessions || [];
  visitorSessions.forEach((s) => {
    if (s.hour >= 0 && s.hour < 24) {
      hourlyDistribution[s.hour].totalCount += 1;
      if (s.date === todayKey) {
        hourlyDistribution[s.hour].todayCount += 1;
      }
    }
  });

  // Calculate Peak Visiting Hour
  let maxHour = -1;
  let maxCount = 0;
  hourlyDistribution.forEach((hd) => {
    if (hd.totalCount > maxCount) {
      maxCount = hd.totalCount;
      maxHour = hd.hour;
    }
  });

  const peakVisitingHour = maxHour >= 0 && maxCount > 0
    ? `${hourlyDistribution[maxHour].label} - ${maxHour === 23 ? '12 AM' : hourlyDistribution[maxHour + 1].label}`
    : 'Waiting for traffic';

  const latestVisitorSession = visitorSessions[0] || null;

  return {
    today,
    dailyStats: dailyStatsList,
    deviceSummary,
    topLocations,
    topPages,
    clickSummary: {
      topClickedElements,
      clicksByCategory,
      clicksByPage,
      totalClicks,
      recentClicks: clicks,
    },
    visitorSessions,
    latestVisitorSession,
    hourlyDistribution,
    peakVisitingHour,
    totalUniqueVisitors,
    totalPageViews: totalPageViewsSum,
    overallCtr,
  };
}

// Clear all recorded telemetry back to 0
export async function clearServerAnalytics(): Promise<void> {
  const fresh = JSON.parse(JSON.stringify(INITIAL_STATE));
  await saveServerAnalytics(fresh);
}
