
import SidebarHeader from '@/components/dashboard-user/sidebar-header'
import AddFundsForm from '@/components/form/add-funds-form'
import prisma from '@/lib/prisma';
import React from 'react'

type Props = {
    params: { domain: string; slug: string };
}

const AddFunds = async ({params}: Props) => {
  const domain = decodeURIComponent(params.domain);
    const site = await prisma.sites.findFirst({
    where: {
      OR: [
        {
          customDomain: domain.split(":")[0],
        },
        {
          subdomain: domain.split(".")[0],
        }
      ]
    }
  })
  return (
    <div className='text-gray-800'>
      <SidebarHeader title='Add Funds' />
      <AddFundsForm siteId={site?.id || ""}/>
    </div>
  )
}

export default AddFunds