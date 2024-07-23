'use client'

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

export default function Page() {

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
            } >{email ? "SignOut" : "SignIn"}</Button>
        </div>
    )
}