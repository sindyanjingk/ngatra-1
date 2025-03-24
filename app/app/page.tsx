import { getServerSession } from "next-auth/next"
import prisma from '../../lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from "../../lib/auth"
import NavbarHome from "../../components/home/navbar-home"
import DropdownLanguage from "../../components/home/dropdown-language"
import GetStarted from "../../components/home/get-started"
import TabsComponent from "../../components/home/tabs-components"

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