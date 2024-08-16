'use client'
import { useUser } from "@/context/userContext";
import axios from "axios";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Doctor } from "@/components/DoctorCard";

import DoctorsPageSkeleton from "@/components/skeleton/DoctorPageSkeleton";
import DoctorCardSkeleton from "@/components/skeleton/DoctorCardsSkeleton";
import CitySelectorSkeleton from "@/components/skeleton/citySelectorSkeleton";

const DoctorCard = dynamic(() => import("@/components/DoctorCard"), { ssr: false, loading: () => <DoctorCardSkeleton /> });
const CityFilter = dynamic(() => import("@/components/layout/CityFilter"), { ssr: false, loading: () => <CitySelectorSkeleton /> });

export default function Doctors() {
    const { selectedCity } = useUser();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const getDoctors = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<any[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/doctors?city=${selectedCity}`);
            const formattedDoctors = response.data.map(item => ({
                id: item.doctor?.id || item.id,
                email: item.doctor?.email || '',
                name: item.doctor?.name || '',
                hospital: item.name,
                city: item.city,
                address: item.address,
                profile: item.doctor?.image || item.image,
                phone: item.doctor?.phone || '',
                fee: item.fee,
                availableDays: item.availableDays,
                availableTimes: item.doctor?.availableTimes || [],
                diseases: item.diseases,
            }));
            setDoctors(formattedDoctors);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }, [selectedCity]);

    useEffect(() => {
        getDoctors();
    }, [getDoctors]);

    if (loading) {
        return <DoctorsPageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center w-full mb-8 mt-4">
                    <CityFilter />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Nearby Doctors</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
}