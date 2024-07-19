'use client'

import { useEffect, useState, FormEvent, useCallback } from 'react';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';
import { useSession } from 'next-auth/react';

interface City {
    city: string;
}

interface CitySelectorProps {
    email: string;
}

export default function CityFilter() {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState<boolean>(false);

    const { data: session } = useSession()

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

    const fetchUser = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:4000/patient/user/${session?.user?.email}`);
            setSelectedCity(res.data.city);
        } catch (error) {
            console.log('Error fetching user:', error);
        }
    }, [session])

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        fetchUser()
    }, [fetchUser])


    return (
        <div className="h-fit py-3 flex justify-center items-center bg-inherit">
            <form className='space-x-2' >
                <select
                    name="city"
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
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
                <button className="px-3 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl" type="submit">
                    {sending ? <LuLoader size={60} color="white" className="animate-spin" /> : 'Apply'}
                </button>
            </form>
        </div>
    );
}
