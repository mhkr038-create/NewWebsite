'use client';

import React, { useState } from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  Moon, 
  Wind, 
  Droplets, 
  MapPin, 
  RefreshCw, 
  Navigation, 
  Search,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { useUtility } from '../../context/UtilityContext';
import { searchCities, GeocodedLocation } from '../../services/weatherService';

export const WeatherWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { 
    weather, 
    isWeatherLoading, 
    weatherError, 
    refreshWeather, 
    requestGpsWeather, 
    selectLocation,
    isGpsActive 
  } = useUtility();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodedLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchCities(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSelectCity = (loc: GeocodedLocation) => {
    selectLocation(loc);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderWeatherIcon = (code: number, isDay: boolean = true, sizeClass = 'w-10 h-10') => {
    switch (code) {
      case 0:
      case 1:
        return isDay ? <Sun className={`${sizeClass} text-amber-400 animate-pulse`} /> : <Moon className={`${sizeClass} text-indigo-300`} />;
      case 2:
        return <CloudSun className={`${sizeClass} text-amber-300`} />;
      case 3:
        return <Cloud className={`${sizeClass} text-zinc-400`} />;
      case 45:
      case 48:
        return <CloudFog className={`${sizeClass} text-zinc-400`} />;
      case 51:
      case 53:
      case 55:
        return <CloudDrizzle className={`${sizeClass} text-sky-400`} />;
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        return <CloudRain className={`${sizeClass} text-blue-400`} />;
      case 71:
      case 73:
      case 75:
        return <CloudSnow className={`${sizeClass} text-sky-200`} />;
      case 95:
      case 96:
      case 99:
        return <Zap className={`${sizeClass} text-yellow-400`} />;
      default:
        return <Sun className={`${sizeClass} text-amber-400`} />;
    }
  };

  if (isWeatherLoading && !weather) {
    return (
      <div className="p-8 text-center space-y-4 font-mono text-zinc-400">
        <RefreshCw className="w-8 h-8 mx-auto animate-spin text-emerald-400" />
        <div className="text-xs uppercase tracking-wider">Detecting Location &amp; Atmospheric Metrics...</div>
      </div>
    );
  }

  if (weatherError && !weather) {
    return (
      <div className="p-6 text-center space-y-3 font-mono text-xs">
        <div className="text-rose-400">{weatherError}</div>
        <button
          onClick={() => refreshWeather()}
          className="px-4 py-2 bg-zinc-900 border border-zinc-750 text-white rounded-sm hover:bg-zinc-800 transition-colors"
        >
          Retry Telemetry
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="w-full text-left font-sans space-y-5">
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold text-white text-sm tracking-tight">
            {weather.city}
          </span>
          {weather.region && weather.region !== weather.city && (
            <span className="text-zinc-500">, {weather.region}</span>
          )}
          <span className="text-zinc-400 font-mono text-[11px] px-1.5 py-0.5 border border-zinc-800 bg-zinc-900/60 uppercase">
            {weather.countryCode || weather.country}
          </span>
          {isGpsActive && (
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 font-mono uppercase">
              GPS Lock
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`min-h-[36px] px-2.5 py-1 text-[11px] font-mono uppercase border transition-colors flex items-center gap-1.5 cursor-pointer ${
              showSearch 
                ? 'bg-zinc-800 border-zinc-600 text-white' 
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search City</span>
          </button>

          <button
            onClick={() => requestGpsWeather()}
            title="Use Precise GPS Geolocation"
            className="min-h-[36px] px-2.5 py-1 text-[11px] font-mono uppercase bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Exact GPS</span>
          </button>

          <button
            onClick={() => refreshWeather()}
            disabled={isWeatherLoading}
            title="Refresh Atmospheric Telemetry"
            className="min-h-[36px] p-2 bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isWeatherLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* City Search Dropdown Bar */}
      {showSearch && (
        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-sm space-y-2.5 animate-in fade-in duration-200">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city (e.g., Tokyo, London, Mumbai, New York)..."
              className="flex-1 bg-zinc-950 border border-zinc-750 px-3 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white"
              autoFocus
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              {isSearching ? '...' : 'Find'}
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="divide-y divide-zinc-800 border-t border-zinc-800 pt-1 font-mono text-xs">
              {searchResults.map((res) => (
                <button
                  key={`${res.id}-${res.latitude}`}
                  onClick={() => handleSelectCity(res)}
                  className="w-full text-left py-2 px-2 hover:bg-zinc-850 flex items-center justify-between text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-semibold">{res.name}</span>
                  <span className="text-[10px] text-zinc-400">{res.admin1 ? `${res.admin1}, ` : ''}{res.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Temperature & Metric Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-zinc-950/70 border border-zinc-800 p-5 sm:p-6">
        {/* Left: Temperature & Conditions */}
        <div className="sm:col-span-7 flex items-center gap-4 sm:gap-6">
          <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-sm shrink-0">
            {renderWeatherIcon(weather.weatherCode, weather.isDay, 'w-12 h-12')}
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
                {weather.temperature}°C
              </span>
              <span className="text-xs font-mono text-zinc-400">
                / {Math.round((weather.temperature * 9) / 5 + 32)}°F
              </span>
            </div>
            <div className="text-sm font-semibold text-zinc-200 uppercase tracking-wide">
              {weather.conditionText}
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Apparent: {weather.apparentTemperature}°C • {weather.isDay ? 'Daylight Cycle' : 'Night Cycle'}
            </div>
          </div>
        </div>

        {/* Right: Environmental Matrix */}
        <div className="sm:col-span-5 grid grid-cols-2 gap-2.5 font-mono text-xs border-t sm:border-t-0 sm:border-l border-zinc-850 pt-3 sm:pt-0 sm:pl-5">
          <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase tracking-wider">
              <Droplets className="w-3 h-3 text-sky-400" />
              <span>Humidity</span>
            </div>
            <div className="text-sm font-bold text-white">{weather.humidity}%</div>
          </div>

          <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase tracking-wider">
              <Wind className="w-3 h-3 text-emerald-400" />
              <span>Wind Velocity</span>
            </div>
            <div className="text-sm font-bold text-white">{weather.windSpeed} km/h</div>
          </div>

          <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-amber-400" />
              <span>Precipitation</span>
            </div>
            <div className="text-sm font-bold text-white">{weather.precipitation} mm</div>
          </div>

          <div className="p-2.5 bg-zinc-900/40 border border-zinc-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] uppercase tracking-wider">
              <CalendarDays className="w-3 h-3 text-indigo-400" />
              <span>Last Sync</span>
            </div>
            <div className="text-sm font-bold text-white">{weather.lastUpdated}</div>
          </div>
        </div>
      </div>

      {/* 5-Day Architectural Forecast Strip */}
      <div className="space-y-2 pt-1 font-mono text-xs">
        <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
          [ 5-DAY ATMOSPHERIC OUTLOOK // OPEN-METEO ]
        </span>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
          {weather.dailyForecast.map((day, idx) => (
            <div
              key={day.date}
              className={`p-3 border text-center space-y-2 ${
                idx === 0 
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-white' 
                  : 'border-zinc-800 bg-zinc-950/60 text-zinc-300'
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                {day.dayName}
              </div>
              <div className="flex justify-center py-1">
                {renderWeatherIcon(day.weatherCode, true, 'w-6 h-6')}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs">
                <span className="font-bold text-white">{day.tempMax}°</span>
                <span className="text-zinc-500">/</span>
                <span className="text-zinc-400">{day.tempMin}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
