'use client'

import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useUser } from '@/context/userContext';
import { LuLoader } from "react-icons/lu";

interface City {
    city: string;
}

export default function CityFilter() {
    const { selectedCity, setSelectedCity } = useUser();
    const [cities, setCities] = useState<City[]>([]);
    const [city, setCity] = useState<string>(selectedCity);
    const [loading, setLoading] = useState<boolean>(true);

    const handleCityChange = (e: FormEvent<HTMLSelectElement>) => {
        setSelectedCity(e.currentTarget.value);
        setCity(e.currentTarget.value);
    };

    const fetchCities = async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities');
            setCities(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    return (
        <div className="w-full max-w-md">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Select City
            </label>
            {loading ? (
                <div className="flex items-center justify-center h-10">
                    <LuLoader className="animate-spin" size={20} color="gray" />
                </div>
            ) : (
                <select
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleCityChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                >
                    <option value="" disabled>Select your city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.city}>
                            {city.city}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}