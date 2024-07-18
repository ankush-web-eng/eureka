import Image from "next/image";

interface Doctor {
    name: string;
    hospital: string;
    slots: Slot[];
    profile: string;
    city: string;
}

interface Slot {
    id: number;
    date: string;
    time: string;
}

export default function DoctorCard({ params }: { params: Doctor }) {
    return (
        <div className="rounded-xl py-4 px-6 border shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-md grid grid-cols-3 gap-4 bg-white">
            <div className="col-span-2  flex flex-col justify-between">
                <div>
                    <h1 className="font-semibold text-xl mb-1">
                        Dr. {params.name}
                    </h1>
                    <h2 className="text-gray-600 mb-2">
                        {params.hospital}
                    </h2>
                    <h3 className="text-lg font-medium mb-2">
                        Available Slots
                    </h3>
                </div>
                <div className="overflow-y-auto no-scrollbar max-h-32 pr-2">
                    {params.slots.map((slot: Slot, index : any) => (
                        <div key={index} className="flex justify-between text-sm mb-1 pb-1 border-b last:border-b-0">
                            <p className="text-gray-700">{slot.date}</p>
                            <p className="text-blue-600 font-medium">{slot.time}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-between">
                <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-gray-200">
                    <Image
                        src={params.profile}
                        alt={`Dr. ${params.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        priority
                    />
                </div>
                <p className="text-sm bg-gray-100 px-3 py-1 rounded-full mt-2">
                    {params.city}
                </p>
            </div>
        </div>
    );
}