"use client";

import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "../modal/provider";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

export default function MetaDataModal({
    siteId,
    pageTitle,
    pageDescription,
    pageKeywords,
    pageMetaTags,
    pageFooterTags
} : {
    siteId : string
    pageTitle : string
    pageDescription : string
    pageKeywords : string
    pageMetaTags : string
    pageFooterTags : string
}) {
    const modal = useModal();
    const [title, setTitle] = useState(pageTitle || "")
    const [description, setDescription] = useState(pageDescription || "");
    const [keywords, setKeywords] = useState(pageKeywords || "");
    const [metaTags, setMetaTags] = useState(pageMetaTags || "");
    const [footerTags, setFooterTags] = useState(pageFooterTags || "");

    const submit = async () => {
        console.log({siteId});
        try {
            const response = await axios.post(`/api/meta-data`, {
                siteId,
                title,
                description,
                keywords,
                metaTags,
                footerTags
            });
            if(response.status === 200) {
                toast.success("Successfully update meta data");
                modal?.hide();
            }
        } catch (error) {
            console.log({error});
            toast.error("Failed to update meta data");
        }
    }

    return (
        <form
            action={async (data: FormData) => {
                await submit()
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Meta Data
                </h2>

                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-col gap-y-2 w-1/2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Page title</label>
                        <Input defaultValue={pageTitle} onChange={e=>{
                            setTitle(e.target.value)
                        }} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-1/2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Description meta</label>
                        <Input defaultValue={pageDescription} onChange={e=>{
                            setDescription(e.target.value)
                        }} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 md:w-full">
                    <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Meta tags</label>
                    <Input defaultValue={pageMetaTags} onChange={e=>{
                        setMetaTags(e.target.value)
                    }} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                </div>
                <div className="flex flex-col gap-y-2 md:w-full">
                    <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Keywords</label>
                    <Input defaultValue={pageKeywords} onChange={e=>{
                        setKeywords(e.target.value)
                    }} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                </div>
                <div className="flex flex-col gap-y-2 md:w-full">
                    <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Footer tags</label>
                    <Input defaultValue={pageFooterTags} onChange={e=>{
                        setFooterTags(e.target.value)
                    }} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
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
                <MetaDataButton/>
            </div>
        </form>
    );
}

function MetaDataButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Save"}
        </Button>
    );
}
