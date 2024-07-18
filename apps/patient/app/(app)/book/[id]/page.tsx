interface Params {
    id: string;
}

interface Doctor {
    name: string;
    fee: number;
}

export default function Page({ params }: { params: Params }) {
    const id = params.id;

    // Mock data - in a real app, you'd fetch this from an API
    const doctor: Doctor = {
        name: "Dr. John Doe",
        fee: 100
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
            <p className="mb-4">
                Dr. {doctor.name} charges ${doctor.fee} for a consultation.
            </p>
            <p className="mb-6">
                Do you want to continue with the booking?
            </p>
            <div className="flex justify-between">
                <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                    Cancel
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Proceed to Checkout (${doctor.fee})
                </button>
            </div>
        </div>
    )
}