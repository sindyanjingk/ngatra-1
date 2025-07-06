"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Switch } from '../ui/switch'
import { Prisma } from '@prisma/client'
import { useForm, Controller } from 'react-hook-form'
import { formatIDR } from '@/lib/helpers'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import ButtonCreateOrder from '../order/button-create-order'
import ModalCreateOrder from '../order/modal-create-order'

type OrderFormValues = {
  platform: string
  category: string
  service: string
  link: string
  amount: number
  dripFeed: boolean
  runs?: number
  interval?: number
}

const OrderForm = ({
  siteServices,
  user,
  discount
}: {
  siteServices: Prisma.siteServicesGetPayload<{
    include: {
      category: true
      provider: true
      site: true
    }
  }>[]
  user: Prisma.UserWhereInput,
  discount?: number
}) => {
  const [price, setPrice] = useState(0)
  const [balance, setBalance] = useState(user.balance)
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<OrderFormValues>({
    defaultValues: {
      dripFeed: false
    }
  })

  const watchPlatform = watch("platform")
  const watchCategory = watch("category")
  const watchService = watch("service")
  const watchAmount = watch("amount")

  const platformOptions = [
    "Shopee", "Tiktok", "Instagram", "Facebook", "Twitter", "Twitch", "Youtube"
  ]

  const filteredCategories = useMemo(() => {
    const filtered = watchPlatform
      ? siteServices.filter(service => service.category?.category_name?.toLowerCase().includes(watchPlatform.toLowerCase()))
      : siteServices
    return Array.from(new Set(filtered.map(s => s.category?.category_name || "Uncategorized")))
  }, [watchPlatform, siteServices])



  const filteredServices = useMemo(() => {
    return siteServices.filter(
      service => service.category?.category_name === watchCategory
    )
  }, [watchPlatform, watchCategory, siteServices])

  const selectedService = useMemo(() => {
    return siteServices.find(s => s.id === watchService)
  }, [watchService, siteServices])

  useEffect(() => {
    if (selectedService) {
      if (selectedService.type?.includes("Package")) {
        const amount = +selectedService.name!.split(" ")[0]
        setValue("amount", amount)
        setPrice(selectedService.rate || 0)
      } else {
        const total = (+(selectedService.rate || 0) / 1000) * (watchAmount || 0)
        setPrice(total)
      }
    }
  }, [selectedService, watchAmount, setValue])

  const onSubmit = (data: OrderFormValues) => {
    console.log(data)
  }

  return (
    <div className='bg-white min-h-screen flex flex-col md:flex-row items-start gap-4 text-gray-800 w-full p-4'>
      <form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="text-lg font-bold">Choose Service</div>

        {/* Platform */}
        <div className='flex flex-col gap-y-2'>
          <Label>Platform</Label>
          <Controller
            control={control}
            name="platform"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((platform, idx) => (
                    <SelectItem key={idx} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Category */}
        <div className='flex flex-col gap-y-2'>
          <Label>Category</Label>
          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((cat, idx) => (
                    <SelectItem key={idx} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Service */}
        {watchCategory && (
          <div className='flex flex-col gap-y-2'>
            <Label>Service</Label>
            <Controller
              control={control}
              name="service"
              rules={{ required: "Service is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredServices.map((s, idx) => (
                      <SelectItem key={idx} value={s.id || ""}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.service && <p className="text-red-500 text-sm">{errors.service.message}</p>}
          </div>
        )}

        {/* Link */}
        <div className='flex flex-col gap-y-2'>
          <Label>Link</Label>
          <Controller
            control={control}
            name="link"
            rules={{ required: "Link is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Link" />
            )}
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
        </div>

        {/* Amount */}
        {selectedService && !selectedService.type?.includes("Package") && (
          <div className='flex flex-col gap-y-2'>
            <Label>Amount</Label>
            <Controller
              control={control}
              name="amount"
              rules={{ required: "Amount is required", min: { value: selectedService.min || 0, message: `Min ${selectedService.min || 0}` } }}
              render={({ field }) => (
                <Input type="number" {...field} />
              )}
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>
        )}

        {/* Drip Feed */}
        <div className="flex items-center gap-x-4">
          <Label>Drip Feed?</Label>
          <Controller
            control={control}
            name="dripFeed"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Runs & Interval */}
        {watch("dripFeed") && (
          <div className="flex items-center gap-x-4">
            <Controller
              control={control}
              name="runs"
              render={({ field }) => (
                <Input placeholder="Runs" type="number" {...field} />
              )}
            />
            <Controller
              control={control}
              name="interval"
              render={({ field }) => (
                <Input placeholder="Interval (minutes)" type="number" {...field} />
              )}
            />
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>Price</div>
          <div>{selectedService && discount ? formatIDR(price - (+price * +discount / 100)) : formatIDR(price)}</div>
        </div>
        {
          discount && selectedService && (
            <div className="flex items-center gap-x-2">
              <div>Discount</div>
              <div className="text-red-500">{discount}%</div>
            </div>
          )
        }

        {/* Submit */}
        {selectedService && (
          <ButtonCreateOrder>
            <ModalCreateOrder
              runs={watch("runs") || 0}
              interval={watch("interval") || 0}
              dreepFeed={watch("dripFeed")}
              providerUrl={selectedService.provider?.url || ""}
              serviceId={selectedService.serviceId?.toString() || ""}
              balance={balance as number || 0}
              name={selectedService.name || ""}
              amount={watchAmount || 0}
              rate={ discount ? price - (+price * discount / 100) : price}
              link={watch("link")}
            />
          </ButtonCreateOrder>
        )}
      </form>

      {/* Service Detail */}
      {selectedService && (
        <Card className='md:my-24 md:w-1/2 w-full'>
          <CardHeader>
            <CardTitle>{selectedService.name || ""}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center mb-3">{formatIDR(price)}</div>
            <div className="text-md" dangerouslySetInnerHTML={{ __html: selectedService.description || "" }}></div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default OrderForm
