"use client"
import React from 'react'
import { useModal } from '../modal/provider'
import { EllipsisIcon, Trash2Icon } from 'lucide-react'

type Props = {
    children: React.ReactNode
}

const DeleteCredentialsButton = ({ children }: Props) => {
    const modal = useModal()
    return (
        <button onClick={() => {
            modal?.show(children)
        }}>
            <Trash2Icon className='text-red-500'/>
        </button>
    )
}

export default DeleteCredentialsButton