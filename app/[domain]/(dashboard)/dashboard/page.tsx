"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { LucideBadgeDollarSign, ShoppingBasketIcon, UserCheck2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {}
const DashboardPage = (props: Props) => {
  const [token, setToken] = useState("")
  const [userName, setUsername] = useState([])
  const getUser = async ()=>{
    const response = await axios.get(`/api/user`, {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    console.log({response});
    if(response.status === 200){
      setUsername(response.data.name || "")
    }
  }
  useEffect(()=>{
    if(typeof window !== "undefined"){
      const token = localStorage.getItem('token')
      setToken(token || "")
    }
  }, [])

  useEffect(()=>{
    if(token){
      getUser()
    }
  }, [token])
  return (
    <div className='text-black'>
      <div className="grid grid-cols-4 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className='text-5xl'>Wellcome</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center gap-x-4'>
            <UserCheck2Icon className='text-xl'/>
            <div className="text-xl font-semibold">{userName}</div>
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