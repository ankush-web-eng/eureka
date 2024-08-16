import Image from "next/image";


export default function AppointmentCard({ appointment }: { appointment: any }) {

    return (
        <div className="rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md bg-white">
            <div className="flex items-start space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                        src={appointment.doctor.profile}
                        alt={`Dr. ${appointment.doctor.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full border-2 border-blue-500"
                        priority
                    />
                </div>
                <div className="flex-grow">
                    <h1 className="font-bold text-xl mb-1 text-gray-900">
                        Dr. {appointment.doctor.name}
                    </h1>
                    <h2 className="text-gray-600 mb-1">
                        {appointment.doctor.hospital.name}
                    </h2>
                    <p className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-2">
                        {appointment.doctor.city}
                    </p>
                    <p className="text-sm bg-blue-100 text-green-500 px-3 py-1 rounded-full inline-block mb-2">
                        Paid
                    </p>
                </div>
            </div>
            <div className="font-semibold text-xl">
                Appointment timing: {appointment.date.getDate()}/{appointment.date.getMonth()}/{appointment.date.getFullYear()} {" "} {appointment.date.getDay()}
            </div>
        </div>
    )
}   