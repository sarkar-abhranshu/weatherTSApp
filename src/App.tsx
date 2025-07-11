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
        <div>
            <h1>Weather App</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weatherData && <WeatherCard data={weatherData} />}
        </div>
    );
};

export default App;
