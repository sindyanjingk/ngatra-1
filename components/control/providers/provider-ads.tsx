import React from 'react'
import { ArrowUp } from 'lucide-react'
import ProviderItem from './provider-item'

type Props = {
    siteId : string
}

const ProviderAds = ({siteId}: Props) => {
  let data = [
    {
        favIcon: "/logo.png",
        name: "N1 Panel",
        url: 'https://n1panel.com',
        icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
        favIcon: "/logo.png",
        name: "IDC Sosmed",
        url: 'https://idcsosmed.com',
        icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
      favIcon: "/logo.png",
      name: "Global SMM",
      url: 'https://global-smm.com',
      icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
      favIcon: "/logo.png",
      name: "Sochype",
      url: 'https://global-smm.com',
      icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
      favIcon: "/logo.png",
      name: "Dnox SMM",
      url: 'https://global-smm.com',
      icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
      favIcon: "/logo.png",
      name: "Partner Soc",
      url: 'https://global-smm.com',
      icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
      favIcon: "/logo.png",
      name: "1x Panel",
      url: 'https://global-smm.com',
      icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
    {
      favIcon: "/logo.png",
      name: "Tea Teagram",
      url: 'https://global-smm.com',
      icon: <ArrowUp className='rotate-45 h-6 w-6' />
    },
  ]
  return (
    <div className="border rounded-lg shadow-md">
      {
        data.map((item, index) => (
          <ProviderItem siteId={siteId} logo={item.favIcon} item={item.name} url={item.url} Icon={item.icon} key={index} />
        ))
      }
    </div>
  )
}

export default ProviderAds