'use client'

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react";

export default function Page() {

    const [dateTime, setDateTime] = useState<Date | null>(null);

    const email = useSession().data?.user?.email

    return (
        <div className="h-screen flex justify-center items-center text-2xl">
            <Button onClick={
                () => {
                    if (email) {
                        signOut()
                    } else {
                        window.location.href = "/api/auth/signin"
                    }
                }
            } >{email ? `SignOut - ${email}` : "SignIn"}</Button>
        </div>
    )
}