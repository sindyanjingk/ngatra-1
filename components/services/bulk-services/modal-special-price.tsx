"use client";

import { useFormStatus } from "react-dom";
import { useModal } from "@/components/modal/provider";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prisma, siteServices } from "@prisma/client";
import { addSpecialPrice } from "@/lib/service-action";
import { toast } from "sonner";
import { formatIDR } from "@/lib/helpers";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as React from "react";

export default function ModalAddSpecialPrice({
    selectedServices,
    userSite,
}: {
    selectedServices: siteServices;
    userSite: Prisma.userSiteGetPayload<{
        include: {
            user: true;
        };
    }>[];
}) {
    const modal = useModal();
    const [selectedUserSiteId, setSelectedUserSiteId] = React.useState("");

    return (
        <form
            action={async (formData: FormData) => {
                const specialPrice = formData.get("special_price");
                const userSiteId = formData.get("user_site_id");

                if (!specialPrice || !userSiteId) {
                    toast.error("User site and price must be filled");
                    return;
                }

                const response = await addSpecialPrice(selectedServices, formData);

                if (response.success) {
                    toast.success(response.message);
                    modal?.hide();
                    window.location.reload();
                } else {
                    toast.error(response.message);
                }
            }}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            <div className="flex flex-col gap-y-4 justify-center p-6">
                <div className="text-lg font-bold">Add Special Price</div>
                <div className="max-h-[400px] overflow-y-auto space-y-3 w-full">
                    <div className="text-md">Service: {selectedServices.name}</div>
                    <div className="name">Price: {formatIDR(selectedServices.rate || 0)}</div>
                </div>

                {/* Controlled Select + Hidden input to send in form */}
                <Select onValueChange={(val) => setSelectedUserSiteId(val)} value={selectedUserSiteId}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                        {userSite.map((user) => (
                            <SelectItem key={user.user.id} value={user.user.id}>
                                {user.user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <input type="hidden" name="user_site_id" value={selectedUserSiteId} />

                <Input
                    type="number"
                    name="special_price"
                    placeholder="Special Price"
                    required
                />
            </div>

            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
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
