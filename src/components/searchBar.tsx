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
        <form onSubmit={handleSubmit}>
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
            />
            <button type="submit">Search</button>
        </form>
    );
};
