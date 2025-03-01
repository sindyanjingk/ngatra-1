
import AddManagersButton from '../../../../../../../components/managers/add-managers-button'
import AddManagersModal from '../../../../../../../components/managers/add-managers-modal'
import PopoverManagers from '../../../../../../../components/managers/popover-managers'
import prisma from '@/lib/prisma'
import { LockIcon } from 'lucide-react'
import React from 'react'

const Mangers = async ({
  params,
}: {
  params: { id: string };
}) => {
  const siteUsers = await prisma.userSite.findMany({
    where: {
      siteId: params.id
    },
    include: {
      user: true
    }
  })

  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Managers</div>
      <div className="border rounded-lg shadow-md">

        {
          siteUsers.length === 0 ?
            <div className="min-h-64 w-full flex items-center justify-center gap-x-4">
              <LockIcon size={18} color='blue' className='animate-bounce' />
              <h5 className='font-semibold'>Here you can add managers and choose what they are allowed to do on your panel</h5>
            </div> :
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4 border-b p-4">
                <div className="text-lg font-bold">Username</div>
                <div className="text-lg font-bold">Email</div>
                <div className="text-lg font-bold">Role</div>
              </div>
              {
                siteUsers.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 px-4">
                    <div className="text-md font-semibold">{item.user.name}</div>
                    <div className="text-md font-semibold">{item.user.email}</div>
                    <div className="text-md font-semibold">{item.role}</div>
                    <PopoverManagers/>
                  </div>
                ))
              }
            </div>
        }
        <div className="flex items-center justify-center border-t p-4 mt-2">
          <AddManagersButton>
            <AddManagersModal siteId={params.id} />
          </AddManagersButton>
        </div>
      </div>
    </div>
  )
}

export default Mangers