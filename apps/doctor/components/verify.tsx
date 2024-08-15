'use client'

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import DoctorVerificationFormSkeleton from "@/components/skeleton/DoctorVerificationFormSkeleton";
import { useDoctor } from "@/context/DoctorProvider";
const DoctorVerificationForm = dynamic(() => import('@/components/includes/DoctorDetailsForm'), { ssr: false });

export default function Verify() {

    const [verified, setVerified] = useState(false)
    const router = useRouter();
    const { doctor, updateDoc, status } = useDoctor();

    const checkUser = useCallback(() => {
        if (status === 200) {
            router.replace("/dashboard")
            return;
        } else if (status === 201) {
            setVerified(true);
            return;
        }
    }, [status, router])

    useEffect(() => {
        updateDoc()
    }, [updateDoc])

    useEffect(() => {
        checkUser();
    }, [checkUser])


    if (!verified) return <DoctorVerificationFormSkeleton />

    return <DoctorVerificationForm />
}
