'use client';

import React from 'react';
import { 
  X, 
  CloudSun, 
  Search, 
  Calculator, 
  Calendar as CalendarIcon, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useUtility, UtilityTool } from '../../context/UtilityContext';
import { WeatherWidget } from './WeatherWidget';
import { GoogleSearchWidget } from './GoogleSearchWidget';
import { CalculatorWidget } from './CalculatorWidget';
import { CalendarWidget } from './CalendarWidget';

export const UtilityModal: React.FC = () => {
  const { isOpen, activeTool, openTool, closeTool } = useUtility();

  if (!isOpen) return null;

  const tabs: { id: UtilityTool; label: string; icon: React.ElementType }[] = [
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'search', label: 'Google Search', icon: Search },
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={closeTool}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#070709] border border-zinc-750 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 text-left font-sans">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 sm:px-6 py-3 bg-zinc-950 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400" />
            <span className="text-white font-bold uppercase tracking-wider">
              Free Engineering &amp; Productivity Suite
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/tools?tab=${activeTool}`}
              onClick={closeTool}
              className="text-[11px] text-zinc-400 hover:text-white transition-colors flex items-center gap-1 font-mono uppercase"
              title="Open full page view"
            >
              <span className="hidden sm:inline">Dedicated Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={closeTool}
              className="min-w-[40px] min-h-[40px] p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 App Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-800 bg-zinc-950/60 font-mono text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTool === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => openTool(tab.id)}
                className={`min-h-[48px] px-3 py-2.5 flex items-center justify-center gap-2 transition-all cursor-pointer border-r border-b sm:border-b-0 border-zinc-850 ${
                  isActive
                    ? 'bg-white text-black font-extrabold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                <span className="truncate uppercase tracking-wider text-[11px] sm:text-xs">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1">
          {activeTool === 'weather' && <WeatherWidget />}
          {activeTool === 'search' && <GoogleSearchWidget />}
          {activeTool === 'calculator' && <CalculatorWidget />}
          {activeTool === 'calendar' && <CalendarWidget />}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-850 px-4 sm:px-6 py-2.5 bg-zinc-950 font-mono text-[10px] text-zinc-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>SHORTCUTS:</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300">Esc</kbd>
            <span>Close</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-300">⌘K / Ctrl+K</kbd>
            <span>Search</span>
          </div>
          <span className="text-emerald-400">100% FREE PUBLIC APIS</span>
        </div>

      </div>
    </div>
  );
};
