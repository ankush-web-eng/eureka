'use client'

import axios from "axios";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import DoctorVerificationFormSkeleton from "@/components/skeleton/DoctorVerificationFormSkeleton";
const DoctorVerificationForm = dynamic(() => import('@/components/includes/DoctorDetailsForm'), { ssr: false });

export default function Verify() {

    const [verified, setVerified] = useState(false)

    const { data: session } = useSession()
    const router = useRouter()

    const checkUser = useCallback(async () => {
        try {
            if (session?.user?.email) {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/user/${session.user.email}`)
                if (res.status === 200) {
                    setVerified(false)
                    router.push("/dashboard")
                    return;
                } else if (res.status === 201) {
                    setVerified(true)
                    return;
                }
            } else {
                router.push('/signin')
                return;
            }
        } catch (error) {
            console.error("Error checking user:", error)
        }
    }, [session, router])

    useEffect(() => {
        checkUser();
    }, [checkUser, session, router])


    if (!verified) return <DoctorVerificationFormSkeleton />
    
    return <DoctorVerificationForm />
}
