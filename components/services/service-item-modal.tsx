"use client"
import React, { useEffect, useState } from 'react'
import { useModal } from '../modal/provider';
import { Button } from '../ui/button';
import { formatIDR } from '@/lib/helpers';
import Link from 'next/link';

type Props = {
    name?: string;
    min?: number;
    max?: number;
    rate?: number;
    id: string
}

const ServiceItemModal = ({
    name,
    min,
    max,
    rate,
    id
}: Props) => {
    const [token, setToken] = useState("")
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            setToken(token || "")
        }
    }, [])
    const modal = useModal();
    return (
        <form
            action={async (data: FormData) => {

            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col items-center justify-center space-y-4 p-6 md:p-8">
                <h2 className="text-xl text-center font-semibold text-gray-800 dark:text-white">
                    {name}
                </h2>
                <div className="flex flex-col gap-y-2 w-full items-center justify-center">
                    {`${formatIDR(rate || 0)} for 1000`}
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    <div className="border p-2 rounded-md">{`Min : ${min}`}</div>
                    <div className="border p-2 rounded-md">{`Max : ${max}`}</div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <Link href={token ? "/orders" : '/login'}>
                    <Button type='button' onClick={modal?.hide}>Order</Button>
                </Link>
            </div>
        </form>
    );
}

export default ServiceItemModal