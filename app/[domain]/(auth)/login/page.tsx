import LoginUserSiteForm from '@/components/form/login-user-site-form'
import prisma from '../../../../lib/prisma'
import React from 'react'


type Props = {
  params: {
    domain: string
  }
}

const LoginPage = async ({ params }: Props) => {
  const domain = params.domain.split('.')[0];
  const site = await prisma.sites.findFirst({
    where: {
      subdomain: domain
    }
  })
  return (
    <LoginUserSiteForm siteId={site?.id || ''} />
  )
}

export default LoginPage