"use client"

import * as React from "react"
import {
  ArrowLeftFromLineIcon,
  BadgeDollarSignIcon,
  Code2Icon,
  CopyIcon,
  LayoutDashboard,
  ShoppingBag,
  UserCircle2Icon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {

}

export function AppSidebar({  ...props }: AppSidebarProps) {
  const data = {
    user: {
      name:  "",
      email:  "",
      avatar:  "",
    },
    navMain:
      [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title : "New Order",
          url : "/new-order",
          icon : ShoppingBag
        },
        {
          title : "Orders",
          url : "/orders",
          icon : CopyIcon
        },
        {
          title : "Add Funds",
          url : "/add-funds",
          icon : BadgeDollarSignIcon
        },
        {
          title : "Refunds",
          url : "/refunds",
          icon : ArrowLeftFromLineIcon
        },
        {
          title : "Profile",
          url : "/profile",
          icon : UserCircle2Icon
        },
        {
          title : "API",
          url : "/api",
          icon : Code2Icon
        },
      ]
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
        {/* <div className="flex items-center gap-x-4">
          <Image src={"/logo.png"} alt="logo" height={40} width={40} className="rounded-full" />
          <div className="text-xl font-bold">LMS MA'ARIF</div>
        </div> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
