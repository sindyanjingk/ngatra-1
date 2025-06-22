"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { ChevronRightIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

type PaymentFormValues = {
    serverKey: string;
    clientKey: string
};

export default function DeletePaymentModal({
    paymentId
}: {
    paymentId : string
}) {
    const modal = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PaymentFormValues>({
        defaultValues: {

        }
    });

    const onSubmit = async (data: PaymentFormValues) => {
        try {
            const response = await axios.post(`/api/delete-payment-method`, {
                paymentId
            });
            console.log("Saved:", response.data);
            toast.success("Success change credentials")
            modal?.hide?.();
        } catch (error) {
            console.error("Failed to submit payment method", error);
            toast.error("Something went wrong, try again")
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    Are you sure want to delete this payment method?
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
                <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    {
                        isSubmitting ?
                            <Loader2Icon className="animate-spin" /> :
                            "Save"
                    }
                </button>
            </div>
        </form>
    );
}
