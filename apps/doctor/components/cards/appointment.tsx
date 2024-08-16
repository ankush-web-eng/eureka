import { Appointment } from "@/types/DoctorVerificationFormDataType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TbLoader } from "react-icons/tb";
import { useToast } from "../ui/use-toast";
import axios from "axios";

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {

    const { toast } = useToast()

    const statusColor = appointment.isApproved ? 'bg-green-400' : 'bg-yellow-400';
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const handleReject = async (id: string) => {
        setLoading1(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/appointments/reject`, { appointmentId: id })
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Appointment rejected successfully",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: `${error.message}`,
                variant: "destructive"
            })
        } finally {
            setLoading1(false)
        }
    }
    const handleApprove = async (id: string) => {
        setLoading2(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/appointments/approve`, { appointmentId: id })
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Appointment approved successfully",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: `${error.message}`,
                variant: "destructive"
            })
        } finally {
            setLoading2(false)
        }
    }
    const handleCompleted = async (id: string) => {
        setLoading3(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/appointments/completed`, { appointmentId: id })
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: "Appointment completed successfully",
                })
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: `${error.message}`,
                variant: "destructive"
            })
            console.error(error)
        } finally {
            setLoading3(false)
        }
    }

    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200 space-y-3">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{appointment.patient.name}</h3>
            <p className="text-sm text-gray-600 mb-1">Date: {new Date(appointment.date).toLocaleString()}</p>
            <p className={`text-sm w-fit text-white py-1 px-2 rounded-xl ${statusColor}`}>{appointment.isApproved ? "Approved" : "Pending"}</p>
            <div className="flex space-x-3 items-center justify-start">
                <Button onClick={() => handleApprove(appointment.id)}>{loading2 ? <TbLoader className="animate-spin" /> : "Approve"}</Button>
                <Button onClick={() => handleReject(appointment.id)}>{loading1 ? <TbLoader className="animate-spin" /> : "Reject"}</Button>
                <Button onClick={() => handleCompleted(appointment.id)}>{loading3 ? <TbLoader className="animate-spin" /> : "Completed"}</Button>
            </div>
        </div>
    );
}