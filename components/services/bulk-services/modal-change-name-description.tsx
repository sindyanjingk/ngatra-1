"use client";

import { useFormStatus } from "react-dom";
import { useModal } from "@/components/modal/provider";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteServices } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { changeNameAndDescriptionServices } from "@/lib/service-action";
import { toast } from "sonner";

export default function ModalChangeNameDescription({ selectedServices }: { selectedServices: siteServices[] }) {
    const modal = useModal();

    return (
        <form
            action={async (data: FormData) => {
                const servicesToUpdate = selectedServices.map((service) => ({
                    id : service.id,
                    serviceId: service.serviceId,
                    name: data.get(`name[${service.serviceId}]`) as string,
                    description: data.get(`description[${service.serviceId}]`) as string,
                }));
                const response = await changeNameAndDescriptionServices(servicesToUpdate)
                if (response.success) {
                    toast.success(response.message)
                    modal?.hide()
                    window.location.reload()
                } else {
                    toast.error(response.message)
                }
                // Kirim ke server dengan fetch atau action lainnya
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            <div className="flex flex-col gap-y-4 justify-center p-6">
                <div className="text-lg font-bold">Change name and description</div>
                {selectedServices.map((item) => (
                    <div key={item.serviceId} className="space-y-3 w-full">
                        <div className="text-md font-bold">ID {item.serviceId}</div>
                        <Label htmlFor={`name[${item.serviceId}]`}>Name</Label>
                        <Input type="text" name={`name[${item.serviceId}]`} defaultValue={item.name!} />
                        <Label htmlFor={`description[${item.serviceId}]`}>Description</Label>
                        <Textarea name={`description[${item.serviceId}]`} defaultValue={item.description!} />
                    </div>
                ))}
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
