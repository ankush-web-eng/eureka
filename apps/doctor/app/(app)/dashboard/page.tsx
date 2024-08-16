import dynamic from "next/dynamic"
import { Metadata } from "next"

import AppointmentsSkeleton from "@/components/skeleton/AppointmentSkeleton"
const Appointment = dynamic(() => import("@/components/extentions/Appointments"), {ssr: false, loading: () => <AppointmentsSkeleton />})

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
    keywords: "Dashboard",
}

export default function Page() {
    return <Appointment />
}