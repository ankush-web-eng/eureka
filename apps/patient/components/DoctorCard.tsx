import Image from "next/image";
import { Button } from "./ui/button";
import { LuLoader } from "react-icons/lu";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import DateTimePicker from "./layout/includes/DateTime";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Session } from "inspector";
import { useToast } from "./ui/use-toast";

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
}

interface Slot {
    id: string;
    date: string;
    time: string;
}

export default function DoctorCard({ doctor, slots }: { doctor: Doctor, slots?: Slot }) {

    const [loading, setLoading] = useState<boolean>(false);
    const {data:session} = useSession();
    const {toast} = useToast()
    const [dateTime, setDateTime] = useState<Date | null>(null);
    const handleDateTimeChange = (date: Date | null) => {
        setDateTime(date);
    }

    const payLoad = {
        doctor : doctor.id,
        date : dateTime,
    }

    const handleSubmit = async() => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:4000/patient/appointments/create?patientEmail=${session?.user?.email}`, payLoad);
            if (response.status === 200) {
                toast({
                    title: "Appointment booked successfully",
                    description: `Dr. ${doctor.name} will see you on ${dateTime}`
                })
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to book appointment",
                description: "Please try again later",
                variant: "destructive"
            })
        } finally{
            setLoading(false);
        }
    }

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
                        Fee: Rs.{doctor.fee}
                    </p>
                </div>
            </div>

            {/* <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Available Slots
                </h3>
                <div className="overflow-y-auto max-h-40 pr-2 space-y-2">
                    {slots && slots.map((slot: Slot) => (
                        <BookingAlertdialog 
                            slot={slot} 
                            name={doctor.name} 
                            fee={doctor.fee} 
                            key={slot.id} 
                        />
                    ))}
                </div>
            </div> */}

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

            <div className="mt-4">

                <Drawer>
                    <DrawerTrigger><Button>Book now</Button></DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                <div className="my-3">
                                    Select a time slot to book Dr.{doctor.name}
                                </div>
                            </DrawerTitle>
                            <DrawerDescription>
                                <div className="w-full flex justify-center items-center h-1/2">
                                    <DateTimePicker onDateTimeChange={handleDateTimeChange} />
                                </div>
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button className="w-full" onClick={handleSubmit}>{loading ? <LuLoader className="animate-spin" size={20} color="gray" /> : "Submit"}</Button>
                            <DrawerClose>
                                <Button className="w-full" variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>

            </div>
        </div>
    );
}