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
    const transformCategories = categories.map((item) => ({
        label: item.category_name,
        value: item.id
    }))

    const services = await prisma.siteServices.findMany({
        where : {
            siteId
        },
        include: {
            provider : true,
            category : true
        }
    })

    const where : Prisma.siteServicesWhereInput  = { }

    const categoryServices = Object.values(
        services.reduce((acc, item) => {
          const categoryName = item.category?.category_name || "Uncategorized";
    
          if (!acc[categoryName]) {
            acc[categoryName] = {
              categoryName,
              services: [],
            };
          }
    
          acc[categoryName].services.push(item);
          return acc;
        }, {} as Record<string, { categoryName: string; services: typeof services }>)
      );

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
                                categoryServices.map((item) => (
                                    <SelectItem key={item.categoryName} value={item.categoryName}>{item.categoryName}</SelectItem>
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
                            <TableHead className="border border-gray-300">Network</TableHead>
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
                                <TableCell className="border border-gray-300">{item.rate}</TableCell>
                                <TableCell className="border border-gray-300">{item.network}</TableCell>
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