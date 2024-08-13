
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex space-x-3">
                <Link className="bg-sky-500 text-white roundec-xl p-3" href={process.env.NEXT_PUBLIC_PATIENT_URL!}>Patient</Link>
                <Link className="bg-sky-500 text-white roundec-xl p-3" href={process.env.NEXT_PUBLIC_DOCTOR_URL!}>Doctor</Link>
            </div>
        </div>
    )
}
