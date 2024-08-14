
const DoctorVerificationFormSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {[...Array(4)].map((_, index) => (
                            <div key={index}>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[...Array(2)].map((_, index) => (
                            <div key={index}>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default DoctorVerificationFormSkeleton;