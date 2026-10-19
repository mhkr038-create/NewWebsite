'use client';

import React from 'react';
import { 
  Sun, 
  Moon, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  MapPin,
  RefreshCw 
} from 'lucide-react';
import { useUtility } from '../../context/UtilityContext';

interface WeatherBadgeProps {
  className?: string;
  showLocation?: boolean;
}

export const WeatherBadge: React.FC<WeatherBadgeProps> = ({ 
  className = '',
  showLocation = true 
}) => {
  const { weather, isWeatherLoading, openTool } = useUtility();

  const getIcon = (code: number, isDay: boolean = true) => {
    const size = 'w-3.5 h-3.5 shrink-0';
    switch (code) {
      case 0:
      case 1:
        return isDay ? <Sun className={`${size} text-amber-400`} /> : <Moon className={`${size} text-indigo-300`} />;
      case 2:
        return <CloudSun className={`${size} text-amber-300`} />;
      case 3:
        return <Cloud className={`${size} text-zinc-400`} />;
      case 45:
      case 48:
        return <CloudFog className={`${size} text-zinc-400`} />;
      case 51:
      case 53:
      case 55:
        return <CloudDrizzle className={`${size} text-sky-400`} />;
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return <CloudRain className={`${size} text-blue-400`} />;
      case 71:
      case 73:
      case 75:
        return <CloudSnow className={`${size} text-sky-200`} />;
      case 95:
      case 96:
      case 99:
        return <Zap className={`${size} text-yellow-400`} />;
      default:
        return <Sun className={`${size} text-amber-400`} />;
    }
  };

  if (isWeatherLoading && !weather) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-zinc-400 ${className}`}>
        <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
        <span className="truncate">Loading Weather...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <button
      onClick={() => openTool('weather')}
      title={`Live Weather in ${weather.city}: ${weather.temperature}°C, ${weather.conditionText}. Click for full atmospheric telemetry.`}
      className={`group inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] hover:text-white transition-colors cursor-pointer text-zinc-300 ${className}`}
    >
      <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">|</span>
      {getIcon(weather.weatherCode, weather.isDay)}
      {showLocation && (
        <span className="truncate max-w-[90px] xs:max-w-[120px] text-zinc-300 group-hover:text-white">
          {weather.city}
        </span>
      )}
      <span className="font-bold text-white">
        {weather.temperature}°C
      </span>
    </button>
  );
};
