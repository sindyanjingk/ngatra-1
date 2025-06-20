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

export default function AddPaymentModal({ siteId }: { siteId: string }) {
    const modal = useModal();
    const [selectedPayment, setSelectedPayment] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PaymentFormValues>();

    const onSubmit = async (data: PaymentFormValues) => {
        try {
            const response = await axios.post(`/api/add-payment-method`, {
                siteId,
                serverKey: data.serverKey,
                clientKey: data.clientKey
            });
            console.log("Saved:", response.data);
            toast.success("Success add payment method")
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
                    {selectedPayment ? `Setting Payment System` : `Add Payment System`}
                </div>

                {selectedPayment ? (
                    <div className="flex flex-col">
                        <h5>Add Server Key from Payment System</h5>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">
                                Input Server Key
                            </label>
                            <Input
                                {...register("serverKey", { required: "Server key is required" })}
                                className="font-semibold text-md text-gray-600 dark:text-gray-400"
                                type="text"
                            />
                            {errors.serverKey && (
                                <p className="text-red-500 text-sm">{errors.serverKey.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">
                                Input Client Key
                            </label>
                            <Input
                                {...register("clientKey", { required: "Client key is required" })}
                                className="font-semibold text-md text-gray-600 dark:text-gray-400"
                                type="text"
                            />
                            {errors.clientKey && (
                                <p className="text-red-500 text-sm">{errors.clientKey.message}</p>
                            )}
                        </div>

                        <h5 className="mt-4">Add links to payment system</h5>
                        <div className="flex flex-col gap-y-2 mt-4">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">
                                Webhook URL
                            </label>
                            <Input
                                value={`https://ngatrapanel.my.id/api/payments/midtrans/webhook`}
                                readOnly
                                className="font-semibold text-md text-gray-600 dark:text-gray-400"
                                type="text"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-2 md:w-full">
                        <button
                            type="button"
                            onClick={() => setSelectedPayment(true)}
                            className="flex items-center justify-between mt-4 p-2 rounded-md hover:shadow-md"
                        >
                            <div className="flex items-center gap-x-2">
                                <Image
                                    src={"/logo-midtrans.svg"}
                                    alt="midtrans"
                                    height={32}
                                    width={32}
                                />
                                <div className="font-semibold">Midtrans</div>
                            </div>
                            <ChevronRightIcon />
                        </button>
                    </div>
                )}
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
                {selectedPayment && (
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
                )}
            </div>
        </form>
    );
}
