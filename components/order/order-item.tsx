"use client"

import React, { useEffect } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { formatIDR } from '@/lib/helpers'
import { TTransaction } from '../table/order-table'
import { Checkbox } from '../ui/checkbox'
import axios from 'axios'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ArrowRightCircleIcon, CheckIcon, EllipsisIcon, Loader2Icon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import moment from 'moment'

type Props = {
    order: TTransaction
    selectedOrders: TTransaction[]
    toggleSelectSingle: (order: TTransaction, checked: string | boolean) => void
    isSelected: boolean
}

const OrderItem = ({ order, toggleSelectSingle, isSelected }: Props) => {
    const [status, setStatus] = React.useState<string>("")
    const [isLoadingMark, setIsLoadingMark] = React.useState<boolean>(false)
    const [isLoadingCancel, setIsLoadingCancel] = React.useState<boolean>(false)
    const [isLoadingResend, setIsLoadingResend] = React.useState<boolean>(false)
    const [isLoadingGet, setIsLoadingGet] = React.useState<boolean>(false)
    const getStatus = async () => {
        setIsLoadingGet(true)
        try {
            const response = await axios.post(`/api/check-status`, {
                id: order.id,
                providerUrl: order.siteService?.provider?.url,
                providerOrderId: order.providerOrderId,
                key: order.siteService?.provider?.apiKey
            })
            console.log({response});
            setStatus(response.data.status)
        } catch (error) {
            console.log({ error });
        }
        setIsLoadingGet(false)
    }

    useEffect(() => {
        getStatus()
    }, [])

    const handleComplete = async () => {
        setIsLoadingMark(true)
        try {
            const response = await axios.post(`/api/orders/mark-as-complete`, {
                orderId: order.id
            })
            if (response.status === 200) {
                toast.success(`Order ${order.id} marked as completed`)
            }
        } catch (error) {
            console.log({ error });
            toast.error(`Failed to mark order ${order.id} as completed`)
        }
        setIsLoadingMark(false)
    }
    return (
        <TableRow>
            <TableCell>
                <Checkbox checked={isSelected} onCheckedChange={(checked) => toggleSelectSingle(order, checked)} />
            </TableCell>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.user?.name}</TableCell>
            <TableCell className='space-y-2'>
                {order.siteService?.name}
                <div className="text-blue-500">
                    {order.link}
                </div>
            </TableCell>
            <TableCell>{order.qty}</TableCell>
            <TableCell>
                {
                    isLoadingGet ?
                        <Loader2Icon className='animate-spin' /> :
                        status
                }
            </TableCell>
            <TableCell className='space-y-2 flex flex-col'>
                {formatIDR(+order.totalAmount! || 0)}
                <span className='text-green-500'>Profit {formatIDR(+order.profit! || 0)}</span>
            </TableCell>
            <TableCell>{moment(order.createdAt).format("ddd, DD MMM, HH:mm")}</TableCell>
            <Popover>
                <PopoverTrigger asChild>
                    <EllipsisIcon className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="md:w-56">
                    <Button variant={"ghost"}>
                        <ArrowRightCircleIcon />
                        Resend To Provider
                    </Button>
                    <Button onClick={handleComplete} variant={"ghost"}>
                        {
                            isLoadingMark ?
                                <Loader2Icon className='animate-spin' /> :
                                <>
                                    <CheckIcon />
                                    Mark as completed
                                </>
                        }
                    </Button>
                    <Button variant={"ghost"}>
                        <XIcon />
                        Cancel With Refund
                    </Button>
                </PopoverContent>
            </Popover>
        </TableRow>
    )
}
export default OrderItem