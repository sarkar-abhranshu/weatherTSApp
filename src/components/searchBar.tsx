import React, { useState } from "react";

interface Props {
    onSearch: (city: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
        >
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="flex-1 px-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 placeholder-gray-200"
            />
            <button
                type="submit"
                className="px-6 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Search
            </button>
        </form>
    );
};
