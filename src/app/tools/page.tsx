'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  CloudSun, 
  Search, 
  Calculator, 
  Calendar as CalendarIcon, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { WeatherWidget } from '../../components/tools/WeatherWidget';
import { GoogleSearchWidget } from '../../components/tools/GoogleSearchWidget';
import { CalculatorWidget } from '../../components/tools/CalculatorWidget';
import { CalendarWidget } from '../../components/tools/CalendarWidget';
import { UtilityTool } from '../../context/UtilityContext';

function ToolsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as UtilityTool) || 'weather';
  const [activeTab, setActiveTab] = useState<UtilityTool>('weather');

  useEffect(() => {
    if (initialTab && ['weather', 'search', 'calculator', 'calendar'].includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const tabs: { id: UtilityTool; label: string; icon: React.ElementType; desc: string }[] = [
    { 
      id: 'weather', 
      label: 'Weather Station', 
      icon: CloudSun,
      desc: 'Automatic location-based atmospheric telemetry & 5-day forecast via Open-Meteo.'
    },
    { 
      id: 'search', 
      label: 'Google Search Console', 
      icon: Search,
      desc: 'Global Google web search, site search, and advanced search operators.'
    },
    { 
      id: 'calculator', 
      label: 'System & ROI Calculator', 
      icon: Calculator,
      desc: 'Tactile arithmetic calculator + SchoolMIS & web performance financial models.'
    },
    { 
      id: 'calendar', 
      label: 'Scheduling Calendar', 
      icon: CalendarIcon,
      desc: 'Interactive monthly calendar, Indian gazetted holidays, and meeting reservation.'
    },
  ];

  return (
    <div className="w-full bg-[#070709] text-zinc-100 min-h-screen pt-24 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 font-sans overflow-x-hidden selection:bg-white selection:text-black text-left">
      <main className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Spec */}
        <section className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
            <span className="w-2 h-2 bg-emerald-400" />
            <span>[ SYSTEM UTILITIES // SUITE ]</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading uppercase tracking-tight">
            Free Engineering &amp; Productivity Apps
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
            High-performance web utilities deployed with 100% free open APIs. Real-time atmospheric weather detection, Google search command console, system &amp; ROI financial calculator, and executive scheduling calendar.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[11px] text-zinc-400">
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300">OPEN-METEO API</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300">GOOGLE SEARCH API</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300">NO REGISTRATION REQUIRED</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold">100% FREE</span>
          </div>
        </section>

        {/* Tab Selection Navigation */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 border text-left space-y-2 transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-emerald-400'}`} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                    ACTIVE APP
                  </span>
                </div>
                <div className="font-bold text-sm uppercase tracking-wide">
                  {tab.label}
                </div>
                <p className={`text-xs leading-relaxed ${isActive ? 'text-zinc-800' : 'text-zinc-400'}`}>
                  {tab.desc}
                </p>
              </button>
            );
          })}
        </section>

        {/* Active Application Stage */}
        <section className="border border-zinc-800 bg-zinc-950/90 p-5 sm:p-8 relative">
          {/* Corner Crosshairs */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-500 -translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-500 translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-500 -translate-x-[1px] translate-y-[1px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-500 translate-x-[1px] translate-y-[1px]" />

          {activeTab === 'weather' && <WeatherWidget />}
          {activeTab === 'search' && <GoogleSearchWidget />}
          {activeTab === 'calculator' && <CalculatorWidget />}
          {activeTab === 'calendar' && <CalendarWidget />}
        </section>

        {/* Bottom Banner */}
        <section className="border border-zinc-850 bg-zinc-900/30 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-white font-bold block">Need Custom Web Architecture or Automation?</span>
            <span className="text-zinc-400 text-[11px] block">
              We build bespoke Next.js 15 platforms, ₹0-license school ERPs, and 24/7 WhatsApp AI bots.
            </span>
          </div>

          <Link
            href="/intake-form"
            className="min-h-[46px] px-6 py-3 bg-white text-black font-extrabold uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <span>Initiate Project Scope</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </section>

      </main>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070709] flex items-center justify-center text-zinc-400 font-mono text-xs">
        Loading System Utilities...
      </div>
    }>
      <ToolsContent />
    </Suspense>
  );
}
