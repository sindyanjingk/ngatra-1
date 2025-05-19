import SidebarHeader from '@/components/dashboard-user/sidebar-header'
import FundsHistoryTable from '@/components/table/funds-history-table'
import React from 'react'

type Props = {}

const Refunds = (props: Props) => {
  return (
    <div className='text-gray-800'>
      <SidebarHeader title='Refunds History' />
      <FundsHistoryTable title='Refunds History' data={[]} />
    </div>
  )
}

export default Refunds