"use client"
import { BookUserIcon } from 'lucide-react'
import React from 'react'
import { Switch } from '../ui/switch'
import axios from 'axios'
import { toast } from 'sonner'

type Props = {
    siteId : string
    isShow : boolean
}

const ShowUserSpent = ({
    siteId,
    isShow
}: Props) => {
    const handleChange = async (e: boolean) => {
        try {
            const response = await axios.post(`/api/user-spent`, {
                siteId,
                isShow: e
            })
            if(response.status === 200) {
                toast.success("Success update show user spent");
                window.location.reload()
            }
        } catch (error) {
            console.log({error});
            toast.error("Failed update show user spent");
        }
    }
  return (
    <div className="p-4 flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
    <div className="flex items-center gap-x-2">
        <BookUserIcon />
        <h5 className="font-semibold">Show user spent</h5>
    </div>
    <Switch defaultChecked={isShow} onCheckedChange={handleChange}/>
</div>
  )
}

export default ShowUserSpent