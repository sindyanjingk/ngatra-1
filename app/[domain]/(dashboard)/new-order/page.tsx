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
      siteId: site?.id,
      isEnabled : true
    },
    include: {
      category: true,
      provider: true,
      site: true
    },
    orderBy : {
      createdAt: 'desc'
    }
  });
  return (
    <div className=''>
      <OrderForm siteServices={services}/>
    </div>
  )
}
export default OrderSite