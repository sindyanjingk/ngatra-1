import SiteNavbar from '@/components/site/navbar'
import prisma from '@/lib/prisma';
import React from 'react'

const BlogSite = async ({
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
  const siteDesigns = await prisma.siteDesigns.findFirst({
    where: {
      siteId: site?.id
    }
  })
  return (
    <div className='bg-gradient-to-br min-h-screen from-green-300 via-blue-300 to-blue-500'>
      <SiteNavbar logo={siteDesigns?.logo! || ""} />
    </div>
  )
}

export default BlogSite