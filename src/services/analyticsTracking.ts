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
}

export interface TrackedClick {
  id: string;
  timestamp: string; // ISO string
  date: string; // YYYY-MM-DD
  timeFormatted: string; // e.g. "1:15 PM"
  elementText: string;
  elementType: ClickCategory;
  pagePath: string;
  targetUrl?: string;
  section?: string;
  device: DeviceType;
  location: string;
  visitorId: string;
}

export interface ClickSummary {
  topClickedElements: {
    elementText: string;
    category: ClickCategory;
    pagePath: string;
    targetUrl?: string;
    clicks: number;
    percentage: number;
  }[];
  clicksByCategory: {
    category: ClickCategory;
    label: string;
    clicks: number;
    percentage: number;
  }[];
  clicksByPage: {
    path: string;
    clicks: number;
    percentage: number;
  }[];
  totalClicks: number;
  recentClicks: TrackedClick[];
}

export interface DeclaredDemographicLead {
  id: string;
  name: string;
  age?: number | string;
  city?: string;
  phone: string;
  email: string;
  source: string;
  requirement?: string;
  schoolName?: string;
  budget?: string;
  createdAt: string;
}

export interface TrackedVisitorSession {
  id: string;
  visitorId: string;
  timestamp: string; // ISO string
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

export interface HourlyStat {
  hour: number;
  label: string;
  todayCount: number;
  totalCount: number;
}

export interface VisitorAnalyticsData {
  today: DailyVisitorStat;
  dailyStats: DailyVisitorStat[];
  deviceSummary: {
    mobile: number;
    tablet: number;
    desktop: number;
    mobilePct: number;
    tabletPct: number;
    desktopPct: number;
  };
  topLocations: {
    location: string;
    visitors: number;
    percentage: number;
    flag: string;
  }[];
  topPages: {
    path: string;
    title: string;
    views: number;
    percentage: number;
  }[];
  declaredDemographics: {
    totalLeadsWithAge: number;
    averageAge: number | string;
    ageBrackets: { bracket: string; count: number; percentage: number }[];
    leads: DeclaredDemographicLead[];
  };
  clickSummary: ClickSummary;
  visitorSessions: TrackedVisitorSession[];
  latestVisitorSession: TrackedVisitorSession | null;
  hourlyDistribution: HourlyStat[];
  peakVisitingHour: string;
  totalUniqueVisitors: number;
  totalPageViews: number;
  overallCtr: number;
}

const STORAGE_KEYS = {
  DAILY_VISITORS: 'dss_analytics_daily_visitors_v2',
  VISITOR_SESSIONS: 'dss_analytics_visitor_sessions_v2',
  CLICKS: 'dss_analytics_clicks_v2',
  VISITOR_ID: 'dss_visitor_id',
  CACHED_LOCATION: 'dss_visitor_location',
  LAST_VISIT_DATE: 'dss_last_visit_date',
  V2_FLAG: 'dss_analytics_v2_real_only',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Clean previous mock data if present
function ensureCleanRealStorage() {
  if (!isBrowser()) return;
  try {
    if (localStorage.getItem(STORAGE_KEYS.V2_FLAG) !== 'true') {
      // Remove old mock storage keys
      localStorage.removeItem('dss_analytics_daily_visitors');
      localStorage.removeItem('dss_analytics_clicks');
      localStorage.setItem(STORAGE_KEYS.V2_FLAG, 'true');
    }
  } catch {}
}

// Generate an anonymous persistent visitor ID
export function getOrCreateVisitorId(): string {
  if (!isBrowser()) return 'anon-srv';
  try {
    let vid = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
    if (!vid) {
      vid = `usr-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, vid);
    }
    return vid;
  } catch {
    return 'usr-anon';
  }
}

function getISODate(d = new Date()): string {
  return d.toISOString().split('T')[0];
}

function getFormattedDay(d = new Date()): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Load real recorded daily stats
function loadRealDailyStats(): DailyVisitorStat[] {
  if (!isBrowser()) return [];
  ensureCleanRealStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_VISITORS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveRealDailyStats(data: DailyVisitorStat[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_VISITORS, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save daily stats', e);
  }
}

// Load real recorded clicks
function loadRealClicks(): TrackedClick[] {
  if (!isBrowser()) return [];
  ensureCleanRealStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLICKS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveRealClicks(data: TrackedClick[]) {
  if (!isBrowser()) return;
  try {
    const trimmed = data.slice(0, 300);
    localStorage.setItem(STORAGE_KEYS.CLICKS, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save clicks', e);
  }
}

// Load real recorded visitor sessions with Date and Time
function loadRealVisitorSessions(): TrackedVisitorSession[] {
  if (!isBrowser()) return [];
  ensureCleanRealStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VISITOR_SESSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveRealVisitorSessions(data: TrackedVisitorSession[]) {
  if (!isBrowser()) return;
  try {
    const trimmed = data.slice(0, 300);
    localStorage.setItem(STORAGE_KEYS.VISITOR_SESSIONS, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save visitor sessions', e);
  }
}

function getCleanPageTitle(path: string): string {
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

export const analyticsTracking = {
  // Record a REAL page visit
  recordPageView(
    path: string,
    referrer = '',
    device: DeviceType = 'desktop',
    location = 'Detected Visitor Location'
  ) {
    if (!isBrowser()) return;
    if (path.startsWith('/admin')) return; // Never count admin views

    ensureCleanRealStorage();

    const todayStr = getISODate();
    const stats = loadRealDailyStats();
    let todayStat = stats.find((s) => s.date === todayStr);

    const visitorId = getOrCreateVisitorId();
    const lastVisitKey = `${STORAGE_KEYS.LAST_VISIT_DATE}_${visitorId}`;
    const lastVisitDate = localStorage.getItem(lastVisitKey);
    const isNewToday = lastVisitDate !== todayStr;

    if (!todayStat) {
      todayStat = {
        date: todayStr,
        formattedDate: getFormattedDay(),
        uniqueVisitors: 1,
        totalPageViews: 1,
        devices: {
          mobile: device === 'mobile' ? 1 : 0,
          tablet: device === 'tablet' ? 1 : 0,
          desktop: device === 'desktop' ? 1 : 0,
        },
        topLocations: [{ location, visitors: 1, countryCode: 'REAL' }],
        topPages: [{ path, views: 1 }],
      };
      stats.push(todayStat);
    } else {
      todayStat.totalPageViews += 1;
      if (isNewToday) {
        todayStat.uniqueVisitors += 1;
        todayStat.devices[device] = (todayStat.devices[device] || 0) + 1;

        const locEntry = todayStat.topLocations.find((l) => l.location === location);
        if (locEntry) {
          locEntry.visitors += 1;
        } else {
          todayStat.topLocations.push({ location, visitors: 1, countryCode: 'REAL' });
        }
      }

      const pageEntry = todayStat.topPages.find((p) => p.path === path);
      if (pageEntry) {
        pageEntry.views += 1;
      } else {
        todayStat.topPages.push({ path, views: 1 });
      }
    }

    if (isNewToday) {
      localStorage.setItem(lastVisitKey, todayStr);
    }

    saveRealDailyStats(stats);

    // Record individual Visitor Session with exact Date and Time
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const timeWithSeconds = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
    const dateTimeFormatted = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${timeFormatted}`;

    const newSession: TrackedVisitorSession = {
      id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      visitorId,
      timestamp: now.toISOString(),
      date: todayStr,
      timeFormatted,
      timeWithSeconds,
      dateTimeFormatted,
      hour: now.getHours(),
      path,
      pageTitle: getCleanPageTitle(path),
      device,
      location,
      referrer: referrer || 'Direct / Bookmark',
      isNewToday,
    };

    const currentSessions = loadRealVisitorSessions();
    saveRealVisitorSessions([newSession, ...currentSessions]);

    // Dispatch to Server for Central Cross-Device Tracking (bypass adblockers via /api/traffic/track)
    if (isBrowser()) {
      const payload = JSON.stringify({
        type: 'pageview',
        path,
        device,
        location,
        visitorId,
        referrer,
      });

      try {
        fetch('/api/traffic/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {
          fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        });
      } catch {}
    }

    window.dispatchEvent(new CustomEvent('dss_analytics_updated', { detail: newSession }));
  },

  // Record a REAL click
  recordClick(data: {
    elementText: string;
    elementType?: ClickCategory;
    pagePath: string;
    targetUrl?: string;
    section?: string;
    device?: DeviceType;
    location?: string;
  }): TrackedClick {
    ensureCleanRealStorage();

    const currentClicks = loadRealClicks();
    const visitorId = getOrCreateVisitorId();
    const now = new Date();

    const cleanText = data.elementText.replace(/\s+/g, ' ').trim().slice(0, 60);

    const newClick: TrackedClick = {
      id: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: now.toISOString(),
      date: getISODate(now),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      elementText: cleanText || 'Interactive Element',
      elementType: data.elementType || 'cta',
      pagePath: data.pagePath,
      targetUrl: data.targetUrl,
      section: data.section || 'Page Content',
      device: data.device || 'mobile',
      location: data.location || 'Real Visitor',
      visitorId,
    };

    const updated = [newClick, ...currentClicks];
    saveRealClicks(updated);

    // Dispatch to Server for Central Cross-Device Tracking (bypass adblockers via /api/traffic/track)
    if (isBrowser()) {
      const payload = JSON.stringify({
        type: 'click',
        elementText: newClick.elementText,
        elementType: newClick.elementType,
        pagePath: newClick.pagePath,
        targetUrl: newClick.targetUrl,
        device: newClick.device,
        location: newClick.location,
        visitorId,
      });

      try {
        fetch('/api/traffic/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {
          fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        });
      } catch {}
    }

    if (isBrowser()) {
      window.dispatchEvent(new CustomEvent('dss_analytics_updated', { detail: newClick }));
    }

    return newClick;
  },

  // Get REAL visitor and click analytics for Admin Portal
  getVisitorAnalyticsData(): VisitorAnalyticsData {
    ensureCleanRealStorage();

    const dailyStats = loadRealDailyStats();
    const clicks = loadRealClicks();
    const todayStr = getISODate();

    let today = dailyStats.find((s) => s.date === todayStr);
    if (!today) {
      today = {
        date: todayStr,
        formattedDate: getFormattedDay(),
        uniqueVisitors: 0,
        totalPageViews: 0,
        devices: { mobile: 0, tablet: 0, desktop: 0 },
        topLocations: [],
        topPages: [],
      };
    }

    const totalMobile = dailyStats.reduce((sum, d) => sum + (d.devices.mobile || 0), 0);
    const totalTablet = dailyStats.reduce((sum, d) => sum + (d.devices.tablet || 0), 0);
    const totalDesktop = dailyStats.reduce((sum, d) => sum + (d.devices.desktop || 0), 0);
    const totalDevices = totalMobile + totalTablet + totalDesktop;

    const totalUnique = dailyStats.reduce((s, d) => s + d.uniqueVisitors, 0);
    const totalViews = dailyStats.reduce((s, d) => s + d.totalPageViews, 0);

    // Locations aggregation
    const locationMap: Record<string, number> = {};
    dailyStats.forEach((day) => {
      day.topLocations?.forEach((loc) => {
        locationMap[loc.location] = (locationMap[loc.location] || 0) + loc.visitors;
      });
    });

    const topLocations = Object.entries(locationMap)
      .map(([location, count]) => ({
        location,
        visitors: count,
        percentage: totalUnique > 0 ? Math.round((count / totalUnique) * 100) : 0,
        flag: location.includes('India') ? '🇮🇳' : '📍',
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10);

    // Top pages aggregation
    const pageMap: Record<string, number> = {};
    dailyStats.forEach((day) => {
      day.topPages?.forEach((p) => {
        pageMap[p.path] = (pageMap[p.path] || 0) + p.views;
      });
    });

    const pageTitles: Record<string, string> = {
      '/': 'Homepage',
      '/free-school-management-software': 'Free School ERP (Worth ₹30,000)',
      '/whatsapp-automation': 'WhatsApp Business Automation',
      '/landing-pages': 'High-Converting Landing Pages',
      '/demo/education-academy': 'Education Academy Live Demo',
      '/meta-ads': 'Meta Ads Campaign Portal',
      '/google-ads': 'Google PPC & Search Management',
      '/schedule-meeting': '1-on-1 Digital Consultation',
      '/intake-form': 'Client Request Intake Form',
      '/contact': 'Contact Us Page',
      '/solutions/education': 'Education Industry Suite',
    };

    const topPages = Object.entries(pageMap)
      .map(([path, views]) => ({
        path,
        title: pageTitles[path] || path,
        views,
        percentage: totalViews > 0 ? Math.round((views / totalViews) * 100) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Click intelligence aggregation
    const elementClickMap: Record<string, { clicks: number; category: ClickCategory; pagePath: string; targetUrl?: string }> = {};
    const categoryClickMap: Record<ClickCategory, number> = {
      cta: 0,
      whatsapp: 0,
      demo: 0,
      navigation: 0,
      form_submit: 0,
      phone: 0,
      link: 0,
      button: 0,
    };
    const pageClickMap: Record<string, number> = {};

    clicks.forEach((c) => {
      const key = c.elementText;
      if (!elementClickMap[key]) {
        elementClickMap[key] = {
          clicks: 1,
          category: c.elementType,
          pagePath: c.pagePath,
          targetUrl: c.targetUrl,
        };
      } else {
        elementClickMap[key].clicks += 1;
      }

      categoryClickMap[c.elementType] = (categoryClickMap[c.elementType] || 0) + 1;
      pageClickMap[c.pagePath] = (pageClickMap[c.pagePath] || 0) + 1;
    });

    const totalClicksCount = clicks.length;

    const topClickedElements = Object.entries(elementClickMap)
      .map(([text, meta]) => ({
        elementText: text,
        category: meta.category,
        pagePath: meta.pagePath,
        targetUrl: meta.targetUrl,
        clicks: meta.clicks,
        percentage: totalClicksCount > 0 ? Math.round((meta.clicks / totalClicksCount) * 100) : 0,
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);

    const categoryLabels: Record<ClickCategory, string> = {
      cta: 'Primary Action CTAs',
      whatsapp: 'WhatsApp Direct Chat',
      demo: 'Live Interactive Demos',
      navigation: 'Site Navigation Links',
      form_submit: 'Form Submissions & Requests',
      phone: 'Direct Phone Dialers',
      link: 'Informational Backlinks',
      button: 'Interactive Controls',
    };

    const clicksByCategory = (Object.keys(categoryClickMap) as ClickCategory[])
      .map((cat) => ({
        category: cat,
        label: categoryLabels[cat],
        clicks: categoryClickMap[cat],
        percentage: totalClicksCount > 0 ? Math.round((categoryClickMap[cat] / totalClicksCount) * 100) : 0,
      }))
      .filter((c) => c.clicks > 0)
      .sort((a, b) => b.clicks - a.clicks);

    const clicksByPage = Object.entries(pageClickMap)
      .map(([path, count]) => ({
        path,
        clicks: count,
        percentage: totalClicksCount > 0 ? Math.round((count / totalClicksCount) * 100) : 0,
      }))
      .sort((a, b) => b.clicks - a.clicks);

    // REAL declared demographic data from actual form submissions
    let inquiries: any[] = [];
    if (isBrowser()) {
      try {
        const raw = localStorage.getItem('dss_admin_inquiries');
        if (raw) {
          const parsed = JSON.parse(raw);
          // Only real inquiries, ignore any initial artificial mock IDs
          inquiries = Array.isArray(parsed) ? parsed.filter((item: any) => !/^inq-20\d$/.test(item.id)) : [];
        }
      } catch {}
    }
    const leadsWithAge = inquiries.filter((i) => i.age !== undefined && i.age !== '');
    
    let sumAge = 0;
    let validAgeCount = 0;
    const bracketCounts: Record<string, number> = {
      '18–24': 0,
      '25–34': 0,
      '35–44': 0,
      '45–54': 0,
      '55+': 0,
    };

    leadsWithAge.forEach((lead) => {
      const num = Number(lead.age);
      if (!isNaN(num) && num > 0) {
        sumAge += num;
        validAgeCount += 1;
        if (num < 25) bracketCounts['18–24'] += 1;
        else if (num < 35) bracketCounts['25–34'] += 1;
        else if (num < 45) bracketCounts['35–44'] += 1;
        else if (num < 55) bracketCounts['45–54'] += 1;
        else bracketCounts['55+'] += 1;
      }
    });

    const averageAge = validAgeCount > 0 ? Math.round(sumAge / validAgeCount) : 'N/A';
    const ageBrackets = Object.entries(bracketCounts).map(([bracket, count]) => ({
      bracket,
      count,
      percentage: validAgeCount > 0 ? Math.round((count / validAgeCount) * 100) : 0,
    }));

    const declaredLeads: DeclaredDemographicLead[] = inquiries.map((i) => ({
      id: i.id,
      name: i.name,
      age: i.age,
      city: i.city,
      phone: i.phone,
      email: i.email,
      source: i.source,
      requirement: i.requirement || i.message,
      schoolName: i.schoolName,
      budget: i.budget,
      createdAt: i.createdAt,
    }));

    const overallCtr = totalViews > 0 ? Number(((totalClicksCount / totalViews) * 100).toFixed(2)) : 0;

    const visitorSessions = loadRealVisitorSessions();
    const hourlyDistribution: HourlyStat[] = Array.from({ length: 24 }, (_, h) => {
      const hourLabel = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
      return {
        hour: h,
        label: hourLabel,
        todayCount: 0,
        totalCount: 0,
      };
    });

    visitorSessions.forEach((s) => {
      if (s.hour >= 0 && s.hour < 24) {
        hourlyDistribution[s.hour].totalCount += 1;
        if (s.date === todayStr) {
          hourlyDistribution[s.hour].todayCount += 1;
        }
      }
    });

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
      dailyStats,
      deviceSummary: {
        mobile: totalMobile,
        tablet: totalTablet,
        desktop: totalDesktop,
        mobilePct: totalDevices > 0 ? Math.round((totalMobile / totalDevices) * 100) : 0,
        tabletPct: totalDevices > 0 ? Math.round((totalTablet / totalDevices) * 100) : 0,
        desktopPct: totalDevices > 0 ? Math.round((totalDesktop / totalDevices) * 100) : 0,
      },
      topLocations,
      topPages,
      declaredDemographics: {
        totalLeadsWithAge: validAgeCount,
        averageAge,
        ageBrackets,
        leads: declaredLeads,
      },
      clickSummary: {
        topClickedElements,
        clicksByCategory,
        clicksByPage,
        totalClicks: totalClicksCount,
        recentClicks: clicks.slice(0, 50),
      },
      visitorSessions,
      latestVisitorSession,
      hourlyDistribution,
      peakVisitingHour,
      totalUniqueVisitors: totalUnique,
      totalPageViews: totalViews,
      overallCtr,
    };
  },

  // Fetch real consolidated telemetry from central server with local merge resilience
  async fetchVisitorAnalyticsData(): Promise<VisitorAnalyticsData> {
    const localData = this.getVisitorAnalyticsData();
    if (!isBrowser()) return localData;

    try {
      // Try adblocker-safe route first
      let res = await fetch('/api/traffic/data', { cache: 'no-store' });
      if (!res.ok) {
        res = await fetch('/api/analytics/data', { cache: 'no-store' });
      }

      if (res.ok) {
        const serverData = await res.json();

        // Merge visitor sessions from both server and local storage
        const localSessions = loadRealVisitorSessions();
        const serverSessions: TrackedVisitorSession[] = Array.isArray(serverData.visitorSessions) ? serverData.visitorSessions : [];

        const sessionMap = new Map<string, TrackedVisitorSession>();
        // Add all local sessions
        localSessions.forEach((s) => {
          if (s && s.id) sessionMap.set(s.id, s);
        });
        // Merge in server sessions
        serverSessions.forEach((s) => {
          if (s && s.id) sessionMap.set(s.id, s);
        });

        const mergedSessions = Array.from(sessionMap.values()).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 500);

        // Keep local cache up-to-date with any newly received server sessions
        if (mergedSessions.length > localSessions.length) {
          saveRealVisitorSessions(mergedSessions);
        }

        const todayKey = getISODate();
        const todaySessions = mergedSessions.filter((s) => s.date === todayKey);
        const todayVisitorIds = new Set(todaySessions.map((s) => s.visitorId));
        const allVisitorIds = new Set(mergedSessions.map((s) => s.visitorId));

        // Aggregate unique visitors & page views (take maximum of merged sessions, server, and local)
        const todayUniqueVisitors = Math.max(
          todayVisitorIds.size,
          serverData.today?.uniqueVisitors || 0,
          localData.today?.uniqueVisitors || 0
        );
        const todayPageViews = Math.max(
          todaySessions.length,
          serverData.today?.totalPageViews || 0,
          localData.today?.totalPageViews || 0
        );

        // Aggregate devices
        const mobileCount = Math.max(
          todaySessions.filter((s) => s.device === 'mobile').length,
          serverData.deviceSummary?.mobile || 0,
          localData.deviceSummary?.mobile || 0
        );
        const tabletCount = Math.max(
          todaySessions.filter((s) => s.device === 'tablet').length,
          serverData.deviceSummary?.tablet || 0,
          localData.deviceSummary?.tablet || 0
        );
        const desktopCount = Math.max(
          todaySessions.filter((s) => s.device === 'desktop').length,
          serverData.deviceSummary?.desktop || 0,
          localData.deviceSummary?.desktop || 0
        );
        const totalDev = mobileCount + tabletCount + desktopCount;

        const totalUnique = Math.max(
          allVisitorIds.size,
          serverData.totalUniqueVisitors || 0,
          localData.totalUniqueVisitors || 0
        );
        const totalViews = Math.max(
          mergedSessions.length,
          serverData.totalPageViews || 0,
          localData.totalPageViews || 0
        );

        // Compute 24-hour hourly distribution from merged sessions
        const hourlyDistribution: HourlyStat[] = Array.from({ length: 24 }, (_, h) => {
          const hourLabel = h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`;
          return {
            hour: h,
            label: hourLabel,
            todayCount: 0,
            totalCount: 0,
          };
        });

        mergedSessions.forEach((s) => {
          if (s.hour >= 0 && s.hour < 24) {
            hourlyDistribution[s.hour].totalCount += 1;
            if (s.date === todayKey) {
              hourlyDistribution[s.hour].todayCount += 1;
            }
          }
        });

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

        const latestVisitorSession = mergedSessions[0] || serverData.latestVisitorSession || localData.latestVisitorSession || null;

        // Extract declared inquiries demographics
        let inquiries: any[] = [];
        try {
          const raw = localStorage.getItem('dss_admin_inquiries');
          if (raw) {
            const parsed = JSON.parse(raw);
            inquiries = Array.isArray(parsed) ? parsed.filter((item: any) => !/^inq-20\d$/.test(item.id)) : [];
          }
        } catch {}

        const leadsWithAge = inquiries.filter((i) => i.age !== undefined && i.age !== '');
        let sumAge = 0;
        let validAgeCount = 0;
        const bracketCounts: Record<string, number> = {
          '18–24': 0,
          '25–34': 0,
          '35–44': 0,
          '45–54': 0,
          '55+': 0,
        };

        leadsWithAge.forEach((lead) => {
          const num = Number(lead.age);
          if (!isNaN(num) && num > 0) {
            sumAge += num;
            validAgeCount += 1;
            if (num < 25) bracketCounts['18–24'] += 1;
            else if (num < 35) bracketCounts['25–34'] += 1;
            else if (num < 45) bracketCounts['35–44'] += 1;
            else if (num < 55) bracketCounts['45–54'] += 1;
            else bracketCounts['55+'] += 1;
          }
        });

        const averageAge = validAgeCount > 0 ? Math.round(sumAge / validAgeCount) : 'N/A';
        const ageBrackets = Object.entries(bracketCounts).map(([bracket, count]) => ({
          bracket,
          count,
          percentage: validAgeCount > 0 ? Math.round((count / validAgeCount) * 100) : 0,
        }));

        const declaredLeads: DeclaredDemographicLead[] = inquiries.map((i) => ({
          id: i.id,
          name: i.name,
          age: i.age,
          city: i.city,
          phone: i.phone,
          email: i.email,
          source: i.source,
          requirement: i.requirement || i.message,
          schoolName: i.schoolName,
          budget: i.budget,
          createdAt: i.createdAt,
        }));

        const topLocations = (serverData.topLocations && serverData.topLocations.length > 0)
          ? serverData.topLocations
          : localData.topLocations;

        const topPages = (serverData.topPages && serverData.topPages.length > 0)
          ? serverData.topPages
          : localData.topPages;

        const clickSummary = (serverData.clickSummary && serverData.clickSummary.totalClicks > 0)
          ? serverData.clickSummary
          : localData.clickSummary;

        const totalClicks = clickSummary.totalClicks || 0;
        const overallCtr = totalViews > 0 ? Number(((totalClicks / totalViews) * 100).toFixed(2)) : 0;

        return {
          today: {
            date: todayKey,
            formattedDate: getFormattedDay(),
            uniqueVisitors: todayUniqueVisitors,
            totalPageViews: todayPageViews,
            devices: { mobile: mobileCount, tablet: tabletCount, desktop: desktopCount },
            topLocations,
            topPages,
          },
          dailyStats: (serverData.dailyStats && serverData.dailyStats.length > 0) ? serverData.dailyStats : localData.dailyStats,
          deviceSummary: {
            mobile: mobileCount,
            tablet: tabletCount,
            desktop: desktopCount,
            mobilePct: totalDev > 0 ? Math.round((mobileCount / totalDev) * 100) : 0,
            tabletPct: totalDev > 0 ? Math.round((tabletCount / totalDev) * 100) : 0,
            desktopPct: totalDev > 0 ? Math.round((desktopCount / totalDev) * 100) : 0,
          },
          topLocations,
          topPages,
          declaredDemographics: {
            totalLeadsWithAge: validAgeCount,
            averageAge,
            ageBrackets,
            leads: declaredLeads,
          },
          clickSummary,
          visitorSessions: mergedSessions,
          latestVisitorSession,
          hourlyDistribution,
          peakVisitingHour,
          totalUniqueVisitors: totalUnique,
          totalPageViews: totalViews,
          overallCtr,
        };
      }
    } catch (e) {
      console.warn('Failed to load server analytics, falling back to local', e);
    }
    return localData;
  },

  // Clear real analytics storage completely
  clearRealAnalyticsData(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.DAILY_VISITORS);
    localStorage.removeItem(STORAGE_KEYS.VISITOR_SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.CLICKS);
    localStorage.removeItem(STORAGE_KEYS.LAST_VISIT_DATE);
    try {
      fetch('/api/traffic/clear', { method: 'POST' }).catch(() => {
        fetch('/api/analytics/clear', { method: 'POST' }).catch(() => {});
      });
    } catch {}
    window.dispatchEvent(new CustomEvent('dss_analytics_updated'));
  },
};
