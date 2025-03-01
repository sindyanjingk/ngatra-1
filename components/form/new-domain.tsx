"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const tlds = [".com", ".net", ".org", ".id", ".co", ".xyz"];

export function NewDomain() {
    const [domain, setDomain] = useState("");
    const [selectedTld, setSelectedTld] = useState(".com");
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-800">
                Find your domain name<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
                <div className="relative flex flex-1">
                    <Input
                        placeholder="findyourdomain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="rounded-full text-gray-900 bg-gray-100 px-4 pr-20 focus:ring-2 focus:ring-blue-500"
                    />
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <button
                                className={cn(
                                    "absolute inset-y-0 right-0 flex items-center px-3 rounded-r-full bg-gray-100 border-l border-gray-300 text-black font-semibold"
                                )}
                            >
                                {selectedTld} <ChevronDown className="ml-1 w-4 h-4 text-gray-500" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-24">
                            <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {tlds.map((item, index) => (
                                            <CommandItem
                                                key={index}
                                                value={item}
                                                onSelect={(currentValue) => {
                                                    setSelectedTld(currentValue === selectedTld ? "" : currentValue);
                                                    setOpen(false)
                                                }}
                                            >
                                                {item}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        selectedTld === item ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button className="bg-gradient-to-b from-blue-500 to-green-400 text-white font-bold rounded-full px-6 py-2 text-lg shadow-md hover:from-purple-400 hover:to-blue-500">
                    Search
                </Button>
            </div>
        </div>
    );
}
