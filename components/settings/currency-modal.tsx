"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { useModal } from "../modal/provider";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { toast } from "sonner";


export default function CurrencyModal({
    siteId,

}: {
    siteId: string

}) {
    const modal = useModal();
    const [currency, setCurrency] = React.useState<string>("IDR");

    const submit = async () => {
        try {
            const response = await axios.post(`/api/currency`, {
                siteId,
                currency
            })
            if(response.status === 200){
                toast.success("Success update currency")
            }
        } catch (error) {
            console.log({error});
            toast.error("Terjadi kesalahan")
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
                    Main Currency
                </h2>
                <Select onValueChange={e=>setCurrency(e)}>
                    <SelectTrigger>
                        <SelectValue placeholder={"Select currency"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"IDR"}>IDR</SelectItem>
                        <SelectItem value={"USD"}>USD</SelectItem>
                    </SelectContent>
                </Select>
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
                <CurrencyButton />
            </div>
        </form>
    );
}

function CurrencyButton() {
    const { pending } = useFormStatus();
    return (
        <Button
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Save"}
        </Button>
    );
}
