import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideBadgeDollarSign, ShoppingBasketIcon, UserCheck2Icon } from 'lucide-react'
import React from 'react'

type Props = {}
const DashboardPage = (props: Props) => {
  return (
    <div className='text-black'>
      <div className="grid grid-cols-4 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Wellcome back</CardTitle>
          </CardHeader>
          <CardContent>
            <UserCheck2Icon className='text-6xl'/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-6xl font-bold'>$17.67</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <LucideBadgeDollarSign className='text-xl'/>
            <div className="text-xl font-semibold">Spent Balance</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-6xl font-bold'>98901</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <ShoppingBasketIcon className='text-xl'/>
            <div className="text-xl font-semibold">Completed Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-6xl font-bold'>$10.00</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <ShoppingBasketIcon className='text-xl'/>
            <div className="text-xl font-semibold">Account Balance</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage