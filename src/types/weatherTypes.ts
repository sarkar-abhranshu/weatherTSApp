export interface WeatherData {
    clouds: {
        all: 90;
    };
    dt: number;
    main: {
        feels_like: number;
        pressure: number;
        humidity: number;
        temp: number;
        temp_min: number;
        temp_max: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    weather: [
        {
            description: string;
            icon: string;
            main: string;
        },
    ];
    wind: {
        speed: number;
    };
    name: string;
    locationInfo?: {
        name: string;
    };
}

export type WeatherMain =
    | "Clear"
    | "Clouds"
    | "Rain"
    | "Drizzle"
    | "Thunderstorm"
    | "Snow"
    | "Mist";
