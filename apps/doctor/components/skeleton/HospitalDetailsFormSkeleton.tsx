
const HospitalDetailsFormSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {[0, 1, 2].map((index) => (
                            <div key={index}>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div className="mt-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {[0, 1, 2].map((index) => (
                                <div key={index} className="h-6 w-20 bg-gray-200 rounded-full"></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative h-24 w-24">
                            <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>

                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default HospitalDetailsFormSkeleton;