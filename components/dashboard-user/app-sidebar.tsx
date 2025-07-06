import * as React from "react"
import {
  Code2Icon,
  DollarSignIcon,
  DoorOpen,
  ListChecksIcon,
  PenSquare,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SidebarLogo } from "./sidebar-logo"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Prisma } from "@prisma/client"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  name: string;
  logo: string;
  user : Prisma.UserWhereInput
}

export async function AppSidebar({ name, user, logo, ...props }: AppSidebarProps) {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    redirect('/login')
  }

  const data = {
    navMain: (session as any)?.user?.role === "ADMIN" ? [
      {
        title: "Orders",
        url: "orders",
        icon: DoorOpen,
        isActive: true,
        items: [
          {
            title: "New Order",
            url: "new-order",
          },
        ],
      },
      {
        title: "Booking",
        url: "/dashboard/booking",
        icon: ListChecksIcon,
        isActive: false,
        items: [
          {
            title: "Booking Room",
            url: "/dashboard/booking",
          },
        ],
      },
    ] : [
      {
        title: "Orders",
        url: "orders",
        icon: PenSquare,
        isActive: true,
        items: [
          {
            title: "New Order",
            url: "new-order",
          },
          {
            title: "Order List",
            url: "order-list",
          }
        ],
      },
      {
        title: "Funds",
        url: "funds",
        icon: DollarSignIcon,
        isActive: false,
        items: [
          {
            title: "Add Funds",
            url: "add-funds",
          },
          {
            title: "Refunds",
            url: "refunds",
          },
          {
            title: "History",
            url: "history-funds",
          }
        ],
      },
      {
        title: "API",
        url: "api-page",
        icon: Code2Icon,
        isActive: false,
                items: [
          {
            title: "API Documentation",
            url: "api-page",
          },
        ],
      },
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo name={name} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}