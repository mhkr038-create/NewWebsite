import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Bot, 
  Zap, 
  TrendingUp, 
  Workflow, 
  CheckCircle2, 
  BarChart3 
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow & radial light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Top announcement badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-indigo-950/40 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>{SITE_CONFIG.brandName}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-mono">Grow Smarter with AI & Automation</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-heading">
            {SITE_CONFIG.headline.split('&')[0]} & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              {SITE_CONFIG.headline.split('&')[1] || 'Digital Growth'}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {SITE_CONFIG.subheadline}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/ai-services"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 group"
          >
            <Zap className="w-4 h-4 text-cyan-200" />
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#schedule-meeting"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 shadow-lg hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Schedule a Free Consultation</span>
          </a>
        </div>

        {/* Value Prop Micro Badges */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Custom AI Agents & Workflows
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Revenue-First Digital Marketing
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Guaranteed Fast Turnaround
          </span>
        </div>

        {/* Premium Visual Representation of: AI + Automation + Digital Marketing + Business Growth */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl relative overflow-hidden text-left">
            
            {/* Top dashboard control header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800" />
                <span className="text-xs font-mono text-slate-400 font-medium">
                  DigitalFlowHub System Engine • AI + Automation + Growth Active
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All 4 Systems Synchronized</span>
              </div>
            </div>

            {/* 4 Interconnected Core Engine Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              
              {/* Pillar 1: Artificial Intelligence */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 hover:border-indigo-400/60 transition-all space-y-3 relative group">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
                    Pillar 01
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Artificial Intelligence
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Custom-trained LLM assistants, smart document parsers, and 24/7 client triage.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-cyan-300">
                  <span>Latency</span>
                  <span className="font-bold">0.4s (Instant)</span>
                </div>
              </div>

              {/* Pillar 2: AI Automation */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 hover:border-purple-400/60 transition-all space-y-3 relative group">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                    Pillar 02
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading">
                    AI Automation
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Multi-step webhook pipelines syncing CRM, invoices, emails, and calendar schedules.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-purple-300">
                  <span>Hours Saved</span>
                  <span className="font-bold">35+ hrs/wk</span>
                </div>
              </div>

              {/* Pillar 3: Digital Marketing */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 hover:border-cyan-400/60 transition-all space-y-3 relative group">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                    Pillar 03
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Digital Marketing
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    High-intent search SEO, paid social funnels, and automated lead capture engines.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-emerald-400">
                  <span>Qualified Leads</span>
                  <span className="font-bold">+340% Lift</span>
                </div>
              </div>

              {/* Pillar 4: Business Growth */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-400/60 transition-all space-y-3 relative group">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    Pillar 04
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Business Growth
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Scalable revenue infrastructure, reduced overhead, and faster customer conversions.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-amber-300">
                  <span>Avg ROAS</span>
                  <span className="font-bold">4.8x ROI</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
