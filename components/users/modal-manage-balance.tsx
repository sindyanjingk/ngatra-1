"use client";

import { useModal } from "@/components/modal/provider";
import { Input } from "../ui/input";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { CircleMinusIcon, CirclePlusIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { addBalanceAction, removeBalanceAction, updateUserAction, } from "../../lib/action";
import { TUsers } from "@/app/app/(dashboard)/site/[id]/users/page";
import { Button } from "../ui/button";
import { formatIDR } from "@/lib/helpers";
import { useState } from "react";



export default function ModalManageBalance({ users }: { users: TUsers }) {
    const modal = useModal();
    const [balance, setBalance] = useState(users.user.balance || 0);

    return (
        <div
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col items-center justify-center space-y-4 p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Manage Balance
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatIDR(users.user.balance || 0)}</p>
                <div className="flex items-end gap-x-4">
                    <div className="space-y-3">
                        <label htmlFor="balance" className="text-sm font-medium text-gray-700 dark:text-gray-200">Enter Amount</label>
                        <Input onChange={e => {
                            setBalance(parseInt(e.target.value))
                        }} name="balance" id="balance" type="number" placeholder="Enter Amount" />
                    </div>
                    <form action={async (data: FormData) => {
                        const response = await addBalanceAction(balance, users)
                        if (response.status) {
                            toast.success(response.message)
                            modal?.hide()
                            window.location.reload()
                        } else {
                            toast.error(response.message)
                        }
                    }}>
                        <Button type="submit" className={cn("flex items-center justify-center gap-x-2")}>
                            <CirclePlusIcon className="mr-2 h-4 w-4" />
                            <span>Add</span>
                        </Button>
                    </form>
                    <form action={async (data: FormData) => {
                        const response = await removeBalanceAction(balance, users)
                        if (response.status) {
                            toast.success(response.message)
                            modal?.hide()
                            window.location.reload()
                        } else {
                            toast.error(response.message)
                        }
                    }}>
                        <Button>
                            <CircleMinusIcon className="mr-2 h-4 w-4" />
                            <span>Remove</span>
                        </Button>
                    </form>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>

        </div>
    );
}


function CreateCategoryButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className={cn(
                "flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition",
                pending
                    ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            )}
            disabled={pending}
        >
            {pending ? <Loader2Icon className="animate-spin" size={18} /> : "Update"}
        </button>
    );
}
