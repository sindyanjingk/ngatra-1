import { Service } from '@/components/order/form-order'
import ServicesAccordion from '@/components/table/service-accordion'
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
  const pageSize = 10;  

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

  const newCategories = services.map(item=>item.category).filter((category): category is NonNullable<typeof category> => category !== null);
  
  const data = services.map(item=>({
    category : item.category?.category_name,
    data : item
  }))

  const groupedMap = data.reduce((acc, item) => {
    const existing = acc.get(item.category!);
    if (existing) {
      existing.push(item.data);
    } else {
      acc.set(item.category!, [item.data]);
    }
    return acc;
  }, new Map<string, any[]>());
  
  const result = Array.from(groupedMap.entries()).map(([category, data]) => ({
    category,
    data,
  }));
  
  
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
    // <ServicesTable result={result} categories={categories} providers={providers} siteId={params.id} p={1} services={services} />
      <ServicesAccordion result={result}  categories={newCategories} providers={providers} siteId={params.id} />
  )
}
export default ServicesPage