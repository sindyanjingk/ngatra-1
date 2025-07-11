import RegisterUserSiteForm from '@/components/form/reg-user-site-form'
import prisma from '../../../../lib/prisma'
import React from 'react'

type Props = {
  params : {
    domain : string
  }
}

const RegisterPage = async ({params}: Props) => {
  const domain = decodeURIComponent(params.domain);
  const site = await prisma.sites.findFirst({
      where: {
          OR: [
              {
                  subdomain: domain.split('.')[0]
              },
              {
                  customDomain: domain.split(':')[0]
              }
          ]
      }
  })   
  return (
    <RegisterUserSiteForm siteId={site?.id || ''} />
  )
}

export default RegisterPage