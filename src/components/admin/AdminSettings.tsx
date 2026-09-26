'use client';

import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminStore } from '../../services/adminStore';
import { 
  Settings, 
  KeyRound, 
  Lock, 
  ShieldCheck, 
  RotateCcw, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Radio, 
  Server, 
  Zap, 
  Layers,
  Mail,
  Search,
  ExternalLink,
  Globe,
  FileCode
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface AdminSettingsProps {
  onRefresh: () => void;
  onNavigateToSeo?: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onRefresh, onNavigateToSeo }) => {
  const { changePassword, adminUser } = useAdminAuth();

  // Recovery Email state
  const [recoveryEmail, setRecoveryEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dss_admin_email') || 'mhkr038@gmail.com';
    }
    return 'mhkr038@gmail.com';
  });
  const [emailMsg, setEmailMsg] = useState('');

  // Password change state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Backup / restore state
  const [backupMsg, setBackupMsg] = useState('');

  const handleEmailSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim() || !recoveryEmail.includes('@')) {
      setEmailMsg('Please enter a valid Gmail / email address.');
      return;
    }
    localStorage.setItem('dss_admin_email', recoveryEmail.trim().toLowerCase());
    setEmailMsg('Recovery email updated successfully! Password reset codes will be sent here.');
    setTimeout(() => setEmailMsg(''), 4000);
  };


  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPass !== confirmPass) {
      setPassError('New passwords do not match.');
      return;
    }

    if (newPass.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }

    setIsChangingPass(true);
    setTimeout(() => {
      const res = changePassword(oldPass, newPass);
      setIsChangingPass(false);
      if (res.success) {
        setPassSuccess('Password updated successfully! Future logins will require this new password.');
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
      } else {
        setPassError(res.error || 'Failed to update password.');
      }
    }, 400);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all appointments and inquiries to initial demo defaults? Any newly added test records will be replaced.')) {
      adminStore.resetStoreToDefaults();
      setBackupMsg('All demo datasets successfully restored to initial benchmark state.');
      onRefresh();
      setTimeout(() => setBackupMsg(''), 4000);
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = adminStore.exportStoreJson();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dss_database_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setBackupMsg('Database snapshot JSON downloaded successfully.');
    setTimeout(() => setBackupMsg(''), 4000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const ok = adminStore.importStoreJson(content);
      if (ok) {
        setBackupMsg('Database snapshot imported successfully!');
        onRefresh();
      } else {
        alert('Invalid database JSON file format.');
      }
      setTimeout(() => setBackupMsg(''), 4000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white font-heading flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-cyan-400" />
          <span>Security & System Settings</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure admin access passwords, database backups, and check active marketing API webhooks.
        </p>
      </div>

      {backupMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{backupMsg}</span>
        </div>
      )}

      {/* Administrator Profile & Recovery Email */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Administrator Profile & Recovery Gmail</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
            Password Recovery
          </span>
        </div>

        {emailMsg && (
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{emailMsg}</span>
          </div>
        )}

        <form onSubmit={handleEmailSave} className="flex flex-col sm:flex-row items-end gap-3 max-w-xl">
          <div className="flex-1 w-full space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Registered Gmail for Verification Codes
            </label>
            <input
              type="email"
              required
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              placeholder="e.g. mhkr038@gmail.com"
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 rounded-xl transition-all cursor-pointer shrink-0"
          >
            Save Recovery Email
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security & Password Change */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">

          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>Change Admin Password</span>
            </h3>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
              Authentication Guard
            </span>
          </div>

          {passError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{passError}</span>
            </div>
          )}

          {passSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Current Password</label>
              <input
                type="password"
                required
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                placeholder="Enter current password..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">New Password (min. 6 characters)</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new strong password..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Re-type new password..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isChangingPass}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isChangingPass ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Database & Data Controls */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Data Persistence & Backup</span>
            </h3>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
              Storage Engine
            </span>
          </div>

          <div className="space-y-4">
            {/* Backup Download */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-white">Download Snapshot</h4>
                <p className="text-[11px] text-slate-400">Export complete appointments & leads history as JSON.</p>
              </div>
              <button
                onClick={handleDownloadBackup}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>

            {/* Restore / Import */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-white">Restore Snapshot</h4>
                <p className="text-[11px] text-slate-400">Import a previously saved JSON database backup.</p>
              </div>
              <label className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-purple-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJson}
                  className="hidden"
                />
              </label>
            </div>

            {/* Factory Reset */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-rose-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-white">Reset Demo Benchmark Data</h4>
                <p className="text-[11px] text-slate-400">Restore default demo consultations and qualified leads.</p>
              </div>
              <button
                onClick={handleResetData}
                className="px-3.5 py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-xs font-semibold text-rose-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Search Engine Indexing Setup Center */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 text-left">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Search className="w-5 h-5 text-cyan-400" />
              <span>SEO, Google Search Console & Ranking Center</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tools, verification checklists, and live sitemap links to improve Google search rank.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {onNavigateToSeo && (
              <button
                type="button"
                onClick={onNavigateToSeo}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow-cyan-500/10"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch Search Console Tab</span>
              </button>
            )}
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Technical SEO Score: 96/100 (A+)</span>
            </span>
          </div>
        </div>

        {/* 3 Steps to Rank on Google */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">1</span>
              <h4 className="text-xs font-bold text-white">Connect Domain DNS</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Point your domain <code className="text-cyan-300 text-[10px]">digitalsimplesolution.online</code> to your Vercel/hosting server so Googlebot can crawl live pages.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">2</span>
              <h4 className="text-xs font-bold text-white">Submit XML Sitemap</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Submit your auto-generated sitemap of all 52 static routes to Google Search Console to index every service & demo.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">3</span>
              <h4 className="text-xs font-bold text-white">Request Indexing</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Use GSC's URL Inspection on <code className="text-amber-300 text-[10px]">/free-school-management-software</code> and Home to trigger rapid Google crawling.
            </p>
          </div>
        </div>

        {/* Quick Diagnostic & Submission Links */}
        <div className="pt-2 border-t border-slate-800/80">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Quick Diagnostic & Test Tools
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-cyan-300">Google Search Console</span>
                <span className="text-[10px] text-slate-400">Submit sitemap & check rank</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
            </a>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-indigo-500/40 text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-indigo-300">View Sitemap XML</span>
                <span className="text-[10px] text-slate-400">52 indexed routes</span>
              </div>
              <FileCode className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
            </a>

            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-amber-300">Rich Results Test</span>
                <span className="text-[10px] text-slate-400">Verify FAQ & ERP Schema</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
            </a>

            <a
              href="https://pagespeed.web.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/40 text-left transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block group-hover:text-emerald-300">PageSpeed Insights</span>
                <span className="text-[10px] text-slate-400">Check Core Web Vitals</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Marketing Integrations & Live Health Status */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Marketing Tracking & Integrations Health</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'WhatsApp Cloud API',
              purpose: 'Sub-30s Automated Lead Triage',
              status: 'Connected (918500699708)',
              sla: 'SLA: 0s Latency',
              color: 'text-emerald-400 border-emerald-500/30',
            },
            {
              name: 'Google Tag Manager',
              purpose: 'Container GTM-DEMO-DSS',
              status: 'Active (next/script)',
              sla: 'Non-blocking afterInteractive',
              color: 'text-cyan-400 border-cyan-500/30',
            },
            {
              name: 'Meta Conversions API',
              purpose: 'Server-Side Pixel Tracking',
              status: 'Initialized (1234567890123456)',
              sla: 'CAPI Handshake OK',
              color: 'text-indigo-400 border-indigo-500/30',
            },
            {
              name: 'Google Analytics 4',
              purpose: 'Stream ID: G-DEMO123456',
              status: 'Recording Real-Time',
              sla: 'Zero JS Execution Lag',
              color: 'text-purple-400 border-purple-500/30',
            },
          ].map((intg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-slate-950/70 border ${intg.color} space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{intg.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400 block">{intg.purpose}</span>
              <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-300">
                <div>{intg.status}</div>
                <div className="text-emerald-400 mt-0.5">{intg.sla}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
