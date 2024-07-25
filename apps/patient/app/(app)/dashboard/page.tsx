import Doctors from "./doctors";
import type { Metadata } from "next";

export const metadata : Metadata = {
    title: "Dashboard",
    description: "have a loot at all the doctors in oyur city",
    keywords: "Dashboard",
}

export default function Page(){
    return (
        <Doctors />
    )
}