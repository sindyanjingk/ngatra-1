"use client"
import { useModal } from '@/components/modal/provider'
import { ChevronRightIcon, LogOut } from 'lucide-react';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const LogoutButton = ({ children }: Props) => {
    const modal = useModal()
    return (
        <div onClick={()=>modal?.show(children)} className="space-y-1">
            <div
                rel="noopener noreferrer"
                className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-md transition-all text-black hover:bg-gray-800 hover:text-white hover:text-white"
                    }`}>
                <div className="flex items-center space-x-3">
                    <LogOut />
                    <span className="text-md font-semibold">Logout</span>
                </div>
                <ChevronRightIcon/>
            </div>
        </div>
    )
}

export default LogoutButton