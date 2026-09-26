'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Globe, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  KeyRound, 
  RefreshCw, 
  MousePointerClick, 
  Eye, 
  Target, 
  FileText, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Plus, 
  Trash2, 
  X, 
  ShieldCheck, 
  HelpCircle,
  BarChart3,
  Award,
  Zap
} from 'lucide-react';
import { 
  GSCSummary, 
  GSCQueryRow, 
  GSCConfig 
} from '../../types/googleSearchConsole';
import { googleSearchConsoleService } from '../../services/googleSearchConsoleService';
import { SITE_CONFIG } from '../../config/siteConfig';

export const GoogleSearchConsoleView: React.FC = () => {
  const [data, setData] = useState<GSCSummary | null>(null);
  const [dateRange, setDateRange] = useState<'7d' | '28d' | '90d'>('28d');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Target keyword input state
  const [newKeyword, setNewKeyword] = useState<string>('');
  const [isAddingKeyword, setIsAddingKeyword] = useState<boolean>(false);

  // Setup Modal Form State
  const [formSiteUrl, setFormSiteUrl] = useState<string>(SITE_CONFIG.siteUrl);
  const [formClientEmail, setFormClientEmail] = useState<string>('');
  const [formPrivateKey, setFormPrivateKey] = useState<string>('');
  const [isTestingConn, setIsTestingConn] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSavingConfig, setIsSavingConfig] = useState<boolean>(false);

  const loadData = async (range: '7d' | '28d' | '90d' = dateRange) => {
    setIsRefreshing(true);
    try {
      const summary = await googleSearchConsoleService.fetchSummary(range);
      setData(summary);
      if (summary.siteUrl) {
        setFormSiteUrl(summary.siteUrl);
      }
    } catch (e) {
      console.error('Failed to load Google Search Console summary:', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData(dateRange);
  }, [dateRange]);

  const handleRangeChange = (range: '7d' | '28d' | '90d') => {
    setDateRange(range);
  };

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;

    setIsAddingKeyword(true);
    try {
      const res = await googleSearchConsoleService.addTargetKeyword(newKeyword.trim());
      if (res.success) {
        setNewKeyword('');
        setFeedbackMessage(res.message);
        setTimeout(() => setFeedbackMessage(''), 4000);
        await loadData(dateRange);
      }
    } catch (e: any) {
      setFeedbackMessage(e?.message || 'Failed to add keyword.');
    } finally {
      setIsAddingKeyword(false);
    }
  };

  const handleRemoveKeyword = async (keyword: string) => {
    if (!confirm(`Stop monitoring target keyword "${keyword}"?`)) return;
    try {
      const res = await googleSearchConsoleService.removeTargetKeyword(keyword);
      if (res.success) {
        setFeedbackMessage(res.message);
        setTimeout(() => setFeedbackMessage(''), 4000);
        await loadData(dateRange);
      }
    } catch (e: any) {
      setFeedbackMessage(e?.message || 'Failed to remove keyword.');
    }
  };

  const handleTestConnection = async () => {
    setIsTestingConn(true);
    setTestResult(null);
    try {
      // First save draft credentials if provided
      if (formClientEmail || formPrivateKey) {
        await googleSearchConsoleService.saveConfig({
          siteUrl: formSiteUrl,
          clientEmail: formClientEmail,
          privateKey: formPrivateKey,
        });
      }
      const res = await googleSearchConsoleService.testConnection();
      setTestResult(res);
    } catch (e: any) {
      setTestResult({ success: false, message: e?.message || 'Connection test failed' });
    } finally {
      setIsTestingConn(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      const res = await googleSearchConsoleService.saveConfig({
        siteUrl: formSiteUrl,
        clientEmail: formClientEmail,
        privateKey: formPrivateKey,
      });
      setFeedbackMessage(res.message);
      setTimeout(() => setFeedbackMessage(''), 4000);
      setIsSetupModalOpen(false);
      await loadData(dateRange);
    } catch (e: any) {
      setFeedbackMessage(e?.message || 'Failed to save configuration');
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Filter queries by search query
  const filteredQueries = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data.queries;
    const q = searchQuery.toLowerCase();
    return data.queries.filter((item) => item.query.toLowerCase().includes(q));
  }, [data, searchQuery]);

  // Position Badge Helper
  const getRankBadge = (pos: number) => {
    if (pos <= 3) {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50 flex items-center gap-1">
          <Award className="w-3 h-3 text-emerald-400" />
          <span>#{pos.toFixed(1)} Top 3</span>
        </span>
      );
    }
    if (pos <= 10) {
      return (
        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/50 flex items-center gap-1">
          <span>#{pos.toFixed(1)} Page 1</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700/50 flex items-center gap-1">
        <span>#{pos.toFixed(1)} Page 2+</span>
      </span>
    );
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <span title="Rank climbing"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /></span>;
    if (trend === 'down') return <span title="Rank dropped"><TrendingDown className="w-3.5 h-3.5 text-rose-400" /></span>;
    return <span title="Rank stable"><Minus className="w-3.5 h-3.5 text-slate-400" /></span>;
  };

  if (isLoading || !data) {
    return (
      <div className="p-16 text-center text-slate-400 font-mono">
        <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin text-cyan-400" />
        <span>Connecting to Google Search API & pulling ranking telemetry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Google Search Console Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Search Console API</span>
            </span>

            {data.isConnected ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-mono border border-emerald-700/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Google API Linked</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[11px] font-mono border border-amber-700/60">
                <span>Setup Mode • Baseline Telemetry Active</span>
              </span>
            )}

            <span className="text-[11px] text-slate-400 font-mono">
              Site: <code className="text-cyan-300">{data.siteUrl}</code>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Google Search Rankings & Keyword Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Monitor real organic search impressions, Google click-through rates (CTR), and search positions for target keywords like <strong>Free School software</strong> and brand searches.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {/* Date range picker */}
          <div className="flex items-center bg-slate-950/90 rounded-xl p-1 border border-slate-800 text-xs font-mono">
            {(['7d', '28d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRangeChange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
                  dateRange === r
                    ? 'bg-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '28d' ? '28 Days' : '3 Months'}
              </button>
            ))}
          </div>

          {/* Setup / API Key Modal Button */}
          <button
            onClick={() => setIsSetupModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-950/40"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{data.isConnected ? 'API Credentials' : 'Connect GSC API'}</span>
          </button>

          {/* Refresh */}
          <button
            onClick={() => loadData(dateRange)}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Refresh search console data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* 4 Core Google Search KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Organic Clicks */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold">
              GOOGLE SEARCH
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Search Clicks</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.totalClicks.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Visitors clicking from Google search
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
            <span>Range: {data.dateRange}</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Total Search Impressions */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Eye className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 font-bold">
              VISIBILITY
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Search Impressions</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.totalImpressions.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Times your site appeared on Google
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-indigo-300 flex items-center justify-between">
            <span>Google search visibility</span>
            <Globe className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Average Click-Through Rate */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 font-bold">
              AVG CTR
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Average Search CTR</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1">
              {data.averageCtr}%
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Percentage of searchers clicking
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
            Industry Benchmark: ~2.5% - 4.5%
          </div>
        </div>

        {/* Card 4: Average Ranking Position */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 font-bold">
              AVG RANK
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Average Google Position</span>
            <div className="text-3xl font-extrabold text-white font-heading mt-1 flex items-baseline gap-2">
              <span>#{data.averagePosition}</span>
              <span className="text-xs text-slate-400 font-normal">across all queries</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
              Positions 1–10 = Page 1 of Google
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-300 flex items-center justify-between">
            <span>Target: Top 3 on Google</span>
            <Zap className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* SECTION 1: Target Keywords Rank Tracker (VIP Focus) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-indigo-500/30 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Target SEO Keywords Monitor</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Priority Ranking Tracker (e.g. &quot;Free School software&quot;)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Google search ranking position and visibility metrics for your most valuable revenue-driving keywords.
            </p>
          </div>

          {/* Inline Add Keyword Form */}
          <form onSubmit={handleAddKeyword} className="flex items-center gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Track keyword (e.g. free school software)..."
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder-slate-500 font-mono w-64 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isAddingKeyword || !newKeyword.trim()}
              className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {/* Target Keywords Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.targetKeywords.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white capitalize group-hover:text-cyan-300 transition-colors">
                    {item.query}
                  </h4>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(item.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-cyan-400/80 hover:text-cyan-300 inline-flex items-center gap-1 font-mono mt-0.5"
                  >
                    <span>Inspect live on Google Search</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="flex items-center gap-1.5">
                  {getRankBadge(item.position)}
                  <button
                    onClick={() => handleRemoveKeyword(item.query)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer"
                    title="Remove from target keywords"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
                <div className="p-2 rounded-xl bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block">Clicks</span>
                  <strong className="text-xs text-white">{item.clicks}</strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block">Impressions</span>
                  <strong className="text-xs text-white">{item.impressions}</strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block">CTR</span>
                  <strong className="text-xs text-emerald-400">{item.ctr}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Daily Performance Trend (Impressions & Clicks) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Daily Google Search Performance</span>
            </h3>
            <p className="text-xs text-slate-400">
              Daily organic impressions and search clicks over the selected timeframe.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-indigo-500/80" />
              <span>Impressions</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-cyan-400" />
              <span>Clicks</span>
            </div>
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div className="h-44 w-full flex items-end gap-1.5 pt-6 pb-2 overflow-x-auto">
          {data.dailyTrends.map((d, idx) => {
            const maxImp = Math.max(...data.dailyTrends.map((t) => t.impressions), 1);
            const impHeight = Math.max(8, Math.round((d.impressions / maxImp) * 100));
            const maxClk = Math.max(...data.dailyTrends.map((t) => t.clicks), 1);
            const clkHeight = Math.max(4, Math.round((d.clicks / maxClk) * 60));

            return (
              <div key={idx} className="flex-1 min-w-[14px] flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-slate-950 border border-slate-700 p-2 rounded-xl text-[10px] font-mono shadow-2xl z-30 pointer-events-none whitespace-nowrap">
                  <span className="text-cyan-300 font-bold">{d.formattedDate}</span>
                  <span className="text-slate-300">{d.impressions} Impressions</span>
                  <span className="text-emerald-400">{d.clicks} Clicks ({d.ctr}% CTR)</span>
                  <span className="text-amber-300">Avg Rank: #{d.position}</span>
                </div>

                <div className="w-full flex items-end justify-center gap-0.5 h-32">
                  <div
                    style={{ height: `${impHeight}%` }}
                    className="w-1.5 sm:w-2 bg-indigo-600/70 group-hover:bg-indigo-500 rounded-t-sm transition-all"
                  />
                  <div
                    style={{ height: `${clkHeight}%` }}
                    className="w-1.5 sm:w-2 bg-cyan-400 group-hover:bg-cyan-300 rounded-t-sm transition-all shadow-sm"
                  />
                </div>
                <span className="text-[9px] text-slate-500 font-mono hidden md:block">
                  {idx % 4 === 0 ? d.formattedDate.split(' ')[1] : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: All Google Search Queries Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Top Google Search Queries</span>
            </h3>
            <p className="text-xs text-slate-400">
              Search phrases users entered into Google that led to your website appearing.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter search queries..."
                className="w-full pl-9 pr-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Google Search Query</th>
                <th className="py-2.5 px-3">Clicks</th>
                <th className="py-2.5 px-3">Impressions</th>
                <th className="py-2.5 px-3">CTR</th>
                <th className="py-2.5 px-3">Avg Position</th>
                <th className="py-2.5 px-3">Google Rank Tier</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredQueries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-mono">
                    No matching search queries found.
                  </td>
                </tr>
              ) : (
                filteredQueries.map((q, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(q.trend)}
                        <span className="font-bold text-white">{q.query}</span>
                        {q.isTargetKeyword && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                            Target
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-cyan-300 font-bold">{q.clicks}</td>
                    <td className="py-3 px-3 text-slate-300">{q.impressions.toLocaleString()}</td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">{q.ctr}%</td>
                    <td className="py-3 px-3 text-amber-300 font-bold">#{q.position.toFixed(1)}</td>
                    <td className="py-3 px-3">{getRankBadge(q.position)}</td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(q.query)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 text-[11px]"
                        title="View search result on Google"
                      >
                        <span>Search</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: Top Pages & Device / Geography Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Landing Pages (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Top Ranked Landing Pages on Google</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">By Organic Traffic</span>
          </div>

          <div className="space-y-3">
            {data.pages.map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <a
                    href={p.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{p.title}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <span className="text-[11px] font-mono text-slate-400 block">{p.page}</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="text-right">
                    <span className="text-cyan-300 font-bold block">{p.clicks} clicks</span>
                    <span className="text-[10px] text-slate-400">{p.impressions} imp.</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700 font-bold text-[11px]">
                    #{p.position}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Devices & Countries Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Devices */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Search by Device</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Mobile Dominance</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {data.devices.map((d, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {d.device === 'MOBILE' ? <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> : d.device === 'DESKTOP' ? <Monitor className="w-3.5 h-3.5 text-indigo-400" /> : <Tablet className="w-3.5 h-3.5 text-purple-400" />}
                      <span className="text-white capitalize">{d.device.toLowerCase()}</span>
                    </div>
                    <span className="text-cyan-300 font-bold">{d.percentage}% ({d.clicks} clicks)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Search Geography</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Top Regions</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {data.countries.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 font-bold truncate">{c.country}</span>
                  <span className="text-emerald-400 font-bold shrink-0">{c.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SETUP & CREDENTIALS MODAL */}
      {isSetupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSetupModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-950/60 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Google Search Console API Linker</span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                Connect Google Search Console API
              </h3>
              <p className="text-xs text-slate-400">
                Connect your Google Cloud Service Account to read official Search Analytics straight from Google without rate limits.
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-cyan-300 block">3 Simple Steps to Get Your Google API Credentials:</span>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <li>
                  Open <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-semibold">Google Cloud Console</a> & enable the <strong>Google Search Console API</strong> (Webmasters API).
                </li>
                <li>
                  Go to <strong>IAM & Admin &gt; Service Accounts</strong>, create a Service Account, and generate a JSON Key.
                </li>
                <li>
                  In <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-semibold">Google Search Console</a>, add that Service Account email as a User with <strong>Full / Read</strong> access to your property.
                </li>
              </ol>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Site Property URL in Google Search Console</label>
                <input
                  type="text"
                  value={formSiteUrl}
                  onChange={(e) => setFormSiteUrl(e.target.value)}
                  placeholder="https://www.digitalsimplesolution.online"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Service Account Client Email</label>
                <input
                  type="email"
                  value={formClientEmail}
                  onChange={(e) => setFormClientEmail(e.target.value)}
                  placeholder="dss-gsc-reader@project-id.iam.gserviceaccount.com"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Private Key (PEM or RSA Key format)</label>
                <textarea
                  value={formPrivateKey}
                  onChange={(e) => setFormPrivateKey(e.target.value)}
                  rows={4}
                  placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;...&#10;-----END RSA PRIVATE KEY-----"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                    testResult.success
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-rose-950/80 border-rose-500 text-rose-300'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTestingConn}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingConn ? 'animate-spin' : ''}`} />
                  <span>Test Connection</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsSetupModalOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingConfig}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-95 text-white font-bold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Save & Connect</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
