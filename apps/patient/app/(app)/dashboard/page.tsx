import dynamic from "next/dynamic";
import type { Metadata } from "next";

import DoctorsPageSkeleton from "@/components/skeleton/DoctorPageSkeleton";
const Doctors = dynamic(() => import("./doctors"), { ssr: false, loading: () => <DoctorsPageSkeleton /> })

export const metadata: Metadata = {
    title: "Dashboard",
    description: "have a loot at all the doctors in oyur city",
    keywords: "Dashboard",
}

export default function Page() {
    return <Doctors />
}