'use client'
import { useUser } from "@/context/userContext";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import dynamic from "next/dynamic";
import { Doctor, FormattedDoctors, Hospital } from "@/types/PatientType";

import DoctorsPageSkeleton from "@/components/skeleton/DoctorPageSkeleton";

const DoctorCard = dynamic(() => import("@/components/DoctorCard"), { ssr: false, loading: () => <DoctorsPageSkeleton /> });
const CityDialog = dynamic(() => import("@/components/layout/CityDialog"), { ssr: false });

export default function Doctors() {
    const { selectedCity } = useUser();

    const fetchDoctors = async () => {
        const response = await axios.get<Hospital[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/doctors?city=${selectedCity}`);
        return response.data.map((item: Hospital) => ({
            id: item.doctor?.id || item.id,
            email: item.doctor?.email || '',
            name: item.doctor?.name || '',
            hospital: item.name,
            city: item.city,
            address: item.address,
            image: item.doctor?.image || item.image,
            phone: item.doctor?.phone || '',
            fee: item.fee,
            availableDays: item.availableDays,
            availableTimes: item.doctor?.availableTimes || [],
            diseases: item.diseases,
        }));
    };

    const { data: doctors = [], isLoading } = useQuery({
        queryKey: ['doctors', selectedCity],
        queryFn: fetchDoctors,
        staleTime: 1000 * 60 * 5,
    });


    if (isLoading) {
        return <DoctorsPageSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center w-full mb-8 mt-4">
                    <CityDialog />
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
