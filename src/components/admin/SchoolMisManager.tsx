'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  KeyRound, 
  GraduationCap, 
  Plus, 
  Search, 
  Copy, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  Download, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Laptop, 
  Share2, 
  Trash2, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Radio, 
  Eye, 
  EyeOff, 
  Calendar, 
  FileSpreadsheet, 
  Layers, 
  Send,
  Building,
  Activity,
  Server
} from 'lucide-react';
import { 
  SchoolLicense, 
  SchoolLicenseStats, 
  LicensePlan, 
  LicenseStatus,
  SchoolLicenseActivity 
} from '../../types/schoolLicense';
import { schoolLicenseService, LicenseServerData } from '../../services/schoolLicenseService';

export const SchoolMisManager: React.FC = () => {
  const [data, setData] = useState<LicenseServerData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'expired' | 'revoked'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'Basic' | 'Pro' | 'Enterprise'>('all');
  const [unmaskedKeys, setUnmaskedKeys] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [createdLicense, setCreatedLicense] = useState<SchoolLicense | null>(null);
  const [selectedActivityLicense, setSelectedActivityLicense] = useState<SchoolLicense | null>(null);

  // Create form state
  const [formSchoolName, setFormSchoolName] = useState<string>('');
  const [formPlan, setFormPlan] = useState<LicensePlan>('Enterprise');
  const [formValidityPreset, setFormValidityPreset] = useState<'1m' | '3m' | '6m' | '1y' | 'lifetime' | 'custom'>('1y');
  const [formCustomDate, setFormCustomDate] = useState<string>('');
  const [formNotes, setFormNotes] = useState<string>('');
  const [formContactPhone, setFormContactPhone] = useState<string>('');
  const [formContactEmail, setFormContactEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load data
  const loadData = async (silent = false) => {
    if (!silent) setIsRefreshing(true);
    try {
      const res = await schoolLicenseService.fetchLicensesData();
      setData(res);
    } catch (e: any) {
      console.warn('Failed to fetch licenses data:', e);
      const cached = schoolLicenseService.getCachedData();
      if (cached) setData(cached);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial cached render
    const cached = schoolLicenseService.getCachedData();
    if (cached) {
      setData(cached);
      setIsLoading(false);
    }
    loadData();

    // Auto-poll every 15s to update machine heartbeats & activations
    const interval = setInterval(() => loadData(true), 15000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    showNotification(`License key ${key} copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const toggleMask = (id: string) => {
    setUnmaskedKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Generate / Create License
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSchoolName.trim()) {
      showNotification('Please enter the school or institution name', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      let expiresAt: string | null = null;
      const now = new Date();

      if (formValidityPreset === '1m') {
        const d = new Date(now.getTime() + 30 * 86400000);
        expiresAt = d.toISOString().split('T')[0];
      } else if (formValidityPreset === '3m') {
        const d = new Date(now.getTime() + 90 * 86400000);
        expiresAt = d.toISOString().split('T')[0];
      } else if (formValidityPreset === '6m') {
        const d = new Date(now.getTime() + 180 * 86400000);
        expiresAt = d.toISOString().split('T')[0];
      } else if (formValidityPreset === '1y') {
        const d = new Date(now.getTime() + 365 * 86400000);
        expiresAt = d.toISOString().split('T')[0];
      } else if (formValidityPreset === 'custom' && formCustomDate) {
        expiresAt = formCustomDate;
      } else if (formValidityPreset === 'lifetime') {
        expiresAt = null;
      }

      const newLic = await schoolLicenseService.createLicense({
        schoolName: formSchoolName.trim(),
        plan: formPlan,
        expiresAt,
        notes: formNotes.trim(),
        contactPhone: formContactPhone.trim(),
        contactEmail: formContactEmail.trim(),
      });

      setCreatedLicense(newLic);
      showNotification(`License key generated successfully for ${newLic.schoolName}!`);
      loadData(true);

      // Reset form fields
      setFormSchoolName('');
      setFormNotes('');
      setFormContactPhone('');
      setFormContactEmail('');
      setFormCustomDate('');
    } catch (err: any) {
      showNotification(err?.message || 'Failed to create license', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Machine Binding Lock
  const handleResetMachine = async (id: string, schoolName: string) => {
    if (confirm(`Reset machine binding lock for "${schoolName}"?\n\nThis will allow the school to activate and use their license on a new computer or after formatting Windows.`)) {
      try {
        await schoolLicenseService.resetMachineLock(id);
        showNotification(`PC Lock reset for ${schoolName}. Ready to bind to any new computer.`);
        loadData(true);
      } catch (e: any) {
        showNotification(e?.message || 'Failed to reset machine lock', 'error');
      }
    }
  };

  // Extend Expiry
  const handleExtendExpiry = async (id: string, schoolName: string, daysOrLifetime: number | 'lifetime') => {
    const isLife = daysOrLifetime === 'lifetime';
    const label = isLife ? 'Lifetime (Permanent)' : `+${daysOrLifetime} Days`;
    if (confirm(`Extend license for "${schoolName}" by ${label}?`)) {
      try {
        await schoolLicenseService.extendExpiry(id, isLife ? undefined : daysOrLifetime, isLife);
        showNotification(`License extended (${label}) for ${schoolName}!`);
        loadData(true);
      } catch (e: any) {
        showNotification(e?.message || 'Failed to extend license', 'error');
      }
    }
  };

  // Toggle Status (Revoke / Activate)
  const handleToggleStatus = async (id: string, schoolName: string, currentStatus: LicenseStatus) => {
    const nextStatus: LicenseStatus = currentStatus === 'revoked' ? 'active' : 'revoked';
    const actionLabel = nextStatus === 'revoked' ? 'REVOKE and BLOCK' : 'RE-ACTIVATE';
    if (confirm(`Are you sure you want to ${actionLabel} the license for "${schoolName}"?`)) {
      try {
        await schoolLicenseService.updateStatus(id, nextStatus);
        showNotification(`License status for ${schoolName} updated to ${nextStatus}.`);
        loadData(true);
      } catch (e: any) {
        showNotification(e?.message || 'Failed to update license status', 'error');
      }
    }
  };

  // Delete License
  const handleDeleteLicense = async (id: string, schoolName: string) => {
    if (confirm(`Are you sure you want to permanently delete the license for "${schoolName}"? This action cannot be undone.`)) {
      try {
        await schoolLicenseService.deleteLicense(id);
        showNotification(`License for "${schoolName}" was permanently removed.`);
        loadData(true);
      } catch (e: any) {
        showNotification(e?.message || 'Failed to delete license', 'error');
      }
    }
  };

  // Filtered Licenses
  const filteredLicenses = useMemo(() => {
    if (!data?.licenses) return [];
    return data.licenses.filter(l => {
      // Query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        l.schoolName.toLowerCase().includes(q) || 
        l.key.toLowerCase().includes(q) || 
        (l.notes && l.notes.toLowerCase().includes(q)) ||
        (l.machineId && l.machineId.toLowerCase().includes(q));

      // Status filter
      let matchesStatus = true;
      const now = new Date();
      const isExpired = l.status === 'expired' || (l.expiresAt ? new Date(l.expiresAt) < now : false);

      if (statusFilter === 'active') matchesStatus = l.status === 'active' && !isExpired;
      else if (statusFilter === 'inactive') matchesStatus = l.status === 'inactive';
      else if (statusFilter === 'expired') matchesStatus = isExpired;
      else if (statusFilter === 'revoked') matchesStatus = l.status === 'revoked';

      // Plan filter
      const matchesPlan = planFilter === 'all' || l.plan === planFilter;

      return matchesQuery && matchesStatus && matchesPlan;
    });
  }, [data?.licenses, searchQuery, statusFilter, planFilter]);

  // WhatsApp share link generator
  const getWhatsAppShareUrl = (lic: SchoolLicense) => {
    const expText = lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString() : 'Permanent Lifetime';
    const message = `🏫 *SchoolMIS Desktop ERP License Key*\n\n` +
      `*School Name:* ${lic.schoolName}\n` +
      `*Plan:* ${lic.plan} Edition\n` +
      `*License Key:* \`${lic.key}\`\n` +
      `*Validity:* ${expText}\n\n` +
      `*How to Activate:*\n` +
      `1. Open SchoolMIS on your Windows Computer\n` +
      `2. Go to the "Activate" Tab\n` +
      `3. Enter your License Key and School Name\n` +
      `4. Click "Activate License" to unlock all modules.\n\n` +
      `Support: Digital Simple Solution (+91 85006 99708)`;

    return `https://wa.me/${lic.contactPhone ? lic.contactPhone.replace(/[^0-9]/g, '') : ''}?text=${encodeURIComponent(message)}`;
  };

  if (isLoading && !data) {
    return (
      <div className="p-16 text-center text-slate-400 font-mono">
        <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin text-cyan-400" />
        <span>Loading SchoolMIS license server database & active school deployments...</span>
      </div>
    );
  }

  const stats = data?.stats || {
    total: 0,
    active: 0,
    inactive: 0,
    expired: 0,
    revoked: 0,
    plans: { Basic: 0, Pro: 0, Enterprise: 0 }
  };

  const railwayOnline = data?.railwayStatus?.online;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-2 border ${
          feedback.type === 'success' 
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
            : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
        }`}>
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white text-sm">✕</button>
        </div>
      )}

      {/* Top Banner & Control Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>SchoolMIS Enterprise Master Control</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight flex items-center gap-3">
            <span>School MIS Software & License Manager</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Generate, validate, and issue software activation licenses for schools. Control PC hardware binding locks, remote renewals, and OTA updates from one central dashboard.
          </p>

          {/* Dual Server Cluster Health Badges */}
          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DSS Cloud License Engine: <strong>LIVE (/api/activate)</strong></span>
            </div>

            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border ${
              railwayOnline 
                ? 'bg-indigo-950/80 border-indigo-500/30 text-indigo-300' 
                : 'bg-amber-950/80 border-amber-500/30 text-amber-300'
            }`}>
              <Server className="w-3 h-3 text-cyan-400" />
              <span>Railway Server: <strong>{railwayOnline ? `Online (${data?.railwayStatus?.latencyMs}ms)` : 'Connecting'}</strong></span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 relative z-10 flex-wrap">
          <button
            onClick={() => loadData()}
            disabled={isRefreshing}
            className="p-3 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold"
            title="Refresh License Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>

          <button
            onClick={() => {
              setCreatedLicense(null);
              setIsCreateOpen(true);
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New License</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: 'Total Licenses Issued',
            value: stats.total.toString(),
            sub: 'In database store',
            icon: KeyRound,
            color: 'from-blue-600 to-cyan-500',
            textColor: 'text-cyan-300',
          },
          {
            label: 'Active Client Schools',
            value: stats.active.toString(),
            sub: 'Hardware bound & live',
            icon: ShieldCheck,
            color: 'from-emerald-500 to-teal-500',
            textColor: 'text-emerald-400',
          },
          {
            label: 'Pending Activation',
            value: stats.inactive.toString(),
            sub: 'Ready for installation',
            icon: Clock,
            color: 'from-indigo-500 to-purple-500',
            textColor: 'text-indigo-300',
          },
          {
            label: 'Expired / Expiring Soon',
            value: stats.expired.toString(),
            sub: 'Requires renewal',
            icon: AlertCircle,
            color: 'from-amber-500 to-orange-500',
            textColor: 'text-amber-400',
          },
          {
            label: 'Enterprise Edition',
            value: stats.plans.Enterprise.toString(),
            sub: `Pro: ${stats.plans.Pro} • Basic: ${stats.plans.Basic}`,
            icon: Sparkles,
            color: 'from-purple-500 to-pink-500',
            textColor: 'text-purple-300',
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{card.label}</span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shrink-0`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className={`text-2xl font-extrabold font-heading ${card.textColor}`}>{card.value}</div>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Software Deployment, Download & OTA Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>SchoolMIS Desktop Software Release (v1.3.0)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                Stable Windows x64
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Includes Admissions, Daily Attendance Register, Weekly Timetable Generator, Fee Receipts (INR), and Over-The-Air Updater.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <a
            href="/free-school-management-software"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Showcase Page</span>
          </a>

          <a
            href="/api/updates/check"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-400" />
            <span>Check OTA Update API</span>
          </a>
        </div>
      </div>

      {/* Local win-unpacked & End-Software Modification Pipeline */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                End-Software (win-unpacked) Management & Build Pipeline
              </h3>
              <p className="text-xs text-slate-400">
                Directly modify frontend UI, fee receipt formats, and attendance registers. Sync changes instantly to <code>SchoolMIS.exe</code>
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-500/30">
            D:\files\win-unpacked\SchoolMIS.exe
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-[11px]">1</span>
              <span>Edit Source Code</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Modify HTML, CSS, fee calculation logic, or print designs in <code className="text-cyan-300 font-mono text-[10px]">D:\files\app_source\src\</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[11px]">2</span>
              <span>1-Second Compile (Asar Pack)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Run <code className="text-emerald-300 font-mono text-[10px]">npm run pack:schoolmis</code>. Replaces <code className="text-emerald-300 font-mono text-[10px]">win-unpacked\resources\app.asar</code> instantly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-[11px]">3</span>
              <span>Test or Push OTA Update</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Launch <code className="text-indigo-300 font-mono text-[10px]">SchoolMIS.exe</code> to test changes, or deploy OTA updates to all client school PCs automatically!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Licenses Table */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>Issued School Licenses & PC Binding Telemetry</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Showing {filteredLicenses.length} of {data?.licenses.length || 0} registered schools.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search school or license key..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-56 sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active (Bound)</option>
              <option value="inactive">Inactive (Pending)</option>
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value as any)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Pro">Pro</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px] bg-slate-950/40">
                <th className="py-3 px-4">School & Notes</th>
                <th className="py-3 px-4">License Key</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Hardware PC Lock</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLicenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <KeyRound className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-50" />
                    <span>No school licenses match your search filters.</span>
                  </td>
                </tr>
              ) : (
                filteredLicenses.map((lic) => {
                  const isUnmasked = !!unmaskedKeys[lic.id];
                  const isCopied = copiedId === lic.id;
                  const isExpired = lic.status === 'expired' || (lic.expiresAt ? new Date(lic.expiresAt) < new Date() : false);

                  return (
                    <tr key={lic.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* School Name & Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{lic.schoolName}</span>
                        </div>
                        {lic.notes && (
                          <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {lic.notes}
                          </div>
                        )}
                        {lic.contactPhone && (
                          <div className="text-[10px] font-mono text-cyan-400/80 mt-0.5">
                            📞 {lic.contactPhone}
                          </div>
                        )}
                      </td>

                      {/* License Key */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 text-[11px] tracking-wider select-all">
                            {isUnmasked ? lic.key : `${lic.key.slice(0, 9)}••••••••`}
                          </span>

                          <button
                            onClick={() => toggleMask(lic.id)}
                            className="text-slate-400 hover:text-slate-200 p-1"
                            title={isUnmasked ? 'Hide License Key' : 'Reveal License Key'}
                          >
                            {isUnmasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => handleCopyKey(lic.key, lic.id)}
                            className="text-slate-400 hover:text-cyan-300 p-1"
                            title="Copy License Key"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                          lic.plan === 'Enterprise'
                            ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                            : lic.plan === 'Pro'
                            ? 'bg-purple-950 text-purple-300 border-purple-500/40'
                            : 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                        }`}>
                          {lic.plan}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                          lic.status === 'revoked'
                            ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                            : isExpired
                            ? 'bg-red-950 text-red-300 border-red-500/40'
                            : lic.status === 'active'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-950 text-slate-400 border-slate-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            lic.status === 'revoked' ? 'bg-rose-400' : isExpired ? 'bg-red-400' : lic.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                          }`} />
                          <span className="capitalize">{isExpired && lic.status !== 'revoked' ? 'Expired' : lic.status}</span>
                        </span>
                      </td>

                      {/* Hardware PC Lock */}
                      <td className="py-3.5 px-4">
                        {lic.machineId ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300">
                              <Laptop className="w-3 h-3 text-emerald-400" />
                              <span>Bound: {lic.machineId.slice(0, 8)}...</span>
                            </span>
                            <div className="text-[10px] text-slate-400">
                              {lic.pings || 0} logins • {lic.activationCount || 1} activations
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-400">
                            Unbound (Ready for PC)
                          </span>
                        )}
                      </td>

                      {/* Expiry Date */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-[11px] text-slate-300">
                          {lic.expiresAt ? (
                            <span className={isExpired ? 'text-rose-400 font-bold' : ''}>
                              {lic.expiresAt}
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold">Lifetime (∞)</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* WhatsApp Share */}
                          <a
                            href={getWhatsAppShareUrl(lic)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-800/40 transition-colors"
                            title="Share License via WhatsApp"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </a>

                          {/* Activity Log */}
                          <button
                            onClick={() => setSelectedActivityLicense(lic)}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                            title="View Activation & Login Audit Log"
                          >
                            <Activity className="w-3.5 h-3.5 text-cyan-400" />
                          </button>

                          {/* Reset Machine Lock */}
                          {lic.machineId && (
                            <button
                              onClick={() => handleResetMachine(lic.id, lic.schoolName)}
                              className="p-1.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-800/40 transition-colors cursor-pointer"
                              title="Reset Machine Binding Lock (School changed computer)"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Extend Expiry (+30 Days) */}
                          <button
                            onClick={() => handleExtendExpiry(lic.id, lic.schoolName, 30)}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer text-[10px] font-mono"
                            title="Extend +30 Days"
                          >
                            +30d
                          </button>

                          {/* Revoke / Reactivate */}
                          <button
                            onClick={() => handleToggleStatus(lic.id, lic.schoolName, lic.status)}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              lic.status === 'revoked'
                                ? 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border-emerald-800/40'
                                : 'bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 border-amber-800/40'
                            }`}
                            title={lic.status === 'revoked' ? 'Reactivate License' : 'Revoke / Suspend License'}
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteLicense(lic.id, lic.schoolName)}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer"
                            title="Delete License"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* "Generate New License" Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">Issue SchoolMIS License</h3>
                  <p className="text-xs text-slate-400">Generates encrypted license key for Windows desktop app</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsCreateOpen(false);
                  setCreatedLicense(null);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {createdLicense ? (
              /* Success View */
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">License Generated Successfully!</h4>
                  <p className="text-xs text-slate-300">
                    Give this key to <strong>{createdLicense.schoolName}</strong> to activate their software.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center space-y-2">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Official License Key</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-300 tracking-wider select-all">
                    {createdLicense.key}
                  </div>
                  <div className="text-xs text-slate-400">
                    Plan: <strong className="text-white">{createdLicense.plan}</strong> • Validity:{' '}
                    <strong className="text-white">{createdLicense.expiresAt || 'Lifetime'}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleCopyKey(createdLicense.key, createdLicense.id)}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Key</span>
                  </button>

                  <a
                    href={getWhatsAppShareUrl(createdLicense)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>

                <button
                  onClick={() => setCreatedLicense(null)}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Generate Another License
                </button>
              </div>
            ) : (
              /* Create Form */
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">
                    School / Institution Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rainbow English Medium School"
                    value={formSchoolName}
                    onChange={(e) => setFormSchoolName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">Software Edition / Plan</label>
                    <select
                      value={formPlan}
                      onChange={(e) => setFormPlan(e.target.value as LicensePlan)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Enterprise">Enterprise (All Modules)</option>
                      <option value="Pro">Pro (Academic + Fees)</option>
                      <option value="Basic">Basic (Standard)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">Validity Period</label>
                    <select
                      value={formValidityPreset}
                      onChange={(e) => setFormValidityPreset(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="1m">1 Month (Trial)</option>
                      <option value="3m">3 Months</option>
                      <option value="6m">6 Months</option>
                      <option value="1y">1 Year (Annual)</option>
                      <option value="lifetime">Lifetime (Permanent)</option>
                      <option value="custom">Custom Date...</option>
                    </select>
                  </div>
                </div>

                {formValidityPreset === 'custom' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">Select Expiry Date</label>
                    <input
                      type="date"
                      required
                      value={formCustomDate}
                      onChange={(e) => setFormCustomDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">Contact Phone (WhatsApp)</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      value={formContactPhone}
                      onChange={(e) => setFormContactPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300 block">Contact Email</label>
                    <input
                      type="email"
                      placeholder="school@example.com"
                      value={formContactEmail}
                      onChange={(e) => setFormContactEmail(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 block">Internal Notes / Deal Terms</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Principal approved 1-year trial. Contact person: Mr. Ramesh."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Generating...' : 'Issue License Key'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Activity Log Modal */}
      {selectedActivityLicense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Activation & Heartbeat Audit Log</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Telemetry logs for <strong>{selectedActivityLicense.schoolName}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedActivityLicense(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Summary Pill */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-mono">Bound PC ID</span>
                <div className="text-xs font-mono font-bold text-white truncate mt-0.5">
                  {selectedActivityLicense.machineId || 'Unbound'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-mono">Logins / Pings</span>
                <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                  {selectedActivityLicense.pings || 0}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-mono">Status</span>
                <div className="text-xs font-mono font-bold text-cyan-300 capitalize mt-0.5">
                  {selectedActivityLicense.status}
                </div>
              </div>
            </div>

            {/* Log Stream */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {!selectedActivityLicense.activityLog || selectedActivityLicense.activityLog.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No activity recorded yet for this license.
                </div>
              ) : (
                selectedActivityLicense.activityLog.map((act, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-start justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{act.type}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({act.ip})</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{act.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {new Date(act.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedActivityLicense(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
