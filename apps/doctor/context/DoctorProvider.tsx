'use client'

import { DoctorInformation } from "@/types/DoctorVerificationFormDataType"
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface Props {
    doctor: DoctorInformation | null,
    updateDoc: () => void;
    status: number | undefined;
}

const DoctorContext = createContext<Props | null>(null)

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {

    const [doctor, setDoctor] = useState<DoctorInformation | null>(null)
    const [status, setStatus] = useState<number>()
    const { data: session } = useSession()

    const getDoctor = useCallback(async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/user/${session?.user?.email}`)
            setDoctor(res.data.user)
            setStatus(res.status)
        } catch (error) { }
    }, [session])

    useEffect(() => {
        getDoctor();
    }, [getDoctor])

    const updateDoc = () => {
        getDoctor()
    }

    return (
        <DoctorContext.Provider value={{ doctor, updateDoc, status }}>
            {children}
        </DoctorContext.Provider>
    )
}

export const useDoctor = () => {
    const context = useContext(DoctorContext);
    if (!context) {
        throw new Error('useDoctor must be used within DoctorProvider')
    }
    return context;
}