import LoginUserSiteForm from '@/components/form/login-user-site-form'
import prisma from '../../../../lib/prisma'
import React from 'react'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'


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
    // const session = await getSession()
    // if(session){
    //   redirect("dashboard")
    // }
  return (
    <LoginUserSiteForm siteId={site?.id || ''} />
  )
}

export default LoginPage