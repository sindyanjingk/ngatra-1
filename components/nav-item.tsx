"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
    item: {
        url: string;
        name: string;
    }
}

const NavItem = ({ item }: Props) => {
    const pathname = usePathname()
    return (
        <Link href={`${item.url}`} className={`hover:bg-gradient-to-b from-violet-800 to-[#308BC3] p-2 space-y-1 hover:text-white font-bold  rounded-lg p-2 cursor-pointer ${pathname === item.url && 'bg-gradient-to-b from-violet-800 to-[#308BC3] text-white'}`}>{item.name}</Link>
    )
}

export default NavItem