"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { useModal } from "@/components/modal/provider";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { signOut } from "next-auth/react";


export default function LogoutModal() {
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
                await signOut({
                    redirect: true,
                    callbackUrl: "/",
                });
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-2 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    {`Logout`}
                </div>
            </div>
            <div className="text-lg font-semibold text-center my-4">Are you sure want to logout?</div>
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
            {pending ? <Loader2Icon className="animate-spin" /> : "Yes"}
        </Button>
    );
}
