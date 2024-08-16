'use client'
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import CitySelectorSkeleton from '@/components/skeleton/citySelectorSkeleton';

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
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return <CitySelectorSkeleton />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Select your city
                        </label>
                        <select
                            name="city"
                            id="city"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        >
                            <option value="" disabled>Select your city</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city.city}>
                                    {city.city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        {sending ? <LuLoader className='animate-spin' color='white' size={20} /> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}