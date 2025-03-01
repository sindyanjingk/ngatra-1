"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "../modal/provider";

export default function DomainSettingsModal() {
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

    const [showDnsSetting, setShowDnsSetting] = useState(false)
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
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {showDnsSetting ? `DNS Settings` : `Domain Setting`}
                </h2>
                {
                    showDnsSetting ?
                        <div className="flex flex-col">
                            <h5 className="text-center">For the domain to work properly you need
                                to add Ngatra DNS servers</h5>
                            <div className="border-b pb-4 flex items-start mt-8">
                                <h4>1. Go to the domain settings in domain service cabinet</h4>
                            </div>
                            <div className="border-b pb-4 flex items-start mt-2">
                                <h4>2. Find your DNS servers settings</h4>
                            </div>
                            <div className="border-b pb-4 flex flex-col gap-y-2 items-start mt-2">
                                <h4>3. Enter both DNS servers listed below</h4>
                                <div className="p-2 px-4 rounded-md border w-full">ns1.spnel.com</div>
                                <div className="p-2 px-4 rounded-md border w-full">ns1.spnel.com</div>
                            </div>
                        </div> :
                        <div className="flex flex-col gap-y-2 md:w-full">
                            <label className="font-semibold text-md text-gray-600 dark:text-gray-400">Enter your domain to connected with this panel</label>
                            <div className="flex items-center gap-x-2">
                                <Input className="font-semibold text-md text-gray-600 dark:text-gray-400" type="text" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDnsSetting(true)
                                    }}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                                >
                                    Next
                                </button>
                            </div>
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
                    {showDnsSetting ? "Done" : `Cancel`}
                </button>
            </div>
        </form>
    );
}

