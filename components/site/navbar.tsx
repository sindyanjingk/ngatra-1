
"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

type Props = {
    logo: string;
    newOrder?: string;
    services?: string;
    signIn?: string;
    signUp?: string;
    siteName? : string;
}

const SiteNavbar = ({ 
    logo,
    newOrder,
    services,
    signIn,
    signUp,
    siteName
 }: Props) => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navigationItems = [
        { 
            name: 'Products', 
            href: '#',
            hasDropdown: true,
            items: [
                { name: newOrder || 'New Order', href: '/orders' },
                { name: services || 'Services', href: '/service' },
                { name: 'API Access', href: '/api' }
            ]
        },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Resources', href: '/resources' },
        { name: 'Support', href: '/support' }
    ]

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                            <Image 
                                src={logo || "/logo.png"} 
                                alt="Logo" 
                                width={24} 
                                height={24}
                                className="rounded-lg"
                            />
                        </div>
                        <span className="text-xl font-bold text-gray-900">{siteName || "Panel"}</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item, index) => (
                            <div key={index} className="relative group">
                                <Link 
                                    href={item.href}
                                    className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                                >
                                    <span>{item.name}</span>
                                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                                </Link>
                                
                                {/* Dropdown Menu */}
                                {item.hasDropdown && item.items && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="p-2">
                                            {item.items.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={subItem.href}
                                                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link href="/login">
                            <Button variant="ghost" className="text-gray-700 hover:text-purple-600 font-medium">
                                {signIn || "Sign In"}
                            </Button>
                        </Link>
                        <Link href="/reg">
                            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                                {signUp || "Get Started"}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <AnimatePresence mode="wait">
                            {isMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-4 border-t border-gray-200 bg-white/95 backdrop-blur-lg">
                                {navigationItems.map((item, index) => (
                                    <div key={index}>
                                        <Link 
                                            href={item.href}
                                            className="block px-4 py-2 text-gray-700 hover:text-purple-600 font-medium"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {item.hasDropdown && item.items && (
                                            <div className="ml-4 space-y-2">
                                                {item.items.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-sm text-gray-600 hover:text-purple-600"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            {signIn || "Sign In"}
                                        </Button>
                                    </Link>
                                    <Link href="/reg" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                            {signUp || "Get Started"}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

export default SiteNavbar
