"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModal } from "../modal/provider";

export default function ServiceSettingModal() {
    const router = useRouter();
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
            className="w-full max-w-lg rounded-lg bg-white shadow-md dark:bg-gray-900 md:border md:border-gray-200 md:shadow-lg dark:md:border-gray-700"
        >
            {/* Form Header */}
            <div className="flex flex-col space-y-4 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Service Settings
                </h2>
                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Cancel failed orders automaticly</div>
                    <Switch />
                </div>
                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Average completion time feature</div>
                    <Switch className="[&[data-state=checked]]:bg-green-700"/>
                </div>

                <div className="border p-4 rounded-full flex items-center justify-between">
                    <div className="font-semibold text-md text-gray-600 dark:text-gray-400">Price rounding</div>
                    <Select>
                        <SelectTrigger className="w-[180px] font-semibold text-md text-gray-600 dark:text-gray-400">
                            <SelectValue className="font-semibold text-md text-gray-600 dark:text-gray-400" placeholder="Select a rounding" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="font-semibold text-md text-gray-600 dark:text-gray-400">{`Ones (1)`}</SelectLabel>
                                <SelectItem value="apple">{`Tenths (1.1)`}</SelectItem>
                                <SelectItem value="banana">{`Hundred (1.11)`}</SelectItem>
                                <SelectItem value="blueberry">{`Tousandth (1.111)`}</SelectItem>
                                <SelectItem value="grapes">{`Ten-Tousandth (1.1111)`}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
                    <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show API page</h5>
                        </div>
                        <Switch/>
                    </div>
                    <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show multiple order page </h5>
                        </div>
                        <Switch />
                    </div>
                    <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-semibold text-md text-gray-600 dark:text-gray-400">Show services page </h5>
                        </div>
                        <Switch />
                    </div>
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
                    type="button"
                    onClick={modal?.hide}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-600 bg-gray-800 text-white dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

