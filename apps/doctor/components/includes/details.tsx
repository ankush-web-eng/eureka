import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { LuLoader } from 'react-icons/lu';

interface FormData {
    email: string;
    name: string;
    hospital: string;
    city: string;
    address: string;
    profile: string;
    phone: string;
    fee: string;
    diseases: string[];
}

interface City {
    city: string;
}

const DoctorVerificationForm = () => {
    const router = useRouter();
    const { data: session } = useSession()

    const fileInput = useRef<HTMLInputElement>(null);

    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        hospital: '',
        city: '',
        address: '',
        profile: '',
        phone: '',
        fee: '',
        diseases: [],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDiseases = (e: ChangeEvent<HTMLInputElement>) => {
        const diseases = e.target.value.split(',').map(disease => disease.trim());
        setFormData(prevState => ({ ...prevState, diseases }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { ...formData, fee: parseInt(formData.fee, 10) };
            const res = await axios.post(`http://localhost:4000/doctor/user/create/${session?.user?.email}`, payload);
            if (res.status === 200) {
                router.push('/dashboard');
                return;
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
        console.log({ ...formData, fee: parseInt(formData.fee, 10) });
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities');
                setCities(response.data.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Doctor Verification
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        {['name', 'hospital', 'email', 'phone', 'fee'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="sr-only">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    id={field}
                                    name={field}
                                    type={field === 'email' ? 'email' : field === 'fee' ? 'number' : 'text'}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field as keyof FormData]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <select
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                        >
                            <option value="" disabled>Select your city</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city.city}>{city.city}</option>
                            ))}
                        </select>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                        />
                        <input
                            type='file'
                            hidden
                            ref = {fileInput}
                        />
                        <input
                            type="text"
                            id="diseases"
                            name="diseases"
                            placeholder="Diseases (comma-separated)"
                            value={formData.diseases.join(', ')}
                            onChange={handleDiseases}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                        />
                        <button className='text-white bg-black rounded-md px-3 py-2' 
                            onClick={() => {
                            fileInput.current?.click();
                        }}>Add Image</button>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            {loading ? <LuLoader className="animate-spin" color="gray" size={20} /> : "Submit for Verification"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorVerificationForm;