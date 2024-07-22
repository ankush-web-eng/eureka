import Image from "next/image";
import { BookingAlertdialog } from "./layout/includes/BookingAlert";

interface Doctor {
    id: string;
    email: string;
    name: string;
    hospital: string;
    city: string;
    address: string;
    profile: string;
    phone: string;
    fee: number;
    diseases: string[];
    slots: Slot[];
}

interface Slot {
    id: string;
    date: string;
    time: string;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <div className="rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md bg-white">
            <div className="flex items-start space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                        src={doctor.profile}
                        alt={`Dr. ${doctor.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border-2 border-blue-500"
                        priority
                    />
                </div>
                <div className="flex-grow">
                    <h1 className="font-bold text-xl mb-1 text-gray-900">
                        Dr. {doctor.name}
                    </h1>
                    <h2 className="text-gray-600 mb-1">
                        {doctor.hospital}
                    </h2>
                    <p className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-2">
                        {doctor.city}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                        Fee: ${doctor.fee}
                    </p>
                </div>
            </div>
            
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Available Slots
                </h3>
                <div className="overflow-y-auto max-h-40 pr-2 space-y-2">
                    {doctor.slots && doctor.slots.map((slot: Slot) => (
                        <BookingAlertdialog 
                            slot={slot} 
                            name={doctor.name} 
                            fee={doctor.fee} 
                            key={slot.id} 
                        />
                    ))}
                </div>
            </div>
            
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                    {doctor.diseases.map((disease, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {disease}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}