"use client"
import { Input } from '../../../../../../../components/ui/input'
import { Code2Icon, DollarSignIcon, FileWarningIcon, FilterIcon, LayoutDashboardIcon, LockIcon, PanelBottom, SettingsIcon, SparklesIcon } from 'lucide-react'
import React, { useState } from 'react'


const Language = () => {

  const [activePage, setActivePage] = useState("design")
  const dataPage = [
    {
      id: "design",
      name: "Design",
      icon: <SparklesIcon />,
      isActive: activePage === "design"
    },
    {
      id: "auth",
      name: "Auth",
      icon: <LockIcon />,
      isActive: activePage === "auth"
    },
    {
      id: "child-panel",
      name: "Child Panel",
      icon: <PanelBottom />,
      isActive: activePage === "child-panel"
    },
    {
      id: 'dashboard',
      name: "Dashboard",
      icon: <LayoutDashboardIcon />,
      isActive: activePage === "dashboard"
    },
    {
      id: "developers",
      name: "Developers",
      icon: <Code2Icon />,
      isActive: activePage === "developers"
    },
    {
      id: "errors",
      name: "Errors",
      icon: <FileWarningIcon />,
      isActive: activePage === "errors"
    },
    {
      id: "filters",
      name: "Filters",
      icon: <FilterIcon />,
      isActive: activePage === "filters"
    },
    {
      id: "orders",
      name: "Orders",
      icon: <DollarSignIcon />,
      isActive: activePage === "orders"
    },
    {
      id: "services",
      name: "Services",
      icon: <SettingsIcon />,
      isActive: activePage === "services"
    },
  ]
  return (
    <div className='flex flex-col gap-y-4 md:w-full'>
      <div className="text-md font-semibold text-xl">Language Settings</div>
      <form action={
        async () => {
          
        }
      }>
        {/* <Button type='submit'>Buat Language</Button> */}
      </form>
      <div className="flex items-start gap-x-4 justify-between">
        <div className="w-1/4 border rounded-md min-h-screen">
          {
            dataPage.map((item, index) => (
              <div key={index}
                className={`${item.isActive && 'shadow-md '} flex items-center gap-x-2 border-b p-2 font-semibold cursor-pointer hover:shadow-md hover:bg-blue-50`}>
                {item.icon}
                {item.name}
              </div>
            ))
          }
        </div>
        <div className="w-3/4 rounded-md min-h-screen border p-4">
          {
            activePage === "design" &&
            <form action="">
              <h5 className='font-bold'>Design</h5>
              <div className="flex flex-col gap-y-2 mt-4">
                <label className='font-semibold' htmlFor="">The most comfortable SMM-provider</label>
                <Input type='text' placeholder='The most comfortable SMM-provider' />
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <label className='font-semibold' htmlFor="">We will make you popular</label>
                <Input type='text' placeholder='We will make you popular' />
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <label className='font-semibold' htmlFor="">Huge service assortment</label>
                <Input type='text' placeholder='Huge service assortment' />
              </div>
              <div className="flex flex-col gap-y-2 mt-4">
                <label className='font-semibold' htmlFor="">In all of popular social networks</label>
                <Input type='text' placeholder='In all of popular social networks' />
              </div>              <div className="flex flex-col gap-y-2 mt-4">
                <label className='font-semibold' htmlFor="">We have everything you need</label>
                <Input type='text' placeholder='We have everything you need' />
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Language