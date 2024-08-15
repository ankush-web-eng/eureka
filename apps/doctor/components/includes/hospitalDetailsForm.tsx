'use client';
import Image from 'next/image';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { RiLoaderLine } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';
import { LuLoader } from 'react-icons/lu';
import { useToast } from '@/components/ui/use-toast';

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

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        address: '',
        fee: '',
        availableDays: [] as number[],
        diseases: [] as string[],
    });

    const handleClick = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDiseases = (e: ChangeEvent<HTMLInputElement>) => {
        const diseases = e.target.value.split(',').map(disease => disease.trim());
        setFormData(prevState => ({ ...prevState, diseases }));
    };

    const handleWeekdayChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedDay = parseInt(e.target.value);
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
            if (!file) {
                toast({
                    title: 'Error',
                    description: 'Please upload a hospital image',
                    duration: 2000,
                    variant: 'destructive'
                });
                setLoading(false);
                return;
            }

            const payload = {
                ...formData,
                fee : parseInt(formData.fee),
                image : file,
                email : session?.user?.email
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/hospital/create`,
                payload,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Hospital details updated successfully',
                    duration: 2000
                });
                router.push('/dashboard');
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
                        {['name', 'city', 'fee'].map((field) => (
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
                    <div>
                        <label htmlFor="weekdays" className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                        <select
                            id="weekdays"
                            name="weekdays"
                            onChange={handleWeekdayChange}
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select available days</option>
                            {weekdays.map((day) => (
                                <option key={day.value} value={day.value}>
                                    {day.name}
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
                        <p className="text-sm text-gray-500">Upload a hospital image (Max 2MB)</p>
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