"use client"
import { useModal } from '@/components/modal/provider'
import React from 'react'
import { Button } from '../ui/button';

type Props = {
    children: React.ReactNode;
}

const ButtonCreateOrder = ({ children }: Props) => {
    const modal = useModal()
    return (
        <Button
            onClick={() => modal?.show(children)}
        >
            Create Order
        </Button>
    )
}

export default ButtonCreateOrder