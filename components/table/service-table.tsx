"use client"
import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { category, Prisma, siteServices } from '@prisma/client'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '../ui/select'
import SearchTable from './search-table'
import ImportServiceButton from '../services/import-service-button'
import ImportServicesModal from '../services/import-services-modal'
import AddCategoryButton from '../category/add-category-button'
import AddCategoryModal from '../category/add-category-modal'
import { ArrowUpDownIcon, Dessert, DollarSignIcon, Edit2Icon, Ellipsis, EllipsisIcon, FolderIcon, GalleryThumbnailsIcon, Layers2Icon, PencilIcon, PercentCircleIcon, PlusSquareIcon, Trash2Icon, TrashIcon, XIcon, XSquareIcon } from 'lucide-react'
import ButtonAddServices from '../services/button-add-services'
import ModalAddServices from '../services/modal-add-services'
import { formatIDR } from '@/lib/helpers'
import { Checkbox } from '../ui/checkbox'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useModal } from '../modal/provider'
import ModalDisableAll from '../services/bulk-services/modal-disable-all'
import ModalEnableAll from '../services/bulk-services/moda-enable-all'
import ModalChangeAllCategory from '../services/bulk-services/modal-change-category'
import ModalDeleteAllServices from '../services/bulk-services/modal-delete-all-services'
import ModalChangeNameDescription from '../services/bulk-services/modal-change-name-description'
import ModalChangePriceServices from '../services/bulk-services/modal-change-price-services'
import ModalUpdateServices from '../services/modal-edit-services'
import Link from 'next/link'
import FilterCategoryServices from '../services/filter-category'
import PaginationTable from './pagination-table'

type Props = {
    services: Prisma.siteServicesGetPayload<{
        include: {
            provider: true,
            category: true,
        }
    }>[]
    p: number
    categories: category[]
    siteId: string
    providers: Prisma.siteProvidersGetPayload<{
        include: {
            site: true
        }
    }>[]
}

const ServicesTable = ({ categories, siteId, providers, services }: Props) => {
    const [selectedRows, setSelectedRows] = useState<siteServices[]>([]);
    const modal = useModal()
    const toggleRow = (item: siteServices) => {
        setSelectedRows((prev) =>
            prev.includes(item) ? prev.filter((rowId) => rowId !== item) : [...prev, item]
        );
    };

    const toggleAll = () => {
        if (selectedRows.length === services.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(services.map((d) => d));
        }
    };

    return (
        <div className="">
            <div className="text-lg my-4 font-bold">List Services</div>
            <div className="flex gap-4 items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <ButtonAddServices>
                        <ModalAddServices siteId={siteId} categories={categories} />
                    </ButtonAddServices>
                    <ImportServiceButton>
                        <ImportServicesModal categories={categories} providers={providers} siteId={siteId} />
                    </ImportServiceButton>
                </div>
                <SearchTable />
                <div className="flex items-center gap-x-4">
                    <FilterCategoryServices categories={categories} />
                    <AddCategoryButton>
                        <AddCategoryModal siteId={siteId} />
                    </AddCategoryButton>
                </div>
                <Link href={"/site/" + siteId + "/top-providers"}>
                    <Button>Direct Providers</Button>
                </Link>
            </div>
            {/* tampilan table */}
            <ScrollArea className="w-full overflow-auto">
                <Table className="rounded-full">
                    <TableHeader className="rounded-full mb-8">
                        <TableRow>
                            <TableHead className=''>
                                <Checkbox
                                    checked={selectedRows.length === services.length}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            {
                                selectedRows.length === 0 ?
                                    <>
                                        <TableHead className=" ">ID</TableHead>
                                        <TableHead className=" -gray-300">Name</TableHead>
                                        <TableHead className=" -gray-300">Rate</TableHead>
                                        <TableHead className=" -gray-300">Category</TableHead>
                                        <TableHead className=" -gray-300">Provider</TableHead>
                                        <TableHead className=" -gray-300">Min</TableHead>
                                        <TableHead className=" -gray-300">Max</TableHead>
                                    </> :
                                    <div className='ml-8 flex items-center gap-x-4 justify-center mt-1 w-full'>
                                        <div className="text-md font-bold">Selected <span className='text-green-500 font-bold'>{selectedRows.length}</span></div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Ellipsis className='cursor-pointer hover:text-red-500' />
                                            </PopoverTrigger>
                                            <PopoverContent className="">
                                                <div className="flex flex-col gap-y-2 items-start justify-start">
                                                    <Button
                                                        onClick={() => {
                                                            modal?.show(<ModalDisableAll selectedServices={selectedRows.map(item => item.id)} />)
                                                        }}
                                                        variant={"ghost"}
                                                        className='flex items-center gap-x-2'>
                                                        <XSquareIcon />
                                                        Disable All
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            modal?.show(<ModalEnableAll selectedServices={selectedRows.map(item => item.id)} />)
                                                        }}
                                                        variant={"ghost"}
                                                        className='flex items-center gap-x-2'>
                                                        <PlusSquareIcon />
                                                        Enable All
                                                    </Button>
                                                    <Button onClick={() => {
                                                        modal?.show(<ModalChangeAllCategory categories={categories} selectedServices={selectedRows.map(item => item.id)} />)
                                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                        <ArrowUpDownIcon />
                                                        Change Category
                                                    </Button>
                                                    {/* <Button variant={"ghost"} className='flex items-center gap-x-2'>
                                                        <GalleryThumbnailsIcon />
                                                        Change Image
                                                    </Button> */}
                                                    <Button onClick={() => {
                                                        modal?.show(<ModalChangeNameDescription selectedServices={selectedRows} />)
                                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                        <Dessert />
                                                        Change Name & description
                                                    </Button>
                                                    <Button onClick={() => {
                                                        modal?.show(<ModalChangePriceServices selectedServices={selectedRows} />)
                                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                        <PercentCircleIcon />
                                                        Change Price
                                                    </Button>
                                                    {/* 
                                                    <Button variant={"ghost"} className='flex items-center gap-x-2'>
                                                        <DollarSignIcon />
                                                        Add Special Price
                                                    </Button> */}
                                                    <Button onClick={() => {
                                                        modal?.show(<ModalDeleteAllServices selectedServices={selectedRows.map(item => item.id)} />)
                                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                        <TrashIcon className='text-red-500' />
                                                        Delete All
                                                    </Button>

                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <XIcon className='cursor-pointer hover:text-red-500' onClick={() => setSelectedRows([])} />
                                    </div>
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((item) => (
                            <TableRow key={item.id} className={item.isEnabled ? "" : "text-gray-400"}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(item)}
                                        onCheckedChange={() => toggleRow(item)}
                                    />
                                </TableCell>
                                <TableCell className=" ">{item.serviceId}</TableCell>
                                <TableCell className=" ">{item.name}</TableCell>
                                <TableCell className=" ">{formatIDR(item.rate!)}</TableCell>
                                <TableCell className=" ">{item.category?.category_name}</TableCell>
                                <TableCell className=" ">{item.provider?.name}</TableCell>
                                <TableCell className=" ">{item.min}</TableCell>
                                <TableCell className=" ">{item.max}</TableCell>
                                <TableCell className=''>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <EllipsisIcon className='cursor-pointer hover:text-blue-500' />
                                        </PopoverTrigger>
                                        <PopoverContent className=' mr-4'>
                                            <div className='flex items-start justify-start flex-col gap-y-2'>
                                                <Button onClick={() => {
                                                    modal?.show(<ModalUpdateServices categories={categories} service={item} />)
                                                }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                    <PencilIcon />
                                                    Edit Services
                                                </Button>
                                                <Button onClick={() => {
                                                    modal?.show(<ModalChangeAllCategory categories={categories} selectedServices={[item.id]} />)
                                                }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                    <FolderIcon />
                                                    Change Category
                                                </Button>
                                                <Button variant={"ghost"} className='flex items-center gap-x-2'>
                                                    <Layers2Icon />
                                                    Duplicate
                                                </Button>
                                                <Button onClick={() => {
                                                    modal?.show(<ModalChangePriceServices selectedServices={[item]} />)
                                                }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                    <PercentCircleIcon />
                                                    Custom Price
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        modal?.show(<ModalDisableAll selectedServices={[item.id]} />)
                                                    }}
                                                    variant={"ghost"}
                                                    className='flex items-center gap-x-2'>
                                                    <XSquareIcon />
                                                    Disable Service
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        modal?.show(<ModalEnableAll selectedServices={[item.id]} />)
                                                    }}
                                                    variant={"ghost"}
                                                    className='flex items-center gap-x-2'>
                                                    <PlusSquareIcon />
                                                    Enable Service
                                                </Button>
                                                <Button onClick={() => {
                                                    modal?.show(<ModalDeleteAllServices selectedServices={[item.id]} />)
                                                }} variant={"ghost"} className='flex items-center gap-x-2'>
                                                    <Trash2Icon />
                                                    Delete
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default ServicesTable
