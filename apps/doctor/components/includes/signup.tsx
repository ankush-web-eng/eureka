'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LuLoader } from 'react-icons/lu'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('/api/signup', { email })
            if (res.status === 200) {
                router.push('/api/auth/signin')
            }
            setLoading(false)
            setEmail('')
            return;
        } catch (error) {

        }
    }

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
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        {loading ? <LuLoader className='animate-spin' color='gray' size={20} /> : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp