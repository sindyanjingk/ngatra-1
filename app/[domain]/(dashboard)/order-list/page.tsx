import SidebarHeader from '@/components/dashboard-user/sidebar-header';
import OrderTableUser from '@/components/table/order-table-user';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import React from 'react'

const Orders = async ({
    params,
    searchParams
}: {
    params: { domain: string; slug: string };
    searchParams:
    { [key: string]: string | undefined }
}) => {
    const session = await getSession();
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


    const { page, search, status } = searchParams
    const where: (Prisma.transactionWhereInput) = {};

    if (status !== "all") {
        where.status = status?.toLocaleLowerCase()
    }

    where.siteId = site?.id
    where.name = "ORDER"
    where.userId = session?.user?.id

    const transaction = await prisma.transaction.findMany({
        where,
        include: {
            siteService: {
                include: {
                    provider: true
                }
            },
            user: true,
            sites: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className='text-gray-800'>
            <SidebarHeader title='Order List'/>
            <OrderTableUser transactions={transaction} />
        </div>
    )
}

export default Orders