import { Appointment } from "@/types/DoctorVerificationFormDataType";

export default function AppointmentCard({ appointment } : {appointment: Appointment}) {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{appointment.patientId}</h3>
            <p className="text-sm text-gray-600 mb-1">Date: {new Date(appointment.date).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Status: {appointment.isApproved? "Approved" : "Pending"}</p>
        </div>
    )
}