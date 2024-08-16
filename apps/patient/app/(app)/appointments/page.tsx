import dynamic from "next/dynamic";
import { Metadata } from "next";

const Appointments = dynamic(() => import("./appointments"));

export const metadata: Metadata = {
    title: "Appointments",
    description: "View all your appointments",
    keywords: "Appointments",
}

export default function Page() {
    return <Appointments />
}