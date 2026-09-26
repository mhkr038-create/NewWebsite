'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  BarChart3, 
  CalendarDays, 
  Inbox, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  Bell,
  CheckCircle2,
  Sparkles,
  MousePointerClick,
  Globe
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export type AdminTab = 'analytics' | 'visitors' | 'seo' | 'appointments' | 'inquiries' | 'settings';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  pendingAppointmentsCount: number;
  newInquiriesCount: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  pendingAppointmentsCount,
  newInquiriesCount,
  children,
}) => {
  const { adminUser, logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'analytics', label: 'Analytics & Funnel', icon: BarChart3 },
    { id: 'visitors', label: 'Visitors & Clicks', icon: MousePointerClick },
    { id: 'seo', label: 'Google Search & SEO', icon: Globe },
    { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: pendingAppointmentsCount },
    { id: 'inquiries', label: 'Leads & Inquiries', icon: Inbox, badge: newInquiriesCount },
    { id: 'settings', label: 'Security & Settings', icon: Settings },
  ];


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pt-20">
      {/* Top Admin Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl h-20 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-indigo-600/20">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/40 font-mono font-bold">
                  ADMIN
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                Executive Growth Operations
              </span>
            </div>
          </Link>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>

          {/* Admin badge */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-left font-mono">
              <span className="text-xs text-white font-bold block leading-none">{adminUser?.username || 'admin'}</span>
              <span className="text-[10px] text-slate-400 leading-none">Super Administrator</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-xs text-rose-300 font-semibold transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>
      </header>

      {/* Navigation Sub-Header */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 sticky top-20 z-30 backdrop-blur-md px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2.5 gap-2 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/25 font-bold'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-white text-indigo-900' : 'bg-indigo-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Real-time Form Synchronization Active</span>
          </div>
        </div>
      </div>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {children}
      </main>
    </div>
  );
};
