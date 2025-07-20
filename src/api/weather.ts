import type { WeatherData } from "../types/weatherTypes";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export interface WeatherApiParams {
    lat: number;
    lon: number;
    units?: "standard" | "metric" | "imperial";
}

export async function fetchWeatherData(
    params: WeatherApiParams,
): Promise<WeatherData> {
    const { lat, lon, units = "metric" } = params;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error(
                "Invalid API key. Please check your OpenWeather API key.",
            );
        }
        throw new Error(
            `Weather API error: ${response.status} ${response.statusText}`,
        );
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data as WeatherData;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
    if (!API_KEY) {
        throw new Error(
            "API key not found. Please set VITE_OPENWEATHER_API_KEY in your .env file.",
        );
    }
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) {
        if (geoResponse.status === 401) {
            throw new Error(
                "Invalid API key for geocoding. Please check your OpenWeather API key.",
            );
        }
        throw new Error(
            `Geocoding API error: ${geoResponse.status} ${geoResponse.statusText}`,
        );
    }

    const geoData = await geoResponse.json();
    if (!geoData.length) {
        throw new Error(`City "${city}" not found`);
    }

    const { lat, lon, name } = geoData[0];

    const weatherData = await fetchWeatherData({
        lat,
        lon,
        units: "metric",
    });

    weatherData.locationInfo = {
        name,
    };

    return weatherData;
}
