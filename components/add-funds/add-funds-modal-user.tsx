"use client";

import { useModal } from "@/components/modal/provider";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";



export default function AddFundsModalUser({ siteId }: { siteId: string }) {
    const modal = useModal();
    return (
        <form
            action={async (data: FormData) => {
                const ammount = data.get("ammount")
                const response = await axios.post(`/api/top-up/user`, { ammount })
                if (response.status === 200) {
                    window.open(response.data.response.redirect_url, "_blank")
                    toast.success("Success add funds")
                    modal?.hide()
                } else {
                    toast.error("Something went wrong")
                }
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col items-center justify-center space-y-4 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Add Funds
                </h2>
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="ammount">Ammount</label>
                    <Input id="ammount" type="text" name="ammount" placeholder="Ammount" />
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
                <CreateFundsButton />
            </div>

        </form>
    );
}


function CreateFundsButton() {
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
            {pending ? <Loader2Icon className="animate-spin" size={18} /> : "Create"}
        </button>
    );
}
