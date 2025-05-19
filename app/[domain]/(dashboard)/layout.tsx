import { AppSidebar } from "@/components/dashboard-user/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function Layout({ children, params }: { children: React.ReactNode, params: { domain: string }; }) {
  const domain = decodeURIComponent(params.domain);
  const data = await prisma.sites.findFirst({
    where: {
      OR: [
        {
          customDomain: domain.split(":")[0],
        },
        {
          subdomain: domain.split(".")[0],
        }
      ]
    },
  });
  const session = await getSession();
  if (!session) {
    redirect("login")
  }
  const user = await prisma.userSite.findFirst({
    where : {
      id : session.user.id,
    },
    include : {
      user : true
    }
  })
  if(!user) {
    redirect("login")
  }
  return (
    <SidebarProvider>
      <AppSidebar user={user.user} logo={data?.image || ""} name={data?.name || ""} />
      <SidebarInset className="p-4">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
