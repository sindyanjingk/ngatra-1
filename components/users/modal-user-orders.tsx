"use client";

import { useModal } from "@/components/modal/provider";
import { toast } from "sonner";
import { TUsers } from "@/app/app/(dashboard)/site/[id]/users/page";
import { formatIDR } from "@/lib/helpers";
import { useEffect, useState } from "react";
import axios from "axios";
import { Prisma } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import moment from "moment";



export default function ModalUserOrders({ users }: { users: TUsers }) {
    const modal = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState<Prisma.transactionGetPayload<{
        include: {
            user: true,
            sites: true
            siteService: true
        }
    }>[]>([]);
    const getOrders = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/orders/history`, {
                id: users.user.id
            })

            if (response.status === 200) {
                toast.success("Orders fetched successfully")
                setOrders(response.data?.order)
            } else {
                toast.error("Error fetching orders")
            }
        } catch (error) {
            console.log({ error });
            toast.error("Error getting orders")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col items-center justify-center space-y-4 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    User Orders
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatIDR(users.user.balance || 0)}</p>
            </div>
            <div className="flex flex-col gap-y-2 p-4">
            <ScrollArea className="h-64 w-full rounded-md border p-4">
                {isLoading ? (
                    <Loader2Icon className="animate-spin mx-auto" />
                ) : (
                    orders.map((item, index) => (
                        <div key={index} className="flex items-center justify-between border-b py-2">
                            <div className="space-y-2">
                                <span>
                                {formatIDR(item.totalAmount || 0)}
                                </span>
                                <p>{moment(item.createdAt).format("ddd mm yy hh:mm")}</p>
                            </div>
                            <div className="">{item.name}</div>
                        </div>
                    ))
                )}
            </ScrollArea>
        </div>
            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
