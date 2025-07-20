import React, { useState } from "react";
import { getWeatherByCity } from "./api/weather";
import type { WeatherData } from "./types/weatherTypes";
import { SearchBar } from "./components/searchBar";
import { WeatherCard } from "./components/weatherCard";

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>("");

    const handleSearch = async (city: string) => {
        try {
            setError("");
            const data = await getWeatherByCity(city);
            setWeatherData(data);
        } catch (error: unknown) {
            setWeatherData(null);
            setError(`City not found or API error - ${error}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 p-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-8 pt-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                        Weather App
                    </h1>
                    <p className="text-blue-100 text-lg">
                        Get current weather information for any city
                    </p>
                </div>

                <div className="mb-8">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {weatherData && (
                    <div className="flex justify-center">
                        <WeatherCard data={weatherData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
