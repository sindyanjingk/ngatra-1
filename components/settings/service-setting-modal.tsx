"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useModal } from "../modal/provider";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export default function ServiceSettingModal({
    cancel,
    average,
    showApi,
    showMultiple,
    showService,
    siteId
}: {
    cancel: boolean
    average : boolean
    showApi : boolean
    showMultiple : boolean
    showService : boolean
    siteId : string
}) {
    const router = useRouter();
    const modal = useModal();
    const [cancelOrder, setCancelOrder] = useState(cancel)
    const [averageCompletionTime, setAverageCompletionTime] = useState(average)
    const [showApiPage, setShowApiPage] = useState(showApi)
    const [showMultipleOrder, setShowMUltipleOrder] = useState(showMultiple)
    const [showServicePage, setShowServicePage] = useState(showService)
    const [isLoading, setIsLoading] = useState(false)

    const submit = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/services-settings`, {
                siteId,
                cancelOrder,
                averageCompletionTime,
                showApiPage,
                showMultipleOrder,
                showServicePage,
            })
            if(response.status === 200) {
                toast.success("Success update settings")
                router.refresh()
                modal?.hide()
            }
        } catch (error) {
            console.log({ error });
            toast.error("Terjadi kesalahan")
        }
        setIsLoading(false)
    }

    return (
        <form
            action={async (data: FormData) => {
                await submit();
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Service Settings
                </h2>
                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Cancel failed orders automaticly</div>
                    <Switch defaultChecked={cancel} onCheckedChange={(e) => setCancelOrder(e)} />
                </div>
                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Average completion time feature</div>
                    <Switch defaultChecked={average} onCheckedChange={e => setAverageCompletionTime(e)} className="[&[data-state=checked]]:bg-green-700" />
                </div>

                {/* <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Price rounding</div>
                    <Select onValueChange={e => setPriceRounding(e)}>
                        <SelectTrigger className="w-[180px] font-semibold text-md text-gray-600 dark:text-gray-400">
                            <SelectValue className="font-semibold text-md text-gray-600 dark:text-gray-400" placeholder="Select a rounding" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="font-semibold text-md text-gray-600 dark:text-gray-400">{`Ones (1)`}</SelectLabel>
                                <SelectItem value="apple">{`Tenths (1.1)`}</SelectItem>
                                <SelectItem value="banana">{`Hundred (1.11)`}</SelectItem>
                                <SelectItem value="blueberry">{`Tousandth (1.111)`}</SelectItem>
                                <SelectItem value="grapes">{`Ten-Tousandth (1.1111)`}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div> */}
                <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                    <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show API page</h5>
                        </div>
                        <Switch defaultChecked={showApi} onCheckedChange={e => setShowApiPage(e)} />
                    </div>
                    <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show multiple order page </h5>
                        </div>
                        <Switch defaultChecked={showMultiple} onCheckedChange={e => setShowMUltipleOrder(e)} />
                    </div>
                    <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show services page </h5>
                        </div>
                        <Switch defaultChecked={showService} onCheckedChange={e => setShowServicePage(e)} />
                    </div>
                </div>
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
                <ServiceSettingsButton />
            </div>
        </form>
    );
}

function ServiceSettingsButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            disabled={pending}
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Save"}
        </Button>
    );
}
