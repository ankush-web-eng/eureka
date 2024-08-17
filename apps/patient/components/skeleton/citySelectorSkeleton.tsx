import { Skeleton } from "@/components/ui/skeleton";

const CitySelectorSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
                <div>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/2 mb-1"></Skeleton>
                    <Skeleton className="h-10 bg-gray-200 rounded w-full"></Skeleton>
                </div>

                <div>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/2 mb-1"></Skeleton>
                    <Skeleton className="h-10 bg-gray-200 rounded w-full"></Skeleton>
                </div>

                <div>
                    <Skeleton className="h-4 bg-gray-200 rounded w-1/2 mb-1"></Skeleton>
                    <Skeleton className="h-10 bg-gray-200 rounded w-full"></Skeleton>
                </div>

                <Skeleton className="h-10 bg-gray-200 rounded w-full mt-4"></Skeleton>
            </div>
        </div>
    );
};

export default CitySelectorSkeleton;