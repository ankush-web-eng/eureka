'use client'

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import DoctorVerificationForm from "./includes/details"

export default function Verify() {

    const [verified, setVerified] = useState(true)

    const { data: session } = useSession()
    const router = useRouter()

    const chechUser = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:4000/doctor/user/${session?.user?.email}`)
            if (res.status === 200) {
                setVerified(true)
                router.push("/dashboard")
            } else if (res.status === 404) {
                setVerified(false)
            }
        } catch (error) { }
    }, [session, router])

    useEffect(() => {
        chechUser()
    }, [chechUser])

    return (
        <div className="">
            {verified ? <div>Verifying...</div> : <DoctorVerificationForm />}
        </div>
    )
}