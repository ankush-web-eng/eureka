import { History } from "@/types/DoctorVerificationFormDataType";

export default function HistoryCard({ historyItem }: { historyItem: History }) {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 space-y-3">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{historyItem.patient.name}</h3>
            <p className="text-sm text-gray-600 mb-1">Date: {new Date(historyItem.date).toLocaleString()}</p>
        </div>
    )
}