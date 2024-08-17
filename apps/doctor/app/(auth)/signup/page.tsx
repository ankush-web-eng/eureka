import dynamic from "next/dynamic";
import { Metadata } from "next";

import { SignUpSkeleton } from "@/components/skeleton/SignUpSkeleton";
const SignUp = dynamic(() => import("@/components/includes/signup"), { loading: () => <SignUpSkeleton /> });

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign up to create an account"
}

export default function Page() {
    return <SignUp />
}