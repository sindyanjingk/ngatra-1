import DropdownLanguage from "@/components/home/dropdown-language"
import GetStarted from "@/components/home/get-started"
import NavbarHome from "@/components/home/navbar-home"
import TabsComponent from "@/components/home/tabs-components"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const DashboardPage = async (props: Props) => {
  const session = await getServerSession(authOptions)
  if (session && session.user) {
    const data = await prisma.sites.findFirst({
      where: {
        userId: session.user.id
      }
    })
    if (!data) {
      redirect("/onboarding")
    } else {
      redirect(`/site/${data.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black md:p-12 flex flex-col items-center justify-start space-y-3">
      <NavbarHome/>
      <DropdownLanguage/>
      <GetStarted/>
      <div className="h-28"></div>
      <TabsComponent/>
    </div>
  )
}

export default DashboardPage