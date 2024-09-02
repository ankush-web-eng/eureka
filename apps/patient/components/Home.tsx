import Auth from "@/components/Auth";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-white to-pink-300 flex items-center justify-center">
            <div className="text-center px-6 lg:px-8">
                <div className="space-y-6 flex flex-col items-center justify-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800">
                        Book Appointments to clinics in your city
                    </h1>
                    <p className="mt-3 text-lg sm:text-xl text-slate-500">
                        Meet your favourite doctors and book appointments with ease without waiting in long queues.
                    </p>
                    <Auth />
                </div>
            </div>
        </div>
    );
};
