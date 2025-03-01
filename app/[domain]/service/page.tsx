import CategoorySelect from '@/components/services/category-select'
import SiteNavbar from '@/components/site/navbar'
import prisma from '@/lib/prisma'
import React from 'react'

const ServiceSite = async ({
  params,
}: {
  params: { domain: string; slug: string };
}) => {
  const domain = params.domain.split('.')[0];
  const site = await prisma.sites.findFirst({
    where: {
      subdomain: domain
    }
  });

  const siteDesigns = await prisma.siteDesigns.findFirst({
    where: {
      siteId: site?.id
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

  const categoryServices = Object.values(
    services.reduce((acc, item) => {
      const categoryName = item.category?.category_name || "Uncategorized";

      if (!acc[categoryName]) {
        acc[categoryName] = {
          categoryName,
          services: [],
        };
      }

      acc[categoryName].services.push(item);
      return acc;
    }, {} as Record<string, { categoryName: string; services: typeof services }>)
  );

  return (
    <div className=''>
      <SiteNavbar logo={siteDesigns?.logo! || ""} />
      <div className="md:px-20 md:py-10 p-4">
        <CategoorySelect services={services}/>
      </div>
    </div>
  )
}

export default ServiceSite
