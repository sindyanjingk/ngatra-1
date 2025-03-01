"use client"
import { useModal } from '@/components/modal/provider'
import { ChevronRightIcon } from 'lucide-react';
import React from 'react'

type Props = {
    children: React.ReactNode;
    title: string;
    rightIcon?: React.ReactNode;
}

const SettingsItem = ({ children, title, rightIcon }: Props) => {
    const modal = useModal()
    return (
        <button
            onClick={() => modal?.show(children)}
            className="flex items-center gap-x-2 justify-between w-full"
        >
            <div className="flex items-center gap-x-2">
                {rightIcon}
                <h5 className="font-semibold">{title}</h5>
            </div>
            <ChevronRightIcon/>
        </button>
    )
}

export default SettingsItem