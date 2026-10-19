'use client';

import React from 'react';
import { 
  Sparkles, 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  Zap, 
  Search, 
  Calculator, 
  Calendar as CalendarIcon, 
  Layers
} from 'lucide-react';
import { useUtility, UtilityTool } from '../../context/UtilityContext';

export const UtilityDock: React.FC = () => {
  const { openTool, weather } = useUtility();

  const getWeatherIcon = (code?: number, isDay: boolean = true) => {
    if (code === undefined) return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />;
    switch (code) {
      case 0:
      case 1:
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case 2:
      case 3:
        return <CloudSun className="w-3.5 h-3.5 text-amber-300" />;
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
      case 95:
      case 96:
      case 99:
        return <Zap className="w-3.5 h-3.5 text-yellow-400" />;
      default:
        return <Cloud className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="hidden sm:flex fixed bottom-4 left-4 z-40 font-mono text-xs select-none">
      <div className="flex items-center gap-1.5 p-1 bg-zinc-950/95 border border-zinc-800 backdrop-blur-xl shadow-2xl">
        {/* Main Hub Trigger */}
        <button
          onClick={() => openTool('weather')}
          title="Open Free Utilities (Weather, Google Search, Calculator, Calendar)"
          className="min-h-[44px] px-3 py-2 bg-zinc-900 hover:bg-zinc-850 text-white font-semibold flex items-center gap-2 border border-zinc-750 transition-all cursor-pointer active:scale-95 group"
          aria-label="Open free engineering utilities"
        >
          {getWeatherIcon(weather?.weatherCode, weather?.isDay)}
          <span className="text-[11px] uppercase tracking-wider font-bold">
            {weather ? `${weather.city} ${weather.temperature}°C` : 'Tools & Apps'}
          </span>
        </button>

        {/* Quick Micro Launchers (Desktop) */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => openTool('search')}
            title="Google Web & Site Search (⌘K)"
            className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
            aria-label="Google Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openTool('calculator')}
            title="System & ROI Calculator"
            className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
            aria-label="Calculator"
          >
            <Calculator className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => openTool('calendar')}
            title="Executive Scheduling Calendar"
            className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
            aria-label="Calendar"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
