"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    console.log({children});
    const [token, setToken] = useState("")
    const router = useRouter()
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            if(!token){
                router.push(`/`)
            }
            setToken(token || "")
        }
    }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 md:p-4 pt-0">
          {children}
        </div>
      </SidebarInset> */}
      <SidebarInset className="p-4">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
