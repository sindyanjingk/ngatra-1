import OrderTable from '@/components/table/order-table'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import React from 'react'

type Props = {
  params: {
    id: string
  },
  searchParams:
  { [key: string]: string | undefined }
}

const OrdersPage = async ({ params, searchParams }: Props) => {
  const { page, search, status } = searchParams
  const where: (Prisma.transactionWhereInput) = {};

  if(status !== "All") {
    where.status = status
  }

  where.siteId = params.id
  where.name = "ORDER"

  const transaction = await prisma.transaction.findMany({
    where,
    include : {
      siteService : {
        include : {
          provider : true
        }
      },
      user : true,
      sites : true
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const p = page ? +page : 1
  return (
    <OrderTable transactions={transaction}/>
  )
}

export default OrdersPage