import dynamic from "next/dynamic";
import { Metadata } from "next";

import DoctorVerificationFormSkeleton from "@/components/skeleton/DoctorVerificationFormSkeleton";
const Verify = dynamic(() => import("@/components/verify"), { loading: () => <DoctorVerificationFormSkeleton /> });

export const metadata: Metadata = {
    title: 'Verify',
    description: 'Verify yourself to access the dashboard',
}

export default function Page() {
    return <Verify />
}