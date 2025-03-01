import OrderForm from '@/components/form/order-form'
import prisma from '@/lib/prisma'
import React from 'react'

const OrderSite = async ({
  params,
}: {
  params: { domain: string; slug: string };
}) => {
  const domain = params.domain.split('.')[0];
  const site = await prisma.sites.findFirst({
    where: {
      subdomain: domain
    }
  })
  const services = await prisma.siteServices.findMany({
    where: {
      siteId: site?.id
    },
    include: {
      category: true,
      provider: true,
      site: true
    }
  });
  return (
    <div className='flex items-center justify-center bg-white min-h-screen'>
      <OrderForm siteServices={services}/>
    </div>
  )
}
export default OrderSite