"use client"
import { Prisma } from '@prisma/client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import ServiceItem from './service-item'
import ServiceItemModal from './service-item-modal'
import { Input } from '../ui/input'

type Props = {
  services: Prisma.siteServicesGetPayload<{
    include: {
      category: true,
      provider: true,
      site: true
    }
  }>[]
}

const CategoorySelect = ({ services }: Props) => {
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

  const [categoryName, setCategoryName] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter services berdasarkan search term dari semua kategori
  const filteredCategoryServices = categoryServices
    .map(category => ({
      ...category,
      services: category.services.filter(service =>
        service.name!.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(category => category.services.length > 0); // Hanya tampilkan kategori yang punya hasil pencarian

  // Jika kategori dipilih, ambil hanya yang sesuai
  const selectedCategory = categoryName
    ? filteredCategoryServices.find(category => category.categoryName === categoryName)
    : null;
  return (
    <div>
      <Input onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search ..." name="search" />
      <Select onValueChange={e => {
        setCategoryName(e)
      }}>
        <SelectTrigger className='my-4 w-80'>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categoryServices.map((item, index) => (
            <SelectItem key={index} value={item.categoryName}>
              {item.categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* {categoryName && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">{categoryName}</h3>
          <ul className="list-disc list-inside space-y-3">
            {selectedCategory?.services.map((service, serviceIndex) => (
              <ServiceItem label={service.name!} key={serviceIndex}>
                <ServiceItemModal max={+service.max!} min={+service.min!} name={service.name!} rate={+service.rate!} id={service.id!} />
              </ServiceItem>
            ))}
          </ul>
        </div>
      )} */}
      {selectedCategory ? (
        <>
          <h3 className="text-xl font-semibold mb-2">{selectedCategory.categoryName}</h3>
          {selectedCategory.services.length > 0 ? (
            <ul className="list-disc list-inside space-y-3">
              {selectedCategory.services.map((service, serviceIndex) => (
                <ServiceItem label={service.name!} key={serviceIndex}>
                  <ServiceItemModal max={+service.max!} min={+service.min!} name={service.name!} rate={+service.rate!} id={service.id!} />
                </ServiceItem>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No services found.</p>
          )}
        </>
      ) : (
        filteredCategoryServices.map(category => (
          <div key={category.categoryName} className="mb-4">
            <h3 className="text-lg font-semibold my-2">{category.categoryName}</h3>
            <ul className="list-disc list-inside space-y-3">
              {category.services.map((service, serviceIndex) => (
                <ServiceItem label={service.name!} key={serviceIndex}>
                  <ServiceItemModal max={+service.max!} min={+service.min!} name={service.name!} rate={+service.rate!} id={service.id!} />
                </ServiceItem>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default CategoorySelect