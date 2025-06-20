"use client"
import React from 'react'
import { useModal } from '../modal/provider'
import { EllipsisIcon } from 'lucide-react'

type Props = {
    children: React.ReactNode
}

const ChangeCredentialsButton = ({ children }: Props) => {
    const modal = useModal()
    return (
        <button onClick={() => {
            modal?.show(children)
        }}>
            <EllipsisIcon />
        </button>
    )
}

export default ChangeCredentialsButton