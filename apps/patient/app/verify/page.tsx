'use client'

import axios from "axios";
import { LuLoader } from "react-icons/lu";
import CitySelector from "@/components/ui/City";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isUserNotFound, setIsUserNotFound] = useState(false);

    const verifyUser = useCallback(async () => {
        if (status !== "authenticated" || !session?.user?.email) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get(`http://localhost:4000/patient/user/${session.user.email}`);
            if (res.status === 200) {
                router.push("/dashboard");
            } else if (res.status === 404) {
                setIsUserNotFound(true);
            }
        } catch (error : any) {
            if (error.response && error.response.status === 404) {
                setIsUserNotFound(true);
            } else {
                console.error('Error fetching user:', error);
            }
        } finally {
            setLoading(false);
        }
    }, [session, status, router]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <LuLoader size={60} color="blue" className="animate-spin" />
            </div>
        );
    }

    if (isUserNotFound) {
        return <CitySelector email={session?.user?.email || ""} />;
    }

    return null;
}
