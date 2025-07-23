// In-memory cache with timestamp for 10-minute expiry
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { city, lat, lon, units = 'metric' } = req.query;

    if (!city && (!lat || !lon)) {
        return res.status(400).json({
            error: 'Either city name or lat/lon coordinates are required'
        });
    }

    // Create cache key
    const cacheKey = city ? `city:${city}:${units}` : `coords:${lat}:${lon}:${units}`;

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('Cache hit for key:', cacheKey);
        return res.status(200).json(cached.data);
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!API_KEY) {
        return res
            .status(500)
            .json({ error: 'API key not configured on server' });
    }

    try {
        let weatherUrl;
        let cityName;

        if (city) {
            // First get coordinates from city name
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
        } else if (lat && lon) {
            weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
        } else {
            return res.status(400).json({
                error: 'Either city name or lat/lon coordinates are required',
            });
        }

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error(`Weather API failed: ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();

        // Add city name to response if we got it from geocoding
        if (cityName) {
            weatherData.name = cityName;
            weatherData.locationInfo = { name: cityName };
        }

        // Cache the successful response
        cache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });

        console.log('Cache set for key:', cacheKey);
        return res.status(200).json(weatherData);

    } catch (error) {
        console.error('Weather API error:', error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}