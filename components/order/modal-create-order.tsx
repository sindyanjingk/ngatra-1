"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useModal } from "@/components/modal/provider";
import { CircleCheckBigIcon, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatIDR } from "@/lib/helpers";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { motion } from 'framer-motion';


export default function ModalCreateOrder({
    amount,
    rate,
    name,
    link,
    balance,
    providerUrl,
    serviceId,
    dreepFeed,
    runs,
    interval
}: {
    amount: number,
    rate: number,
    name: string,
    link: string,
    balance: number,
    providerUrl: string,
    serviceId?: string,
    dreepFeed?: boolean,
    runs?: number,
    interval?: number,
}) {
    const modal = useModal();
    const [token, setToken] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token")
            setToken(token || "")
        }
    }, [])
    return (
        <form
            action={async (data: FormData) => {
                try {
                    if (balance === 0) {
                        toast.error("Please add funds first")
                        return
                    }
                    if (!dreepFeed) {
                        const res = await axios.post(`/api/new-order`, {
                            name,
                            quantity: amount,
                            amount: Math.ceil(rate),
                            link,
                            providerUrl,
                            serviceId
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })

                        console.log({ res });
                        if (res.status === 200) {
                            toast.success("Success create order")
                            modal?.show(
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="max-w-sm mx-auto shadow-xl border-green-400 border">
                                        <CardHeader className="flex items-center justify-center text-green-500">
                                            <CircleCheckBigIcon className="w-12 h-12 animate-bounce" />
                                        </CardHeader>
                                        <CardContent className="space-y-3 text-center">
                                            <div className="text-lg font-bold text-green-600">Payment Successful!</div>
                                            <div className="text-2xl font-extrabold text-green-500">{formatIDR(res.data?.balance || 0)}</div>

                                            <div className="grid gap-1 text-sm text-muted-foreground">
                                                <div><span className="font-semibold text-foreground">Layanan:</span> {name}</div>
                                                <div><span className="font-semibold text-foreground">Link:</span> {link}</div>
                                                <div><span className="font-semibold text-foreground">ID Pesanan:</span> {res.data?.orderId || ""}</div>
                                                <div><span className="font-semibold text-foreground">Sisa Saldo:</span> {formatIDR(res.data?.balance || "")}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        }
                    } else {
                        const res = await axios.post(`/api/new-order/dreep-feed`, {
                            name,
                            quantity: amount,
                            amount: Math.ceil(rate),
                            link,
                            providerUrl,
                            serviceId,
                            runs,
                            interval
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })

                        console.log({ res });
                        if (res.status === 200) {
                            toast.success("Success create order")
                            modal?.show(
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card className="max-w-sm mx-auto shadow-xl border-green-400 border">
                                        <CardHeader className="flex items-center justify-center text-green-500">
                                            <CircleCheckBigIcon className="w-12 h-12 animate-bounce" />
                                        </CardHeader>
                                        <CardContent className="space-y-3 text-center">
                                            <div className="text-lg font-bold text-green-600">Payment Successful!</div>
                                            <div className="text-2xl font-extrabold text-green-500">{formatIDR(balance)}</div>

                                            <div className="grid gap-1 text-sm text-muted-foreground">
                                                <div><span className="font-semibold text-foreground">Layanan:</span> {name}</div>
                                                <div><span className="font-semibold text-foreground">Link:</span> {link}</div>
                                                <div><span className="font-semibold text-foreground">ID Pesanan:</span> {res.data?.orderId || ""}</div>
                                                <div><span className="font-semibold text-foreground">Sisa Saldo:</span> {formatIDR(res.data?.balance || "")}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )
                        }
                    }
                } catch (error: any) {
                    toast.error(error?.response?.data?.message || "Something went wrong")
                }
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-3 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    {`Confirm Your Order`}
                </div>
                <div className="text-xl font-bold">{name}</div>
                <Link href={"/"}>
                    <div className="text-md text-blue-500">{link}</div>
                </Link>
                <div className="flex items-center border rounded-2xl">
                    <div className="p-4 w-1/2">{amount}</div>
                    <div className="p-4 border-l">{formatIDR(rate)}</div>
                </div>
            </div>


            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {`Cancel`}
                </button>
                <CreateSerciceFormButton />
            </div>
        </form>
    );
}

function CreateSerciceFormButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"

            disabled={pending}
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Continue"}
        </Button>
    );
}
