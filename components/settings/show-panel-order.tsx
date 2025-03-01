"use client"
import axios from 'axios'
import { CoinsIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Switch } from '../ui/switch'

type Props = {
    siteId: string
    isShow : boolean
}

const ShowPanelOrder = ({ siteId, isShow }: Props) => {
    const handleChange = async (e: boolean) => {
        try {
            const response = await axios.post(`/api/panel-order`, {
                siteId,
                isShow: e
            })
            if(response.status === 200) {
                toast.success("Success update show panel order");
                window.location.reload()
            }
        } catch (error) {
            console.log({error});
            toast.error("Failed update show panel order");
        }
    }
    return (
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
            <div className="flex items-center gap-x-2">
                <CoinsIcon />
                <h5 className="font-semibold">Show total panel orders</h5>
            </div>
            <Switch defaultChecked={isShow}  onCheckedChange={handleChange} />
        </div>
    )
}

export default ShowPanelOrder