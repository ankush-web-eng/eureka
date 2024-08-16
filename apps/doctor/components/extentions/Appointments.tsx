'use client'

import { useDoctor } from "@/context/DoctorProvider"
import { useEffect, useState } from "react";
import AppointmentCard from "@/components/cards/appointment";
import AppointmentsSkeleton from "@/components/skeleton/AppointmentSkeleton";

export default function Appointments() {
    const { doctor, updateDoc } = useDoctor();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateDoc()
        setLoading(false)
    }, [updateDoc])

    if (loading) {
        return <AppointmentsSkeleton />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Appointments</h2>
                <div className="space-y-4">
                    {doctor?.appointments && doctor.appointments.length > 0 ? (
                        doctor.appointments.map((appointment, index) => (
                            <AppointmentCard key={index} appointment={appointment} />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No appointments found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}