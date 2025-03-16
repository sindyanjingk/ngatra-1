"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

export default function AddDirectProviderModal({
    siteId
}: {
    siteId: string
}) {
    const modal = useModal();
    const [providerAdded, setProviderAdded] = useState(false)
    const [url, setUrl] = useState("")
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
            onSubmit={(e) => {
                e.preventDefault();
                checkProvider();
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {providerAdded ? `Provider Added` : `Add Direct Provider`}
                </h2>
                {
                    providerAdded ?
                        <div className="flex flex-col">
                            <h5 className="text-center">Now you can add services</h5>
                            <div className="flex items-center justify-center gap-x-4 mt-4">
                                <Link href={`/site/${siteId}/services`}>
                                    <Button type="button" onClick={modal?.hide} >Add Services</Button>
                                </Link>
                                <Button type="button" onClick={modal?.hide} variant="outline">Later</Button>
                            </div>
                        </div> :
                        <div className="flex flex-col gap-y-2 md:w-full">
                            <div className="flex flex-col gap-y-2">
                                <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Input Site URL</label>
                                <Input onChange={e => setUrl(e.target.value)} required placeholder="https://idcsosmed.com" className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                            </div>
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Input API Key</label>
                            <div className="flex items-center gap-x-2">
                                <Input onChange={e => setApiKey(e.target.value)} required placeholder="your api key . . ." className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                            </div>
                        </div>
                }
            </div>

            {/* Form Actions */}
            {
                !providerAdded &&
                <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <button
                        type="button"
                        onClick={modal?.hide}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        {providerAdded ? "Later" : `Cancel`}
                    </button>
                    <Button
                        type="submit"
                    >
                        {
                            isLoading ?
                                <Loader2Icon className="animate-spin" size={18} /> :
                                "Next"
                        }
                    </Button>
                </div>
            }
        </form>
    );
}

function CreateSiteFormButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className={cn(
                "flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
                pending
                    ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
            disabled={pending}
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Create Site"}
        </button>
    );
}
