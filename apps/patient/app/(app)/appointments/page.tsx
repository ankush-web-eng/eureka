import { Metadata } from "next";
import Appointments from "./appointments";

export const metadata: Metadata = {
    title: "Appointments",
    description: "View all your appointments",
    keywords: "Appointments",
}

export default function Page() {
    return (
        <Appointments />
    )
}