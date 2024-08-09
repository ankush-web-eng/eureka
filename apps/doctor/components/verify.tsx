'use client'

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import DoctorVerificationForm from "./includes/details"
import { LuLoader } from "react-icons/lu"

export default function Verify() {

    const [verified, setVerified] = useState(false)

    const { data: session } = useSession()
    const router = useRouter()

    const checkUser = useCallback(async () => {
        try {
            if (session?.user?.email) {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${session.user.email}`)
                if (res.status === 200) {
                    setVerified(false)
                    router.push("/dashboard")
                    return;
                } else if (res.status === 201) {
                    setVerified(true)
                    return;
                }
            } else {
                router.push('/signup')
                return;
            }
        } catch (error) {
            console.error("Error checking user:", error)
        }
    }, [session, router])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (session) {
                checkUser()
            } else {
                router.push('/api/auth/signin')
            }
        }, 2500);
        return () => clearTimeout(timer)
    }, [checkUser, session, router])

    if (!verified) {
        return <div className="h-screen flex justify-center items-center"><LuLoader className="animate-spin" color="gray" size={36} /></div>
    }

    return <DoctorVerificationForm />
}
