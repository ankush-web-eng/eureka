'use client';

import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { Patient } from "@/types/PatientType";

const CityFilter = dynamic(() => import("@/components/layout/CityFilter"), { ssr: false })

export default function CityDialog() {

    const { data: session } = useSession();
    const cityRef = useRef<HTMLButtonElement>(null);
    const [user, setUser] = useState<Patient | null>(null);

    const checkCity = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patient/user/${session?.user?.email}`);
            if (response.status != 200) {
                cityRef?.current?.click();
            } else {
                setUser(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [session?.user?.email]);

    useEffect(() => {
        checkCity();
    }, [checkCity]);

    return (
        <Dialog>
            <DialogTrigger asChild ref={cityRef}>
                <Button className="bg-gray-100 shadow-xl border text-black hover:bg-white" variant="default">{user ? user.city : "Select City"} <Image src='/dropdown.svg' alt="Dropdown" height={12} width={12} fetchPriority="low" loading="lazy" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <CityFilter />
            </DialogContent>
        </Dialog>
    )
}
