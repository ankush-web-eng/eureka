"use client"
import HistoryCard from "@/components/HistoryCard";
import { useUser } from "@/context/userContext";
import { Appointment, Doctor, History } from "@/types/PatientType";

export default function Appointments() {
    const { userDetails } = useUser();
    const appointments = userDetails?.history;


    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pt-6">Appointment History</h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {appointments ? appointments.map((history: History, index: React.Key) => (
                        <HistoryCard key={index} history={history} />
                    )) : <span className="font-bold text-2xl">No appointments found</span>}
                </div>
            </div>
        </div>
    )
}