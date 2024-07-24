'use client'

import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useUser } from '@/context/userContext';

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
        <div className="h-fit py-3 flex justify-center items-center bg-inherit">
            <form className='space-x-2' >
                <select
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleCityChange}
                    required
                    className='border py-3 rounded-2xl px-2'
                >
                    <option value="" disabled>Select your city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.city}>
                            {city.city}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}
