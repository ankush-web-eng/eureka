'use client'

import { useDoctor } from "@/context/DoctorProvider"
import { useEffect, useState } from "react";
import HistoryCard from "@/components/cards/history";
import AppointmentSkeleton from "@/components/skeleton/AppointmentSkeleton";

export default function History() {
    const { doctor, updateDoc } = useDoctor();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updateDoc()
        setLoading(false);
    }, [updateDoc])

    if (loading) {
        return <AppointmentSkeleton />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Appointment History</h2>
                <div className="space-y-4">
                    {doctor?.history && doctor.history.length > 0 ? (
                        doctor.history.map((historyItem, index) => (
                            <HistoryCard key={index} historyItem={historyItem} />
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No appointment history found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}