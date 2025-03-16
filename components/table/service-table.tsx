import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Prisma } from '@prisma/client'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select'
import SearchTable from './search-table'
import ImportServiceButton from '../services/import-service-button'
import ImportServicesModal from '../services/import-services-modal'
import AddCategoryButton from '../category/add-category-button'
import AddCategoryModal from '../category/add-category-modal'
import prisma from '@/lib/prisma'
import { Edit2Icon, Trash2Icon } from 'lucide-react'
import ButtonAddServices from '../services/button-add-services'
import ModalAddServices from '../services/modal-add-services'
import { formatIDR } from '@/lib/helpers'

type Props = {
    services: Prisma.siteServicesGetPayload<{
        include: {
            provider: true
        }
    }>[]
    p: number
    siteId: string
    providers: Prisma.siteProvidersGetPayload<{
        include: {
            site: true
        }
    }>[]
}

const ServicesTable = async ({ p, siteId, providers }: Props) => {
    const categories = await prisma.category.findMany({
        where: {
            siteId
        }
    })

    const services = await prisma.siteServices.findMany({
        where : {
            siteId
        },
        include: {
            provider : true,
            category : true
        }
    })
      
    return (
        <div className="">
            <div className="text-lg my-4 font-bold">List Services</div>
            <div className="flex gap-4 items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <ButtonAddServices>
                        <ModalAddServices/>
                    </ButtonAddServices>
                    <ImportServiceButton>
                        <ImportServicesModal categories={categories} providers={providers} siteId={siteId} />
                    </ImportServiceButton>
                </div>
                <SearchTable />
                <div className="flex items-center gap-x-4">
                    <Select>
                        <SelectTrigger className='md:w-[200px]'>
                            <SelectValue className='' placeholder={"Category"} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories.map((item) => (
                                    <SelectItem key={item.id} value={item.category_name!}>{item.category_name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <AddCategoryButton>
                        <AddCategoryModal siteId={siteId} />
                    </AddCategoryButton>
                </div>
                <Button>Direct Providers</Button>
            </div>
            {/* tampilan table */}
            <ScrollArea className="w-full overflow-auto">
                <Table className="border border-gray-300">
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead className="border border-gray-300">ID</TableHead>
                            <TableHead className="border border-gray-300">Name</TableHead>
                            <TableHead className="border border-gray-300">Rate</TableHead>
                            <TableHead className="border border-gray-300">Category</TableHead>
                            <TableHead className="border border-gray-300">Provider</TableHead>
                            <TableHead className="border border-gray-300">Min</TableHead>
                            <TableHead className="border border-gray-300">Max</TableHead>
                            <TableHead className="border border-gray-300">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((item, index) => (
                            <TableRow key={index} className="border border-gray-300">
                                <TableCell className="border border-gray-300">{index + 1}</TableCell>
                                <TableCell className="border border-gray-300">{item.name}</TableCell>
                                <TableCell className="border border-gray-300">{formatIDR(item.rate!)}</TableCell>
                                <TableCell className="border border-gray-300">{item.category?.category_name}</TableCell>
                                <TableCell className="border border-gray-300">{item.provider?.name}</TableCell>
                                <TableCell className="border border-gray-300">{item.max}</TableCell>
                                <TableCell className="border border-gray-300">{item.min}</TableCell>
                                <TableCell className="border border-gray-300 w-12">
                                    <div className="flex items-center gap-x-2">
                                        <Button variant={"outline"}><Edit2Icon /></Button>
                                        <Button variant={"outline"}><Trash2Icon /></Button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
            {/* <PaginationTable count={users.length} p={p} /> */}
        </div>
    )
}

export default ServicesTable