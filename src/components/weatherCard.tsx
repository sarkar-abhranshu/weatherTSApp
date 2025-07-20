import React from "react";
import type { WeatherData } from "../types/weatherTypes";

interface Props {
    data: WeatherData;
}

export const WeatherCard: React.FC<Props> = ({ data }) => {
    console.log("WeatherCard data:", data);

    if (!data) {
        return (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                No current weather data available
            </div>
        );
    }

    const getWeatherIcon = (weatherMain: string) => {
        const iconMap: { [key: string]: string } = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Drizzle: "🌦️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Mist: "🌫️",
            Fog: "🌫️",
            Haze: "🌫️",
        };
        return iconMap[weatherMain] || "🌤️";
    };

    const formatLocationDisplay = () => {
        if (data.locationInfo) {
            const { name } = data.locationInfo;
            return `${name}`;
        }
        return data.name;
    };

    return (
        <div className="bg-blue-700/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 text-white max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                    {formatLocationDisplay()}
                </h2>
                <div className="text-6xl mb-2">
                    {getWeatherIcon(data.weather[0].main)}
                </div>
                <p className="text-lg font-medium capitalize">
                    {data.weather[0].description}
                </p>
            </div>

            {/* Temperature */}
            <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">
                    {Math.round(data.main.temp)}°C
                </div>
                <p className="text-blue-100">
                    Feels like {Math.round(data.main.feels_like)}°C
                </p>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">💧</div>
                    <div className="text-sm text-blue-100">Humidity</div>
                    <div className="font-semibold">{data.main.humidity}%</div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">💨</div>
                    <div className="text-sm text-blue-100">Wind Speed</div>
                    <div className="font-semibold">{data.wind.speed} m/s</div>
                </div>

                {/* <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="text-sm text-blue-100">Min Temp</div>
                    <div className="font-semibold">
                        {Math.round(data.main.temp_min)}°C
                    </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="text-sm text-blue-100">Max Temp</div>
                    <div className="font-semibold">
                        {Math.round(data.main.temp_max)}°C
                    </div>
                </div> */}
            </div>
        </div>
    );
};
