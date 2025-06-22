"use client"
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

const HaveDomain = (props: Props) => {
    const [data, setData] = useState({
        name: "",
        domain: "",
        currency: "IDR",
    });
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/create-domain`, data);
            if (response.status === 200) {
                console.log({ response });
            }
            toast.success("Domain created successfully");
            router.push(`/dashboard`);
        } catch (error: any) {
            console.log({ error });
            toast.error(error?.response?.data?.error || "Something went wrong");
        }
        setIsLoading(false)
    }
    return (
        <form className='space-y-4'>
            <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 text-md">Panel Name <span className='text-red-500'>*</span></Label>
                <Input
                    onChange={e => {
                        setData({ ...data, name: e.target.value })
                    }}
                    name='name'
                    required
                    placeholder='Your panel name'
                    className="rounded-full text-gray-900 bg-gray-100 p-4 pr-20 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="domain" className="text-gray-700 text-md mt-12">Panel Domain <span className='text-red-500'>*</span></Label>
                <Input
                    onChange={e => {
                        setData({ ...data, domain: e.target.value })
                    }}
                    name='domain'
                    required
                    placeholder='www.yourdomain.com'
                    className="rounded-full text-gray-900 bg-gray-100 p-4 pr-20 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="rounded-xl bg-gradient-to-r from-purple-700 via-blue-500 to-blue-500 p-4 text-white">
                <div className="text-sm font-bold">{`Please visit your domain registered dashboard and set DNS to:`}</div>
                <ul className='text-sm font-medium space-y-2'>
                    <div className="flex items-center gap-x-8">
                        <div className="space-y-2">
                            <div className=" text-md font-semibold">Type</div>
                            <div className=" text-md font-semibold">A</div>
                        </div>
                        <div className="space-y-2">
                            <div className=" text-md font-semibold">Name</div>
                            <div className=" text-md font-semibold">@</div>
                        </div>
                        <div className="space-y-2">
                            <div className=" text-md font-semibold">Value</div>
                            <div className=" text-md font-semibold">76.76.21.21</div>
                        </div>
                    </div>

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
            <Button onClick={onSubmit} className="rounded-full bg-gradient-to-r from-purple-700 via-blue-500 to-blue-500 p-4 text-white" type='submit'>
                {isLoading ? <Loader2Icon className='animate-spin' /> : "Create Domain"}
            </Button>
        </form>
    )
}

export default HaveDomain