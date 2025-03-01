import AddPaymentButton from '../../../../../../../components/payment/add-payment-buttont'
import AddPaymentModal from '../../../../../../../components/payment/add-payment-modal'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Payments = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Payment Methods</div>
      <div className="border rounded-lg shadow-md">
            <div className="h-64 w-full flex items-center justify-center gap-x-4">
                <SearchIcon size={18} color='blue' className='animate-bounce'/> 
                <h5 className='font-semibold'>Add payment systems so your users can add funds automatically</h5>
            </div>
            <div className="flex items-center justify-center border-t p-4">
                <AddPaymentButton>
                    <AddPaymentModal/>
                </AddPaymentButton>
            </div>
        </div>
    </div>
  )
}

export default Payments