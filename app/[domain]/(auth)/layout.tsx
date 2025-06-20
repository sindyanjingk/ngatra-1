import Image from 'next/image'
import prisma from '../../../lib/prisma'
import React from 'react'

type Props = {
    children: React.ReactNode
    params: {
        domain: string
    }
}

const AuthLayout = async ({ children, params }: Props) => {
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
        <div className="flex items-center justify-start w-screen md:p-12 p-4 flex-col gap-y-2 h-screen bg-gradient-to-br from-green-300 via-blue-300 to-blue-500">
            {site?.image && <Image src={site?.image} alt="" height={24} width={24} className='w-24 h-24 object-cover rounded-full' />}
            <div className="text-2xl font-bold text-white">{site?.name}</div>
            {children}
        </div>
    )
}

export default AuthLayout