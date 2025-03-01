"use client"
import { useModal } from '@/components/modal/provider'
import React from 'react'

type Props = {
    children: React.ReactNode;
    label: string
}

const ServiceItem = ({ children, label }: Props) => {
    const modal = useModal()
    return (
        <li className="p-2 border rounded-md cursor-pointer"
            onClick={() => modal?.show(children)}
        >
            {label}
        </li>
    )
}

export default ServiceItem