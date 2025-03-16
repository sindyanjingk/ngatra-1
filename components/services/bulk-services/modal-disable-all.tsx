"use client";

import { useFormStatus } from "react-dom";
import { useModal } from "@/components/modal/provider";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { disableAllServices } from "@/lib/service-action";
import { toast } from "sonner";


export default function ModalDisableAll({selectedServices}: {selectedServices: string[]}) {
    const modal = useModal();
    return (
        <form
            action={async (data: FormData) => {
                const response = await disableAllServices(selectedServices)
                if(response.success){
                    toast.success(response.message)
                    modal?.hide()
                    window.location.reload()
                }else{
                    toast.error(response.message)
                }
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            <div className="flex items-center justify-center p-8">
                <div className="text-lg font-bold">Are you sure want to disable selected services?</div>
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
            {pending ? <Loader2Icon className="animate-spin" /> : "Disable All"}
        </Button>
    );
}
