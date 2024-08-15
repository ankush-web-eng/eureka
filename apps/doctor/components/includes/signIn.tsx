'use client'

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '../ui/use-toast';
import { useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import Link from 'next/link';

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error === 'CredentialsSignin' ? 'Incorrect email or password' : 'An error occurred',
                duration: 2000,
                variant: 'destructive'
            });
        } else {
            toast({
                title: 'Success',
                description: 'Login Successful',
                duration: 2000
            });
            router.replace('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Sign In"}
                    </button>
                    <Link className='text-center p-2 block text-blue-500 text-sm' href="/signup">Don&apos;t have an account?</Link>
                </form>
            </div>
        </div>
    );
}