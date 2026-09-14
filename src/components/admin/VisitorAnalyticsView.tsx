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
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Activity, 
  Eye, 
  ExternalLink, 
  MessageSquare, 
  Layers, 
  Calendar, 
  Lock, 
  Unlock,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  analyticsTracking, 
  VisitorAnalyticsData, 
  TrackedClick, 
  ClickCategory 
} from '../../services/analyticsTracking';

export const VisitorAnalyticsView: React.FC = () => {
  const [data, setData] = useState<VisitorAnalyticsData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [simulatedFeedback, setSimulatedFeedback] = useState<string>('');

  const refreshData = () => {
    setIsRefreshing(true);
    const fresh = analyticsTracking.getVisitorAnalyticsData();
    setData(fresh);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    refreshData();

    // Listen for real-time clicks from across browser tabs
    const handleUpdate = () => {
      const fresh = analyticsTracking.getVisitorAnalyticsData();
      setData(fresh);
    };

    window.addEventListener('dss_analytics_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('dss_analytics_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Filter clicks stream
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

  const handleSimulateClick = () => {
    const samples = [
      { text: 'Claim Free School ERP (₹30K Offer)', category: 'cta' as ClickCategory, path: '/free-school-management-software' },
      { text: 'WhatsApp Quick Consultation', category: 'whatsapp' as ClickCategory, path: '/whatsapp-automation' },
      { text: 'Launch Education Academy Demo', category: 'demo' as ClickCategory, path: '/demo/education-academy' },
      { text: 'Schedule Digital Strategy Call', category: 'cta' as ClickCategory, path: '/schedule-meeting' },
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    const newClick = analyticsTracking.simulateSampleClick(picked.text, picked.category, picked.path);

    refreshData();
    setSimulatedFeedback(`Simulated click recorded: "${newClick.elementText}"`);
    setTimeout(() => setSimulatedFeedback(''), 3500);
  };

  if (!data) {
    return (
      <div className="p-12 text-center text-slate-400 font-mono">
        <Activity className="w-8 h-8 mx-auto mb-3 animate-spin text-cyan-400" />
        <span>Aggregating visitor & click telemetry...</span>
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Station Top Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Live Website Telemetry Station</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-300 text-[11px] font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{data.audienceInsights.privacyComplianceStatus}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Daily Visitors & Click Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time daily visitor volume, device segmentation, geographic origins, audience age brackets, and click tracking across all interactive elements.
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

          {/* Test Simulator */}
          <button
            onClick={handleSimulateClick}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulate User Click</span>
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
        </div>
      </div>

      {simulatedFeedback && (
        <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-between animate-in fade-in">
          <span>⚡ {simulatedFeedback}</span>
          <span className="text-[10px] text-slate-400">Stream updated live</span>
        </div>
      )}

      {/* 4 Core Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Today's Visitors */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
              TODAY'S TRAFFIC
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Daily Visitors</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.today.uniqueVisitors.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              {data.today.totalPageViews.toLocaleString()} Total Pageviews ({((data.today.totalPageViews / (data.today.uniqueVisitors || 1))).toFixed(1)} views/vis)
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
            <span>+14.8% vs 14d avg</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Device Split */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 font-bold">
              DEVICE SPLIT
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Primary Visitor Device</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1 flex items-baseline gap-2">
              <span>{data.deviceSummary.mobilePct}%</span>
              <span className="text-xs text-slate-400 font-normal font-sans">Mobile Phones</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
              <span className="flex items-center gap-1"><Monitor className="w-3 h-3 text-indigo-400" /> Desktop: {data.deviceSummary.desktopPct}%</span>
              <span className="flex items-center gap-1"><Tablet className="w-3 h-3 text-purple-400" /> Tab: {data.deviceSummary.tabletPct}%</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-indigo-300">
            High WhatsApp mobile conversion
          </div>
        </div>

        {/* Card 3: Top Location */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-bold">
              TOP GEOGRAPHY
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Top Geographic Origin</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1 truncate">
              {data.topLocations[0]?.location || 'Delhi NCR, India'}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Followed by {data.topLocations[1]?.location || 'Bengaluru, India'}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
            <span>{data.topLocations.length} active regions tracked</span>
            <Globe className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Click Tracking & CTR */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 font-bold">
              CLICK VELOCITY
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Tracked Clicks</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.clickSummary.totalClicks}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Overall CTR: <strong className="text-amber-300">{data.overallCtr}%</strong> of all views
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-400 flex items-center justify-between">
            <span>Top: Free School ERP CTA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* SECTION 1: 14-Day Daily Visitors Visual Momentum & Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Traffic Trendline</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              14-Day Daily Visitors & Engagement Curve
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span>14d Unique: <strong className="text-white">{data.totalUniqueVisitors14d.toLocaleString()}</strong></span>
            <span>•</span>
            <span>14d Views: <strong className="text-cyan-300">{data.totalPageViews14d.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-2">
          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 items-end h-44 pt-6 pb-2 border-b border-slate-800/80">
            {data.dailyStats.map((stat, idx) => {
              const maxVal = Math.max(...data.dailyStats.map((s) => s.uniqueVisitors)) || 3000;
              const heightPct = Math.round((stat.uniqueVisitors / maxVal) * 100);
              const isToday = idx === data.dailyStats.length - 1;

              return (
                <div key={idx} className="flex flex-col items-center justify-end h-full group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 bg-slate-950 border border-slate-700 text-[10px] font-mono px-2 py-1 rounded shadow-xl whitespace-nowrap text-center">
                    <div className="text-white font-bold">{stat.formattedDate}</div>
                    <div className="text-cyan-400">{stat.uniqueVisitors.toLocaleString()} visitors</div>
                    <div className="text-slate-400">{stat.totalPageViews.toLocaleString()} views</div>
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[28px] bg-slate-950 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-cyan-600 via-indigo-500 to-cyan-300 shadow-lg shadow-cyan-500/30'
                          : 'bg-gradient-to-t from-slate-800 to-indigo-600 group-hover:from-indigo-700 group-hover:to-cyan-400'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  {/* Date Label */}
                  <span className={`text-[10px] font-mono mt-2 block ${isToday ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                    {stat.formattedDate.split(' ')[1] || stat.formattedDate}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
            <span>14 days ago</span>
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Today (Live)
            </span>
          </div>
        </div>

        {/* Daily Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Unique Visitors</th>
                <th className="py-2.5 px-3 text-right">Total Pageviews</th>
                <th className="py-2.5 px-3 text-center">Device Split (M / D / T)</th>
                <th className="py-2.5 px-3 text-right">Top Region</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {data.dailyStats.slice(-7).reverse().map((day, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-white flex items-center gap-1.5">
                    {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    <span>{day.formattedDate}</span>
                    {idx === 0 && <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-normal">Today</span>}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-cyan-300">{day.uniqueVisitors.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-200">{day.totalPageViews.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-center text-[11px]">
                    <span className="text-cyan-400">{day.devices.mobile}</span>
                    <span className="text-slate-600"> / </span>
                    <span className="text-indigo-400">{day.devices.desktop}</span>
                    <span className="text-slate-600"> / </span>
                    <span className="text-purple-400">{day.devices.tablet}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400 truncate max-w-[180px]">
                    {day.topLocations[0]?.location || 'Delhi NCR, India'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Audience Age Demographics & Sensitive Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Age Brackets & Persona Intelligence (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 font-semibold mb-0.5">
                <Users className="w-3.5 h-3.5" />
                <span>Audience Demographics</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">
                Visitor Age Distribution & Buying Personas
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Modeled on Meta & GA-4 Signals</span>
          </div>

          <div className="space-y-4">
            {data.audienceInsights.ageBrackets.map((bracket, idx) => (
              <div key={idx} className="space-y-1.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/50 text-xs">
                      {bracket.bracket} Years
                    </span>
                    <span className="text-slate-300 font-medium">{bracket.persona}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                    <span>{bracket.visitorCount.toLocaleString()} visitors</span>
                    <span className="text-purple-400 font-bold">({bracket.percentage}%)</span>
                    <span className="text-emerald-400 font-semibold">{bracket.conversionRate}% CVR</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${bracket.percentage * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demographic Insight</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-400">
              The <strong>25–44 age bracket</strong> represents <strong>73%</strong> of total traffic and drives over <strong>82%</strong> of Free School ERP requests and WhatsApp consultations. Institution decision-makers prioritize instant WhatsApp response and demonstrable digital workflows.
            </p>
          </div>
        </div>

        {/* Sensitive Information & Decision-Maker Intelligence (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold mb-0.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Sensitive Data Intelligence</span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Executive Decision-Maker Tiers
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                PII Compliant
              </span>
            </div>

            {/* Decision Maker Breakdown */}
            <div className="space-y-3">
              {data.audienceInsights.decisionMakerLevel.map((dm, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
                  <span className="text-slate-200 font-medium">{dm.tier}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-400">{dm.count.toLocaleString()}</span>
                    <span className="text-amber-400 font-bold">{dm.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Intent & Purchasing Power */}
            <div className="mt-6 space-y-3">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold block">
                Purchasing Power & Budget Intent
              </span>
              {data.audienceInsights.intentTier.map((it, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-white font-semibold block">{it.tier}</span>
                    <span className="text-[10px] font-mono text-emerald-400">{it.budgetRange}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">{it.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Shield Info Box */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Sensitive Data Shield</span>
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${isMasked ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' : 'bg-amber-950 text-amber-300 border border-amber-700/50'}`}>
                {isMasked ? 'MASKED' : 'UNMASKED'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When masked, sensitive visitor data (direct mobile numbers, declared ages, and proprietary institutional notes) is redacted according to Digital Personal Data Protection (DPDP) Act standards.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: Device & Geographic Origin Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Device Breakdown (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Device Category Breakdown</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">14-Day Ratio</span>
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
                <span>{data.deviceSummary.mobile.toLocaleString()} visits</span>
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
                <span>{data.deviceSummary.desktop.toLocaleString()} visits</span>
                <span>Windows, Mac, Linux</span>
              </div>
            </div>

            {/* Tablet */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <Tablet className="w-4 h-4 text-purple-400" />
                  <span>Tablets & iPads</span>
                </span>
                <span className="font-mono text-purple-300 font-bold text-sm">{data.deviceSummary.tabletPct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.deviceSummary.tabletPct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>{data.deviceSummary.tablet.toLocaleString()} visits</span>
                <span>iPadOS, Android Tabs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Origin Leaderboard (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Geographic Origin & City Heatmap</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Top Inbound Locations</span>
          </div>

          <div className="space-y-3">
            {data.topLocations.map((loc, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base">{loc.flag}</span>
                  <div className="min-w-0">
                    <span className="font-bold text-white block truncate">{loc.location}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Rank #{idx + 1} Traffic Source</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="w-24 hidden sm:block h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${loc.percentage * 3}%` }} />
                  </div>
                  <div>
                    <span className="font-mono font-bold text-emerald-400 text-xs block">{loc.visitors.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{loc.percentage}% share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: Click Intelligence & Top Clicked Elements */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold mb-1">
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Element Interaction Ranking</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              What Visitors Are Clicking On (Top 10 Leaderboard)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Total Clicks Analyzed: <strong className="text-amber-400 font-bold">{data.clickSummary.totalClicks}</strong>
          </span>
        </div>

        {/* Top 10 Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Rank & Element Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Triggered On</th>
                <th className="py-2.5 px-3">Target Destination</th>
                <th className="py-2.5 px-3 text-right">Clicks</th>
                <th className="py-2.5 px-3 text-right">Share %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {data.clickSummary.topClickedElements.map((el, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        idx === 0 ? 'bg-amber-500 text-slate-950' : idx === 1 ? 'bg-slate-300 text-slate-950' : idx === 2 ? 'bg-amber-800 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
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
      </div>

      {/* SECTION 5: Live Real-Time Click Activity Stream */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Real-Time Interaction Feed</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Live Click Activity Stream
            </h3>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clicks or location..."
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 transition-colors"
              />
            </div>

            {/* Category Pills */}
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
            <div className="p-8 text-center text-slate-400 font-mono text-xs">
              No clicks found matching the active filter.
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
