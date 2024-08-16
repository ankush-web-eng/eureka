import { Metadata } from "next";
import dynamic from "next/dynamic";

import AppointmentsSkeleton from "@/components/skeleton/AppointmentSkeleton"
const History = dynamic(() => import("@/components/extentions/History"), { ssr: false, loading: () => <AppointmentsSkeleton /> })

export const metadata: Metadata = {
    title: "History",
    description: "History",
    keywords: "History",
};

export default function Page() {
    return <History />
}