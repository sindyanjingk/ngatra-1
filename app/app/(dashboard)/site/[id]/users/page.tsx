import UserTable from '@/components/table/user-table'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import React from 'react'

export type TUsers = Prisma.userSiteGetPayload<{ include: { user: true, site: true } }>

type Props = {
  params: {
    id: string
  },
  searchParams:
  { [key: string]: string | undefined }
}

const UserPage = async ({ params, searchParams }: Props) => {  
  const { page, search } = searchParams
  const where: (Prisma.userSiteWhereInput) = {};
  if (search) {
    where.AND = [
      {
        user: {
          name: {
            contains: search
          }
        }
      }
    ];
  }
  const users = await prisma.userSite.findMany({
    where: {
      ...where,
      siteId: params.id,
    },
    include: {
      site: true,
      user: true,
    }
  })

  const p = page ? +page : 1
  return (
    <UserTable users={users} p={p} />
  )
}

export default UserPage