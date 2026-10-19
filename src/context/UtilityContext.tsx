'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { WeatherData, fetchIpLocation, fetchLiveWeather, searchCities, GeocodedLocation } from '../services/weatherService';

export type UtilityTool = 'weather' | 'search' | 'calculator' | 'calendar';

interface UtilityContextType {
  // Modal State
  isOpen: boolean;
  activeTool: UtilityTool;
  openTool: (tool?: UtilityTool) => void;
  closeTool: () => void;

  // Weather State
  weather: WeatherData | null;
  isWeatherLoading: boolean;
  weatherError: string | null;
  refreshWeather: () => Promise<void>;
  requestGpsWeather: () => Promise<void>;
  selectLocation: (loc: GeocodedLocation) => Promise<void>;
  isGpsActive: boolean;
}

const UtilityContext = createContext<UtilityContextType | undefined>(undefined);

export const UtilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<UtilityTool>('weather');

  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [isGpsActive, setIsGpsActive] = useState(false);

  const loadWeatherFromIp = useCallback(async () => {
    setIsWeatherLoading(true);
    setWeatherError(null);
    try {
      const loc = await fetchIpLocation();
      const data = await fetchLiveWeather(
        loc.latitude,
        loc.longitude,
        loc.city,
        loc.region,
        loc.country,
        loc.countryCode
      );
      setWeather(data);
      // Cache lightly in sessionStorage
      try {
        sessionStorage.setItem('dss_cached_weather', JSON.stringify(data));
      } catch {}
    } catch (err: any) {
      setWeatherError(err?.message || 'Failed to retrieve atmospheric data');
    } finally {
      setIsWeatherLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem('dss_cached_weather');
      if (cached) {
        const parsed = JSON.parse(cached);
        setWeather(parsed);
        setIsWeatherLoading(false);
      }
    } catch {}

    loadWeatherFromIp();
  }, [loadWeatherFromIp]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K opens search, Ctrl+Shift+U opens tools)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveTool('search');
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openTool = (tool: UtilityTool = 'weather') => {
    setActiveTool(tool);
    setIsOpen(true);
  };

  const closeTool = () => {
    setIsOpen(false);
  };

  const refreshWeather = async () => {
    if (weather) {
      setIsWeatherLoading(true);
      try {
        const data = await fetchLiveWeather(
          weather.latitude,
          weather.longitude,
          weather.city,
          weather.region,
          weather.country,
          weather.countryCode
        );
        setWeather(data);
      } catch (err: any) {
        setWeatherError(err?.message || 'Refresh failed');
      } finally {
        setIsWeatherLoading(false);
      }
    } else {
      await loadWeatherFromIp();
    }
  };

  const requestGpsWeather = async () => {
    if (!navigator.geolocation) {
      setWeatherError('Geolocation not supported by this browser');
      return;
    }
    setIsWeatherLoading(true);
    setWeatherError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          setIsGpsActive(true);

          // Get reverse geocoded city name or fallback
          let cityName = weather?.city || 'Local Area';
          let countryName = weather?.country || 'India';

          try {
            const geoRes = await fetch(
              `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(2)},${lon.toFixed(2)}&count=1&format=json`
            );
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData.results && geoData.results[0]) {
                cityName = geoData.results[0].name;
                countryName = geoData.results[0].country;
              }
            }
          } catch {}

          const data = await fetchLiveWeather(lat, lon, cityName, '', countryName);
          setWeather(data);
        } catch (err: any) {
          setWeatherError(err?.message || 'Failed to fetch GPS weather');
        } finally {
          setIsWeatherLoading(false);
        }
      },
      (err) => {
        console.warn('GPS permission denied or timeout', err);
        setWeatherError('GPS permission was not granted. Using IP location.');
        setIsWeatherLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  const selectLocation = async (loc: GeocodedLocation) => {
    setIsWeatherLoading(true);
    setWeatherError(null);
    try {
      const data = await fetchLiveWeather(
        loc.latitude,
        loc.longitude,
        loc.name,
        loc.admin1 || '',
        loc.country,
        loc.country_code
      );
      setWeather(data);
      setIsGpsActive(false);
    } catch (err: any) {
      setWeatherError(err?.message || 'Failed to load weather for location');
    } finally {
      setIsWeatherLoading(false);
    }
  };

  return (
    <UtilityContext.Provider
      value={{
        isOpen,
        activeTool,
        openTool,
        closeTool,
        weather,
        isWeatherLoading,
        weatherError,
        refreshWeather,
        requestGpsWeather,
        selectLocation,
        isGpsActive,
      }}
    >
      {children}
    </UtilityContext.Provider>
  );
};

export const useUtility = () => {
  const context = useContext(UtilityContext);
  if (!context) {
    throw new Error('useUtility must be used within a UtilityProvider');
  }
  return context;
};
