import SidebarHeader from '@/components/dashboard-user/sidebar-header'
import FundsHistoryTable from '@/components/table/funds-history-table'
import { getSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'



const HistoryFunds = async ({ params }: { params: { domain: string } }) => {
    const mockData = [
        {
            id: "FUND001",
            amount: 150000,
            method: "gopay",
            status: "success",
            createdAt: "2025-05-19T10:30:00Z",
        },
        {
            id: "FUND002",
            amount: 250000,
            method: "bank_transfer",
            status: "pending",
            createdAt: "2025-05-19T12:00:00Z",
        },
    ]
    const session = await getSession()
    if (!session) {
        return redirect('/login')
    }
    const userSite = await prisma.userSite.findFirst({
        where: {
            id: session.user.id
        }
    })
    const transaction = await prisma.transaction.findMany({
        where: {
            userId: userSite?.userId,
            siteId: userSite?.siteId,
            name: "TOPUP"
        }
    })
    return (
        <div className='text-gray-800'>
            <SidebarHeader title='Funds History' />
            <FundsHistoryTable
                //@ts-ignore
                data={transaction} />
        </div>
    )
}
export default HistoryFunds