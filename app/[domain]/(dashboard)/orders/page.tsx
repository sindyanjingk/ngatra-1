import prisma from '@/lib/prisma';
import React from 'react'

type Props = {}

const Orders = async ({
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

  const transaction = await prisma.transaction.findMany({
    where : {
      siteId : site?.id
    }
  })
  return (
    <div>Orders</div>
  )
}

export default Orders