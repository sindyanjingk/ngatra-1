"use client"
import React from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Checkbox } from '../ui/checkbox';
import { category, Prisma, siteServices } from '@prisma/client';
import { DollarSignIcon, EllipsisIcon, FolderIcon, Layers2Icon, PencilIcon, PercentCircleIcon, PlusSquareIcon, Trash2Icon, XSquareIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useModal } from '../modal/provider';
import ModalUpdateServices from '../services/modal-edit-services';
import ModalChangeAllCategory from '../services/bulk-services/modal-change-category';
import ModalChangePriceServices from '../services/bulk-services/modal-change-price-services';
import ModalDisableAll from '../services/bulk-services/modal-disable-all';
import ModalEnableAll from '../services/bulk-services/moda-enable-all';
import ModalDeleteAllServices from '../services/bulk-services/modal-delete-all-services';
import { formatIDR } from '@/lib/helpers';
import ModalAddSpecialPrice from '../services/bulk-services/modal-special-price';
import ModalEditCategory from '../services/modal-edit-category';

type ServiceItem = siteServices

type Props = {
    allCategorySelected: boolean;
    group: {
        category: string;
        data: ServiceItem[]
    }
    toggleSelectByCategory: (category: string) => void;
    selectedItems: Map<string, ServiceItem>;
    toggleSelectSingle: (service: ServiceItem) => void;
    categories: category[];
    userSite: Prisma.userSiteGetPayload<{
        include: {
            user: true
        }
    }>[]
}

const ServiceAccordionItem = ({ allCategorySelected, toggleSelectByCategory, group, selectedItems, categories, toggleSelectSingle, userSite }: Props) => {
    const modal = useModal();
    const [popOverCat, setPopOverCat] = React.useState(false);
    return (
        <AccordionItem value={group.category}>
            <div className="flex items-center gap-x-4 justify-between">
                <div className="flex items-center gap-x-4">
                    <Checkbox
                        checked={allCategorySelected}
                        onCheckedChange={() => toggleSelectByCategory(group.category)}
                    />
                    <span>{group.category}</span>
                    <Popover open={popOverCat} onOpenChange={setPopOverCat}>
                        <PopoverTrigger asChild>
                            <EllipsisIcon className="cursor-pointer hover:text-blue-500" />
                        </PopoverTrigger>
                        <PopoverContent className=' mr-4'>
                            <div className='flex items-start justify-start flex-col gap-y-2'>
                                <Button onClick={() => {
                                    modal?.show(
                                        <ModalEditCategory catId={group.data[0].categoryId!}/>
                                    )
                                    setPopOverCat(false)
                                }} variant={"ghost"} className='flex items-center gap-x-2'>
                                    <PencilIcon />
                                    Edit Category
                                </Button>
                                <Button
                                    onClick={() => {
                                        // modal?.show(<ModalDisableAll selectedServices={[service.id]} />)
                                    }}
                                    variant={"ghost"}
                                    className='flex items-center gap-x-2'>
                                    <XSquareIcon />
                                    Disable Service
                                </Button>
                                <Button
                                    onClick={() => {
                                        // modal?.show(<ModalEnableAll selectedServices={[service.id]} />)
                                    }}
                                    variant={"ghost"}
                                    className='flex items-center gap-x-2'>
                                    <PlusSquareIcon />
                                    Enable Service
                                </Button>
                                <Button onClick={() => {
                                    // modal?.show(<ModalDeleteAllServices selectedServices={[service.id]} />)
                                }} variant={"ghost"} className='flex items-center gap-x-2'>
                                    <Trash2Icon />
                                    Delete
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <AccordionTrigger>
                </AccordionTrigger>
            </div>
            <AccordionContent className="pl-6 space-y-2">
                {group.data.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 justify-between">
                        <div className="flex items-center gap-x-4 w-full">
                            <Checkbox
                                checked={selectedItems.has(service.id)}
                                onCheckedChange={() => toggleSelectSingle(service)}
                            />
                            <span className="text-sm w-2/6 ">{service.name}</span>
                            {/* @ts-ignore */}
                            <span className="text-sm w-1/6">{service?.provider?.name}</span>
                            <span className="text-sm w-1/6">{formatIDR(service?.rate || 0)}</span>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <EllipsisIcon className='cursor-pointer hover:text-blue-500' />
                            </PopoverTrigger>
                            <PopoverContent className=' mr-4'>
                                <div className='flex items-start justify-start flex-col gap-y-2'>
                                    <Button onClick={() => {
                                        modal?.show(<ModalUpdateServices categories={categories} service={service} />)
                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                        <PencilIcon />
                                        Edit Services
                                    </Button>
                                    <Button onClick={() => {
                                        modal?.show(<ModalChangeAllCategory categories={categories} selectedServices={[service.id]} />)
                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                        <FolderIcon />
                                        Change Category
                                    </Button>
                                    <Button variant={"ghost"} className='flex items-center gap-x-2'>
                                        <Layers2Icon />
                                        Duplicate
                                    </Button>
                                    <Button onClick={() => {
                                        modal?.show(<ModalChangePriceServices selectedServices={[service]} />)
                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                        <DollarSignIcon />
                                        Change Price
                                    </Button>
                                    <Button onClick={() => {
                                        modal?.show(<ModalAddSpecialPrice userSite={userSite} selectedServices={service} />)
                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                        <PercentCircleIcon />
                                        Special Price
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            modal?.show(<ModalDisableAll selectedServices={[service.id]} />)
                                        }}
                                        variant={"ghost"}
                                        className='flex items-center gap-x-2'>
                                        <XSquareIcon />
                                        Disable Service
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            modal?.show(<ModalEnableAll selectedServices={[service.id]} />)
                                        }}
                                        variant={"ghost"}
                                        className='flex items-center gap-x-2'>
                                        <PlusSquareIcon />
                                        Enable Service
                                    </Button>
                                    <Button onClick={() => {
                                        modal?.show(<ModalDeleteAllServices selectedServices={[service.id]} />)
                                    }} variant={"ghost"} className='flex items-center gap-x-2'>
                                        <Trash2Icon />
                                        Delete
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                ))}
                {/* {
                    group.data.map(service => {
                        console.log({service});
                        
                        return (
                            <div key={service.id} className="flex items-center gap-x-4">
                                <Checkbox
                                    checked={selectedItems.has(service.id)}
                                    onCheckedChange={() => toggleSelectSingle(service)}
                                />
                                <span className="text-sm">{service.name}</span>
                                <span className="text-sm">{service.name}</span>
                                <span className="text-sm">{service.name}</span>
                            </div>
                        )
                    })
                } */}
            </AccordionContent>
        </AccordionItem>
    )
}

export default ServiceAccordionItem