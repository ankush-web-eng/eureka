import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
    const [cities, setCities] = useState<City[]>([]);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDiseases = (e: ChangeEvent<HTMLInputElement>) => {
        const diseases = e.target.value.split(',').map(disease => disease.trim());
        setFormData(prevState => ({ ...prevState, diseases }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({
            ...formData,
            fee: parseInt(formData.fee, 10)
        });
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
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doctor Verification</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="hospital" className="block mb-1">Hospital</label>
                    <input
                        type="text"
                        id="hospital"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block mb-1">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <select
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                </div>
                <div>
                    <label htmlFor="address" className="block mb-1">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="profile" className="block mb-1">Profile</label>
                    <textarea
                        id="profile"
                        name="profile"
                        value={formData.profile}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-1">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="fee" className="block mb-1">Fee</label>
                    <input
                        type="number"
                        id="fee"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="diseases" className="block mb-1">Diseases (comma-separated)</label>
                    <input
                        type="text"
                        id="diseases"
                        name="diseases"
                        value={formData.diseases.join(', ')}
                        onChange={handleDiseases}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Submit for Verification
                </button>
            </form>
        </div>
    );
};

export default DoctorVerificationForm;