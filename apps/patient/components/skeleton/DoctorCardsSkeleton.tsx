import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
            <div className="flex items-start space-x-4">
                <Skeleton className="w-24 h-24 bg-gray-200 rounded-full"></Skeleton>
                <div className="flex-grow">
                    <Skeleton className="h-6 bg-gray-200 rounded w-3/4 mb-2"></Skeleton>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/2 mb-2"></Skeleton>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/4 mb-2"></Skeleton>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/3"></Skeleton>
                </div>
            </div>
            <div className="mt-4">
                <Skeleton className="h-4 bg-gray-200 rounded w-1/4 mb-2"></Skeleton>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-6 bg-gray-200 rounded w-16"></Skeleton>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <Skeleton className="h-4 bg-gray-200 rounded w-1/3 mb-2"></Skeleton>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-6 bg-gray-200 rounded w-24"></Skeleton>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <Skeleton className="h-10 bg-gray-200 rounded w-full"></Skeleton>
            </div>
        </div>
    )
}