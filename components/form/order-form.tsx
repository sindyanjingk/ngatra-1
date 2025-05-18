"use client"

import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { Prisma } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { formatIDR } from '@/lib/helpers'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
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
    const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [ammount, setAmmount] = useState<number>(0)
    const [link, setLink] = useState<string>("")
    const [token, setToken] = useState("")
    const [userName, setUsername] = useState("")
    const [balance, setBalance] = useState(0)
    const [isDreepFeed, setIsDreepFeed] = useState(false)
    const [runs, setRuns] = useState(0)
    const [interval, setInterval] = useState(0)
    const [price, setPrice] = useState(0)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm()

    const hasAnyNetwork = siteServices.some(service => {
        return service.network && service.network.trim() !== "";
      });

    console.log({ hasAnyNetwork });


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

    const filteredCategories = Array.from(new Set(
        siteServices
            .filter(service => service.network === selectedNetwork)
            .map(service => service.category?.category_name || "Uncategorized")
    ))

    const filteredServices = siteServices
        .filter(service =>
            service.network === selectedNetwork &&
            service.category?.category_name === selectedCategory
        )

    const buyServices = filteredServices.find(s => s.id === selectedService)

    useEffect(() => {

        if (buyServices?.type?.includes("Package")) {
            const amount = buyServices.name?.split(" ")[0]
            setAmmount(+amount! || 0)
            setPrice(buyServices.rate || 0)
        } else {
            setPrice(+(+buyServices?.rate! / 1000) * ammount)
        }
    }, [buyServices])

    return (
        <div className='bg-white min-h-screen flex flex-col md:flex-row items-start gap-4 text-gray-800 w-full p-4'>
            <form className='w-full space-y-3' onSubmit={handleSubmit(data => { })}>
                <div className="text-lg font-bold my-8">Choose Service</div>

                {
                    hasAnyNetwork ?
                        <div className='flex flex-col gap-y-4 w-full'>
                            <Label htmlFor='Network'>Platform</Label>
                            <Select onValueChange={e => {
                                setSelectedNetwork(e)
                                setSelectedCategory(null)
                                setSelectedService(null)
                            }}>
                                <SelectTrigger>
                                    <SelectValue placeholder={"Select Network"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        Array.from(new Set(siteServices.map(s => s.network))).map((network, index) => (
                                            <SelectItem key={index} value={network!}>{network}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div> : null

                }


                {/* Select Category */}
                {selectedNetwork && (
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Label htmlFor='Category'>Category</Label>
                        <Select onValueChange={e => {
                            setSelectedCategory(e)
                            setSelectedService(null)
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Select Category"} />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    filteredCategories.map((cat, index) => (
                                        <SelectItem key={index} value={cat}>{cat}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Select Service */}
                {selectedCategory && (
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Label htmlFor='Service'>Services</Label>
                        <Select onValueChange={e => {
                            setSelectedService(e)
                            const svc = filteredServices.find(s => s.id === e)
                            setAmmount(svc?.min || 0)
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder={"Select Services"} />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    filteredServices.map((item, index) => (
                                        <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Input Link */}
                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Link'>Link</Label>
                    <Input onChange={e => setLink(e.target.value)} type="text" id='Link' placeholder='Link' />
                </div>

                {/* Input Amount */}
                {
                    !buyServices?.type?.includes("Package") &&
                    <div className='flex flex-col gap-y-4 w-full'>
                        <Label htmlFor='Amount'>Amount</Label>
                        {buyServices && (
                            <div className="font-bold">{`Min ${buyServices.min} - Max ${buyServices.max}`}</div>
                        )}
                        <Input onChange={e => setAmmount(+e.target.value)} type="text" id='Amount' value={ammount} />
                    </div>
                }

                {/* Drip Feed */}
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
                            <Input onChange={e => setInterval(+e.target.value)} type="text" id='interval' value={interval} />
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
                    <div className="text-md">{buyServices && formatIDR(price || 0)}</div>
                </div>

                {/* Submit Order */}
                {buyServices && (
                    <ButtonCreateOrder>
                        <ModalCreateOrder
                            runs={runs}
                            interval={interval}
                            dreepFeed={isDreepFeed}
                            providerUrl={buyServices.provider?.url || ""}
                            serviceId={buyServices.serviceId?.toString() || ""}
                            balance={balance}
                            name={buyServices.name!}
                            amount={ammount}
                            rate={+price || 0}
                            link={link}
                        />
                    </ButtonCreateOrder>
                )}
            </form>

            {/* Service Detail Card */}
            {buyServices && (
                <Card className='md:my-24 md:w-1/2 w-full'>
                    <CardHeader>
                        <CardTitle>{buyServices.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="tex-2xl font-bold text-center mb-3">
                            {formatIDR(price || 0)}
                        </div>
                        <div className="text-md" dangerouslySetInnerHTML={{ __html: buyServices.description! }}></div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default OrderForm
