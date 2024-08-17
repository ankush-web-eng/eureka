'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LuLoader } from 'react-icons/lu'
import { useToast } from '../ui/use-toast'

const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const { toast } = useToast()

    const handleSendVerificationCode = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        localStorage.setItem("email", email);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/reset/email`, { email })
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Verification code sent to your email',
                    duration: 2000
                })
                setStep(2)
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'An error occurred',
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyCode = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const email = localStorage.getItem("email");
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/reset/code`, { email, code: verificationCode })
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Verification code is correct',
                    duration: 2000
                })
                setStep(3)
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'An error occurred',
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctor/reset/password`, { email, password: newPassword })
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Password updated successfully',
                    duration: 2000
                })
                localStorage.removeItem("email");
                router.push('/signin')
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'An error occurred',
                duration: 2000,
                variant: 'destructive'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                {step === 1 && (
                    <form onSubmit={handleSendVerificationCode} className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Send Verification Code"}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Enter Verification Code</h2>
                        <div>
                            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">Verification Code</label>
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
                            {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Verify Code"}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Set New Password</h2>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md p-3 border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                                placeholder="Enter new password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ResetPassword