import APIDocsPage from '@/components/apidocs/ApiDocPage';
import prisma from '@/lib/prisma';
import React from 'react'

type Props = {
  params: { domain: string; slug: string };
}

const ApiPage = async ({ params }: Props) => {
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
    <div>
      <APIDocsPage domain={site?.customDomain || site?.customDomain || ""} />
    </div>
  )
}

export default ApiPage