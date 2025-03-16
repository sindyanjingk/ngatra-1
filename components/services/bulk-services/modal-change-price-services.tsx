"use client";

import { useFormStatus } from "react-dom";
import { useModal } from "@/components/modal/provider";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteServices } from "@prisma/client";
import { changeAllPriceServices } from "@/lib/service-action";
import { toast } from "sonner";
import ServicePriceItem from "./service-price-item";
import { useState } from "react";

export default function ModalChangePriceServices({ selectedServices }: { selectedServices: siteServices[] }) {
    const modal = useModal();
    const [changedServices, setChangedServices] = useState<siteServices[]>(selectedServices);

    return (
        <form
            action={async (data: FormData) => {
                const response = await changeAllPriceServices(changedServices)
                if (response.success) {
                    toast.success(response.message)
                    modal?.hide()
                    window.location.reload()
                } else {
                    toast.error(response.message)
                }
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            <div className="flex flex-col gap-y-4 justify-center p-6">
                <div className="text-lg font-bold">Change Price</div>
                <div className="flex items-center gap-x-4">
                    <div className="text-md w-1/4">Name</div>
                    <div className="text-md w-1/4">Provider Price</div>
                    <div className="text-md w-1/4">Final Price</div>
                    <div className="text-md w-1/4">Extra Price</div>
                </div>
                {/* Scrollable section */}
                <div className="max-h-[400px] overflow-y-auto space-y-3 w-full">
                    {changedServices.map((item) => (
                        <ServicePriceItem
                            key={item.id}
                            serviceId={item.id}
                            name={item.name!}
                            providersRate={item.providersRate!}
                            rate={item.rate!}
                            extraPrice={item.extraPrice!}
                            setChangedServices={setChangedServices}
                        />
                    ))}
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
                <CreateServiceFormButton />
            </div>
        </form>
    );
}

function CreateServiceFormButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2Icon className="animate-spin" /> : "Submit"}
        </Button>
    );
}
