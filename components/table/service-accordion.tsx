"use client"
import { ArrowUpDownIcon, Dessert, Ellipsis, EllipsisIcon, FolderIcon, Layers2Icon, PencilIcon, PercentCircleIcon, PlusSquareIcon, Trash2Icon, TrashIcon, XSquareIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import ButtonAddServices from '../services/button-add-services'
import ModalAddServices from '../services/modal-add-services'
import { category, Prisma, siteServices } from '@prisma/client'
import ImportServiceButton from '../services/import-service-button'
import ImportServicesModal from '../services/import-services-modal'
import SearchTable from './search-table'
import FilterCategoryServices from '../services/filter-category'
import AddCategoryButton from '../category/add-category-button'
import AddCategoryModal from '../category/add-category-modal'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useModal } from '../modal/provider'
import ModalDisableAll from '../services/bulk-services/modal-disable-all'
import ModalEnableAll from '../services/bulk-services/moda-enable-all'
import ModalChangeAllCategory from '../services/bulk-services/modal-change-category'
import ModalChangeNameDescription from '../services/bulk-services/modal-change-name-description'
import ModalChangePriceServices from '../services/bulk-services/modal-change-price-services'
import ModalDeleteAllServices from '../services/bulk-services/modal-delete-all-services'
import ModalUpdateServices from '../services/modal-edit-services'

type ServiceItem = siteServices

type GroupedService = {
  category: string
  data: ServiceItem[]
}

type Props = {
  result: GroupedService[]
  siteId: string;
  categories: category[]
  providers: Prisma.siteProvidersGetPayload<{
    include: {
      site: true
    }
  }>[]
}

const ServicesAccordion = ({ result, siteId, categories, providers }: Props) => {
  // const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Map<string, ServiceItem>>(new Map());

  const allIds = result.flatMap(group => group.data.map(item => item.id));
  const isAllSelected = allIds.length > 0 && allIds.every(id => selectedItems.has(id));
  const selectedIds = Array.from(selectedItems.keys())
  const selectedArray = Array.from(selectedItems.values());

  const toggleSelectAll = () => {
    const allItems = result.flatMap(group => group.data);
    const allSelected = allItems.every(item => selectedItems.has(item.id));

    const newMap = new Map(selectedItems);
    allItems.forEach(item => {
      if (allSelected) {
        newMap.delete(item.id);
      } else {
        newMap.set(item.id, item);
      }
    });

    setSelectedItems(allSelected ? new Map() : newMap);
  };


  const toggleSelectByCategory = (category: string) => {
    const group = result.find(g => g.category === category);
    if (!group) return;

    const allSelected = group.data.every(item => selectedItems.has(item.id));
    const newMap = new Map(selectedItems);

    group.data.forEach(item => {
      if (allSelected) {
        newMap.delete(item.id);
      } else {
        newMap.set(item.id, item);
      }
    });

    setSelectedItems(newMap);
  };


  const toggleSelectSingle = (item: ServiceItem) => {
    setSelectedItems(prev => {
      const newMap = new Map(prev);
      if (newMap.has(item.id)) {
        newMap.delete(item.id);
      } else {
        newMap.set(item.id, item);
      }
      return newMap;
    });
  };


  const modal = useModal()

  return (
    <div className="space-y-4">

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
      <div className="flex gap-x-8 items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={toggleSelectAll}
          />
          <span className="text-sm font-medium">Select All</span>
        </div>
        {
          selectedItems.size !== 0 &&
          <span className="text-sm text-gray-600">
            Selected: {selectedItems.size}
          </span>
        }
        <Popover>
          <PopoverTrigger asChild>
            <EllipsisIcon className='cursor-pointer' />
          </PopoverTrigger>
          <PopoverContent className="">
            <div className="flex flex-col gap-y-2 items-start justify-start">
              <Button
                onClick={() => {
                  modal?.show(<ModalDisableAll selectedServices={selectedIds} />)
                }}
                variant={"ghost"}
                className='flex items-center gap-x-2'>
                <XSquareIcon />
                Disable All
              </Button>
              <Button
                onClick={() => {
                  modal?.show(<ModalEnableAll selectedServices={selectedIds} />)
                }}
                variant={"ghost"}
                className='flex items-center gap-x-2'>
                <PlusSquareIcon />
                Enable All
              </Button>
              <Button onClick={() => {
                modal?.show(<ModalChangeAllCategory categories={categories} selectedServices={selectedIds} />)
              }} variant={"ghost"} className='flex items-center gap-x-2'>
                <ArrowUpDownIcon />
                Change Category
              </Button>
              <Button onClick={() => {
                modal?.show(<ModalChangeNameDescription selectedServices={selectedArray} />)
              }} variant={"ghost"} className='flex items-center gap-x-2'>
                <Dessert />
                Change Name & description
              </Button>
              <Button onClick={() => {
                modal?.show(<ModalChangePriceServices selectedServices={selectedArray} />)
              }} variant={"ghost"} className='flex items-center gap-x-2'>
                <PercentCircleIcon />
                Change Price
              </Button>
              <Button onClick={() => {
                modal?.show(<ModalDeleteAllServices selectedServices={selectedIds} />)
              }} variant={"ghost"} className='flex items-center gap-x-2'>
                <TrashIcon className='text-red-500' />
                Delete All
              </Button>

            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {result.map((group, idx) => {
          const allCategorySelected = group.data.every(service => selectedItems.has(service.id));
          return (
            <AccordionItem key={idx} value={group.category}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={allCategorySelected}
                    onCheckedChange={() => toggleSelectByCategory(group.category)}
                  />
                  <span>{group.category}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-6 space-y-2">
                {group.data.map(service => (
                  <div key={service.id} className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-x-4">
                      <Checkbox
                        checked={selectedItems.has(service.id)}
                        onCheckedChange={() => toggleSelectSingle(service)}
                      />
                      <span className="text-sm">{service.name}</span>
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
                            <PercentCircleIcon />
                            Custom Price
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
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ServicesAccordion;