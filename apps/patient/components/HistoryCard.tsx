import { History } from "@/types/PatientType";
import Image from "next/image";

export default function HistoryCard({ history }: { history: History }) {

    const date = new Date(history.date);

    return (
        <div className="rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md bg-white">
            <div className="flex items-start space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                        src={history.doctor.image || ''}
                        alt={`Dr. ${history.doctor.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border-2 border-blue-500"
                        priority
                    />
                </div>
                <div className="flex-grow">
                    <h1 className="font-bold text-xl mb-1 text-gray-900">
                        Dr. {history.doctor.name}
                    </h1>
                    <h2 className="text-gray-600 mb-1">
                        {history.doctor.hospital.name}
                    </h2>
                    <p className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-2">
                        {history.doctor.hospital.city}
                    </p>
                </div>
            </div>
            <div className="text-md font-medium">
                {date.toDateString()} at {date.toLocaleTimeString()}
            </div>
        </div>
    )
}   