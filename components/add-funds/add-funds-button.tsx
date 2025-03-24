"use client"
import { useModal } from '@/components/modal/provider'
import React from 'react'
import { Button } from '../ui/button';
import { PlusIcon } from 'lucide-react';

type Props = {
    children: React.ReactNode;
}

const AddFundsButton = ({ children }: Props) => {
    const modal = useModal()
    return (
        <Button
            onClick={() => modal?.show(children)}
        >
            <PlusIcon />
            Add Funds
        </Button>
    )
}

export default AddFundsButton