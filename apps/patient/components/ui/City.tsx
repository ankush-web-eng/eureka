'use client'

import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

interface City {
    city: string;
}

interface CitySelectorProps {
    email: string;
}

export default function CitySelector({ email }: CitySelectorProps) {
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
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

        fetchCities();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/user/create/${email}`, { city: selectedCity });
            if (res.status === 200) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error submitting city:', error);
        }finally{
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LuLoader size={60} color="black" className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="h-screen flex justify-center items-center bg-inherit">
            <form className='space-x-4' onSubmit={handleSubmit}>
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
                    {sending ? <LuLoader size={60} color="white" className="animate-spin" /> : 'Submit'}
                </button>
            </form>
        </div>
    );
}
