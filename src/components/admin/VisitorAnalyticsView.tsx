'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  MousePointerClick, 
  Smartphone, 
  Monitor, 
  Tablet, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  RefreshCw, 
  Search, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Calendar, 
  Lock, 
  Unlock,
  Trash2,
  AlertCircle,
  FileText,
  UserCheck,
  Clock,
  History,
  BarChart2
} from 'lucide-react';
import { 
  analyticsTracking, 
  VisitorAnalyticsData, 
  ClickCategory,
  TrackedVisitorSession 
} from '../../services/analyticsTracking';

function formatRelativeTime(timestamp: string): string {
  try {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 45) return 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    const diffDays = Math.floor(diffHour / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  } catch {
    return '';
  }
}

export const VisitorAnalyticsView: React.FC = () => {
  const [data, setData] = useState<VisitorAnalyticsData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisitorDateFilter, setSelectedVisitorDateFilter] = useState<'all' | 'today' | 'yesterday'>('all');
  const [selectedVisitorDeviceFilter, setSelectedVisitorDeviceFilter] = useState<'all' | 'mobile' | 'desktop' | 'tablet'>('all');
  const [visitorSearchQuery, setVisitorSearchQuery] = useState('');
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const fresh = await analyticsTracking.fetchVisitorAnalyticsData();
      setData(fresh);
    } catch {
      setData(analyticsTracking.getVisitorAnalyticsData());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Auto-sync every 8 seconds so visits and clicks from other devices (e.g. mobile) appear in real time
    const pollInterval = setInterval(refreshData, 8000);

    // Listen for real-time updates from live user visits and clicks
    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener('dss_analytics_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener('dss_analytics_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleClearData = async () => {
    if (confirm('Are you sure you want to reset all recorded real visitor and click tracking metrics back to 0?')) {
      analyticsTracking.clearRealAnalyticsData();
      await refreshData();
      setFeedbackMessage('Real tracking data reset to 0.');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const filteredClicks = useMemo(() => {
    if (!data) return [];
    let list = data.clickSummary.recentClicks;

    if (selectedCategory !== 'all') {
      list = list.filter((c) => c.elementType === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.elementText.toLowerCase().includes(q) ||
          c.pagePath.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.visitorId.toLowerCase().includes(q)
      );
    }

    return list;
  }, [data, selectedCategory, searchQuery]);

  const filteredVisitorSessions = useMemo(() => {
    if (!data || !data.visitorSessions) return [];
    let list = data.visitorSessions;

    const todayStr = new Date().toISOString().split('T')[0];
    const yestDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (selectedVisitorDateFilter === 'today') {
      list = list.filter((s) => s.date === todayStr);
    } else if (selectedVisitorDateFilter === 'yesterday') {
      list = list.filter((s) => s.date === yestDate);
    }

    if (selectedVisitorDeviceFilter !== 'all') {
      list = list.filter((s) => s.device === selectedVisitorDeviceFilter);
    }

    if (visitorSearchQuery.trim()) {
      const q = visitorSearchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.path.toLowerCase().includes(q) ||
          s.pageTitle.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.visitorId.toLowerCase().includes(q) ||
          s.date.toLowerCase().includes(q) ||
          s.timeFormatted.toLowerCase().includes(q) ||
          (s.referrer && s.referrer.toLowerCase().includes(q))
      );
    }

    return list;
  }, [data, selectedVisitorDateFilter, selectedVisitorDeviceFilter, visitorSearchQuery]);

  if (!data) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono">
        <Activity className="w-8 h-8 mx-auto mb-3 animate-spin text-cyan-400" />
        <span>Loading real website visitor metrics...</span>
      </div>
    );
  }

  const categoryBadge = (cat: ClickCategory) => {
    switch (cat) {
      case 'cta':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-semibold">⚡ Action CTA</span>;
      case 'whatsapp':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-700/40 font-semibold">💬 WhatsApp</span>;
      case 'demo':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/40 font-semibold">🎮 Live Demo</span>;
      case 'form_submit':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-700/40 font-semibold">📝 Form Submit</span>;
      case 'navigation':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/40 font-semibold">🧭 Navigation</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 font-semibold">🔗 Link / Button</span>;
    }
  };

  const deviceIcon = (d: string) => {
    if (d === 'mobile') return <Smartphone className="w-3.5 h-3.5 text-cyan-400" />;
    if (d === 'tablet') return <Tablet className="w-3.5 h-3.5 text-purple-400" />;
    return <Monitor className="w-3.5 h-3.5 text-indigo-400" />;
  };

  const maskPhone = (phone: string) => {
    if (!isMasked) return phone;
    return phone.replace(/(\+?\d{2,4}\s?)(\d{2,3})(\d{3,5})(\d{2})/, '$1$2*** ***$4');
  };

  const maskEmail = (email: string) => {
    if (!isMasked) return email;
    const parts = email.split('@');
    if (parts.length < 2) return email;
    return `${parts[0].charAt(0)}***@${parts[1]}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>100% Real Live Telemetry</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 text-[11px] font-mono border border-slate-800">
              <span>All mock/sample data removed</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Real Website Visitors & Click Telemetry
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Only actual recorded visitors to your website, their real devices (Mobile, Tablet, Desktop), actual detected locations, and live user clicks on links and buttons.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {/* Sensitive Data Masking Toggle */}
          <button
            onClick={() => setIsMasked(!isMasked)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              isMasked
                ? 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
            }`}
            title="Toggle masking of client phone numbers, age, and confidential information"
          >
            {isMasked ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <Unlock className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isMasked ? 'Privacy Shield: Active' : 'Sensitive Data: Unmasked'}</span>
          </button>

          {/* Refresh */}
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-cyan-300 transition-all cursor-pointer"
            title="Refresh analytics data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
          </button>

          {/* Reset real storage */}
          <button
            onClick={handleClearData}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-300 transition-all cursor-pointer"
            title="Reset real tracking counter"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
          ✓ {feedbackMessage}
        </div>
      )}

      {/* 4 Core Real Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Today's Real Visitors */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
              REAL TODAY
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Real Visitors Today</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.today.uniqueVisitors}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              {data.today.totalPageViews} Real Pageviews
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
            {data.today.uniqueVisitors > 0 ? 'Live visitor session active' : 'Waiting for live visitor'}
          </div>
        </div>

        {/* Card 2: Real Devices */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 font-bold">
              REAL DEVICES
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Device Breakdown</span>
            <div className="text-2xl font-extrabold text-white font-heading mt-1 flex items-baseline gap-2">
              <span>{data.deviceSummary.mobile} Mobile</span>
              <span className="text-xs text-slate-400 font-normal">/ {data.deviceSummary.desktop} Desktop</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Tablets: {data.deviceSummary.tablet}
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-indigo-300">
            Detected via actual browser user-agent
          </div>
        </div>

        {/* Card 3: Real Top Location */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-bold">
              REAL GEOGRAPHY
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Top Detected Origin</span>
            <div className="text-2xl font-extrabold text-white font-heading mt-1 truncate">
              {data.topLocations[0]?.location || 'No visits yet'}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              {data.topLocations.length} real location(s) recorded
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
            <span>Detected via visitor IP</span>
            <Globe className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Real Clicks */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 font-bold">
              REAL CLICKS
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Real Recorded Clicks</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.clickSummary.totalClicks}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Click-Through Rate: <strong className="text-amber-300">{data.overallCtr}%</strong>
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-400 flex items-center justify-between">
            <span>Logged on real button clicks</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* SECTION 1: Real Daily Visitors Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Real Daily Traffic Log</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Actual Daily Visitors Recorded
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span>Total Unique Recorded: <strong className="text-white">{data.totalUniqueVisitors}</strong></span>
            <span>•</span>
            <span>Total Pageviews: <strong className="text-cyan-300">{data.totalPageViews}</strong></span>
          </div>
        </div>

        {data.dailyStats.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 space-y-2">
            <AlertCircle className="w-6 h-6 mx-auto text-cyan-400" />
            <p className="text-xs font-mono">No real visitors recorded yet.</p>
            <p className="text-[11px] text-slate-500">
              When someone visits the website outside of the `/admin` route, their visit and device will be recorded here immediately.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Unique Visitors</th>
                  <th className="py-2.5 px-3 text-right">Total Pageviews</th>
                  <th className="py-2.5 px-3 text-center">Device Split (Mobile / Desktop / Tablet)</th>
                  <th className="py-2.5 px-3 text-right">Top Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {data.dailyStats.slice().reverse().map((day, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
                      <span>{day.formattedDate} ({day.date})</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-cyan-300">{day.uniqueVisitors}</td>
                    <td className="py-2.5 px-3 text-right text-slate-200">{day.totalPageViews}</td>
                    <td className="py-2.5 px-3 text-center text-[11px]">
                      <span className="text-cyan-400">{day.devices.mobile} M</span>
                      <span className="text-slate-600"> / </span>
                      <span className="text-indigo-400">{day.devices.desktop} D</span>
                      <span className="text-slate-600"> / </span>
                      <span className="text-purple-400">{day.devices.tablet} T</span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400 truncate max-w-[180px]">
                      {day.topLocations[0]?.location || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 2: Real Visitor Sessions Log with Exact Date & Time */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Visitor Arrival Date &amp; Time Storage</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Stored Visitor Sessions (Date, Time, Location &amp; Device)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Every single visitor arrival is timestamped and stored with exact calendar date, clock time, device, and landing route.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-300">
              Total Logged: <strong className="text-white">{data.visitorSessions?.length || 0}</strong> sessions
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
              Peak: <strong className="text-amber-300">{data.peakVisitingHour}</strong>
            </span>
          </div>
        </div>

        {/* Highlight Cards for Date & Time Intelligence */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Latest Visitor */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <History className="w-3.5 h-3.5 text-cyan-400" />
                Latest Visitor Arrival
              </span>
              {data.latestVisitorSession && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 text-[10px] font-bold">
                  {formatRelativeTime(data.latestVisitorSession.timestamp)}
                </span>
              )}
            </div>
            {data.latestVisitorSession ? (
              <div className="space-y-1">
                <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>{data.latestVisitorSession.dateTimeFormatted}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2 truncate">
                  {deviceIcon(data.latestVisitorSession.device)}
                  <span>{data.latestVisitorSession.pageTitle}</span>
                  <span>•</span>
                  <span className="text-emerald-400 truncate">{data.latestVisitorSession.location}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-mono">No visitor session recorded yet.</p>
            )}
          </div>

          {/* Peak Visiting Hour */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                Peak Activity Window
              </span>
              <span className="text-[10px] text-amber-400 font-bold">24-HR CYCLE</span>
            </div>
            <div className="space-y-1">
              <div className="text-base font-bold text-amber-300 font-mono">
                {data.peakVisitingHour}
              </div>
              <p className="text-[11px] text-slate-400">
                Hour of the day when highest traffic arrives on your pages.
              </p>
            </div>
          </div>

          {/* Today's Stored Date Record */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                Today&apos;s Date Log
              </span>
              <span className="text-[10px] text-indigo-300 font-bold">{data.today.date}</span>
            </div>
            <div className="space-y-1">
              <div className="text-base font-bold text-white font-mono">
                {data.today.uniqueVisitors} Unique / {data.today.totalPageViews} Views
              </div>
              <p className="text-[11px] text-slate-400">
                Auto-saved to persistent multi-tier server and browser storage.
              </p>
            </div>
          </div>
        </div>

        {/* 24-Hour Activity Distribution Visualizer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>24-Hour Visitor Time Density (Hourly Distribution)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Hours 00:00 to 23:00</span>
          </div>

          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 items-end h-24 pt-2">
            {data.hourlyDistribution?.map((hd) => {
              const maxCount = Math.max(1, ...data.hourlyDistribution.map((h) => h.totalCount));
              const heightPct = hd.totalCount > 0 ? Math.max(18, Math.round((hd.totalCount / maxCount) * 100)) : 6;
              const isPeak = hd.totalCount > 0 && hd.totalCount === maxCount;

              return (
                <div key={hd.hour} className="flex flex-col items-center gap-1 h-full justify-end group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-9 bg-slate-900 text-white text-[9px] font-mono px-2 py-1 rounded shadow-lg border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                    {hd.label}: {hd.totalCount} visit(s) ({hd.todayCount} today)
                  </div>

                  <div
                    className={`w-full rounded-t transition-all duration-500 ${
                      isPeak
                        ? 'bg-gradient-to-t from-amber-500 to-yellow-300 shadow-md shadow-amber-500/40'
                        : hd.totalCount > 0
                        ? 'bg-gradient-to-t from-cyan-600 to-indigo-400'
                        : 'bg-slate-800/40'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[8px] font-mono text-slate-500 truncate w-full text-center group-hover:text-cyan-300">
                    {hd.hour % 3 === 0 ? hd.label.replace(' ', '') : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visitor Sessions Feed Controls (Search + Filters) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={visitorSearchQuery}
                onChange={(e) => setVisitorSearchQuery(e.target.value)}
                placeholder="Search date, time, page, city..."
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-56 transition-colors font-mono"
              />
            </div>

            {/* Date filter */}
            <div className="flex items-center gap-1">
              {(['all', 'today', 'yesterday'] as const).map((df) => (
                <button
                  key={df}
                  onClick={() => setSelectedVisitorDateFilter(df)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                    selectedVisitorDateFilter === df
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {df === 'all' ? 'All Dates' : df}
                </button>
              ))}
            </div>

            {/* Device filter */}
            <div className="flex items-center gap-1">
              {(['all', 'mobile', 'desktop', 'tablet'] as const).map((dev) => (
                <button
                  key={dev}
                  onClick={() => setSelectedVisitorDeviceFilter(dev)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                    selectedVisitorDeviceFilter === dev
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {dev === 'all' ? 'All Devices' : dev}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Showing <strong className="text-cyan-300">{filteredVisitorSessions.length}</strong> of {data.visitorSessions?.length || 0} sessions
          </span>
        </div>

        {/* Chronological Table of Date & Time Visitor Logs */}
        {filteredVisitorSessions.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 space-y-2">
            <AlertCircle className="w-6 h-6 mx-auto text-cyan-400" />
            <p className="text-xs font-mono">No visitor sessions match your current filter.</p>
            <p className="text-[11px] text-slate-500">
              When visitors browse any page on your website, their exact date and time of arrival will be logged here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="sticky top-0 bg-slate-900 border-b border-slate-800 text-slate-400 z-10">
                <tr>
                  <th className="py-2.5 px-3">Date &amp; Time (Arrival)</th>
                  <th className="py-2.5 px-3">Visitor ID &amp; Type</th>
                  <th className="py-2.5 px-3">Device</th>
                  <th className="py-2.5 px-3">Page Visited</th>
                  <th className="py-2.5 px-3">Detected Location</th>
                  <th className="py-2.5 px-3">Referrer / Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredVisitorSessions.map((session, idx) => (
                  <tr key={session.id || idx} className="hover:bg-slate-950/50 transition-colors">
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <div>
                          <span className="font-bold text-white block">{session.date}</span>
                          <span className="text-[11px] text-cyan-300 font-mono block">{session.timeWithSeconds || session.timeFormatted}</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 ml-1">
                          {formatRelativeTime(session.timestamp)}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-slate-300 block font-mono">{session.visitorId}</span>
                      {session.isNewToday ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-bold">
                          ✨ First Today
                        </span>
                      ) : (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-400 font-normal">
                          🔁 Returning
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] capitalize">
                        {deviceIcon(session.device)}
                        <span className="text-slate-300">{session.device}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 max-w-[220px]">
                      <span className="font-semibold text-white block truncate">{session.pageTitle}</span>
                      <code className="text-[10px] text-cyan-400 truncate block">{session.path}</code>
                    </td>

                    <td className="py-2.5 px-3 max-w-[180px]">
                      <span className="text-slate-300 block truncate">📍 {session.location}</span>
                    </td>

                    <td className="py-2.5 px-3 max-w-[150px] text-slate-400 truncate text-[11px]">
                      {session.referrer || 'Direct'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 3: Real Declared Age & Client Data from Inbound Submissions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 font-semibold mb-1">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Real Declared Demographic Intelligence</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Actual Declared Age & Sensitive Client Requirements
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300">
              {data.declaredDemographics.totalLeadsWithAge} Leads with Declared Age
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
              Avg Age: <strong className="text-white">{data.declaredDemographics.averageAge}</strong>
            </span>
          </div>
        </div>

        {/* Notice on Real Demographic Collection */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Real Declared Data Matters</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Internet browsers deliberately block websites from reading a visitor&apos;s personal human age for privacy and security. The age and sensitive information below is <strong>100% real and authentic</strong> because it was directly filled and submitted by real clients via your <em>Intake Form / Submit Request</em> and <em>School Management Enquiry</em> forms.
          </p>
        </div>

        {/* Declared Age Bracket Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {data.declaredDemographics.ageBrackets.map((bracket, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{bracket.bracket} Yrs</span>
              <div className="text-xl font-bold text-white font-heading">{bracket.count}</div>
              <span className="text-[10px] font-mono text-purple-400">{bracket.percentage}% of leads</span>
            </div>
          ))}
        </div>

        {/* Table of Real Inquiries with Declared Sensitive Information */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Client / School</th>
                <th className="py-2.5 px-3">Declared Age</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Budget / Value</th>
                <th className="py-2.5 px-3">Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {data.declaredDemographics.leads.map((lead, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-white block">{lead.name}</span>
                    {lead.schoolName && (
                      <span className="text-[10px] text-amber-300 font-sans block truncate max-w-[180px]">
                        🏫 {lead.schoolName}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {lead.age ? (
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                        {isMasked ? '**' : `${lead.age} yrs`}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">Not declared</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-300 truncate max-w-[140px]">
                    {lead.city ? `📍 ${lead.city}` : 'Not specified'}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-cyan-300 block">{maskPhone(lead.phone)}</span>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">{maskEmail(lead.email)}</span>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">
                    {lead.budget || 'Standard'}
                  </td>
                  <td className="py-3 px-3 text-slate-400 truncate max-w-[220px]">
                    {lead.requirement || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Real Device & Geographic Location Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Device Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Real Device Breakdown</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Total: {data.totalUniqueVisitors} visits</span>
          </div>

          <div className="space-y-4">
            {/* Mobile */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Phones</span>
                </span>
                <span className="font-mono text-cyan-300 font-bold text-sm">{data.deviceSummary.mobilePct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${data.deviceSummary.mobilePct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{data.deviceSummary.mobile} real visits</span>
                <span>iOS, Android</span>
              </div>
            </div>

            {/* Desktop */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-indigo-400" />
                  <span>Desktop & Laptop</span>
                </span>
                <span className="font-mono text-indigo-300 font-bold text-sm">{data.deviceSummary.desktopPct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${data.deviceSummary.desktopPct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{data.deviceSummary.desktop} real visits</span>
                <span>Windows, macOS, Linux</span>
              </div>
            </div>

            {/* Tablet */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <Tablet className="w-4 h-4 text-purple-400" />
                  <span>Tablets</span>
                </span>
                <span className="font-mono text-purple-300 font-bold text-sm">{data.deviceSummary.tabletPct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.deviceSummary.tabletPct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{data.deviceSummary.tablet} real visits</span>
                <span>iPad, Android Tab</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Location Leaderboard (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Real Inbound Locations</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Actual IP Lookups</span>
          </div>

          {data.topLocations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No real locations detected yet. As visitors open pages, locations will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {data.topLocations.map((loc, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">{loc.flag}</span>
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">{loc.location}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Rank #{idx + 1}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-400 text-xs block">{loc.visitors} visits</span>
                    <span className="text-[10px] text-slate-500 font-mono">{loc.percentage}% share</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: Real Click Intelligence (Top Clicked Elements) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold mb-1">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Real Click Intelligence</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              What Real Visitors Are Clicking On
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total Real Clicks: <strong className="text-amber-400 font-bold">{data.clickSummary.totalClicks}</strong>
          </span>
        </div>

        {data.clickSummary.topClickedElements.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 space-y-2">
            <AlertCircle className="w-6 h-6 mx-auto text-amber-400" />
            <p className="text-xs font-mono">No real user clicks recorded yet.</p>
            <p className="text-[11px] text-slate-500">
              When a visitor on your live website clicks any button, link, or WhatsApp CTA, it will be ranked here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 px-3">Rank & Element</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Triggered On</th>
                  <th className="py-2.5 px-3">Target Destination</th>
                  <th className="py-2.5 px-3 text-right">Real Clicks</th>
                  <th className="py-2.5 px-3 text-right">Share %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {data.clickSummary.topClickedElements.map((el, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold bg-slate-800 text-slate-300">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-white truncate max-w-[240px] sm:max-w-xs">{el.elementText}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">{categoryBadge(el.category)}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px] truncate max-w-[150px]">{el.pagePath}</td>
                    <td className="py-3 px-3 text-cyan-400 font-mono text-[11px] truncate max-w-[180px]">
                      {el.targetUrl || 'Internal Action'}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-white">{el.clicks}</td>
                    <td className="py-3 px-3 text-right font-bold text-amber-400">{el.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 5: Real-Time Click Activity Stream */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Real-Time Interaction Feed</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Actual Live Click Stream
            </h3>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search real clicks..."
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto">
              {['all', 'cta', 'whatsapp', 'demo', 'form_submit', 'navigation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono capitalize transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Clicks' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Stream List */}
        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredClicks.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No real clicks recorded yet. When you or another visitor clicks buttons on the live site, they will appear here instantaneously.
            </div>
          ) : (
            filteredClicks.map((click, idx) => (
              <div
                key={click.id || idx}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {deviceIcon(click.device)}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white hover:text-cyan-300 transition-colors truncate max-w-sm">
                        &quot;{click.elementText}&quot;
                      </span>
                      {categoryBadge(click.elementType)}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span>On: <code className="text-slate-300">{click.pagePath}</code></span>
                      {click.targetUrl && (
                        <>
                          <span>→</span>
                          <span className="text-cyan-400 truncate max-w-[200px]">{click.targetUrl}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-[11px] font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{click.location}</span>
                  </span>

                  <span className="text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {click.timeFormatted}
                  </span>

                  <span className="text-[10px] text-slate-600 font-mono">
                    {click.visitorId}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
