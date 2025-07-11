import React from "react";
import type { WeatherData } from "../types/weatherTypes";

interface Props {
    data: WeatherData;
}

export const WeatherCard: React.FC<Props> = ({ data }) => {
    console.log("WeatherCard data:", data);

    if (!data) {
        return <div>No current weather data available</div>;
    }

    return (
        <div>
            <h2>Current Weather</h2>
            <p>
                {data.weather[0].main} - {data.weather[0].description}
            </p>
            <p>Temp: {data.main.temp}°C</p>
            <p>Feels like: {data.main.feels_like}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
    );
};
