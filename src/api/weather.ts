import type { WeatherData } from "../types/weatherTypes";

// Cache interface for browser-side caching
interface CacheEntry {
    data: WeatherData;
    timestamp: number;
}

class WeatherCache {
    private cache = new Map<string, CacheEntry>();
    private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

    get(key: string): WeatherData | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() - entry.timestamp > this.CACHE_DURATION) {
            this.cache.delete(key);
            return null;
        }

        return entry.data;
    }

    set(key: string, data: WeatherData): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clear(): void {
        this.cache.clear();
    }
}

const weatherCache = new WeatherCache();

export interface WeatherApiParams {
    lat: number;
    lon: number;
    units?: "standard" | "metric" | "imperial";
}

export async function fetchWeatherData(
    params: WeatherApiParams,
): Promise<WeatherData> {
    const { lat, lon, units = "metric" } = params;
    
    // Create cache key
    const cacheKey = `coords:${lat}:${lon}:${units}`;
    
    // Check browser cache first
    const cached = weatherCache.get(cacheKey);
    if (cached) {
        console.log('Browser cache hit for coordinates:', lat, lon);
        return cached;
    }

    // Call our server API instead of OpenWeather directly
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&units=${units}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache in browser
    weatherCache.set(cacheKey, data);
    console.log('Data fetched and cached for coordinates:', lat, lon);
    
    return data as WeatherData;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
    // Create cache key
    const cacheKey = `city:${city}:metric`;
    
    // Check browser cache first
    const cached = weatherCache.get(cacheKey);
    if (cached) {
        console.log('Browser cache hit for city:', city);
        return cached;
    }

    // Call our server API instead of OpenWeather directly
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&units=metric`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 404) {
            throw new Error(errorData.error || `City "${city}" not found`);
        }
        throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache in browser
    weatherCache.set(cacheKey, data);
    console.log('Data fetched and cached for city:', city);
    
    return data as WeatherData;
}

// Export cache instance for potential manual cache management
export { weatherCache };