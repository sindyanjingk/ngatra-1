"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { category } from "@prisma/client";
import { useTransition } from "react";

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

    return (
        <Select onValueChange={handleChange} defaultValue={searchParams.get("categoryId") || ""} disabled={isPending}>
            <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.category_name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FilterCategoryServices;
