'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  MousePointerClick,
  Globe,
  GraduationCap,
  Palette,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Laptop
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export type AdminTab = 'analytics' | 'visitors' | 'themes' | 'seo' | 'school_mis' | 'appointments' | 'inquiries' | 'settings';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  pendingAppointmentsCount: number;
  newInquiriesCount: number;
  children: React.ReactNode;
}

interface NavGroup {
  groupName: string;
  items: {
    id: AdminTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number;
    badgeText?: string;
    isNew?: boolean;
  }[];
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

  // Sidebar expand/collapse state with localStorage persistence
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('dss_admin_sidebar_expanded');
    if (saved !== null) {
      setIsExpanded(saved === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      localStorage.setItem('dss_admin_sidebar_expanded', String(next));
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navGroups: NavGroup[] = [
    {
      groupName: 'DESIGN & FRONT PAGE',
      items: [
        { 
          id: 'themes', 
          label: 'Themes & Front Page', 
          icon: Palette,
          badgeText: '+ Studio',
          isNew: true
        },
      ],
    },
    {
      groupName: 'GROWTH & ANALYTICS',
      items: [
        { id: 'analytics', label: 'Analytics & Funnel', icon: BarChart3 },
        { id: 'visitors', label: 'Visitors & Clicks', icon: MousePointerClick },
        { id: 'seo', label: 'Google Search & SEO', icon: Globe },
      ],
    },
    {
      groupName: 'SOFTWARE & PRODUCTS',
      items: [
        { id: 'school_mis', label: 'School MIS & Licenses', icon: GraduationCap },
      ],
    },
    {
      groupName: 'OPERATIONS & LEADS',
      items: [
        { id: 'inquiries', label: 'Leads & Inquiries', icon: Inbox, badge: newInquiriesCount },
        { id: 'appointments', label: 'Appointments', icon: CalendarDays, badge: pendingAppointmentsCount },
      ],
    },
    {
      groupName: 'ADMINISTRATION',
      items: [
        { id: 'settings', label: 'Security & Settings', icon: Settings },
      ],
    },
  ];

  // Helper to find current active item info
  const allItems = navGroups.flatMap((g) => g.items);
  const currentItem = allItems.find((i) => i.id === activeTab) || allItems[0];
  const CurrentIcon = currentItem.icon;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      
      {/* ── Top Header Bar ── */}
      <header className="sticky top-0 z-40 bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-xl h-16 flex items-center justify-between px-3 sm:px-6">
        
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {/* Brand Logo Link */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-indigo-600/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm text-white tracking-tight">
                  {SITE_CONFIG.brandName}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/40 font-mono font-bold">
                  ADMIN
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Executive Operations
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Current Section Breadcrumb Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs">
          <CurrentIcon className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400 font-mono">Section:</span>
          <span className="font-bold text-white font-mono">{currentItem.label}</span>
          {currentItem.isNew && (
            <span className="px-1.5 py-0.2 rounded bg-indigo-600 text-white text-[9px] font-mono font-bold uppercase">
              STUDIO
            </span>
          )}
        </div>

        {/* Right: Actions & User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live site button */}
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium transition-colors"
          >
            <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">View Site</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          {/* Admin badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">{adminUser?.username || 'admin'}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-xs text-rose-300 font-semibold transition-all cursor-pointer"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ── Main Body with Sidebar + Content Area ── */}
      <div className="flex-1 flex w-full">
        
        {/* ── Desktop Sidebar ── */}
        <aside
          className={`hidden lg:flex flex-col border-r border-slate-800/80 bg-slate-950/70 backdrop-blur-xl transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto select-none shrink-0 ${
            isExpanded ? 'w-64' : 'w-20'
          }`}
        >
          {/* Navigation Groups */}
          <div className="flex-1 py-4 px-3 space-y-5">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                {isExpanded && (
                  <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-1.5">
                    {group.groupName}
                  </div>
                )}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center rounded-xl text-xs font-medium transition-all cursor-pointer group relative ${
                        isExpanded ? 'px-3 py-2.5 justify-between' : 'p-3 justify-center'
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-lg shadow-indigo-600/25 ring-1 ring-white/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                      }`}
                      title={!isExpanded ? item.label : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : item.id === 'themes' ? 'text-indigo-400' : 'text-cyan-400'
                        }`} />
                        {isExpanded && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {/* Badges */}
                      {isExpanded && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badgeText && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-700/60">
                              {item.badgeText}
                            </span>
                          )}
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isActive ? 'bg-white text-indigo-950' : 'bg-indigo-600 text-white'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Small badge dot in collapsed mode */}
                      {!isExpanded && (item.badge || item.badgeText) && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 text-center">
            {isExpanded ? (
              <button
                onClick={toggleSidebar}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-800"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Collapse Sidebar</span>
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="w-full p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-800"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </aside>

        {/* ── Mobile Slide-Over Drawer Menu ── */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative w-72 max-w-[85vw] bg-slate-950 border-r border-slate-800 flex flex-col h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-white font-heading text-sm">Navigation Menu</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {navGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold mb-1">
                      {group.groupName}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold'
                              : 'text-slate-400 hover:text-white hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                            <span>{item.label}</span>
                          </div>

                          {item.badgeText && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-700">
                              {item.badgeText}
                            </span>
                          )}
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-600 text-white">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Content View Area ── */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Quick Segmented Horizontal Bar (Visible on all screens, wrapping so it NEVER hides!) */}
          <div className="bg-slate-900/50 border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 mr-2 hidden sm:inline uppercase tracking-wider">
              Quick Nav:
            </span>
            {allItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : 'bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.id === 'themes' ? 'text-indigo-400' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                  {item.badgeText && (
                    <span className="px-1 py-0.2 rounded text-[8px] font-mono uppercase bg-indigo-950 text-indigo-300 border border-indigo-700/60">
                      {item.badgeText}
                    </span>
                  )}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold ${
                      isActive ? 'bg-white text-indigo-950' : 'bg-indigo-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Children Component Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
};
