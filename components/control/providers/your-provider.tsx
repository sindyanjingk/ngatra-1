import { Code2Icon, Delete, EllipsisIcon, SearchIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import AddDirectProviderButton from './add-direct-providers-button'
import AddDirectProviderModal from './add-direct-provider-modal'
import { siteProviders } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import DeleteProviderButton from './delete-provider-button'
import DeleteProviderModal from './delete-provider-modal'

type Props = {
    providers: siteProviders[]
    siteId: string
}

const YourProvider = ({ providers, siteId }: Props) => {

    return (
        <div className="border rounded-lg shadow-md">
            <div className="min-h-60 w-full flex items-start justify-start flex-col gap-x-4">
                {
                    providers.length !== 0 ?
                        providers.map((item, index) => (
                            <div className='p-4 border-b w-full flex items-center justify-between' key={index}>
                                <div className="text-md font-bold w-1/2">{item.name}</div>
                                <Popover>
                                    <PopoverTrigger className='cursor-pointer' asChild>
                                        <div className="bg-gray-100 p-2 rounded-lg">
                                            <EllipsisIcon />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-60 flex flex-col p-0">
                                        <div className="flex items-center gap-x-4 cursor-pointer hover:bg-gray-200 p-4">
                                            <Code2Icon className='text-blue-500' />
                                            <div className="text-md font-semibold">Change API Key</div>
                                        </div>
                                        <DeleteProviderButton>
                                            <DeleteProviderModal providerId={item.id} />
                                        </DeleteProviderButton>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )) :
                        <div className="flex items-center justify-center gap-x-2 w-full h-full mt-20">    
                            <SearchIcon size={18} color='blue' className='animate-bounce' />
                            <h5 className='font-semibold'>Add providers to buy services from them</h5>
                        </div>

                }
            </div>
            <div className="flex items-center justify-center border-t p-4">
                <AddDirectProviderButton>
                    <AddDirectProviderModal siteId={siteId} />
                </AddDirectProviderButton>
            </div>
        </div>
    )
}

export default YourProvider