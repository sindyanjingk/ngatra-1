"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { category } from "@prisma/client";
import { useTransition } from "react";
import { Trash2Icon } from "lucide-react";
import { deleteAllCategory, deleteCategory } from "@/lib/action";
import { toast } from "sonner";

type Props = {
    categories: category[];
};

const FilterCategoryServices = ({ categories }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoryId) {
            params.set("categoryId", categoryId);
        } else {
            params.delete("categoryId");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false });
        });
    };

    const handleDelete = async (categoryId: string) => {
        const response = await deleteCategory(categoryId);
        if (response.status) {
            toast.success("Category deleted successfully");
            window.location.reload();
        } else {
            toast.error(response.message);
        }
    }

    const handleDeleteAll = async () => {
        const response = await deleteAllCategory()
        if (response.status) {
            toast.success("All category deleted successfully");
            window.location.reload();
        } else {
            toast.error(response.message);
        }
    }

    return (
        <Select onValueChange={handleChange} defaultValue={searchParams.get("categoryId") || ""} disabled={isPending}>
            <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">
                    <div className="flex items-center justify-between w-full">
                        All
                        <Trash2Icon
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                handleDeleteAll()
                            }}
                            className="ml-2 h-4 w-4 text-red-200 cursor-pointer hover:text-red-500"
                        />
                    </div>
                </SelectItem>
                {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        <div className="flex items-center justify-between  w-full">
                            {item.category_name}
                            <Trash2Icon
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id)
                                }}
                                className="ml-2 h-4 w-4 cursor-pointer text-red-200 hover:text-red-500"
                            />
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FilterCategoryServices;
