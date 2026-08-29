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
  ArrowRight
} from 'lucide-react';
import { AnalyticsSummary, Appointment, Inquiry } from '../../services/adminStore';

interface AnalyticsOverviewProps {
  summary: AnalyticsSummary;
  appointments: Appointment[];
  inquiries: Inquiry[];
  onNavigateToAppointments: () => void;
  onNavigateToInquiries: () => void;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  summary,
  appointments,
  inquiries,
  onNavigateToAppointments,
  onNavigateToInquiries,
}) => {
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'confirmed');
  const newInquiries = inquiries.filter((i) => i.status === 'new');

  const kpis = [
    {
      label: 'Pipeline Value',
      value: `₹${(summary.totalPipelineValue).toLocaleString('en-IN')}`,
      change: '+24.8% vs last month',
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      badge: 'High ROAS',
    },
    {
      label: 'Consultation Bookings',
      value: summary.totalAppointments.toString(),
      subValue: `${confirmedAppointments.length} Confirmed • ${pendingAppointments.length} Pending`,
      change: '+18.2% this week',
      icon: CalendarCheck,
      color: 'from-indigo-500 to-cyan-500',
      textColor: 'text-cyan-400',
      badge: 'High Intent',
    },
    {
      label: 'Qualified Inquiries',
      value: summary.totalInquiries.toString(),
      subValue: `${newInquiries.length} Actionable New Leads`,
      change: '+32.4% vs last month',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
      badge: 'Fast Flow',
    },
    {
      label: 'Funnel Conversion Rate',
      value: `${summary.conversionRate}%`,
      subValue: 'Traffic to Booked Call',
      change: '+1.1% vs industry avg',
      icon: Target,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-300',
      badge: 'Top Tier',
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

        <div className="flex items-center gap-3 relative z-10">
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
            { stage: '1. Traffic Generated', count: '13,410', unit: 'Ad Clicks & Search', pct: '100%', color: 'border-indigo-500/40 bg-indigo-950/30' },
            { stage: '2. Landing Page Views', count: '11,800', unit: 'CRO 1:1 Attention', pct: '88.0%', color: 'border-cyan-500/40 bg-cyan-950/30' },
            { stage: '3. Lead Form Inquiries', count: '489', unit: 'Capture & Opt-ins', pct: '4.14%', color: 'border-purple-500/40 bg-purple-950/30' },
            { stage: '4. WhatsApp Triage', count: '392', unit: 'Automated 3-Q Qual', pct: '80.1%', color: 'border-emerald-500/40 bg-emerald-950/30' },
            { stage: '5. Booked Consults', count: `${summary.totalAppointments}`, unit: 'High-Ticket Pipeline', pct: `${summary.conversionRate}%`, color: 'border-amber-500/40 bg-amber-950/30' },
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
