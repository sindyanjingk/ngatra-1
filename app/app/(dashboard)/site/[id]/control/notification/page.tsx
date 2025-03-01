import { Switch } from '../../../../../../../components/ui/switch'
import React from 'react'

type Props = {}

const Notification = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Notification Settings</div>
      <div className="rounded-lg border shadow-sm flex items-start flex-col gap-y-2 w-full">
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Email Notification</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Password Reset</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Success Payment</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">New Order</div>
          <Switch/>
        </div>
        <div className="p-4 border-b flex hover:shadow-lg cursor-pointer items-center justify-between w-full">
          <div className="font-semibold">Order Failed</div>
          <Switch/>
        </div>
      </div>
    </div>
  )
}

export default Notification