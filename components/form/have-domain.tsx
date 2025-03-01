"use client"
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'

type Props = {}

const HaveDomain = (props: Props) => {
    const [data, setData] = useState({
        name: "",
        subdomain: "",
        whatsapp: "",
        currency: "IDR", // Default currency
        description: "",
    });
    return (
        <form className='space-y-4'>
            <Label htmlFor="domain" className="text-gray-700 text-md">Panel Domain <span className='text-red-500'>*</span></Label>
            <Input placeholder='www.yourdomain.com' className="rounded-full text-gray-900 bg-gray-100 p-4 pr-20 focus:ring-2 focus:ring-blue-500" />
            <div className="rounded-xl bg-gradient-to-r from-purple-700 via-blue-500 to-blue-500 p-4 text-white">
                <div className="text-sm font-bold">{`Please visit your registrar's dashboard and change nameservers to:`}</div>
                <ul className='text-sm font-medium'>
                    <li>ns1.ngatradns.com</li>
                    <li>ns2.ngatradns.com</li>
                </ul>
            </div>
            <div className='space-y-3'>
                <label htmlFor="currency" className="block text-sm font-medium mb-1 text-gray-700">
                    Panel currency <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={e => {
                    setData({ ...data, currency: e })
                }}>
                    <SelectTrigger className="text-gray-800 rounded-full bg-gray-100 p-4 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="IDR">IDR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-3'>
                <label htmlFor="currency" className="block text-sm font-medium mb-1 text-gray-700">
                    Admin Username <span className="text-red-500">*</span>
                </label>
                <Input placeholder='www.yourdomain.com' className="rounded-full text-gray-900 bg-gray-100 p-4 pr-20 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className='space-y-3'>
                <label htmlFor="currency" className="block text-sm font-medium mb-1 text-gray-700">
                    Admin Password <span className="text-red-500">*</span>
                </label>
                <Input placeholder='www.yourdomain.com' className="rounded-full text-gray-900 bg-gray-100 p-4 pr-20 focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className='space-y-3'>
                <label htmlFor="currency" className="block text-sm font-medium mb-1 text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                </label>
                <Input placeholder='www.yourdomain.com' className="rounded-full text-gray-900 bg-gray-100 p-4 pr-20 focus:ring-2 focus:ring-blue-500" />
            </div>
            <Button className="rounded-full bg-gradient-to-r from-purple-700 via-blue-500 to-blue-500 p-4 text-white" type='submit'>Submit</Button>
        </form>
    )
}

export default HaveDomain