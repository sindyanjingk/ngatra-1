"use client"
import { useModal } from '@/components/modal/provider'
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Props = {
    children: React.ReactNode;
    title: string;
    rightIcon?: string;
}

const IntegrationItem = ({ children, title, rightIcon }: Props) => {
    const modal = useModal()
    return (
        <button
            onClick={() => modal?.show(children)}
            className="flex items-center gap-x-2 justify-between w-full"
        >
            <div className="flex items-center gap-x-2">
                {
                    rightIcon &&
                    <Image src={rightIcon} alt='right-icon' width={24} height={24}/>
                }
                <h5 className="font-semibold">{title}</h5>
            </div>
            <ChevronRightIcon />
        </button>
    )
}

export default IntegrationItem