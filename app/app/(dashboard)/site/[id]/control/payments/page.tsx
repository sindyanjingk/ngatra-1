import prisma from '@/lib/prisma'
import AddPaymentButton from '../../../../../../../components/payment/add-payment-buttont'
import AddPaymentModal from '../../../../../../../components/payment/add-payment-modal'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import ChangeCredentialsButton from '@/components/payment/change-credentials'
import ChangeCredentialsModal from '@/components/payment/change-credentials-modal'
import DeletePaymentModal from '@/components/payment/delete-payment-modal'
import DeleteCredentialsButton from '@/components/payment/delete-credentials'

const Payments = async ({
  params
}: {
  params: {
    id: string
  }
}) => {
  const paymentMethod = await prisma.sitePaymentMethod.findMany({
    where: {
      siteId: params.id
    }
  })
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Payment Methods</div>
      <div className="border rounded-lg shadow-md">
        {
          paymentMethod.length > 0 ?
            paymentMethod.map((item, index) => {
              return (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={"/logo-midtrans.svg"}
                      alt="midtrans"
                      height={32}
                      width={32}
                    />
                    <div className="font-semibold">Midtrans</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <DeleteCredentialsButton>
                      <DeletePaymentModal paymentId={item.id} />
                    </DeleteCredentialsButton>
                    <ChangeCredentialsButton>
                      <ChangeCredentialsModal siteId={params.id} clientKey={item.clientKey!} serverKey={item.serverKey!} />
                    </ChangeCredentialsButton>
                  </div>
                </div>
              )
            }) :
            <div className="h-64 w-full flex items-center justify-center gap-x-4">
              <SearchIcon size={18} color='blue' className='animate-bounce' />
              <h5 className='font-semibold'>Add payment systems so your users can add funds automatically</h5>
            </div>
        }
        {
          paymentMethod.length === 0 &&
          <div className="flex items-center justify-center border-t p-4">
            <AddPaymentButton>
              <AddPaymentModal siteId={params.id} />
            </AddPaymentButton>
          </div>
        }
      </div>
    </div>
  )
}

export default Payments