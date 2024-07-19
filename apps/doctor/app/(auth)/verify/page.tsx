'use client';
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Page() {

    const { data: session } = useSession()

    const handleSignOut = () => {
        if (session) {
            signOut()
        } else {
            window.location.href = "/sign-in"
        }
    }

    return (
        <div className="h-screen flex-col space-y-4 flex justify-center items-center">
            <h1 className="text-4xl font-semibold">
                Verified
            </h1>
            <Button onClick={handleSignOut}>{session ? "SignOut" : "SignIn"}</Button>
        </div>
    );
}