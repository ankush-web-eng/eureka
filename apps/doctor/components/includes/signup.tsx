'use client'

import axios from 'axios'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LuLoader } from 'react-icons/lu'
import { useToast } from '../ui/use-toast'

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [verificationCode, setVerificationCode] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [registered, setRegistered] = useState<boolean>(false)

    const router = useRouter()
    const { toast } = useToast()
    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        localStorage.setItem('email', email)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/signup`, { email, password })
            toast({
                title: 'Success',
                description: 'Check your email for verification',
                duration: 2000
            })
            if (res.status === 200) {
                setRegistered(true)
                // router.push('/api/auth/signin')
            }
            setLoading(false)
            setEmail('')
            return;
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Server Error Occured! Please try again',
                duration: 2000,
                variant: 'destructive'
            })
            setLoading(false)
        }
    }

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const email = localStorage.getItem('email')
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/verify`, { code: verificationCode, email })
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Your account has been verified',
                    duration: 2000
                })
                localStorage.removeItem('email')
                router.push('/signin')
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Verification failed',
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    if (!registered) {
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
                                placeholder="Create a Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Register"}
                        </button>
                        <Link className='text-center p-2 block text-blue-500 text-sm' href="/signin">Already registered?</Link>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h1>
                <p className="mb-4 text-center">Enter the verification code sent to your email</p>
                <form onSubmit={handleVerification} className="space-y-4">
                    <div>
                        <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="verificationCode"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                            placeholder="Enter verification code"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp