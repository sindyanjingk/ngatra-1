"use client";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useModal } from "../modal/provider";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function FastOrderModal({
    siteId,
    fast,
    disc,
    orderPage,
    purchase,
    showDisc,
}: {
    siteId: string
    fast: boolean
    disc: string
    orderPage: boolean
    purchase: boolean
    showDisc: boolean
}) {
    const modal = useModal();

    const [showOrder, setShowOrder] = useState(false)
    const [fastOrder, setFastOrder] = useState(fast)
    const [discount, setDiscount] = useState(disc)
    const [showOrderPage, setShowOrderPage] = useState(orderPage)
    const [showDiscount, setShowDiscount] = useState(showDisc)
    const [showPurchase, setShowPurchase] = useState(purchase)

    const submit = async () => {
        try {
            const response = await axios.post(`/api/fast-order`, {
                siteId,
                fastOrder,
                discount,
                showOrderPage,
                showDiscount,
                showPurchase
            })
            if (response.status === 200) {
                toast.success("Success update settings")
                modal?.hide()
                window.location.reload()
            }
        } catch (error) {
            console.log({ error });
            toast.error("Failed update settings")
        }
    }
    return (
        <form
            action={async (data: FormData) => {
                await submit()
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Fast Order
                </h2>
                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Fast Order?</div>
                    <Switch checked={showOrder} onCheckedChange={(e) => {
                        setShowOrder(!showOrder)
                        setFastOrder(e)
                    }} />
                </div>

                {
                    showOrder &&
                    <>
                        <div className="border p-4 rounded-full flex items-center justify-between">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Discount for unregistered users</label>
                            <div className="w-1/4">
                                <Input defaultValue={disc} onChange={e => { setDiscount(e.target.value) }} type="number" className="font-semibold text-md text-gray-600 dark:text-gray-400" />
                            </div>
                        </div>

                        <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                            <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                                <div className="flex items-center gap-x-2">
                                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show order from landing</h5>
                                </div>
                                <Switch defaultChecked={showOrder} onCheckedChange={e => { setShowOrderPage(e) }} />
                            </div>
                            <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                                <div className="flex items-center gap-x-2">
                                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show discount widget </h5>
                                </div>
                                <Switch defaultChecked={showDisc} onCheckedChange={e => setShowDiscount(e)} />
                            </div>
                            <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                                <div className="flex items-center gap-x-2">
                                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show recent purchase widget </h5>
                                </div>
                                <Switch defaultChecked={purchase} onCheckedChange={e => setShowPurchase(e)} />
                            </div>
                        </div>
                    </>
                }
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
                <FastOrderButton />
            </div>
        </form>
    );
}

function FastOrderButton() {
    const { pending } = useFormStatus();
    return (
        <Button
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Save"}
        </Button>
    );
}
