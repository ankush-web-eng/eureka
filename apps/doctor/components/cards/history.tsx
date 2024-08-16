import { History } from "@/types/DoctorVerificationFormDataType";

export default function HistoryCard({ historyItem }: { historyItem: History }) {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{historyItem?.patientId}</h3>
            <p className="text-sm text-gray-600 mb-1">Date: {new Date(historyItem.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 mb-1">Appointment Date: {new Date(historyItem?.appointmentdate).toLocaleDateString()}</p>
        </div>
    )
}