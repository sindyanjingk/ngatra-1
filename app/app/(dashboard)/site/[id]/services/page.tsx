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

  const { search, categoryId } = searchParams;
  const where: Prisma.siteServicesWhereInput = { AND: [] };
  
  // Pastikan AND adalah array sebelum menambahkan kondisi
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
  
  // Tambahkan filter categoryId jika bukan "all"
  if (categoryId && categoryId !== "all") {
      andConditions.push({
          categoryId: categoryId,
      });
  }
  
  // Tambahkan siteId sebagai filter utama
  andConditions.push({
      siteId: params.id,
  });
  
  // Masukkan semua kondisi ke dalam where.AND
  where.AND = andConditions.length > 0 ? andConditions : undefined;

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