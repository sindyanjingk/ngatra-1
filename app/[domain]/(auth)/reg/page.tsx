import RegisterUserSiteForm from '@/components/form/reg-user-site-form'
import prisma from '../../../../lib/prisma'
import React from 'react'

type Props = {
  params : {
    domain : string
  }
}

const RegisterPage = async ({params}: Props) => {
  const domain = params.domain.split('.')[0];
  const site = await prisma.sites.findFirst({
      where: {
          subdomain: domain
      }
  })
  return (
    <RegisterUserSiteForm siteId={site?.id || ''} />
  )
}

export default RegisterPage