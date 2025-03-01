"use client";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export default function DeleteProviderModal({
    providerId
}: {
    providerId: string
}) {
    const modal = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const deleteProvider = async ()=>{
        setIsLoading(true);
        try {
            const response = await axios.delete(`/api/provider`, { data: { id : providerId} })
            if (response.status === 200) {
                toast.success(response.data.message)
                window.location.reload()
            }
        } catch (error) {
            console.log({ error });
            toast.error("Failed delete provider")
        }
        setIsLoading(false) 
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                deleteProvider();
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Are you sure want to delete this provider?</h2>
            </div>
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    { `Cancel`}
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

        </form>
    );
}
