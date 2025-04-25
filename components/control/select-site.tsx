'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sites } from '@prisma/client'
import { ChevronRightCircleIcon, CirclePlusIcon } from 'lucide-react'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

type Props = {
  sites: sites[]
  siteName: string
}

const SelectSite = ({ sites, siteName }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleChange = (siteId: string) => {
    router.push(`/site/${siteId}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[180px] justify-start text-white bg-gradient-to-r from-violet-800 to-[#308BC3]"
        >
          {siteName}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] bg-gradient-to-b from-violet-800 to-[#308BC3] text-white p-2 space-y-1">
        {sites.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-sm"
            onClick={() => handleChange(item.id)}
          >
            <span>{item.name}</span>
            <Link
              href={item.customDomain ? item.customDomain : `https://${item.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRightCircleIcon size={14} className="text-blue-300" />
            </Link>
          </div>
        ))}
        <div className="border-t border-white/20 mt-2 pt-2 text-center">
          <Link
            href="/onboarding"
            className="flex items-center justify-center gap-x-2 text-blue-300 font-bold text-sm"
          >
            <CirclePlusIcon size={16} /> Add Site
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SelectSite
