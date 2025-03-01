"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Iservices {
    id? : string
    service?: string
    name?: string
    type?: string
    rate?: string
    min?: string;
    max?: string
    dripfeed?: boolean
    refill?: boolean
    cancel?: boolean
    category?: string
    description?: string
    network?: string
    icon?: string
}

export default function AddProviderModal({
    url,
    siteId
}: {
    url: string;
    siteId: string
}) {
    const modal = useModal();
    const [providerAdded, setProviderAdded] = useState(false)
    const [apiKey, setApiKey] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const checkProvider = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/provider`, { url, name: url.split("/")[2], siteId, apiKey })
            if (response.status === 200) {
                setProviderAdded(true)
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log({ error });
            setProviderAdded(false)
            toast.error("Failed add provider")
        }
        setIsLoading(false)
    }
    return (
        <form
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {providerAdded ? `Provider Added` : `Add Provider`}
                </h2>
                {
                    providerAdded ?
                        <div className="flex flex-col gap-y-4">
                            <h5 className="text-center">Now you can add services</h5>
                            <div className="flex items-center justify-center gap-x-4">
                                <Button type="button" onClick={modal?.hide}  >Add Services</Button>
                                <Button type="button" onClick={modal?.hide} variant="outline">Later</Button>
                            </div>
                        </div> :
                        <div className="flex flex-col gap-y-2 md:w-full">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Input API Key</label>
                            <div className="flex items-center gap-x-2">
                                <Input onChange={(e) => {
                                    setApiKey(e.target.value)
                                }} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                                <button
                                    type="button"
                                    onClick={checkProvider}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    {
                                        isLoading ?
                                            <Loader2Icon className="animate-spin" /> :
                                            "Next"
                                    }
                                </button>
                            </div>
                        </div>
                }
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {providerAdded ? "Later" : `Cancel`}
                </button>
            </div>
        </form>
    );
}

