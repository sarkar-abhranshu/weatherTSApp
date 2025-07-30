import React, { useState } from "react";

interface Props {
    onSearch: (city: string) => void;
    disabled?: boolean;
}

export const SearchBar: React.FC<Props> = ({ onSearch, disabled = false }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim() && !disabled) {
            onSearch(city);
            setCity("");
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
                disabled={disabled}
                className={`bg-gradient-to-br from-blue-200 to-blue-400 flex-1 px-4 py-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 placeholder-gray-700 ${
                    disabled
                        ? 'bg-gray-100 cursor-not-allowed opacity-60'
                        : 'bg-white hover:shadow-md'
                }`}
            />
            <button
                type="submit"
                disabled={disabled || !city.trim()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {disabled ? (
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                    </div>
                ) : (
                    "Search"
                )}
            </button>
        </form>
    );
};
