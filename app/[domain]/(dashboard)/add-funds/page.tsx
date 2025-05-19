
import SidebarHeader from '@/components/dashboard-user/sidebar-header'
import AddFundsForm from '@/components/form/add-funds-form'
import React from 'react'

type Props = {}

const AddFunds = (props: Props) => {

  return (
    <div className='text-gray-800'>
      <SidebarHeader title='Add Funds' />
      <AddFundsForm/>
    </div>
  )
}

export default AddFunds