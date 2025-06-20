import AddFundsButton from '@/components/add-funds/add-funds-button'
import AddFundsModalUser from '@/components/add-funds/add-funds-modal-user'
import SidebarHeader from '@/components/dashboard-user/sidebar-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSession } from '@/lib/auth'
import { formatIDR } from '@/lib/helpers'
import prisma from '@/lib/prisma'
import { LucideBadgeDollarSign, ShoppingBasketIcon, UserCheck2Icon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async ({ params }: { params: { slug: string, domain: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("login")
  }
  const userSite = await prisma.userSite.findFirst({
    where: {
      userId: session.user.id
    },
    include: {
      user: true
    }
  })

  const domain = decodeURIComponent(params.domain);
  const site = await prisma.sites.findFirst({
    where: {
      OR: [
        {
          customDomain: domain.split(":")[0],
        },
        {
          subdomain: domain.split(".")[0],
        }
      ]
    }
  })
  return (
    <div className='text-black'>
      <SidebarHeader title='Dashboard' />
      <div className="grid grid-cols-4 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Hello 👋🏻</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <UserCheck2Icon className='text-xl' />
            <div className="text-xl font-semibold">
              {
                userSite?.user?.name || ""
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {
                formatIDR(userSite?.user?.spent || 0)
              }
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <LucideBadgeDollarSign className='text-xl' />
            <div className="text-xl font-semibold">Spent Balance</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {
                formatIDR(userSite?.user?.income || 0)
              }
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <ShoppingBasketIcon className='text-xl' />
            <div className="text-xl font-semibold">Income</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {
                formatIDR(userSite?.user?.balance || 0)
              }
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <AddFundsButton>
              <AddFundsModalUser siteId={site?.id || ""} />
            </AddFundsButton>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage