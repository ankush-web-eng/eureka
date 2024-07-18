'use client'

interface Params {
    name: string;
    fee: number;
}
export default function BookingConfirmDialog({ params }: { params: Params }) {

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
            <p className="mb-4">
                Dr. {params.name} charges ${params.fee} for a consultation.
            </p>
            <p className="mb-6">
                Do you want to continue with the booking?
            </p>
            <div className="flex justify-end">
                <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg">
                    Proceed to Checkout (${params.fee})
                </button>
            </div>
        </div>
    )
}