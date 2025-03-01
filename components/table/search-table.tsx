"use client";
import React from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

const SearchTable = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get("search") as string;

        const params = new URLSearchParams(window.location.search);
        params.set("search", searchValue);
        router.push(`${window.location.pathname}?${params}`);
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <Input type="text" placeholder="Search ..." name="search" />
            <Button type="submit">
                <SearchIcon />
            </Button>
        </form>
    );
};

export default SearchTable;
