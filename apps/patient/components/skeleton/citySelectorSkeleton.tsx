
const CitySelectorSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>

                <div className="space-y-4">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>

                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default CitySelectorSkeleton;