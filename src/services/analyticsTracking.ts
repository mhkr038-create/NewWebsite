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
  totalUniqueVisitors: number;
  totalPageViews: number;
  overallCtr: number;
}

const STORAGE_KEYS = {
  DAILY_VISITORS: 'dss_analytics_daily_visitors_v2',
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

    window.dispatchEvent(new CustomEvent('dss_analytics_updated'));
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
      totalUniqueVisitors: totalUnique,
      totalPageViews: totalViews,
      overallCtr,
    };
  },

  // Clear real analytics storage completely
  clearRealAnalyticsData(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.DAILY_VISITORS);
    localStorage.removeItem(STORAGE_KEYS.CLICKS);
    localStorage.removeItem(STORAGE_KEYS.LAST_VISIT_DATE);
    window.dispatchEvent(new CustomEvent('dss_analytics_updated'));
  },
};
