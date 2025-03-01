'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { sites } from '@prisma/client'
import { CirclePlusIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
    sites: sites[]
    siteName: string
}

const SelectSite = ({ sites, siteName }: Props) => {
    const router = useRouter()
    const transformData = sites.map((item) => ({
        value: item.id,
        label: item.name
    }))
    const handleChange = (value: string) => {

        router.push(`/site/${value}`)
    }

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={siteName} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {transformData.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                    <div className="flex items-center justify-center border-t">
                        <Link href={"/onboarding"} className='my-4 flex items-center gap-x-2 text-blue-500 font-bold'><CirclePlusIcon/> Add Site</Link>
                    </div>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectSite
