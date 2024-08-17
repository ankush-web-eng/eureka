"use client"
import AppointmentCard from "@/components/AppointmentCard";
import { useUser } from "@/context/userContext";
import { Appointment, Doctor } from "@/types/PatientType";
import { useEffect } from "react";

export default function Appointments() {

    const { userDetails, updatePatient } = useUser();
    const appointments = userDetails?.appointments;

    useEffect(() => {
        updatePatient();
    }, [updatePatient]);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pt-6">Your Appointments</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {appointments ? appointments.map((appointment: Appointment, index: React.Key) => (
                        <AppointmentCard key={index} appointment={appointment} />
                    )) : <span className="font-bold text-2xl">No appointments found</span>}
                </div>
            </div>
        </div>
    )
}