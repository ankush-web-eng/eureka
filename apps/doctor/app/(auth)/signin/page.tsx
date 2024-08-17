import dynamic from "next/dynamic";
import { Metadata } from "next";

import { SignInSkeleton } from "@/components/skeleton/SigninSkeleton";
const SignIn = dynamic(() => import('@/components/includes/signIn'), {ssr: false, loading: () => <SignInSkeleton />});

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account',
    keywords: 'signin, login, account',
}

export default function Page() {
    return <SignIn />
}