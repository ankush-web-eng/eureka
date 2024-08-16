"use client"
import AppointmentCard from "@/components/AppointmentCard";
import { useUser } from "@/context/userContext";

import { Doctor } from "@/types/PatientType";
export default function Appointments() {
    const { userDetails } = useUser();
    const appointments = userDetails?.appointments;
    return (
        <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Nearby Doctors</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {appointments ? appointments.map((doctor: Doctor) => (
                        <AppointmentCard key={doctor.id} appointment={appointments} />
                    )) : <span className="font-bold text-2xl">No appointments found</span>}
                </div>
            </div>
        </div>
    )
    // console.log(typeof useUser);

}