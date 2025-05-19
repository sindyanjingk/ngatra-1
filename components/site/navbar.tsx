"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { motion } from "framer-motion";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '../ui/menubar'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'

type Props = {
    logo: string;
    newOrder?: string;
    services?: string;
    signIn?: string;
    signUp?: string;
}

const SiteNavbar = ({ 
    logo,
    newOrder,
    services,
    signIn,
    signUp
 }: Props) => {
    const pathname = usePathname()
    // const [token, setToken] = useState("")
    // const router = useRouter()
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const token = localStorage.getItem('token')
    //         if(token){
    //             router.push('/dashboard')
    //         }
    //         setToken(token || "")
    //     }
    // }, [])
    // const handleLogout = () => {
    //     localStorage.removeItem('token')
    //     window.location.href = '/'
    // }
    return (
        <motion.nav
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between px-6 py-4 border-b">
            <Link href="/">
                <Image src={logo || "/logo.png"} alt="Logo" width={40} height={40} />
            </Link>
            <div className="hidden md:flex gap-6">
                <Link href="orders" className={`hover:text-blue-400 font-bold ${pathname === "/orders" && "text-blue-500"}`}>{newOrder || "New Order"}</Link>
                <Link href="service" className={`hover:text-blue-400 font-bold ${pathname === "/service" && "text-blue-500"}`}>{services || "Services"}</Link>
                {/* <Link href="blog" className={`hover:text-blue-400 font-bold ${pathname === "/blog" && "text-blue-500"}`}>Blog</Link> */}
            </div>
            {
                // token ?
                //     <Button onClick={handleLogout}>Logout</Button>
                //     :
                    <Menubar className="bg-gray-700 border-none data-[state=open]:bg-gray-700">
                        <MenubarMenu>
                            <MenubarTrigger className="text-white">
                                <Menu size={24} />
                            </MenubarTrigger>
                            <MenubarContent className="bg-gray-700 text-white border-gray-600">
                                <MenubarItem className="hover:bg-gray-600">
                                    <Image src="/quit.svg" alt="quit" width={20} height={20} />
                                    <Link href="/login" className="ml-2 font-bold text-xl">{signIn || "Sign In"}</Link>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem className="hover:bg-gray-600">
                                    <Image src="/quit.svg" alt="quit" width={20} height={20} />
                                    <Link href="/reg" className="ml-2 font-bold text-xl">{signUp || "Sign Up"}</Link>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
            }

        </motion.nav>
    )
}

export default SiteNavbar