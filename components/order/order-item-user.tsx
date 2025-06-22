"use client"

import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { formatIDR } from '@/lib/helpers'
import { TTransaction } from '../table/order-table'
import { Checkbox } from '../ui/checkbox'
import axios from 'axios'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ArrowRightCircleIcon, CheckIcon, EllipsisIcon, Loader2Icon, RefreshCcw, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import moment from 'moment'

type Props = {
    order: TTransaction
    selectedOrders: TTransaction[]
    toggleSelectSingle: (order: TTransaction, checked: string | boolean) => void
    isSelected: boolean
}

const OrderItemUser = ({ order, toggleSelectSingle, isSelected }: Props) => {
    const [status, setStatus] = React.useState<string>(order.status || "")
    const [isLoadingMark, setIsLoadingMark] = React.useState<boolean>(false)
    const [isLoadingSync, setIsLoadingSync] = useState(false)
    const [isLoadCancel, setiSLoadCancel] = useState(false)
    const handleComplete = async () => {
        setIsLoadingMark(true)
        try {
            const response = await axios.post(`/api/orders/mark-as-complete`, {
                orderId: order.id
            })
            if (response.status === 200) {
                toast.success(`Order ${order.id} marked as completed`)
                window.location.reload();
            }
        } catch (error) {
            console.log({ error });
            toast.error(`Failed to mark order ${order.id} as completed`)
        }
        setIsLoadingMark(false)
    }

    const handleCancel = async () => {
        setiSLoadCancel(true)
        try {
            const response = await axios.post(`/api/orders/cancel`, {
                orderId: order.id,
                provider: order.siteService?.provider?.name,
                providerOrderId: order.providerOrderId
            })
            if (response.status === 200) {
                toast.success(`Order ${order.id} canceled`)
                window.location.reload();
            }
        } catch (error) {
            console.log({ error });
            toast.error(`Failed to cancel order ${order.id}`)
        }
        setiSLoadCancel(false)
    }

    const handleSync = async () => {
        setIsLoadingSync(true)
        try {
            const response = await axios.post(`/api/orders/sync`, {
                orderId: order.id,
                provider: order.siteService?.provider?.name,
                providerOrderId: order.providerOrderId
            })
            console.log({ response });
            if (response.status === 200) {
                toast.success(`Order ${order.id} synced`)
                setStatus(response.data.data.status)
            }
        } catch (error) {
            console.log({ error });
        }
        setIsLoadingSync(false)
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
            <TableCell className='space-y-2'>
                {order.siteService?.provider?.name}
            </TableCell>
            <TableCell>{order.qty}</TableCell>
            <TableCell className=''>
                {status || "Pending"}
            </TableCell>
            <TableCell className='space-y-2 flex flex-col'>
                {formatIDR(+order.totalAmount! || 0)}
            </TableCell>
            <TableCell>{moment(order.createdAt).format("ddd, DD MMM, HH:mm")}</TableCell>
        </TableRow>
    )
}
export default OrderItemUser