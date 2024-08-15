import SignUp from "@/components/includes/signup";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Sign Up",
    description : "Sign up to create an account"
}

export default function Page(){
    return (
        <div><SignUp /></div>
    )
}