export interface WeatherData {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  conditionText: string;
  isDay: boolean;
  precipitation: number;
  dailyForecast: {
    date: string;
    dayName: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
  }[];
  lastUpdated: string;
}

export function getWeatherCondition(code: number, isDay: boolean = true): { description: string; icon: string } {
  // WMO Weather interpretation codes (WW)
  switch (code) {
    case 0:
      return { description: isDay ? 'Sunny & Clear' : 'Clear Night', icon: isDay ? 'Sun' : 'Moon' };
    case 1:
      return { description: isDay ? 'Mainly Sunny' : 'Mainly Clear', icon: isDay ? 'Sun' : 'Moon' };
    case 2:
      return { description: 'Partly Cloudy', icon: 'CloudSun' };
    case 3:
      return { description: 'Overcast Skies', icon: 'Cloud' };
    case 45:
    case 48:
      return { description: 'Foggy / Hazy', icon: 'CloudFog' };
    case 51:
    case 53:
    case 55:
      return { description: 'Light Drizzle', icon: 'CloudDrizzle' };
    case 61:
    case 63:
    case 65:
      return { description: 'Rain Showers', icon: 'CloudRain' };
    case 71:
    case 73:
    case 75:
      return { description: 'Snowfall', icon: 'CloudSnow' };
    case 80:
    case 81:
    case 82:
      return { description: 'Heavy Rain Showers', icon: 'CloudRain' };
    case 95:
    case 96:
    case 99:
      return { description: 'Thunderstorm', icon: 'Zap' };
    default:
      return { description: 'Fair Conditions', icon: isDay ? 'Sun' : 'Cloud' };
  }
}

export interface GeocodedLocation {
  id: number;
  name: string;
  country: string;
  country_code: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export async function fetchIpLocation(): Promise<{ city: string; region: string; country: string; countryCode: string; latitude: number; longitude: number }> {
  try {
    const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (!res.ok) throw new Error('IP lookup failed');
    const data = await res.json();
    if (data.success && data.latitude && data.longitude) {
      return {
        city: data.city || 'Bengaluru',
        region: data.region || 'Karnataka',
        country: data.country || 'India',
        countryCode: data.country_code || 'IN',
        latitude: data.latitude,
        longitude: data.longitude,
      };
    }
  } catch (err) {
    console.warn('IP location fetch failed, using default coordinates', err);
  }

  // Graceful default fallback: Bengaluru, India
  return {
    city: 'Bengaluru',
    region: 'Karnataka',
    country: 'India',
    countryCode: 'IN',
    latitude: 12.9716,
    longitude: 77.5946,
  };
}

export async function fetchLiveWeather(
  lat: number,
  lon: number,
  city: string,
  region: string = '',
  country: string = 'India',
  countryCode: string = 'IN'
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather fetch failed: ${res.statusText}`);
  }
  const data = await res.json();
  const current = data.current;
  const daily = data.daily;

  const isDay = current.is_day === 1;
  const condition = getWeatherCondition(current.weather_code, isDay);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyForecast = (daily.time || []).slice(0, 5).map((dateStr: string, idx: number) => {
    const d = new Date(dateStr);
    const dayName = idx === 0 ? 'Today' : dayNames[d.getDay()];
    return {
      date: dateStr,
      dayName,
      weatherCode: daily.weather_code[idx],
      tempMax: Math.round(daily.temperature_2m_max[idx]),
      tempMin: Math.round(daily.temperature_2m_min[idx]),
    };
  });

  return {
    city,
    region,
    country,
    countryCode,
    latitude: lat,
    longitude: lon,
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,
    conditionText: condition.description,
    isDay,
    precipitation: current.precipitation,
    dailyForecast,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export async function searchCities(query: string): Promise<GeocodedLocation[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}
