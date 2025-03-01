"use client"
import { useModal } from '@/components/modal/provider'
import { Trash2Icon } from 'lucide-react';
import React from 'react'

type Props = {
  children: React.ReactNode;
}

const DeleteProviderButton = ({ children }: Props) => {

  const modal = useModal()
  return (
    <button
      onClick={() => modal?.show(children)}
      className="flex items-center gap-x-4 cursor-pointer hover:bg-gray-200 p-4 "
    >
      <Trash2Icon className='text-red-500' />
      <div className="text-md font-semibold">Delete</div>
    </button>
  )

}

export default DeleteProviderButton