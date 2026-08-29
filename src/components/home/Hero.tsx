'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Layout, 
  Target, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useInquiry } from '../../context/InquiryContext';

export const Hero: React.FC = () => {
  const { openQuickModal } = useInquiry();
  const [activeStage, setActiveStage] = useState<number>(0);

  const funnelStages = [
    {
      stage: '01',
      name: 'Traffic',
      desc: 'Google Ads, Meta Ads & SEO Content',
      icon: TrendingUp,
      stat: '+340% Qualified Visitors',
      color: 'from-indigo-500 to-cyan-500',
      badge: 'Intent & Demand',
    },
    {
      stage: '02',
      name: 'Landing Page',
      desc: 'Sub-second, High-Converting UX',
      icon: Layout,
      stat: '2.5x Higher Conversion',
      color: 'from-cyan-500 to-teal-500',
      badge: '1:1 Attention Ratio',
    },
    {
      stage: '03',
      name: 'Lead Generation',
      desc: 'Smart Quizzes, Forms & Magnets',
      icon: Target,
      stat: 'Zero Friction Capture',
      color: 'from-purple-500 to-indigo-500',
      badge: 'Pre-Qualified Inquiries',
    },
    {
      stage: '04',
      name: 'WhatsApp Automation',
      desc: 'Instant Sub-60s Replies & Nurture',
      icon: MessageSquare,
      stat: '98% Open Rate',
      color: 'from-emerald-500 to-cyan-500',
      badge: '24/7 Auto Follow-up',
    },
    {
      stage: '05',
      name: 'Customer Conversion',
      desc: 'Booked Clients & Scalable Sales',
      icon: Award,
      stat: 'Predictable Revenue Growth',
      color: 'from-amber-400 to-emerald-400',
      badge: 'Closed Deals',
    },
  ];

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow & radial light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10 space-y-10">
        
        {/* Top announcement badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-indigo-950/40 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-white">{SITE_CONFIG.brandName}</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-mono">Digital Growth & Automation Agency</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-5 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-heading">
            Grow Your Business with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              Digital Marketing & Automation
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {SITE_CONFIG.subheadline}
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => openQuickModal()}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Zap className="w-4 h-4 text-cyan-200" />
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 shadow-lg hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Explore Services</span>
          </a>
        </div>

        {/* Value Prop Micro Badges */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            High-Converting Landing Pages
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Targeted Meta & Google Ads
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            24/7 WhatsApp Conversational Automation
          </span>
        </div>

        {/* Visual: Traffic ↓ Landing Page ↓ Lead Generation ↓ WhatsApp Automation ↓ Customer Conversion */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="bg-slate-900/85 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl relative overflow-hidden text-left">
            
            {/* Top engine header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800" />
                <span className="text-xs font-mono text-slate-400 font-medium">
                  digitalsimplesolution • Complete Digital Growth System
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/40">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Interactive Growth Funnel</span>
              </div>
            </div>

            {/* 5-Step Visual Flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-2 mt-6 relative">
              {funnelStages.map((stg, idx) => {
                const Icon = stg.icon;
                const isSelected = activeStage === idx;
                return (
                  <div
                    key={stg.stage}
                    onClick={() => setActiveStage(idx)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between space-y-3 relative group ${
                      isSelected
                        ? 'bg-slate-950 border-indigo-500/80 shadow-xl shadow-indigo-950/60 scale-[1.02]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/90'
                    }`}
                  >
                    {/* Stage number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">
                        STAGE {stg.stage}
                      </span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr ${stg.color} text-slate-950 shadow-md`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Stage Name & Desc */}
                    <div>
                      <h4 className="text-sm font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                        {stg.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {stg.desc}
                      </p>
                    </div>

                    {/* Badge & Stat */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold truncate">
                        {stg.badge}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">
                        {stg.stat}
                      </span>
                    </div>

                    {/* Desktop Connector arrow between columns (except last) */}
                    {idx < funnelStages.length - 1 && (
                      <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 items-center justify-center text-[10px]">
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Funnel Explainer Strip */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-slate-300">
                  Current focus: <strong className="text-white">{funnelStages[activeStage].name}</strong> — {funnelStages[activeStage].desc}
                </span>
              </div>
              <a
                href="#ecosystem"
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>View Full System Architecture</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

