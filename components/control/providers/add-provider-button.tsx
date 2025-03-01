"use client"
import { useModal } from '@/components/modal/provider'
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const AddProviderButton = ({ children }: Props) => {
    const modal = useModal()
    return (
        <button
            onClick={() => modal?.show(children)}
            className="flex items-center gap-x-2 justify-between w-full p-2 bg-gray-300 hover:bg-gray-500 hover:text-white rounded-md px-4 text-sm font-semibold "
        >
            Add
        </button>
    )
}

export default AddProviderButton