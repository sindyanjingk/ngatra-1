"use client"
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { EllipsisIcon } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {}

const PopoverManagers = (props: Props) => {
    const onEdit = () => {
        console.log('edit')
    }
    const onDelete = () => {
        console.log('delete')
    }   
    return (
        <Popover>
            <PopoverTrigger asChild>
                <EllipsisIcon className="cursor-pointer hover:text-gray-400" />
            </PopoverTrigger>
            <PopoverContent className="w-32 p-2 flex flex-col">
                <Button variant="ghost" className="w-full outline-none justify-start" onClick={onEdit}>
                    Edit
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={onDelete}>
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    )
}

export default PopoverManagers