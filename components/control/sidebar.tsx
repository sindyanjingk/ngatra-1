"use client";

import Link from "next/link";
import {
    ArrowLeft,
    BarChart3,
    Settings,
    DollarSign,
    PhoneCall,
    CreditCard,
    UserCircle2,
    FolderClosed,
    BadgeDollarSignIcon,
    ChevronRightIcon,
    Wallet,
    Sparkles,
    Users,
    Layers,
    BellDotIcon,
} from "lucide-react";
import { useParams, usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LogoutButton from "./logout/logout-button";
import LogoutModal from "./logout/logout-modal";

const externalLinks = [
    {
        name: "Contact Support",
        href: "https://wa.me/6281315805251",
        icon: <PhoneCall width={18} />,
    },
];

export default function Sidebar() {
    const segments = useSelectedLayoutSegments();
    const pathname = usePathname();
    const { id } = useParams() as { id?: string };
    const tabs = useMemo(() => {
        if (segments[0] === "site" && id) {
            return [
                {
                    name: "Back to All Sites",
                    href: "/sites",
                    icon: <ArrowLeft width={18} />,
                },
                {
                    name: "Provider",
                    href: `/site/${id}/provider`,
                    isActive: segments.includes("provider"),
                    icon: <FolderClosed width={18} className="text-purple-500 shadow-md" />
                },
                {
                    name: "Payment Method",
                    href: `/site/${id}/payment`,
                    isActive: segments.includes("payment"),
                    icon: <BadgeDollarSignIcon width={18} className="text-green-500 shadow-md" />
                },
                {
                    name: "Analytics",
                    href: `/site/${id}/analytics`,
                    isActive: segments.includes("analytics"),
                    icon: <BarChart3 width={18} />,
                },
                {
                    name: "Site Settings",
                    href: `/site/${id}/settings`,
                    isActive: segments.includes("settings"),
                    icon: <Settings width={18} />,
                },
                {
                    name: "Payment Method",
                    href: `/site/${id}/paymentMethod`,
                    isActive: segments.includes("paymentMethod"),
                    icon: <CreditCard width={18} />,
                },
                {
                    name: "Vendor",
                    href: `/site/${id}/vendor`,
                    isActive: segments.includes("vendor"),
                    icon: <UserCircle2 width={18} />,
                },
                {
                    name: "Transactions",
                    href: `/site/${id}/transactions`,
                    isActive: segments.includes("transactions"),
                    icon: <DollarSign width={18} />,
                },
            ];
        }
        return [
            {
                name: "General Settings",
                href: `/site/${id}/control/settings`,
                isActive: segments[0] === "settings",
                icon: <Settings width={18} />,
            },
            {
                name: "Providers",
                href: `/site/${id}/control/providers`,
                isActive: segments[0] === "providers",
                icon: <FolderClosed width={18} />,
            },
            {
                name: "Payment Methods",
                href: `/site/${id}/control/payments`,
                isActive: segments[0] === "payments",
                icon: <Wallet width={18} />,
            },
            {
                name: "Design",
                href: `/site/${id}/control/design`,
                isActive: segments[0] === "design",
                icon: <Sparkles width={18} />
            },

            {
                name: "Managers",
                href: `/site/${id}/control/managers`,
                isActive: segments[0] === "managers",
                icon: <Users width={18} />,
            },
            {
                name: "Language",
                href: `/site/${id}/control/language`,
                isActive: segments[0] === "language",
                icon: <DollarSign width={18} />,
            },
            {
                name: "Integrations",
                href: `/site/${id}/control/integrations`,
                isActive: segments[0] === "integrations",
                icon: <Layers width={18} />,
            },
            {
                name: "Notification",
                href: `/site/${id}/control/notification`,
                isActive: segments[0] === "notification",
                icon: <BellDotIcon width={18} />,
            }
        ];
    }, [segments]);

    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        setShowSidebar(false); // Hide sidebar on path change
    }, [pathname]);

    return (
        <div className="md:w-1/5 h-[14rem]">
            <div className="flex flex-col gap-y-4 justify-between h-full">
                <div>
                    <div className="space-y-1 flex flex-col gap-y-4">
                        {tabs.map(({ name, href, isActive, icon }) => (
                            <Link
                                key={name}
                                href={href}
                                className={`flex text-md font-semibold items-center justify-between space-x-3 px-3 py-2 rounded-md transition-all text-black hover:bg-gray-800 hover:text-white ${isActive
                                    ? "bg-gray-100 shadow-md"
                                    : "hover:bg-gray-800 hover:text-white"
                                    }`}>
                                <div className="flex items-center gap-x-4">
                                    {icon}
                                    <span className="text-md font-semibold">{name}</span>
                                </div>
                                <ChevronRightIcon />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    {externalLinks.map(({ name, href, icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-md transition-all text-black hover:bg-gray-800 hover:text-white hover:text-white"
                                }`}>
                            <div className="flex items-center space-x-3">
                                {icon}
                                <span className="text-md font-semibold">{name}</span>
                            </div>
                            <ChevronRightIcon />
                        </a>
                    ))}
                </div>
                <div className="cursor-pointer">
                    <LogoutButton>
                        <LogoutModal />
                    </LogoutButton>
                </div>
                {/* <div className="space-y-1">
                    <div
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-md transition-all text-black hover:bg-gray-800 hover:text-white hover:text-white"
                                }`}>
                        <div className="flex items-center space-x-3">
                            <LogOut/>
                            <span className="text-md font-semibold">Logout</span>
                        </div>
                        <ChevronRightIcon />
                    </div>
                </div> */}
            </div>
        </div>
    );
}
