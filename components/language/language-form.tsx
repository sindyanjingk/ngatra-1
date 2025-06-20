
"use client"
import React, { useState } from 'react'
import { Code2Icon, DollarSignIcon, FileWarningIcon, FilterIcon, LayoutDashboardIcon, LockIcon, PanelBottom, SettingsIcon, SparklesIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Prisma } from '@prisma/client'

type Props = {
    siteLanguage: Prisma.siteLanguageGetPayload<{
        include: {
            siteLanding: true
        }
    }> | null
}

const LanguageForm = ({ siteLanguage }: Props) => {
    const [activePage, setActivePage] = useState("landing")
    const [formData, setFormData] = useState({
        landing: {
            mainTitle: siteLanguage?.siteLanding?.mainTitle || "The most comfortable SMM-provider",
            subtitle: siteLanguage?.siteLanding?.subtitle || "We will make you popular",
            serviceTitle: siteLanguage?.siteLanding?.serviceTitle || "Huge service assortment",
            serviceDescription: siteLanguage?.siteLanding?.serviceDescription || "In all of popular social networks",
            featureTitle: siteLanguage?.siteLanding?.featureTitle || "We have everything you need",
        },
        auth: {
            loginTitle: siteLanguage?.loginTitle || "Login to your account",
            registerTitle: siteLanguage?.registerTitle || "Create new account",
            forgotPasswordTitle: siteLanguage?.forgotPasswordTitle || "Reset your password",
        },
        dashboard: {
            welcomeMessage: siteLanguage?.welcomeMessage || "Welcome to dashboard",
            balanceLabel: siteLanguage?.balanceLabel || "Your Balance",
            ordersLabel: siteLanguage?.ordersLabel || "Total Orders",
        },
        orders: {
            newOrderTitle: siteLanguage?.newOrderTitle || "Create New Order",
            orderHistoryTitle: siteLanguage?.orderHistoryTitle || "Order History",
            statusPending: siteLanguage?.statusPending || "Pending",
            statusCompleted: siteLanguage?.statusCompleted || "Completed",
            statusCanceled: siteLanguage?.statusCanceled || "Canceled",
        },
        services: {
            servicesTitle: siteLanguage?.servicesTitle || "Our Services",
            categoryLabel: siteLanguage?.categoryLabel || "Category",
            priceLabel: siteLanguage?.priceLabel || "Price",
        }
    })

    const dataPage = [
        {
            id: "landing",
            name: "Landing Page",
            icon: <SparklesIcon />,
            isActive: activePage === "landing"
        },
        {
            id: "auth",
            name: "Authentication",
            icon: <LockIcon />,
            isActive: activePage === "auth"
        },
        {
            id: "dashboard",
            name: "Dashboard",
            icon: <LayoutDashboardIcon />,
            isActive: activePage === "dashboard"
        },
        {
            id: "orders",
            name: "Orders",
            icon: <DollarSignIcon />,
            isActive: activePage === "orders"
        },
        {
            id: "services",
            name: "Services",
            icon: <SettingsIcon />,
            isActive: activePage === "services"
        },
    ]

    const handleInputChange = (section: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: value
            }
        }))
    }

    const handleSubmit = async () => {
        // Implement save functionality here
        console.log("Saving language data:", formData)
    }

    return (
        <div className='flex flex-col gap-y-4 md:w-full'>
            <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Language Settings</div>
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                </Button>
            </div>
            
            <div className="flex items-start gap-x-4 justify-between">
                <div className="w-1/4 border rounded-md min-h-screen">
                    {dataPage.map((item, index) => (
                        <div 
                            onClick={() => setActivePage(item.id)} 
                            key={index}
                            className={`${item.isActive ? 'bg-blue-50 border-r-2 border-blue-500' : ''} flex items-center gap-x-2 border-b p-3 font-medium cursor-pointer hover:shadow-md hover:bg-blue-50 transition-all duration-200`}
                        >
                            <div className={`${item.isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                                {item.icon}
                            </div>
                            <span className={`${item.isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
                
                <div className="w-3/4 rounded-md min-h-screen border p-6">
                    {activePage === "landing" && (
                        <div className="space-y-6">
                            <h3 className='text-lg font-bold text-gray-800'>Landing Page Content</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Main Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.landing.mainTitle}
                                        onChange={(e) => handleInputChange('landing', 'mainTitle', e.target.value)}
                                        placeholder='The most comfortable SMM-provider'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Subtitle</label>
                                    <Input 
                                        type='text' 
                                        value={formData.landing.subtitle}
                                        onChange={(e) => handleInputChange('landing', 'subtitle', e.target.value)}
                                        placeholder='We will make you popular'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Service Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.landing.serviceTitle}
                                        onChange={(e) => handleInputChange('landing', 'serviceTitle', e.target.value)}
                                        placeholder='Huge service assortment'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Service Description</label>
                                    <Textarea 
                                        value={formData.landing.serviceDescription}
                                        onChange={(e) => handleInputChange('landing', 'serviceDescription', e.target.value)}
                                        placeholder='In all of popular social networks'
                                        className="w-full min-h-[80px]"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Feature Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.landing.featureTitle}
                                        onChange={(e) => handleInputChange('landing', 'featureTitle', e.target.value)}
                                        placeholder='We have everything you need'
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === "auth" && (
                        <div className="space-y-6">
                            <h3 className='text-lg font-bold text-gray-800'>Authentication Pages</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Login Page Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.auth.loginTitle}
                                        onChange={(e) => handleInputChange('auth', 'loginTitle', e.target.value)}
                                        placeholder='Login to your account'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Register Page Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.auth.registerTitle}
                                        onChange={(e) => handleInputChange('auth', 'registerTitle', e.target.value)}
                                        placeholder='Create new account'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Forgot Password Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.auth.forgotPasswordTitle}
                                        onChange={(e) => handleInputChange('auth', 'forgotPasswordTitle', e.target.value)}
                                        placeholder='Reset your password'
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === "dashboard" && (
                        <div className="space-y-6">
                            <h3 className='text-lg font-bold text-gray-800'>Dashboard Content</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Welcome Message</label>
                                    <Input 
                                        type='text' 
                                        value={formData.dashboard.welcomeMessage}
                                        onChange={(e) => handleInputChange('dashboard', 'welcomeMessage', e.target.value)}
                                        placeholder='Welcome to dashboard'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Balance Label</label>
                                    <Input 
                                        type='text' 
                                        value={formData.dashboard.balanceLabel}
                                        onChange={(e) => handleInputChange('dashboard', 'balanceLabel', e.target.value)}
                                        placeholder='Your Balance'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Orders Label</label>
                                    <Input 
                                        type='text' 
                                        value={formData.dashboard.ordersLabel}
                                        onChange={(e) => handleInputChange('dashboard', 'ordersLabel', e.target.value)}
                                        placeholder='Total Orders'
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === "orders" && (
                        <div className="space-y-6">
                            <h3 className='text-lg font-bold text-gray-800'>Orders Page Content</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>New Order Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.orders.newOrderTitle}
                                        onChange={(e) => handleInputChange('orders', 'newOrderTitle', e.target.value)}
                                        placeholder='Create New Order'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Order History Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.orders.orderHistoryTitle}
                                        onChange={(e) => handleInputChange('orders', 'orderHistoryTitle', e.target.value)}
                                        placeholder='Order History'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Status: Pending</label>
                                        <Input 
                                            type='text' 
                                            value={formData.orders.statusPending}
                                            onChange={(e) => handleInputChange('orders', 'statusPending', e.target.value)}
                                            placeholder='Pending'
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Status: Completed</label>
                                        <Input 
                                            type='text' 
                                            value={formData.orders.statusCompleted}
                                            onChange={(e) => handleInputChange('orders', 'statusCompleted', e.target.value)}
                                            placeholder='Completed'
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Status: Canceled</label>
                                        <Input 
                                            type='text' 
                                            value={formData.orders.statusCanceled}
                                            onChange={(e) => handleInputChange('orders', 'statusCanceled', e.target.value)}
                                            placeholder='Canceled'
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === "services" && (
                        <div className="space-y-6">
                            <h3 className='text-lg font-bold text-gray-800'>Services Page Content</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Services Title</label>
                                    <Input 
                                        type='text' 
                                        value={formData.services.servicesTitle}
                                        onChange={(e) => handleInputChange('services', 'servicesTitle', e.target.value)}
                                        placeholder='Our Services'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Category Label</label>
                                    <Input 
                                        type='text' 
                                        value={formData.services.categoryLabel}
                                        onChange={(e) => handleInputChange('services', 'categoryLabel', e.target.value)}
                                        placeholder='Category'
                                        className="w-full"
                                    />
                                </div>
                                
                                <div>
                                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Price Label</label>
                                    <Input 
                                        type='text' 
                                        value={formData.services.priceLabel}
                                        onChange={(e) => handleInputChange('services', 'priceLabel', e.target.value)}
                                        placeholder='Price'
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LanguageForm
