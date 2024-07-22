'use client'
import { useCity } from "@/context/cityContext";
import axios from "axios";
import dynamic from "next/dynamic";

const DoctorCard = dynamic(() => import("@/components/DoctorCard"));
const CityFilter = dynamic(() => import("@/components/layout/CityFilter"), { ssr: false });
const DiseaseFilter = dynamic(() => import("@/components/layout/DiseaseFilter"), { ssr: false });

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

export default function Doctors() {

    const { selectedCity } = useCity();
    const API_URL = "http://localhost:4000/patient/doctors";
    const getDoctors = async () => {
        try {
            const response = await axios.get(`${API_URL}?city=${selectedCity}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }

    const doctor = {
        id: "56gfg83ruf794bfb",
        name: "John Doe",
        hospital: "City Hospital",
        fee: 100,
        slots: [
            {
                id: "1",
                date: "12/12/2021",
                time: "10:00 AM"
            },
            {
                id: "2",
                date: "12/12/2021",
                time: "11:00 AM"
            },
            {
                id: "3",
                date: "12/12/2021",
                time: "12:00 PM"
            },
            {
                id: "4",
                date: "12/12/2021",
                time: "01:00 PM"
            },
            {
                id: "5",
                date: "12/12/2021",
                time: "02:00 PM"
            },
            {
                id: "6",
                date: "12/12/2021",
                time: "03:00 PM"
            },
            {
                id: "7",
                date: "12/12/2021",
                time: "04:00 PM"
            },
            {
                id: "8",
                date: "12/12/2021",
                time: "05:00 PM"
            }
        ],
        profile: "https://res.cloudinary.com/dhnbk23gf/image/upload/v1718277516/s4qx0q78enpw9cmvwrti.png",
        city: "Mathura"
    }

    return (
        <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center w-full mb-6">
                    <CityFilter />
                    <DiseaseFilter />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Nearby Doctors</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <DoctorCard params={doctor} />
                    <DoctorCard params={doctor} />
                    <DoctorCard params={doctor} />
                    <DoctorCard params={doctor} />
                    <DoctorCard params={doctor} />
                    <DoctorCard params={doctor} />
                </div>
            </div>
        </div>
    );
}