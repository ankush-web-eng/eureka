import { Metadata } from "next";
import dynamic from "next/dynamic";

import DoctorVerificationFormSkeleton from "@/components/skeleton/DoctorVerificationFormSkeleton";
const DoctorUpdateForm = dynamic(() => import("@/components/includes/DoctorUpdateForm"), { ssr: false, loading: () => <DoctorVerificationFormSkeleton /> });
const DoctorVerificationForm = dynamic(() => import("@/components/includes/DoctorDetailsForm"), { ssr: false, loading: () => <DoctorVerificationFormSkeleton /> });

export const metadata: Metadata = {
    title: "Edit",
    description: "Edit Doctor Details",
}

export default function Page() {
    return <DoctorUpdateForm />
}