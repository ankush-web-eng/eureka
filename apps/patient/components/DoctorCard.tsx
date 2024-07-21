import Image from "next/image";
import { BookingAlertdialog } from "./layout/includes/BookingAlert";

interface Doctor {
    id: string;
    name: string;
    hospital: string;
    slots: Slot[];
    profile: string;
    city: string;
    fee: number;
}

interface Slot {
    id: string;
    date: string;
    time: string;
}

export default function DoctorCard({ params }: { params: Doctor }) {
    return (
        <div className="rounded-xl py-4 px-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-md grid grid-cols-3 gap-4 bg-white">
            <div className="col-span-2 flex flex-col justify-between">
                <div>
                    <h1 className="font-semibold text-xl mb-1 text-gray-900">
                        Dr. {params.name}
                    </h1>
                    <h2 className="text-gray-600 mb-2">
                        {params.hospital}
                    </h2>
                    <h3 className="text-lg font-medium mb-2 text-gray-800">
                        Available Slots
                    </h3>
                </div>
                <div className="overflow-y-auto no-scrollbar max-h-32 pr-2">
                    {params.slots.map((slot: Slot, index: any) => (
                        <BookingAlertdialog slot={slot} name={params.name} fee={params.fee} key={index} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-between">
                <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-gray-300">
                    <Image
                        src={params.profile}
                        alt={`Dr. ${params.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        priority
                    />
                </div>
                <p className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full mt-2">
                    {params.city}
                </p>
            </div>
        </div>
    );
}