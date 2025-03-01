"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

export default function OnboardingForm() {
    const router = useRouter();

    const [data, setData] = useState({
        name: "",
        subdomain: "",
        whatsapp: "",
        currency: "IDR", // Default currency
        description: "",
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
            <div className="w-full max-w-lg bg-[#0f172a] rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-semibold text-center mb-2">
                    Create a new Panel
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Input your panel essential information
                </p>

                <form
                    action={async () => {
                        try {
                            const response = await axios.post("/api/onboarding", data);
                        if (response.status === 200) {
                            toast.success("Panel Created Successfully");
                            router.push("/");
                        } else {
                            toast.error(response.data.message);
                        }
                        } catch (error:any) {
                            console.log({error});
                            
                            toast.error(error.response?.data?.message);
                        }
                    }}
                    className="space-y-6"
                >
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Panel Name"
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* WhatsApp Input */}
                    <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
                            WhatsApp number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-lg border border-gray-600 bg-gray-800 text-sm text-gray-400">
                                +62
                            </span>
                            <input
                                id="whatsapp"
                                name="whatsapp"
                                type="number"
                                placeholder="Phone number"
                                value={data.whatsapp}
                                onChange={(e) =>
                                    setData({ ...data, whatsapp: e.target.value })
                                }
                                className="w-full rounded-r-lg border border-l-0 border-gray-600 bg-gray-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Currency Dropdown */}
                    <div>
                        <label htmlFor="currency" className="block text-sm font-medium mb-1">
                            Currency <span className="text-red-500">*</span>
                        </label>
                        <Select onValueChange={e => {
                            setData({ ...data, currency: e })
                        }}>
                            <SelectTrigger className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="IDR">IDR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Panel Link */}
                    <div>
                        <label
                            htmlFor="subdomain"
                            className="block text-sm font-medium mb-1"
                        >
                            Panel link <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                            <input
                                id="subdomain"
                                name="subdomain"
                                type="text"
                                placeholder="subdomain"
                                value={data.subdomain}
                                onChange={(e) =>
                                    setData({ ...data, subdomain: e.target.value })
                                }
                                autoCapitalize="off"
                                pattern="[a-zA-Z0-9\-]+"
                                className="w-full rounded-l-lg border border-gray-600 bg-gray-800 px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                required
                            />
                            <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-600 bg-gray-800 text-sm text-gray-400">
                                .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <FormButton />
                    </div>
                </form>
            </div>
        </div>
    );
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            {pending ? <Loader2Icon className="animate-spin" /> : "Create"}
        </button>
    );
}
