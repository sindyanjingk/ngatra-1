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

  const { page, search, categoryId } = searchParams;
  const where: Prisma.siteServicesWhereInput = { AND: [] };

  const andConditions: Prisma.siteServicesWhereInput[] = [];
  
  if (search) {
      andConditions.push({
          OR: [
              {
                  name: {
                      contains: search,
                      mode: "insensitive",
                  },
              },
          ],
      });
  }
  
  if (categoryId && categoryId !== "all") {
      andConditions.push({
          categoryId: categoryId,
      });
  }
  
  andConditions.push({
      siteId: params.id,
  });
  
  where.AND = andConditions.length > 0 ? andConditions : undefined;

  const p = page ? +page : 1;
  const pageSize = 10;  // Tentukan jumlah item per halaman

  // Hitung jumlah total data
  const totalServices = await prisma.siteServices.count({
    where,
  });

  const services = await prisma.siteServices.findMany({
    where,
    include: {
      provider: true,
      category: true
    },
    orderBy: {
      category : {
        category_name: 'asc'
      }
    },
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