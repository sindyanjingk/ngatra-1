"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

type Props = {
    siteId: string
    showBanner: boolean
}

const ButtonBanner = ({ showBanner, siteId }: Props) => {
    const [isLoading, setIsLoading] = useState(false)

    const updateBanner = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/api/banner`, {
                showBanner : !showBanner,
                siteId
            })
            if (response.status === 200) {
                console.log(response.data)
                toast.success("Success update banner")
                window.location.reload()
            }
        } catch (error) {
            console.log({ error });
            toast.error("Terjadi kesalahan")
        }
        setIsLoading(false)
    }
    return (
        <Button onClick={updateBanner} className="p-4 shadow-sm hover:shadow-lg font-semibold border rounded-md">
            {
                isLoading ?
                    <Loader2Icon className='animate-spin' /> :
                    showBanner ? "Turn off banner" : "Turn on banner"
            }
        </Button>
    )
}

export default ButtonBanner