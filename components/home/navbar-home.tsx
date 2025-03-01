import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

type Props = {}

const NavbarHome = (props: Props) => {
    const routes = [
        {
            name: "Ngatra",
            link: "/"
        },
        {
            name: "Feature",
            link: "/feature"
        },
        {
            name: "Direct",
            link: "/direct"
        },
        {
            name: "Pricing",
            link: "/pricing"
        },
        {
            name: "Blog",
            link: "/blog"
        },
    ]
    return (
        <div className="hidden md:flex gap-6 items-center justify-between bg-gray-200 w-3/5 px-12 py-4 rounded-full">
            {
                routes.map((route, index) => (
                    <Link key={index} href={route.link} className="text-gray-700 text-lg">{route.name}</Link>
                ))
            }
            <Link href={"/login"}>
                <Button className='bg-white rounded-full border-2 text-gray-900 font-bold hover:bg-gray-100 border-blue-300'>
                    Sign In
                </Button>
            </Link>
        </div>
    )
}

export default NavbarHome