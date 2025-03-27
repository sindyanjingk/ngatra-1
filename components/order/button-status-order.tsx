"use client"
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from '../ui/button';

type Props = {
    status: string,
    statusState: string | null  
}

const ButtonStatusOrder = ({ status, statusState }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const handleChange = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (status) {
            params.set("status", status);
        } else {
            params.delete("status");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false });
        });
    };
    return (
        <Button disabled={isPending} variant={statusState === status ? "default" : "ghost"} onClick={handleChange}>
            {status}
        </Button>
    )
}

export default ButtonStatusOrder