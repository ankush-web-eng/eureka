import Doctors from "./doctors";
import type { Metadata } from "next";

export const metadata : Metadata = {
    title: "Dashboard",
    description: "Book your appointment with your favourite doctor"
}

export default function Page(){
    return (
        <Doctors />
    )
}