
import DoctorCardSkeleton from "@/components/skeleton/DoctorCardsSkeleton";
import CitySelectorSkeleton from "@/components/skeleton/citySelectorSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorsPageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 sm:pt-12 lg:pt-16">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center w-full mb-8">
                    <CitySelectorSkeleton />
                </div>
                <Skeleton className="h-10 bg-gray-200 rounded w-1/2 mb-8"></Skeleton>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {Array(6).fill(0).map((_, index) => (
                        <DoctorCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}