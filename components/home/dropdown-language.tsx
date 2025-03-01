import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'

type Props = {}

const DropdownLanguage = (props: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-4 border px-6 py-2 border-blue-300 rounded-full">
                Multi-Language <Image src={"/flag-en.png"} alt='flag' width={24} height={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Indonesia</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownLanguage