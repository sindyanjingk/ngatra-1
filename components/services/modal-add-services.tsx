"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";


export default function ModalAddServices() {
    const modal = useModal();

    const [data, setData] = useState({
        name: "",
        subdomain: "",
        description: "",
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            subdomain: prev.name
                .toLowerCase()
                .trim()
                .replace(/[\W_]+/g, "-"),
        }));
    }, [data.name]);
    return (
        <form
            action={async (data: FormData) => {
                console.log({ data }); 
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-2 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    {`Add Services`}
                </div>
                <div className="space-y-1">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Service Name</Label>
                    <Input required type="text" name="name" id="name" placeholder="Service Name" className="w-full" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Service description</Label>
                    <Textarea required name="description" id="description" placeholder="Service description" className="w-full h-20" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                    <Select >
                        <SelectTrigger id="category" className="w-full" name="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="apple">Apple</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-x-8">
                    <div className="space-y-1">
                        <Label htmlFor="min" className="text-sm font-medium text-gray-700">Min</Label>
                        <Input required type="number" name="min" id="min" placeholder="Min" className="w-full" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="max" className="text-sm font-medium text-gray-700">Max</Label>
                        <Input required type="number" name="max" id="max" placeholder="Max" className="w-full" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">Service Price</Label>
                    <Input type="number" name="price" id="price" placeholder="Service Price" className="w-full" />
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
            {pending ? <Loader2Icon className="animate-spin" /> : "Create service"}
        </Button>
    );
}
