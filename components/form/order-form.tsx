"use client"
import React from 'react'
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

    // const services = categoryServices.filter((service) => service.categoryName === selectedCategory).map((item) => ({
    //     label: item.name,
    //     value: item.id
    // }));

    const services = categoryServices.find((service) => service.categoryName === selectedCategory)?.services.map((item) => ({
        label: item.name,
        value: item
    }));
    const buyServices = services?.find((service) => service.value.id === selectedService)?.value;
    return (
        <div className='bg-white min-h-screen text-gray-800 flex flex-col md:flex-row justify-center gap-x-12 md:py-12 items-start md:w-3/4'>
            <form className='md:w-1/2 space-y-4' onSubmit={handleSubmit(data => {
                
            })}>
                <div className="text-lg font-bold my-8">Choose Service</div>
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
                    <Input type="text" id='Link' placeholder='Link' />
                </div>
                <div className='flex flex-col gap-y-4 w-full'>
                    <Label htmlFor='Amount'>Amount</Label>
                    <Input onChange={e => setAmmount(+e.target.value)} type="text" id='Amount' value={ammount} />
                </div>
                <div className="flex items-center gap-x-4">
                    <Switch />
                    <div className="text-md">Drip Feed?</div>
                </div>
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
                        <ModalCreateOrder name={buyServices?.name!} amount={ammount} rate={+buyServices.rate! / 1000 * ammount} link='' />
                    </ButtonCreateOrder>
                }
            </form>
            {
                buyServices &&
                <Card className='md:my-24 w-1/2'>
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