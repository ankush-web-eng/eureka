'use client';
import axios from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { useQuery } from '@tanstack/react-query';

import DoctorsPageSkeleton from "@/components/skeleton/DoctorPageSkeleton";
import { Button } from "@/components/ui/button";

import { Hospital, DoctorsResponse } from "@/types/PatientType";

const DoctorCard = dynamic(() => import("@/components/DoctorCard"), { ssr: false, loading: () => <DoctorsPageSkeleton /> });
const CityDialog = dynamic(() => import("@/components/layout/CityDialog"), { ssr: false });

export default function Doctors() {
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);

    const { selectedCity } = useUser();

    const fetchDoctors = async (page: number, limit: number): Promise<DoctorsResponse> => {
        const response = await axios.get<DoctorsResponse>(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/doctors`,
            {
                params: {
                    city: selectedCity,
                    page,
                    limit,
                },
            }
        );

        return {
            doctors: response.data.doctors.map((item: Hospital) => ({
                id: item.doctor?.id || item.id,
                email: item.doctor?.email || '',
                name: item.doctor?.name || '',
                hospital: item.name,
                city: item.city,
                address: item.address,
                image: item.doctor?.image || item?.image,
                phone: item.doctor?.phone || '',
                fee: item.fee,
                availableDays: item.availableDays,
                availableTimes: item.doctor?.availableTimes || [],
                diseases: item.diseases,
                phones: item.phones,
                doctor: item.doctor,
            })),
            meta: response.data.meta,
        };
    };

    const { data = { doctors: [], meta: { totalDoctors: 0, totalPages: 0, currentPage: 1 } }, isLoading } = useQuery({
        queryKey: ['doctors', selectedCity, page],
        queryFn: () => fetchDoctors(page, limit),
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
                    {data.doctors.length > 0 ? data.doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={{ email: '', hospital: '', phone: '', availableTimes: [], ...doctor }} />
                    )) : "No doctors found"}
                </div>
                <div className="flex justify-center mt-8 space-x-2">
                    <Button
                        variant={'default'}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant={'default'}>
                        Page {page} of {data.meta.totalPages}
                    </Button>
                    <Button
                        variant={'default'}
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page === data.meta.totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
