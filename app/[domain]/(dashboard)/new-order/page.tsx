import SidebarHeader from '@/components/dashboard-user/sidebar-header';
import OrderForm from '@/components/form/order-form'
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma'
import { Sparkle, SparkleIcon, Sparkles } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

const OrderSite = async ({
  params,
}: {
  params: { domain: string; slug: string };
}) => {
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
  const services = await prisma.siteServices.findMany({
    where: {
      siteId: site?.id,
      isEnabled: true
    },
    include: {
      category: true,
      provider: true,
      site: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  const session = await getSession();
  const userSite = await prisma.userSite.findFirst({
    where: {
      userId: session?.user.id
    },
    include: {
      user: true
    }
  })
  const user = userSite?.user
  if(!user){
    redirect('login')
  }
  return (
    <div className='text-black'>
      <SidebarHeader title='New Order' />
      <div className="text-md rounded-lg flex items-center gap-x-2">{user.discount && `Congratulations, you have ${user.discount}% discount`}<Sparkles className='text-yellow-500'/> </div>
      <OrderForm discount={user.discount || 0} user={user} siteServices={services} />
    </div>
  )
}
export default OrderSite