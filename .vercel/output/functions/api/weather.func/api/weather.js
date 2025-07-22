"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const ioredis_1 = require("ioredis");
let redis = null;
// Initialize Redis connection
function getRedisClient() {
    if (!redis && process.env.REDIS_URL) {
        try {
            redis = new ioredis_1.Redis(process.env.REDIS_URL, {
                maxRetriesPerRequest: 3,
                retryDelayOnFailover: 100,
                connectTimeout: 10000,
                commandTimeout: 5000,
            });
            redis.on("error", (error) => {
                console.error("Redis connection error:", error);
            });
            redis.on("connect", () => {
                console.log("Redis connected successfully");
            });
        }
        catch (error) {
            console.error("Failed to initialize Redis:", error);
        }
    }
    return redis;
}
const CACHE_DURATION = 10 * 60; // 10 minutes in seconds
function getCacheKey(params) {
    return `weather:${JSON.stringify(params)}`;
}
async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const { lat, lon, city, units = "metric" } = req.query;
    const cacheKey = getCacheKey({ lat, lon, city, units });
    const redisClient = getRedisClient();
    // Try to get cached data
    if (redisClient) {
        try {
            const cached = await redisClient.get(cacheKey);
            if (cached) {
                console.log("Cache hit for key:", cacheKey);
                return res.status(200).json(JSON.parse(cached));
            }
            console.log("Cache miss for key:", cacheKey);
        }
        catch (error) {
            console.error("Redis get error:", error);
        }
    }
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    if (!API_KEY) {
        return res
            .status(500)
            .json({ error: "API key not configured on server" });
    }
    try {
        let weatherUrl;
        let cityName;
        if (city) {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
            const geoResponse = await fetch(geoUrl);
            if (!geoResponse.ok) {
                throw new Error(`Geocoding failed: ${geoResponse.status}`);
            }
            const geoData = await geoResponse.json();
            if (!geoData.length) {
                return res
                    .status(404)
                    .json({ error: `City "${city}" not found` });
            }
            const { lat: cityLat, lon: cityLon, name } = geoData[0];
            cityName = name;
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=${units}&appid=${API_KEY}`;
        }
        else if (lat && lon) {
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
        }
        else {
            return res.status(400).json({
                error: "Either city name or lat/lon coordinates are required",
            });
        }
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error(`Weather API failed: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        if (cityName) {
            weatherData.name = cityName;
        }
        // Cache the result
        if (redisClient) {
            try {
                await redisClient.setex(cacheKey, CACHE_DURATION, JSON.stringify(weatherData));
                console.log("Data cached for key:", cacheKey);
            }
            catch (error) {
                console.error("Redis set error:", error);
            }
        }
        return res.status(200).json(weatherData);
    }
    catch (error) {
        console.error("Weather API error:", error);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
}
//# sourceMappingURL=weather.js.map