import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { ChevronDown, CirclePlusIcon, PanelLeftClose, SquareArrowOutUpRight, Wallet2Icon } from 'lucide-react';
import Link from 'next/link';
import NavItem from './nav-item';
import SelectSite from './control/select-site';
import prisma from '@/lib/prisma';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Image from 'next/image';
import { Button } from './ui/button';

const Header = async ({ limit, id }: { limit?: number, id: string }) => {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const sites = await prisma.sites.findMany({
        where: {
            userId: session.user.id,
        },
        take: limit,
    });

    const siteInfo = await prisma.sites.findUnique({
        where: {
            id: id,
        },
    });

    const topNav = [
        {
            name: "Users",
            url: `/site/${id}/users`,
        },
        {
            name: "Orders",
            url: `/site/${id}/orders`,
        },
        {
            name: "Services",
            url: `/site/${id}/services`,
        },
        {
            name: "Support",
            url: `/site/${id}/support`,
        },
        {
            name: "Statistics",
            url: `/site/${id}/statistics`,
        },
        {
            name: "Top Providers",
            url: `/site/${id}/top-providers`,
        },
    ]

    return (
        <div className="sticky top-0 flex dark:text-white text-gray-900 bg-white dark:bg-gray-900 z-50 items-center justify-between px-8 py-4 gap-x-8">
            <SelectSite siteName={siteInfo?.name || ""} sites={sites} />
            {
                topNav.map((item, index) => (
                    <NavItem key={index} item={item} />
                ))
            }
            <Popover>
                <PopoverTrigger className='flex items-center gap-x-2'>
                    <Wallet2Icon className='text-green-400' />
                    <div className="font-bold">
                        $20
                    </div>
                    <ChevronDown />
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                    <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">$10</div>
                                <div className="text-md text-gray-400">Income today</div>
                            </div>
                            <Image src={"/coins.svg"} alt='coins' width={50} height={50} />
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">$0.5</div>
                                <div className="text-md text-gray-400">Charge From Balance</div>
                            </div>
                            <Image src={"/percent.svg"} alt='percent' width={50} height={50} />
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-gray-400">Service Fee</div>
                            <div className="text-md">5%</div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-gray-400">Will be charge in</div>
                            <div className="text-md">1h</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border-b">
                        <Button className='bg-blue-500 hover:bg-blue-400'>
                            <CirclePlusIcon className='text-white' size={20}/>
                            Add Funds
                        </Button>
                        <Button className='text-blue-500 px-8' variant={"outline"}>History</Button>
                    </div>
                    <Link href={`/site/${id}/tarif`} className="text-md flex items-center gap-x-2 text-blue-400 font-bold px-8 py-4">How Commision Work? <SquareArrowOutUpRight/></Link>
                </PopoverContent>
            </Popover>
            <Link className='' href={`/site/${id}/control/settings`}>
                <button className="rounded-md border cursor-pointer hover:shadow-md border-gray-300 p-2 flex items-center gap-x-2">
                    <PanelLeftClose />
                    <span className='font-bold'>Control</span>
                </button>
            </Link>
        </div>
    )
}

export default Header