'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function SignIn() {

    const router = useRouter()
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const email = formdata.get('email') as string;
        const callbackUrl =  "/verify";
        
        signIn('email', { email, callbackUrl }).then(() => {
            router.push(callbackUrl)
        })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign-In</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        type="submit"
                        variant={"secondary"}
                    >
                        Send Mail
                    </Button>
                </form>
            </div>
        </div>
    );
};

