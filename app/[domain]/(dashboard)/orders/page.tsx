import OrderTable from '@/components/table/order-table';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import React from 'react'

type Props = {}

const Orders = async ({
  params,
  searchParams
}: {
  params: { domain: string; slug: string };
  searchParams:
  { [key: string]: string | undefined }
}) => {
  const domain = params.domain.split('.')[0];
  const site = await prisma.sites.findFirst({
    where: {
      subdomain: domain
    }
  })

  const { page, search, status } = searchParams
  const where: (Prisma.transactionWhereInput) = {};

  if (status !== "All") {
    where.status = status
  }

  where.siteId = site?.id
  where.name = "ORDER"

  const transaction = await prisma.transaction.findMany({
    where,
    include: {
      siteService: {
        include: {
          provider: true
        }
      },
      user: true,
      sites: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  return (
    <div className='text-gray-800'>
      <OrderTable transactions={transaction} />
    </div>
  )
}

export default Orders