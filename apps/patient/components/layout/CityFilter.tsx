'use client'
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { LuLoader } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import CitySelectorSkeleton from '@/components/skeleton/citySelectorSkeleton';
import { useSession } from 'next-auth/react';
import { City, State, Country } from '@/types/CityType';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/context/userContext';

export default function CityFilter() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedState, setSelectedState] = useState<State | null>(null);
    const [selectedCurrentCity, setSelectedCurrentCity] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [sending, setSending] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const { data: session } = useSession();
    const { selectedCity, setSelectedCity } = useUser();

    const fetchCountries = async () => {
        try {
            const response = await axios.get<Country[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/countries`);
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStates = async (countryCode: string) => {
        try {
            const response = await axios.get<State[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/states/?country=${countryCode}`);
            setStates(response.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }

    const fetchCities = async (countryCode: string, stateCode: string) => {
        try {
            const response = await axios.get<City[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/cities/?country=${countryCode}&state=${stateCode}`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            fetchStates(selectedCountry.isoCode);
            setCities([]);
            setSelectedCurrentCity('');
            setSelectedState(null);
        }
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCountry && selectedState) {
            fetchCities(selectedCountry.isoCode, selectedState.isoCode);
        }
    }, [selectedCountry, selectedState])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/user/create/${session?.user?.email}`, { city: selectedCurrentCity, name: session?.user?.name });
            toast({
                title: 'City submitted successfully',
                description: 'You will be redirected to the dashboard shortly',
            })
            if (res.status === 200) {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error submitting city:', error);
        } finally {
            setSending(false);
            setSelectedCity(selectedCurrentCity);
        }
    };

    const height = window.location.pathname === "/verify" ? "min-h-screen" : "h-fit";

    if (loading) {
        return <CitySelectorSkeleton />;
    }

    return (
        <div className={`${height} flex items-center justify-center bg-gray-100`}>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Select your country
                        </label>
                        <select
                            name="country"
                            id="country"
                            value={selectedCountry?.isoCode || ''}
                            onChange={(e) => setSelectedCountry(countries.find(c => c.isoCode === e.target.value) || null)}
                            required
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        >
                            <option value="" disabled>Select your country</option>
                            {countries.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            Select your state
                        </label>
                        <select
                            name="state"
                            id="state"
                            value={selectedState?.isoCode || ''}
                            onChange={(e) => {
                                setSelectedState(states.find(s => s.isoCode === e.target.value) || null);
                                setSelectedCurrentCity('');
                            }}
                            required
                            disabled={!selectedCountry}
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        >
                            <option value="" disabled>Select your state</option>
                            {states.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Select your city
                        </label>
                        <select
                            name="city"
                            id="city"
                            value={selectedCurrentCity}
                            onChange={(e) => setSelectedCurrentCity(e.target.value)}
                            required
                            disabled={!selectedState}
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                        >
                            <option value="" disabled>Select your city</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
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