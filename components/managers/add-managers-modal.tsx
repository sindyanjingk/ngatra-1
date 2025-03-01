"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { Loader2Icon, EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import axios from "axios";

type FormValues = {
    email: string;
    username: string;
    password: string;
    roles: string[];
};

export default function AddManagersModal({ siteId }: { siteId: string }) {
    const modal = useModal();
    const { register, handleSubmit, control } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/managers`, {
                email: data.email,
                username: data.username,
                password: data.password,
                role: data.roles[0],
                siteId
            });
            if (response.status === 200) {
                toast.success("Manager added successfully");
                window.location.reload()
                modal?.hide();
            }
        } catch (error) {
            console.log({ error });
            toast.error("Failed to add manager");
        }
        setIsLoading(false)
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg mt-12 rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400 max-h-[84vh] overflow-y-auto"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    Add Managers
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Email</label>
                        <Input {...register("email")} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Username</label>
                        <Input {...register("username")} className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                    </div>
                    <div className="flex flex-col gap-y-2 relative">
                        <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Password</label>
                        <Input {...register("password")} className="font-semibold text-md text-gray-600 dark:text-gray-400 pr-10" type={showPassword ? "text" : "password"} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500">
                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                    </div>
                    <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Role</h5>
                    {roles.map((role) => (
                        <div key={role.name} className="border p-4 rounded-lg hover:bg-blue-50 cursor-pointer hover:shadow-md">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-x-2">
                                        <Controller
                                            name="roles"
                                            control={control}
                                            defaultValue={[]} // Menetapkan default value agar tidak undefined
                                            render={({ field }) => {
                                                const selectedRoles = field.value ?? []; // Pastikan selalu berupa array

                                                return (
                                                    <Checkbox
                                                        checked={selectedRoles.includes(role.name)}
                                                        onCheckedChange={(checked) => {
                                                            const newRoles = checked
                                                                ? [...selectedRoles, role.name]
                                                                : selectedRoles.filter(r => r !== role.name);

                                                            field.onChange(newRoles);
                                                        }}
                                                    />
                                                );
                                            }}
                                        />
                                        <div className="text-md">{role.name}</div>
                                    </div>
                                    <div className="text-md">{role.description}</div>
                                </div>
                                <Image src={role.image} alt={role.name} height={72} width={72} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {`Cancel`}
                </button>
                <AddManagerButton isLoading={isLoading} />
            </div>
        </form>
    );
}

const roles = [
    { name: "Admin", description: "Same rights as main account", image: "/admin-role.png" },
    { name: "Moderator", description: "Can't see balance, providers, and panel settings. Can work with orders, edit services, and answer support.", image: "/moderator-role.png" },
    { name: "Agent", description: "Can only answer support, see orders and services but can't edit. Doesn't see providers and panel settings.", image: "/agent-role.png" }
];

function AddManagerButton({ isLoading }: { isLoading?: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Save"}
        </Button>
    );
}
