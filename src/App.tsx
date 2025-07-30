import React, { useState } from "react";
import { getWeatherByCity } from "./api/weather";
import type { WeatherData } from "./types/weatherTypes";
import { SearchBar } from "./components/searchBar";
import { WeatherCard } from "./components/weatherCard";

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchPhase, setSearchPhase] = useState<'idle' | 'searching' | 'results'>('idle');

    const handleSearch = async (city: string) => {
        try {
            setError("");
            setIsLoading(true);
            setSearchPhase('searching');

            const data = await getWeatherByCity(city);
            
            // Add a small delay to show the loading animation
            setTimeout(() => {
                setWeatherData(data);
                setIsLoading(false);
                setSearchPhase('results');
            }, 800);
        } catch (error: unknown) {
            setWeatherData(null);
            setIsLoading(false);
            setSearchPhase('idle');
            setError(`City not found or API error - ${error}`);
        }
    };

    const LoadingComponent = () => (
        <div className={`flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
            searchPhase === 'searching' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white text-lg font-medium">Searching...</p>
        </div>
    );

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

                {/* Main search bar - only visible in idle state */}
                {searchPhase === 'idle' && (
                    <div className="mb-8 transition-all duration-700 ease-in-out">
                        <SearchBar onSearch={handleSearch} disabled={isLoading} />
                    </div>
                )}

                {/* Loading State */}
                {searchPhase === 'searching' && (
                    <div className="flex justify-center mb-8">
                        <LoadingComponent />
                    </div>
                )}

                {/* Results State - Search bar at top + Weather card */}
                {searchPhase === 'results' && (
                    <div className="space-y-6">
                        <div className={`transition-all duration-700 ease-in-out delay-300 ${
                            searchPhase === 'results'
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 -translate-y-4'
                        }`}>
                            <SearchBar onSearch={handleSearch} disabled={isLoading} />
                        </div>

                        {weatherData && (
                            <div className={`flex justify-center transition-all duration-700 ease-in-out delay-500 ${
                                searchPhase === 'results'
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                            }`}>
                                <WeatherCard data={weatherData} />
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto transition-all duration-500 ease-in-out ${
                        error ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
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
            </div>
        </div>
    );
};

export default App;
