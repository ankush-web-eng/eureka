import { Skeleton } from "@/components/ui/skeleton"

export function SignUpSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="space-y-4">
                    <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-4 w-40 mx-auto" />
                </div>
            </div>
        </div>
    )
}