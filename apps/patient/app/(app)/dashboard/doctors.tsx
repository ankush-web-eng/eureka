'use client'
import { useUser } from "@/context/userContext";
import axios from "axios";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Doctor, TimeSlot } from "@/components/DoctorCard";

const DoctorCard = dynamic(() => import("@/components/DoctorCard"));
const CityFilter = dynamic(() => import("@/components/layout/CityFilter"), { ssr: false });
const DiseaseFilter = dynamic(() => import("@/components/layout/DiseaseFilter"), { ssr: false });

export default function Doctors() {
    const { selectedCity } = useUser();
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const getDoctors = useCallback(async () => {
        try {
            const response = await axios.get<Doctor[]>(`http://localhost:4000/patient/doctors?city=${selectedCity}`);
            console.log(response.data)
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }, [selectedCity]);

    useEffect(() => {
        getDoctors();
    }, [getDoctors]);

    return (
        <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center w-full mb-6">
                    <CityFilter />
                    {/* <DiseaseFilter /> */}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Nearby Doctors</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
}