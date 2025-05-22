"use client";

import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { category, siteServices } from "@prisma/client";
import { Switch } from "../ui/switch";
import { updateServiceAction } from "@/lib/service-action";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

export default function ModalUpdateServices({ service, categories }: { service: siteServices; categories: category[] }) {
    const modal = useModal();

    async function handleSubmit(formData: FormData) {
        const data = Object.fromEntries(formData.entries());
        const response = await updateServiceAction(service.id, data);
        if (response.success) {
            toast.success(response.message);
            modal?.hide();
            window.location.reload()
        } else {
            toast.error(response.message);
        }
    }

    return (
        <ScrollArea className="max-h-[75vh]">
            <form action={handleSubmit} className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400">
                <div className="flex flex-col space-y-2 p-6 md:p-8">
                    <div className="text-xl font-semibold text-gray-800 dark:text-white">Update Service</div>
                    <div className="space-y-1">
                        <Label htmlFor="name">Service Name</Label>
                        <Input required type="text" name="name" id="name" defaultValue={service.name ?? ""} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="description">Service Description</Label>
                        <Textarea className="h-20" required name="description" id="description" defaultValue={service.description ?? ""} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="category">Category</Label>
                        <Select name="categoryId" required defaultValue={service.categoryId ?? ""}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>{category.category_name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-x-8">
                        <div className="space-y-1">
                            <Label htmlFor="min">Min</Label>
                            <Input required type="number" name="min" id="min" defaultValue={service.min ?? ""} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="max">Max</Label>
                            <Input required type="number" name="max" id="max" defaultValue={service.max ?? ""} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="price">Service Price</Label>
                        <Input type="number" name="rate" id="rate" defaultValue={service.rate ?? ""} />
                    </div>

                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="dripfeed">Dripfeed</Label>
                            <Switch name="dripfeed" id="dripfeed" defaultChecked={service.dripfeed ?? false} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="refill">Refill</Label>
                            <Switch name="refill" id="refill" defaultChecked={service.refill ?? false} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="cancel">Cancel</Label>
                            <Switch name="cancel" id="cancel" defaultChecked={service.cancel ?? false} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="isEnabled">Enabled</Label>
                            <Switch name="isEnabled" id="isEnabled" defaultChecked={service.isEnabled ?? true} />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <button type="button" onClick={modal?.hide} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
                        Cancel
                    </button>
                    <UpdateServiceFormButton />
                </div>
            </form>
        </ScrollArea>
    );
}

function UpdateServiceFormButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? <Loader2Icon className="animate-spin" /> : "Update service"}
        </Button>
    );
}
