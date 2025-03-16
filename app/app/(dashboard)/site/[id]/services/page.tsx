import ServicesTable from '@/components/table/service-table'
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

const ServicesPage = async ({ params, searchParams }: Props) => {

  const { search } = searchParams
  console.log({ search });
  const where : Prisma.siteServicesWhereInput = {}
  if(search){
    where.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ]
  }
  where.AND = {
    siteId: params.id,
  }

  const services = await prisma.siteServices.findMany({
    where,
    include: {
      provider: true,
      category: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const providers = await prisma.siteProviders.findMany({
    where: {
      siteId: params.id
    },
    include: {
      site: true
    }
  })

  const categories = await prisma.category.findMany({
    where: {
      siteId: params.id
    }
  })

  return (
    <ServicesTable categories={categories} providers={providers} siteId={params.id} p={1} services={services} />
  )
}
export default ServicesPage