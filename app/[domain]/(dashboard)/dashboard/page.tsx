"use client"
import AddFundsButton from '@/components/add-funds/add-funds-button'
import AddFundsModalUser from '@/components/add-funds/add-funds-modal-user'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatIDR } from '@/lib/helpers'
import axios from 'axios'
import { Loader2Icon, LucideBadgeDollarSign, ShoppingBasketIcon, UserCheck2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {}
const DashboardPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState("")
  const [userName, setUsername] = useState("")
  const [balance, setBalance] = useState(0)
  const [complete, setComplete] = useState(0)
  const [spent, setTotalSpent] = useState(0)
  const getUser = async () => {
    setIsLoading(true)
    const response = await axios.get(`/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      setUsername(response.data.name || "")
      setBalance(response.data.balance || 0)
      setComplete(response.data.transaction.length || 0)
      setTotalSpent(response.data.spent || 0)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token')
      setToken(token || "")
    }
  }, [])

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token])
  return (
    <div className='text-black'>
      <div className="grid grid-cols-4 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>Hello 👋🏻</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <UserCheck2Icon className='text-xl' />
            <div className="text-xl font-semibold">
              {
                isLoading ?
                  <Loader2Icon className='animate-spin' /> :
                  userName
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {
                isLoading ?
                  <Loader2Icon className='animate-spin' /> :
                  formatIDR(spent)
              }
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <LucideBadgeDollarSign className='text-xl' />
            <div className="text-xl font-semibold">Spent Balance</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {
                isLoading ?
                  <Loader2Icon className='animate-spin' /> :
                  complete
              }
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <ShoppingBasketIcon className='text-xl' />
            <div className="text-xl font-semibold">Completed Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              {
                isLoading ?
                  <Loader2Icon className='animate-spin' /> :
                  formatIDR(balance)
              }
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <AddFundsButton>
              <AddFundsModalUser siteId='' />
            </AddFundsButton>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage