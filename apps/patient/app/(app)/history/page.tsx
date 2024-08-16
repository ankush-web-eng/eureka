import { Metadata } from "next";
import dynamic from "next/dynamic";

const HistoryCard = dynamic(() => import("./history"))

export const metadata: Metadata = {
    title: "History",
    description: "History of your appointments",
    keywords: "history, appointments, patient, doctor, hospital"
}

export default function Page() {
    return <HistoryCard />
}