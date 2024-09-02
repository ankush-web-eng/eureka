import dynamic from "next/dynamic";

import CitySelectorSkeleton from "@/components/skeleton/citySelectorSkeleton";
import { Metadata } from "next";
const Verify = dynamic(() => import("@/components/layout/CityFilter"), { ssr: false, loading: () => <CitySelectorSkeleton /> });

export const metadata: Metadata = {
    title: "Select your city",
    description: "Select your city for personalized experience",
}

export default function Page() {
    return <Verify />
}