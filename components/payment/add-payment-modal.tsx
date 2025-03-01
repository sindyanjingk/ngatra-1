"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/components/modal/provider";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";


export default function AddPaymentModal() {
    const modal = useModal();

    const [data, setData] = useState({
        name: "",
        subdomain: "",
        description: "",
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            subdomain: prev.name
                .toLowerCase()
                .trim()
                .replace(/[\W_]+/g, "-"),
        }));
    }, [data.name]);

    const [selectedPayment, setSelectedPayment] = useState(false)
    return (
        <form
            action={async (data: FormData) => {

            }
                // createSite(data).then((res: any) => {
                //   if (res.error) {
                //     toast.error(res.error);
                //   } else {
                //     va.track("Created Site");
                //     const { id } = res;
                //     router.refresh();
                //     router.push(`/site/${id}`);
                //     modal?.hide();
                //     toast.success(`Successfully created site!`);
                //   }
                // })
            }
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700 font-semibold text-md text-gray-600 dark:text-gray-400"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    {selectedPayment ? `Setting Payment System` : `Add Payment System`}
                </div>
                {
                    selectedPayment ?
                        <div className="flex flex-col">
                            <h5 className="">Add Server Key from Payment System</h5>
                            <div className="flex flex-col gap-y-2 mt-4">
                                <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Input Server Key</label>
                                <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                            </div>
                            <h5 className="mt-4">Add links to payment system</h5>
                            <div className="flex flex-col gap-y-2 mt-4">
                                <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Webhook URL</label>
                                <Input value={`https://ngatrapanel.my.id/api/payments/midtrans/webhook`} readOnly className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text outline-none"/>
                            </div>
                        </div> :
                        <div className="flex flex-col gap-y-2 md:w-full">
                            <button onClick={() => setSelectedPayment(true)} className="flex items-center justify-between mt-4 p-2 rounded-md hover:shadow-md ">
                                <div className="flex items-center gap-x-2">
                                    <Image src={"/logo-midtrans.svg"} alt="midtrans" height={32} width={32} />
                                    <div className="font-semibold">Midtrans</div>
                                </div>
                                <ChevronRightIcon />
                            </button>
                        </div>
                }
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-2 rounded-b-lg border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <button
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    {selectedPayment ? "Save" : `Cancel`}
                </button>
            </div>
        </form>
    );
}

