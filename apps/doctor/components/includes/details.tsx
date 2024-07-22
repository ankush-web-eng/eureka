import Image from 'next/image';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { RiLoaderLine } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';
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

    const API_PHOTO_UPLOAD = '/api/photoUpload';
    const API_CREATE_USER = 'http://localhost:4000/doctor/user/create/';

    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

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

    const uploadImage = async (file: File): Promise<string> => {
        try {
            const formData = new FormData();
            formData.append('file', file as File);
            const response = await axios.post(API_PHOTO_UPLOAD, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status !== 200) throw new Error("Error uploading profile picture");
            return response.data.url;
        } catch (error : any) {
            throw new Error(`Error uploading profile picture: ${error.message}`);
        }
    };

    const createUser = async (email: string, payload: any): Promise<void> => {
        const response = await axios.post(`${API_CREATE_USER}${email}`, payload);
        if (response.status !== 200) throw new Error("Error creating user");
    };

    const validateForm = (file: File | null): void => {
        if (!file) throw new Error("Please upload a profile picture");
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setResponse(true);

        if (selectedFile.size > 2 * 1024 * 1024) {
            alert("Image should be less than 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target?.result ?? null);
            const img = new window.Image();
            img.onload = () => {
                // if (img.height < 250 || img.width < 250 || img.width > 2096 || img.height > 2096) {
                //     alert("Image is not within the required dimensions");
                //     return;
                // }
                setResponse(false);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
        setFile(selectedFile);
    };

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
            validateForm(file);
            const url = await uploadImage(file as File);
            const payload = { ...formData, fee: parseInt(formData.fee, 10), profile : url, email : session?.user?.email };
            if (!session?.user?.email) throw new Error("User email not found");
            await createUser(session?.user?.email, payload);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Error submitting form");
        } finally {
            setLoading(false);
        }
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
            <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    Doctor Verification
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {['name', 'hospital', 'email', 'phone'].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    id={field}
                                    name={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field as keyof FormData]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <select
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select your city</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city.city}>{city.city}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fee" className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
                            <input
                                id="fee"
                                name="fee"
                                type="number"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Fee"
                                value={formData.fee}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            rows={3}
                        />
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
                        <p className="text-sm text-gray-500">Upload a profile picture (Max 2MB)</p>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {loading ? <LuLoader className="animate-spin" color="white" size={20} /> : "Submit for Verification"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorVerificationForm;