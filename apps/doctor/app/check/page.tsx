'use client'

import { useSession } from "next-auth/react"

export default function Page(){

   const email = useSession().data?.user?.email

    return (
        <div className="h-screen flex justify-center items-center text-2xl">{email ? "SignOut" : "SignIn"}</div>
    )
}