"use client"
import { useModal } from '@/components/modal/provider'
import { PlusCircleIcon } from 'lucide-react';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const AddManagersButton = ({ children }: Props) => {
    const modal = useModal()
    return (
        <button
            onClick={() => modal?.show(children)}
            className="flex items-center gap-x-2 justify-between text-sm font-semibold "
        >
           <PlusCircleIcon className='text-blue-500' size={18}/>
           <span className='text-blue-500'>Add Managers</span>
        </button>
    )
}

export default AddManagersButton