"use client"
import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { Prisma } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { formatIDR } from '@/lib/helpers'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import ButtonCreateOrder from '../order/button-create-order'
import ModalCreateOrder from '../order/modal-create-order'
import axios from 'axios'


const OrderForm = ({
    siteServices
}: {
    siteServices: Prisma.siteServicesGetPayload<{
        include: {
            category: true,
            provider: true,
            site: true
        }
    }>[]
}) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [selectedService, setSelectedService] = React.useState<string | null>(null);
    const [ammount, setAmmount] = React.useState<number>(0);
    const [link, setLink] = useState<string>("")
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const categoryServices = Object.values(
        siteServices.reduce((acc, item) => {
            const categoryName = item.category?.category_name || "Uncategorized";

            if (!acc[categoryName]) {
                acc[categoryName] = {
                    categoryName,
                    services: [],
                };
            }

            acc[categoryName].services.push(item);
            return acc;
        }, {} as Record<string, { categoryName: string; services: typeof siteServices }>)
    );
    const services = categoryServices.find((service) => service.categoryName === selectedCategory)?.services.map((item) => ({
        label: item.name,
        value: item
    }));
    const buyServices = services?.find((service) => service.value.id === selectedService)?.value;
    const [token, setToken] = useState("")
    const [userName, setUsername] = useState("")
    const [balance, setBalance] = useState(0)
    const [isDreepFeed, setIsDreepFeed] = useState(false)
    const [runs, setRuns] = useState(0)
    const [interval, setInterval] = useState(0)
    const getUser = async () => {
        const response = await axios.get(`/api/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            setUsername(response.data.name || "")
            setBalance(response.data.balance || 0)
        }
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token')
            setToken(token || "")
        }
    }, [])

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])
    return (
        <div className='bg-white min-h-screen flex flex-col md:flex-row items-start gap-4 text-gray-800 w-full p-4'>
            <form className='w-full space-y-3' onSubmit={handleSubmit(data => {

            })}>
                <div className="text-lg font-bold my-8">Choose Service</div>
                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Search'>Platform</Label>
                    <Select onValueChange={e => setSelectedCategory(e)}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Select Category"} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categoryServices.map((item, index) => (
                                    <SelectItem key={index} value={item.categoryName}>{item.categoryName}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Search'>Category</Label>
                    <Select onValueChange={e => setSelectedCategory(e)}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Select Category"} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categoryServices.map((item, index) => (
                                    <SelectItem key={index} value={item.categoryName}>{item.categoryName}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Search'>Services</Label>
                    <Select onValueChange={e => {
                        setSelectedService(e)
                        setAmmount(+buyServices?.min! || 0)
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder={"Select Services"} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                services &&
                                services.map((item, index) => (
                                    <SelectItem key={index} value={item.value.id}>{item.label}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Link'>Link</Label>
                    <Input onChange={e => {
                        setLink(e.target.value)
                    }} type="text" id='Link' placeholder='Link' />
                </div>

                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Amount'>Amount</Label>
                    {
                        buyServices &&
                        <div className="font-bold">{`Min ${buyServices.min} - Max ${buyServices.max}`}</div>
                    }
                    <Input onChange={e => setAmmount(+e.target.value)} type="text" id='Amount' value={ammount} />
                </div>
                <div className="flex items-center gap-x-4">
                    <Switch onCheckedChange={setIsDreepFeed} />
                    <div className="text-md">Drip Feed?</div>
                </div>
                {
                    isDreepFeed &&
                    <div className="flex items-center gap-x-4">
                        <div className="space-y-2">
                            <Label htmlFor='runs'>Runs</Label>
                            <Input onChange={e => setRuns(+e.target.value)} type="text" id='runs' value={runs} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor='interval'>{`Interval (Minutes)`}</Label>
                            <Input onChange={e => setInterval(+e.target.value)} type="text" id='runs' value={interval} />
                        </div>
                    </div>
                }
                <hr />
                <div className="flex items-center justify-between">
                    <div className="text-md">Amount</div>
                    <div className="text-md">{ammount}</div>
                </div>
                <hr />
                <div className="flex items-center justify-between">
                    <div className="text-md">Price</div>
                    <div className="text-md">{buyServices && formatIDR((+buyServices.rate! / 1000) * ammount)}</div>
                </div>
                {
                    buyServices &&
                    <ButtonCreateOrder>
                        <ModalCreateOrder
                            runs={runs}
                            interval={interval}
                            dreepFeed={isDreepFeed}
                            providerUrl={buyServices.provider?.url || ""}
                            serviceId={buyServices.serviceId?.toString() || ""}
                            balance={balance}
                            name={buyServices?.name!}
                            amount={ammount}
                            rate={+buyServices.rate! / 1000 * ammount}
                            link={link}
                        />
                    </ButtonCreateOrder>
                }
            </form>
            {
                buyServices &&
                <Card className='md:my-24 md:w-1/2 w-full'>
                    <CardHeader>
                        <CardTitle>{buyServices.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tex-2xl font-bold text-center mb-3">{formatIDR((+buyServices.rate! / 1000) * ammount)}</div>
                        <div className="text-md" dangerouslySetInnerHTML={{ __html: buyServices.description! }}></div>
                    </CardContent>
                </Card>
            }
        </div>
    )
}
export default OrderForm