'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Zap, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  MousePointerClick,
  Smartphone,
  MapPin,
  Activity
} from 'lucide-react';
import { AnalyticsSummary, Appointment, Inquiry } from '../../services/adminStore';

interface AnalyticsOverviewProps {
  summary: AnalyticsSummary;
  appointments: Appointment[];
  inquiries: Inquiry[];
  onNavigateToAppointments: () => void;
  onNavigateToInquiries: () => void;
  onNavigateToVisitors?: () => void;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  summary,
  appointments,
  inquiries,
  onNavigateToAppointments,
  onNavigateToInquiries,
  onNavigateToVisitors,
}) => {
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'confirmed');
  const newInquiries = inquiries.filter((i) => i.status === 'new');

  const kpis = [
    {
      label: 'Pipeline Value',
      value: `₹${(summary.totalPipelineValue).toLocaleString('en-IN')}`,
      change: 'Real Inquiries Value',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      badge: 'Active Deals',
    },
    {
      label: 'Consultation Bookings',
      value: summary.totalAppointments.toString(),
      subValue: `${confirmedAppointments.length} Confirmed • ${pendingAppointments.length} Pending`,
      change: 'Real Scheduled Calls',
      icon: CalendarCheck,
      color: 'from-indigo-500 to-cyan-500',
      textColor: 'text-cyan-400',
      badge: 'Bookings',
    },
    {
      label: 'Inbound Inquiries',
      value: summary.totalInquiries.toString(),
      subValue: `${newInquiries.length} Actionable New Leads`,
      change: 'Form Submissions',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
      badge: 'Real Leads',
    },
    {
      label: 'Legit Views to Lead CVR',
      value: `${summary.conversionRate}%`,
      subValue: 'Pageviews to Submissions',
      change: 'Calculated Real-Time',
      icon: Target,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-300',
      badge: 'Real Rate',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-slate-900 to-cyan-950/70 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Growth Intelligence Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
            Performance & Lead Pipeline Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Real-time analytics across Meta Ads, Google PPC campaigns, custom landing pages, and WhatsApp lead automation flows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {onNavigateToVisitors && (
            <button
              onClick={onNavigateToVisitors}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-950/40"
            >
              <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Visitors & Clicks</span>
            </button>
          )}

          <button
            onClick={onNavigateToAppointments}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Review Appointments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-slate-950/40"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${kpi.color} p-[1px]`}>
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-400">
                  {kpi.badge}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-medium block">{kpi.label}</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
                  {kpi.value}
                </div>
                {kpi.subValue && (
                  <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                    {kpi.subValue}
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className={kpi.textColor}>{kpi.change}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Visitors & Click Intelligence Fast Bar */}
      {onNavigateToVisitors && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300">Live Website Telemetry</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                  Real-Time Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Monitoring <strong>Real Daily Visitors</strong>, <strong>Actual Device Ratios (Mobile / Desktop / Tablet)</strong>, <strong>Detected Inbound Locations</strong>, and <strong>Live User Clicks</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToVisitors}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto shadow-md"
          >
            <span>Open Visitors & Clicks Station</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Conversion Funnel Breakdown Visual */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Funnel Acquisition Velocity</span>
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Conversion Stage Drop-Off Analysis
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Average SLA Response: <strong className="text-emerald-400">&lt; 45s (WhatsApp Bot)</strong>
          </span>
        </div>

        {/* 5 Funnel Stages */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              stage: '1. Legit Visitors',
              count: `${summary.totalVisitors || 0}`,
              unit: 'Unique Real Visitors',
              pct: '100%',
              color: 'border-indigo-500/40 bg-indigo-950/30',
            },
            {
              stage: '2. Page Views',
              count: `${summary.totalPageViews || 0}`,
              unit: 'Legit Views Recorded',
              pct: summary.totalVisitors > 0 ? `${Math.round(((summary.totalPageViews || 0) / summary.totalVisitors) * 100)}%` : '0%',
              color: 'border-cyan-500/40 bg-cyan-950/30',
            },
            {
              stage: '3. Element Clicks',
              count: `${summary.totalClicks || 0}`,
              unit: 'Interactive User Clicks',
              pct: summary.totalPageViews > 0 ? `${Math.round(((summary.totalClicks || 0) / summary.totalPageViews) * 100)}%` : '0%',
              color: 'border-amber-500/40 bg-amber-950/30',
            },
            {
              stage: '4. Lead Inquiries',
              count: `${summary.totalInquiries}`,
              unit: 'Form Submissions',
              pct: summary.totalVisitors > 0 ? `${((summary.totalInquiries / summary.totalVisitors) * 100).toFixed(1)}%` : '0%',
              color: 'border-purple-500/40 bg-purple-950/30',
            },
            {
              stage: '5. Booked Consults',
              count: `${summary.totalAppointments}`,
              unit: 'Consultations Scheduled',
              pct: `${summary.conversionRate}%`,
              color: 'border-emerald-500/40 bg-emerald-950/30',
            },
          ].map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${f.color} flex flex-col justify-between space-y-3 relative overflow-hidden`}
            >
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">{f.stage}</span>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-heading mt-1">
                  {f.count}
                </div>
                <span className="text-[10px] text-slate-300 block">{f.unit}</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Conversion</span>
                <span className="text-cyan-300 font-bold">{f.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Traffic Channels & Service Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Channels Breakdown */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Traffic & Acquisition Channels</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Last 30 Days</span>
          </div>

          <div className="space-y-4">
            {summary.trafficChannels.map((channel, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{channel.channel}</span>
                  <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                    <span>{channel.visitors.toLocaleString()} visits</span>
                    <span className="text-white font-bold">{channel.leads} leads</span>
                    <span className="text-emerald-400 font-bold">{channel.conversionRate}%</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    style={{ width: `${Math.min(100, channel.conversionRate * 16)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Inquiries Demand Breakdown */}
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Service Demand Distribution</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Total: {summary.totalInquiries + summary.totalAppointments} inquiries</span>
          </div>

          <div className="space-y-4">
            {summary.serviceDemand.map((service, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{service.service}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-400">{service.inquiriesCount} inquiries</span>
                    <span className="text-cyan-400 font-bold">({service.percentage}%)</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                    style={{ width: `${service.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Performance Activity Feed */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>7-Day Growth Momentum</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Daily visitor-to-appointment conversion trends</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {summary.dailyStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-2 text-center"
            >
              <span className="text-[11px] font-mono text-slate-400 font-semibold">{stat.date}</span>
              <div>
                <div className="text-lg font-extrabold text-white font-heading">
                  {stat.appointments}
                </div>
                <span className="text-[10px] text-cyan-400 font-mono block">Bookings</span>
              </div>
              <div className="pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                {stat.visitors} visits
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
