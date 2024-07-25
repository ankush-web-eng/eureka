"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function UserIcon() {
    const router = useRouter()
    // const route = window.location.pathname

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <svg
                    className="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    id="user">
                    <path fill="#000"
                        d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a9.985 9.985 0 0 0-8 4 9.985 9.985 0 0 0 8 4 9.985 9.985 0 0 0 8-4 9.985 9.985 0 0 0-8-4z">
                    </path>
                </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                >
                    <button onClick={() => router.push('/dashboard')}>Dashboard</button>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                >
                    <button onClick={() => router.push('/appointments')}>Appointments</button>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                >
                    <button onClick={() => router.push('/history')}>History</button>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
