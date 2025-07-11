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
import { category } from "@prisma/client";
import { addServiceAction } from "@/lib/service-action";
import { toast } from "sonner";


export default function ModalAddServices({ categories, siteId }: { categories: category[], siteId : string }) {
    const modal = useModal();
    
    async function handleSubmit(formData: FormData) {
        const data = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            categoryId: formData.get('categoryId') as string,
            min: formData.get('min') as string,
            max: formData.get('max') as string,
            price: formData.get('price') as string,
            siteId: siteId
        };
        const response = await addServiceAction(data);
        if(response.success){
            toast.success(response.message);
            modal?.hide();
            window.location.reload()
        }else{
            toast.error(response.message);
        }
    }
    return (
        <form action={handleSubmit} className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400">
            <div className="flex flex-col space-y-2 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">Add Services</div>
                
                <div className="space-y-1">
                    <Label htmlFor="name">Service Name</Label>
                    <Input required type="text" name="name" id="name" placeholder="Service Name" />
                </div>
                
                <div className="space-y-1">
                    <Label htmlFor="description">Service Description</Label>
                    <Textarea required name="description" id="description" placeholder="Service description" />
                </div>
                
                <div className="space-y-1">
                    <Label htmlFor="category">Category</Label>
                    <Select name="categoryId" required>
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
                        <Input required type="number" name="min" id="min" placeholder="Min" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="max">Max</Label>
                        <Input required type="number" name="max" id="max" placeholder="Max" />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <Label htmlFor="price">Service Price</Label>
                    <Input type="number" name="price" id="price" placeholder="Service Price" />
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button type="button" onClick={modal?.hide} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
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
            {pending ? <Loader2Icon className="animate-spin" /> : "Create service"}
        </Button>
    );
}
