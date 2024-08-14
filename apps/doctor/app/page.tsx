import Verify from "@/components/verify";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Home",
    description: ""
}

export default function Page(){

    return (
        <div><Verify /></div>
    )
}