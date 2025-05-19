
import * as React from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LucideHome } from "lucide-react"

export function SidebarLogo({ name }: { name: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-sidebar-primary-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <LucideHome className="size-5" />
          </div>
          <span className="ml-2 font-semibold text-sm">{name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
