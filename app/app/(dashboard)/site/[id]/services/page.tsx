import ServicesTable from '@/components/table/service-table'
import prisma from '@/lib/prisma'
import React from 'react'

type Props = {
  params: {
    id: string
  },
  searchParams:
  { [key: string]: string | undefined }
}

const ServicesPage = async ({params}: Props) => {
  const services = await prisma.siteServices.findMany({
    where : {
      siteId : params.id
    },
    include : {
      provider : true
    }
  })

  const providers = await prisma.siteProviders.findMany({
    where : {
      siteId : params.id
    },
    include : {
      site : true
    }
  })

  return (
    <ServicesTable providers={providers} siteId={params.id} p={1} services={services} />
  )
}

export default ServicesPage