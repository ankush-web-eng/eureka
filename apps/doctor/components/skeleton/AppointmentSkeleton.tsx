const AppointmentsSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
                            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppointmentsSkeleton;