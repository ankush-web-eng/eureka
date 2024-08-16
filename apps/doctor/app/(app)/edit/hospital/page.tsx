import { Metadata } from "next";
import dynamic from "next/dynamic";

import HospitalDetailsFormSkeleton from "@/components/skeleton/HospitalDetailsFormSkeleton";
const HospitalDetailsForm = dynamic(() => import("@/components/includes/hospitalDetailsForm"), {ssr: false, loading: () => <HospitalDetailsFormSkeleton />});

export const metadata: Metadata = {
    title: "Edit",
    description: "Edit Hospital Details",
}

export default function Page(){
    return <HospitalDetailsForm />
}