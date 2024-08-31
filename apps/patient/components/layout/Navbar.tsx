'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed z-50 top-5 left-1/2 transform -translate-x-1/2 w-[65%] bg-black text-gray-200 rounded-full px-5 py-3 flex justify-between items-center md:w-2/3 lg:w-[65%]">
            <Link href={'/dashboard'} className="text-gray-200 font-bold">Medzo</Link>

            <div className="hidden md:flex space-x-4 items-center">
                <Link href="/dashboard" className="text-gray-200 hover:text-white">Dashboard</Link>
                <Link href="/appointments" className="text-gray-200 hover:text-white">Appointments</Link>
                <Link href="/history" className="text-gray-200 hover:text-white">History</Link>
                <Button onClick={() => signOut()} variant={'secondary'}>Logout</Button>
            </div>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-200 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-black mt-2 py-2 rounded-lg md:hidden">
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Dashboard</Link>
                    <Link href="/appointments" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">Appointments</Link>
                    <Link href="/history" className="block px-4 py-2 text-gray-200 hover:bg-gray-700">History</Link>
                    <button onClick={() => signOut()} className="block px-4 py-2 text-gray-200 hover:bg-gray-700" >Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;