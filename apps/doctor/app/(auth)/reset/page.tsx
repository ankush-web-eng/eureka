import dynamic from "next/dynamic";
import { Metadata } from "next";

import ResetPasswordSkeleton from "@/components/skeleton/ResetPasswordSkeleton";
const Reset = dynamic(() => import("@/components/auth/reset"), { ssr: false, loading: () => <ResetPasswordSkeleton /> });

export const metadata: Metadata = {
    title: "Reset your Password",
    description: "Verify your email and reset passwrord.",
    keywords: "reset, reset-password, verify"
}

export default function Page() {
    return <Reset />
}