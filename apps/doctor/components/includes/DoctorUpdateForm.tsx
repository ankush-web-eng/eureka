'use client'
import Image from 'next/image';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { RiLoaderLine } from 'react-icons/ri';
import { FaPencilAlt } from 'react-icons/fa';
import { LuLoader } from 'react-icons/lu';
import { useToast } from '@/components/ui/use-toast';
import TimeSlotPicker from '@/components/extentions/TimePlotPicker';
import type { TimeSlot, FormData } from '@/types/DoctorVerificationFormDataType';
import { useDoctor } from '@/context/DoctorProvider';

const DoctorUpdateForm = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const { toast } = useToast()
    const { doctor, updateDoc } = useDoctor();

    const API_PHOTO_UPLOAD = '/api/photoUpload';

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [response, setResponse] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [currentTimeSlot, setCurrentTimeSlot] = useState<TimeSlot>({ startTime: new Date(), endTime: new Date() });

    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        phone: '',
    });

    const isInitialMount = useRef(true);

    useEffect(() => {
        updateDoc();
    }, [updateDoc]);

    useEffect(() => {
        if (isInitialMount.current && doctor) {
            setFormData({
                email: doctor.email || '',
                name: doctor.name || '',
                phone: doctor.phone || '',
            });
            setImageSrc(doctor.image || null);
            setTimeSlots(doctor.availableTimes || []);
            isInitialMount.current = false;
        }
    }, [doctor]);

    const handleClick = async () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
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

    const createUser = async (email: string, payload: any): Promise<void> => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/user/update`, payload);
            if (response.status !== 200) {
                toast({
                    title: 'Error',
                    description: 'Server Error in verifying user',
                    duration: 2000,
                    variant: 'destructive'
                })
                throw new Error('Error creating user');
            } else {
                toast({
                    title: 'Success',
                    description: 'Doctor verification request submitted successfully',
                    duration: 2000
                })
                if (window.location.pathname === '/') {
                    router.replace('/edithospital');
                }
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Error in sending data to server',
                duration: 2000,
                variant: 'destructive'
            })
        }
        console.log(payload)
    };

    const validateForm = (file: File | null): void => {
        if (!file) {
            toast({
                title: 'Error',
                description: 'Please upload a profile picture',
                duration: 2000,
                variant: 'destructive'
            })
            throw new Error('Profile picture not uploaded');
        }
    };

    const handleTimeSlotChange = (startTime: Date, endTime: Date) => {
        setCurrentTimeSlot({ startTime, endTime });
    };

    const addTimeSlot = () => {
        if (currentTimeSlot.startTime && currentTimeSlot.endTime) {
            setTimeSlots([...timeSlots, currentTimeSlot]);
            setCurrentTimeSlot({ startTime: new Date(), endTime: new Date() });
        }
    };

    const removeTimeSlot = (index: number) => {
        setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

        if (selectedFile.size > 2 * 1024 * 1024) {
            toast({
                title: 'Error',
                description: 'File size should be less than 2MB',
                duration: 2000,
                variant: 'destructive'
            })
            setResponse(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageSrc(e.target?.result ?? null);
            const img = new window.Image();
            img.onload = () => {
                setResponse(false);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
        setFile(selectedFile);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            validateForm(file);
            if (timeSlots.length === 0) {
                toast({
                    title: 'Error',
                    description: 'Please add at least one time slot',
                    duration: 2000,
                    variant: 'destructive'
                });
                return;
            }
            let imageUrl = doctor?.image;
            if (file) {
                imageUrl = await uploadImage(file);
            }
            const payload = {
                ...formData,
                image: imageUrl,
                email: session?.user?.email,
                availableTimes: timeSlots
            };
            console.log("payload", payload)
            if (!session?.user?.email) throw new Error("User email not found");
            await createUser(session?.user?.email, payload);
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                title: 'Error',
                description: 'Server Error',
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    Doctor Profile
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {['name', 'phone'].map((field) => (
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slots</label>
                        <div className='flex items-center space-x-3 justify-startTime'>
                            <TimeSlotPicker onTimeSlotChange={handleTimeSlotChange} />
                            <button
                                type="button"
                                onClick={addTimeSlot}
                                className="mt-2 px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 border border-gray-300 transition duration-150 ease-in-out"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {timeSlots.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Added time slots:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {timeSlots.map((slot, index) => (
                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
                                        <button onClick={() => removeTimeSlot(index)} className="ml-1 text-indigo-600 hover:text-indigo-800">
                                            ×
                                        </button>
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
                        <p className="text-sm text-gray-500">Upload a profile picture (Max 2MB)</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            {loading ? <LuLoader className="animate-spin" color="white" size={20} /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default DoctorUpdateForm;