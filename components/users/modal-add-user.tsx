"use client";

import { useModal } from "@/components/modal/provider";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

type FormValues = {
    name: string;
    email: string;
    password: string;
};

export default function ModalAddUser({ siteId }: { siteId: string }) {
    const modal = useModal();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>();
    console.log({siteId});
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post('/api/user-site-register', {
                username: data.name,
                email: data.email,
                password: data.password,
                siteId
            })
            if(response.status === 200){
                toast.success("User added successfully!");
                reset();
                modal?.hide();
                window.location?.reload();
            }
        } catch (error) {
            toast.error("Failed to add user.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            <div className="space-y-4 p-6">
                <div>
                    <label className="block mb-1">Name</label>
                    <Input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <Input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Password</label>
                    <Input
                        {...register("password", { required: "password is required" })}
                        placeholder="password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={() => {
                        modal?.hide();
                        reset();
                    }}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        "flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
                        isSubmitting
                            ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                            : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    )}
                >
                    {isSubmitting ? (
                        <Loader2Icon className="animate-spin" size={18} />
                    ) : (
                        "Create"
                    )}
                </button>
            </div>
        </form>
    );
}
