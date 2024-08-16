
export default function DoctorCardSkeleton() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md animate-pulse">
            <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-grow">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
            </div>
            <div className="mt-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 bg-gray-200 rounded w-16"></div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 bg-gray-200 rounded w-24"></div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    )
}