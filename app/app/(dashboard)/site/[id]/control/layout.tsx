
import Sidebar from "@/components/control/sidebar";
import { ReactNode } from "react";

export default function ControlLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
    return (
        <div className="flex w-full min-h-screen gap-x-8 dark:text-white bg-white dark:bg-gray-800 text-black">
            <Sidebar />
            <div className="flex flex-col space-y-6 md:w-5/6 h-screen overflow-scroll">{children}</div>
        </div>
    );
}
