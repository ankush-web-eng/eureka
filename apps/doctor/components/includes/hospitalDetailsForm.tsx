'use client';
import Image from 'next/image';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RiLoaderLine } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';
import { LuLoader } from 'react-icons/lu';
import { useToast } from '@/components/ui/use-toast';
import { useDoctor } from '@/context/DoctorProvider';
import { debounce } from 'lodash';
import { City, State, Country, Address } from '@/types/CityType';

const weekdays = [
    { name: 'Sunday', value: 0 },
    { name: 'Monday', value: 1 },
    { name: 'Tuesday', value: 2 },
    { name: 'Wednesday', value: 3 },
    { name: 'Thursday', value: 4 },
    { name: 'Friday', value: 5 },
    { name: 'Saturday', value: 6 },
];

const HospitalDetailsForm = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { toast } = useToast();
    const { doctor, updateDoc } = useDoctor();

    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [hostpitalId, setHostpitalId] = useState<string | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const API_PHOTO_UPLOAD = '/api/photoUpload';

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        address: '',
        fee: '',
        availableDays: [] as number[],
        diseases: [] as string[],
    });

    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [selectedState, setSelectedState] = useState<State | null>(null);
    const [address, setAddress] = useState<Address[] | null>(null);
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

    const isInitialMount = useRef(true);

    useEffect(() => {
        updateDoc();
        fetchCountries();
    }, []);

    useEffect(() => {
        if (isInitialMount.current && doctor) {
            setFormData({
                name: doctor.hospital.name || '',
                city: doctor.hospital.city || '',
                fee: doctor.hospital.fee.toString(),
                address: doctor.hospital.address || '',
                availableDays: doctor.hospital.availableDays || [],
                diseases: doctor.hospital.diseases || [],
            });
            setImageSrc(doctor.hospital.image || null);
            isInitialMount.current = false;
            setHostpitalId(doctor.hospital.id);
        }
    }, [doctor]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get<Country[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/countries`);
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
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
        if (selectedCountry) {
            fetchStates(selectedCountry.isoCode);
            setCities([]);
            setFormData(prev => ({ ...prev, city: '' }));
            setSelectedState(null);
        }
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCountry && selectedState) {
            fetchCities(selectedCountry.isoCode, selectedState.isoCode);
        }
    }, [selectedCountry, selectedState])

    const handleClick = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

    const debouncedFetchAddress = useCallback(
        debounce(async (input: string) => {
            if (input.length > 6) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_LOCATION_API_URL}?key=${process.env.NEXT_PUBLIC_LOCATION_API_KEY}&q=${input}`);
                    setAddressSuggestions(response.data.map((item: Address) => item.display_name));
                } catch (error) {
                    console.error('Error fetching address suggestions:', error);
                }
            } else {
                setAddressSuggestions([]);
            }
        }, 300), // 300ms delay
        []
    );


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setResponse(true);

        if (!selectedFile.type.startsWith('image/')) {
            toast({
                title: 'Error',
                description: 'Please upload an image file',
                duration: 2000,
                variant: 'destructive'
            });
            setResponse(false);
            return;
        }

        if (selectedFile.size > 1024 * 1024) {
            toast({
                title: 'Error',
                description: 'File size should be less than 1MB',
                duration: 2000,
                variant: 'destructive'
            });
            setResponse(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target?.result ?? null);
            setResponse(false);
        };
        reader.readAsDataURL(selectedFile);
        setFile(selectedFile);
    };

    const uploadImage = async (file: File): Promise<string> => {
        try {
            const formData = new FormData();
            formData.append('file', file as File);
            const response = await axios.post(API_PHOTO_UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status !== 200) {
                toast({
                    title: 'Error',
                    description: 'Error uploading Image',
                    duration: 2000,
                    variant: 'destructive'
                })
                throw new Error('Error uploading image');
            }
            return response.data.url;
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'Server Error in Uploading Image',
                duration: 2000,
                variant: 'destructive'
            })
            throw new Error('Server Error uploading image');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (name === 'address') {
            debouncedFetchAddress(value);
        }
    };

    const handleDiseases = (e: ChangeEvent<HTMLInputElement>) => {
        const diseases = e.target.value.split(',').map(disease => disease.trim());
        setFormData(prevState => ({ ...prevState, diseases }));
    };

    const handleWeekdayChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedDay = parseInt(e.target.value);name
        setFormData(prevState => ({
            ...prevState,
            availableDays: prevState.availableDays.includes(selectedDay)
                ? prevState.availableDays.filter(day => day !== selectedDay)
                : [...prevState.availableDays, selectedDay].sort((a, b) => a - b)
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            let imageUrl = doctor?.image;
            if (file) {
                imageUrl = await uploadImage(file);
            }

            const payload = {
                ...formData,
                fee: parseInt(formData.fee),
                image: imageUrl,
                email: session?.user?.email,
                id: hostpitalId
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/hospital/create`, payload);

            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Hospital details updated successfully',
                    duration: 2000
                });
                router.refresh();
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to update hospital details',
                    duration: 2000,
                    variant: 'destructive'
                });
                throw new Error('Failed to update hospital details');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: 'Error',
                description: 'Failed to update hospital details',
                duration: 2000,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    Update Hospital Details
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {['name', 'fee'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    id={field}
                                    name={field}
                                    type={field === 'fee' ? 'number' : 'text'}
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field as keyof typeof formData] as string}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <select
                            id="country"
                            name="country"
                            value={selectedCountry?.isoCode || ''}
                            onChange={(e) => setSelectedCountry(countries.find(c => c.isoCode === e.target.value) || null)}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a country</option>
                            {countries?.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country?.name || ''}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={selectedState?.isoCode || ''}
                            onChange={(e) => setSelectedState(states.find(s => s.isoCode === e.target.value) || null)}
                            required
                            disabled={!selectedCountry}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a state</option>
                            {states?.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state?.name || ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            disabled={!selectedState}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a city</option>
                            {cities?.map((city) => (
                                <option key={city?.name} value={city?.name}>
                                    {city?.name || ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            list="addressSuggestions"
                        />
                        <datalist id="addressSuggestions">
                            {addressSuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="diseases" className="block text-sm font-medium text-gray-700 mb-1">Diseases</label>
                        <input
                            type="text"
                            id="diseases"
                            name="diseases"
                            placeholder="Diseases (comma-separated)"
                            value={formData.diseases.join(', ')}
                            onChange={handleDiseases}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="weekdays" className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                        <select
                            id="weekdays"
                            name="weekdays"
                            onChange={handleWeekdayChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select available days</option>
                            {weekdays?.map((day) => (
                                <option key={day.value} value={day.value}>
                                    {day?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {formData.availableDays.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Selected days:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {formData.availableDays.map(dayValue => (
                                    <span key={dayValue} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {weekdays.find(day => day.value === dayValue)?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="flex items-center space-x-6">
                        <div className="relative h-24 w-24">
                            <div className="absolute -top-2 -right-2 z-10">
                                {response ? (
                                    <RiLoaderLine className="animate-spin text-indigo-500 h-6 w-6" />
                                ) : (
                                    <button type="button" onClick={handleClick} className="bg-indigo-100 rounded-full p-1">
                                        <FaPencilAlt className="h-4 w-4 text-indigo-600" />
                                    </button>
                                )}
                            </div>
                            <div className="h-24 w-24 rounded-full overflow-hidden">
                                {imageSrc ? (
                                    <Image
                                        src={imageSrc as string}
                                        alt="Uploaded Image"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                ) : (
                                    <Image src="/logo.jpeg" alt="Default Image" width={96} height={96} className="object-cover" />
                                )}
                            </div>
                        </div>
                        <input
                            ref={imageRef}
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <p className="text-sm text-gray-500">Upload a hospital image (Max 1MB)</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            {loading ? <LuLoader className="animate-spin" color="white" size={20} /> : "Update Hospital Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalDetailsForm;