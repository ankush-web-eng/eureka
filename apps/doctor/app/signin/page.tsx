import SignIn from "@/components/includes/signIn";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account',
    keywords: 'signin, login, account',
}

export default function Page(){
    return <SignIn />
}